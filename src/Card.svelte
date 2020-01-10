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
</script>

<div class="item" data-id={id} on:click={toggleModal}>
  <h3>{project}</h3>
  <div class="desription">
    Beschreibung:
    <p>{desc}</p>
  </div>
  <p>Dateien:</p>
  <Files {files} />
</div>

{#if modalActive}
  <Modal {project} {desc} {files} {path} {id} {state} on:toggle={toggleModal} />
{/if}

<style>
  .item {
    color: var(--primary-text-color);
    background-color: var(--card-bg);
    margin: 1vw;
    padding: 1vw;
    cursor: pointer;
    user-select: none;
    box-shadow: var(--shadow);
    border-radius: var(--roundness-big);
    font-size: 100%;
    min-height: 200px;
    overflow: auto;
  }

  h3 {
    margin: 0;
    margin-bottom: 20px;
    word-wrap: break-word;
  }

  p {
    white-space: pre-wrap;
  }
</style>
