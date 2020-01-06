<script>
  import { configs, sessionPath, cfgFileName, createConfig } from "./configs";
  import { noChange } from "./active.js";
  import { onDestroy } from "svelte";
  import ConfigModal from "./ConfigModal.svelte";

  const chokidar = require("chokidar");
  const jetpack = require("fs-jetpack");
  const path = require("path");
  const dialog = require("electron").remote.dialog;
  const Store = require("electron-store");

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
          .filter(file => file != $cfgFileName);
        jetpack
          .dir($sessionPath)
          .dir(path)
          .write($cfgFileName, createConfig(path, files), { atomic: true });
      });
    }
    toggleModal();
  };

  const createWatcher = watchPath => {
    watcher = chokidar.watch(watchPath, { ignoreInitial: true });
    watcher
      .on("change", changePath => {
        //check is file write was own
        if ($noChange) {
          $noChange = false;
        } else {
          if (jetpack.inspect(changePath).name == $cfgFileName) {
            const changed = jetpack.read(changePath, "json");
            $configs = $configs.map(conf =>
              conf.id == changed.id ? changed : conf
            );
          }
        }
      })
      .on("add", changePath => {
        if (jetpack.inspect(changePath).name == $cfgFileName) {
          const added = jetpack.read(changePath, "json");
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
      .on("addDir", changePath => updateData($sessionPath))
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
          .filter(file => file != $cfgFileName);
        config.path = folder.name;
        jetpack
          .dir(folderPath)
          .dir(folder.name)
          .write($cfgFileName, config, { atomic: true });
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

    $sessionPath = folderPath[0];

    store.set("defaultPath", $sessionPath);

    updateData($sessionPath);
  };

  if (store.get("defaultPath")) {
    $sessionPath = store.get("defaultPath");
    updateData($sessionPath);
  }
</script>

<div>
  <button on:click={selectPath}>Select Path</button>
  Ausgewählter Ordner: {$sessionPath}
  {#if modalActive}
    <ConfigModal
      on:toggle={toggleModal}
      on:create={createConfigs}
      paths={pathsToCreate}
      bind:selected={selectedPaths} />
  {/if}

</div>

<style>
  button {
    margin: 30px;
    cursor: pointer;
  }
</style>
