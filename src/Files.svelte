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
        { format: item.split(".")[1] || "", name: item.split(".")[0] }
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
  <button on:click={showInFolder} title="Ordner öffnen">Ordner öffnen</button>
{/if}

<div class="files" title="Open File">
  {#if fileData.length > 0}
    {#each fileData as data}
      <div class="file">
        <div class="format">
          {#if data.format.localeCompare('jpg') == 0 || data.format.localeCompare('png') == 0}
            <img src="../public/assets/image.svg" alt="picture icon" />
          {:else if data.format.localeCompare('pdf') == 0}
            <img src="../public/assets/pdf.svg" alt="pdf icon" />
          {:else}
            <img src="../public/assets/file.svg" alt="file icon" />
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
    <p class="noData" />
  {/if}

</div>

<style>
  .noData {
    box-sizing: border-box;
    border-radius: 5px;
    background-color: var(--light-bg);
    padding: 10px;
    width: 100%;
  }

  .files {
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 5px;
  }

  .file {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1.5vw auto;
    grid-gap: 5px;
    border-radius: 5px;
    background-color: var(--light-bg);
    padding: 5px;
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
    height: 20px;
    padding: 5px;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: var(--light-bg);
    margin-bottom: 20px;
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
