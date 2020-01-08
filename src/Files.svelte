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

  {#each fileData as data}
    {#if data.format.toLowerCase() == 'jpg' || data.format.toLowerCase() == 'png'}
      <img src="../public/images/image.svg" alt="image icon" />
    {:else if data.format.toLowerCase() == 'pdf'}
      <img src="../public/images/pdf.svg" alt="pdf icon" />
    {:else}
      <img src="../public/images/file.svg" alt="file icon" />
    {/if}

    <span class="name" on:click={() => openItem(data.name, data.format)}>
      {data.name}
    </span>
  {/each}

</div>

<style>
  .files {
    display: grid;
    grid-template-columns: 30px auto;
    grid-gap: 10px;
  }

  .name {
    cursor: pointer;
    font-size: 80%;
    border-radius: 5px;
    padding: 10px;
    background-color: var(--light-bg);
    overflow: hidden;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  img {
    width: 25px;
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
</style>
