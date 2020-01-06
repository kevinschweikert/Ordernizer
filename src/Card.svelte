<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement } from "./active";
  import Modal from "./Modal.svelte";
  import Files from "./Files.svelte";

  export let id;
  export let path;
  export let project;
  export let state;
  export let desc;
  export let files;

  let activeItem = "";
  let modalActive = false;
  let fd;

  const toggleModal = () => {
    modalActive = !modalActive;
  };

  const dragStart = () => {
    setTimeout(() => {
      $activeElement = [];
      let newConfig = $configs.filter(config => {
        if (config.id == id) {
          $activeElement = config;
          return false;
        } else {
          return true;
        }
      });
      $configs = newConfig;
    }, 1);
  };
</script>

<div
  class="item"
  draggable="true"
  on:click={toggleModal}
  on:dragstart={dragStart}
  on:dragover|preventDefault>
  <h3>{project}</h3>
  <div class="desription">
    Beschreibung:
    <p>{desc}</p>
  </div>
  <p>Files:</p>
  <Files {files} />
</div>

{#if modalActive}
  <Modal {project} {desc} {files} {path} {id} on:toggle={toggleModal} />
{/if}

<style>
  .item {
    margin: 20px 20px;
    padding: 40px;
    cursor: pointer;
    user-select: none;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 100%;
    min-height: 200px;
    overflow: auto;
    transition: all 0.5s;
  }

  h3 {
    margin: 0;
    word-wrap: break-word;
  }
</style>
