<script>
  import { beforeUpdate } from "svelte";
  import { sessionPath, cfgFileName, configs } from "./configs.js";
  const { shell } = require("electron");
  const path = require("path");

  export let files = [];
  export let projectPath = "";
  export let project = false;

  let fileData = [];

  beforeUpdate(() => {
    fileData = [];
    files.forEach(item => {
      fileData = [
        ...fileData,
        { format: item.split(".")[1], name: item.split(".")[0] }
      ];
    });
  });

  const showInFolder = () => {
    shell.showItemInFolder(
      path.resolve($sessionPath, projectPath, $cfgFileName)
    );
  };

  const openItem = (name, format) => {
    if (project) {
      shell.openItem(
        path.resolve($sessionPath, projectPath, [name, format].join("."))
      );
    }
  };
</script>

{#if project}
  <button on:click={showInFolder} title="Open Folder">
    <img id="folder" src="../public/images/folder.svg" alt="folder icon" />
  </button>
{/if}

<div class="files" title="Open File">
  {#if fileData.length > 0}
    {#each fileData as data}
      <div class="file">
        <div class="format">
          {#if data.format.localeCompare('jpg') == 0 || data.format.localeCompare('png') == 0}
            <img src="../public/images/image.svg" alt="image icon" />
          {:else if data.format.localeCompare('pdf') == 0}
            <img src="../public/images/pdf.svg" alt="pdf icon" />
          {:else}
            <img src="../public/images/file.svg" alt="file icon" />
          {/if}
        </div>
        <div class="name">
          <span
            title={data.name}
            on:click={() => openItem(data.name, data.format)}>
            {data.name}
          </span>
        </div>
      </div>
    {/each}
  {:else}
    <p>Keine Dateien vorhanden</p>
  {/if}

</div>

<style>
  .files {
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 5px;
  }

  .file {
    display: grid;
    grid-template-columns: 1.5vw auto;
    grid-gap: 5px;
    border-radius: 5px;
    background-color: var(--light-bg);
    padding: 5px 2px;
    width: 100%;
  }

  .name {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
  }

  span {
    cursor: pointer;
    font-size: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
  }

  img {
    height: 1.5vw;
  }

  #folder {
    width: 20px;
    padding: 5px;
  }

  button {
    border-radius: 50px;
    cursor: pointer;
    background-color: var(--card-bg);
    border: 1px solid black;
    margin: 20px 0;
  }

  @media screen and (max-width: 1300px) {
    .format {
      display: none;
    }

    .file {
      grid-template-columns: auto;
    }
  }
</style>
