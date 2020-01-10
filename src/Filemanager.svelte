<script>
  import {
    configs,
    sessionPath,
    cfgFileName,
    createConfig,
    mainFileName
  } from "./configs";
  import { noChange } from "./active.js";
  import { onDestroy } from "svelte";
  import ConfigModal from "./ConfigModal.svelte";

  const chokidar = require("chokidar");
  const jetpack = require("fs-jetpack");
  const path = require("path");
  const dialog = require("electron").remote.dialog;
  const Store = require("electron-store");
  const { shell } = require("electron");

  let watcher;
  const store = new Store();
  let modalActive = false;
  let pathsToCreate = [];
  let selectedPaths = [];

  const toggleModal = () => {
    modalActive = !modalActive;
  };

  const createConfigs = e => {
    if (selectedPaths.length > 0) {
      selectedPaths.forEach(path => {
        const files = jetpack
          .dir($sessionPath)
          .dir(path)
          .list()
          .filter(file => file != $cfgFileName)
          .filter(
            file =>
              jetpack
                .dir($sessionPath)
                .dir(path)
                .exists(file) == "file"
          )
          .filter(file => file.charAt(0) != ".");
        jetpack
          .dir($sessionPath)
          .dir(path)
          .write($cfgFileName, createConfig(path, path, files, ""));
      });
    }
    toggleModal();
  };

  const createWatcher = watchPath => {
    watcher = chokidar.watch(watchPath, {
      ignoreInitial: true,
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      depth: 2
    });
    watcher
      .on("change", changePath => {
        if ($noChange) {
          $noChange = false;
        } else {
          if (jetpack.inspect(changePath).name == $cfgFileName) {
            const changed = jetpack.read(changePath, "json");
            console.log("changed: " + changed.project);
            $configs = $configs.map(conf =>
              conf.id == changed.id ? changed : conf
            );
          }
        }
      })
      .on("add", changePath => {
        if (jetpack.inspect(changePath).name == $cfgFileName) {
          const added = jetpack.read(changePath, "json");
          console.log("Added:" + added.project);
          $configs = [...$configs, added];
        } else {
          const dirPath = path.dirname(changePath);
          const dirName = path.basename(dirPath);
          const files = jetpack
            .list(dirPath)
            .filter(file => file !== $cfgFileName);
          const tempConf = $configs.filter(conf => conf.path == dirName)[0];
          tempConf.files = files;
          $configs = $configs.map(conf =>
            conf.path == dirName ? tempConf : conf
          );
        }
      })
      .on("unlink", changePath => {
        console.log("unlink");
        if (path.basename(changePath) == $cfgFileName) {
          updateData($sessionPath);
        } else {
          const dirPath = path.dirname(changePath);
          const dirName = path.basename(dirPath);
          const files = jetpack
            .list(dirPath)
            .filter(file => file !== $cfgFileName);
          const tempConf = $configs.filter(conf => conf.path == dirName)[0];
          tempConf.files = files;
          $configs = $configs.map(conf =>
            conf.path == dirName ? tempConf : conf
          );
        }
      })
      .on("addDir", changePath => {
        if (!jetpack.dir(changePath).exists($cfgFileName)) {
          updateData($sessionPath);
        }
      })
      .on("unlinkDir", changePath => updateData($sessionPath))
      .on("error", error => console.error(error));
  };

  onDestroy(() => watcher.close());

  const updateData = folderPath => {
    $configs = [];

    //Get all Folders and Contents
    const folderCont = jetpack
      .inspectTree(folderPath)
      .children.filter(obj => obj.type == "dir")
      .map(obj => ({
        name: obj.name,
        files: obj.children.map(obj => obj.name)
      }));

    //Check for Config file
    folderCont.forEach(folder => {
      if (folder.files.some(file => file == $cfgFileName)) {
        const config = jetpack
          .dir(folderPath)
          .dir(folder.name)
          .read($cfgFileName, "json");
        config.files = jetpack
          .dir(folderPath)
          .dir(folder.name)
          .list()
          .filter(file => file != $cfgFileName)
          .filter(
            file =>
              jetpack
                .dir($sessionPath)
                .dir(folder.name)
                .exists(file) == "file"
          )
          .filter(file => file.charAt(0) != ".");
        config.path = folder.name;
        jetpack
          .dir(folderPath)
          .dir(folder.name)
          .write($cfgFileName, config);
        $configs = [...$configs, config];
      } else {
        modalActive = true;
        if (
          !pathsToCreate.some(path => {
            path == folder.name;
          })
        ) {
          pathsToCreate = [...pathsToCreate, folder.name];
        }
      }
    });

    if (!watcher) {
      createWatcher($sessionPath);
    }
  };

  const selectPath = () => {
    const folderPath = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
      title: "Select Path to Bestellungen",
      buttonLabel: "Select"
    });

    //check for .ordernizer file
    if (jetpack.dir(folderPath[0]).exists($mainFileName)) {
      $sessionPath = folderPath[0];
      store.set("defaultPath", $sessionPath);
      watcher.close().then(() => {
        watcher = false;
        updateData($sessionPath);
      });
    } else {
      alert(
        "Der ausgewählte Ordner enthält keine Datei mit dem Namen: '" +
          $mainFileName +
          "'. Prüfen Sie bitte, ob sie den richtigen Ordner ausgewählt haben"
      );
    }
  };

  if (store.get("defaultPath")) {
    if (jetpack.dir(store.get("defaultPath")).exists($mainFileName)) {
      $sessionPath = store.get("defaultPath");
      updateData($sessionPath);
    }
  }

  const openSessionFolder = () => {
    shell.showItemInFolder($sessionPath + "/.");
  };
</script>

<div class="filemanager">
  <span class="underline" on:click={openSessionFolder}>{$sessionPath}</span>
  <img
    src="../public/images/settings.svg"
    alt="Pfad auswählen Logo"
    title="Pfad auswählen"
    on:click={selectPath}
    class="invert" />
</div>

{#if modalActive}
  <ConfigModal
    on:toggle={toggleModal}
    on:create={createConfigs}
    paths={pathsToCreate}
    bind:selected={selectedPaths} />
{/if}

<style>
  .filemanager {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  img {
    cursor: pointer;
    width: 3vw;
  }

  img:hover {
    opacity: 0.5;
  }

  span {
    color: var(--primary-text-color);
    margin: 0 1vw;
  }

  .underline {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
