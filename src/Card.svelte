<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement, hoverElement } from "./active";
  import Modal from "./Modal.svelte";
  import Files from "./Files.svelte";
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";

  export let id;
  export let path;
  export let project;
  export let state;
  export let desc;
  export let files;
  export let sortOrder;

  let activeItem = "";
  let modalActive = false;
  let item;
  let spacer = false;
  let upperHalf = false;
  let wrapper;

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200)
  });

  const toggleModal = () => {
    modalActive = !modalActive;
  };

  const dragStart = () => {
    $activeElement = $configs.filter(config => config.id == id)[0];
  };

  const setHover = e => {
    $hoverElement = { state: state, sortOrder: sortOrder };
  };

  const dragEnter = () => {
    if ($activeElement.id != id) {
      spacer = true;
    }
  };

  const dragLeave = e => {
    if (!wrapper.contains(e.relatedTarget) && $activeElement.id != id) {
      spacer = false;
    }
  };
</script>

<div
  in:receive={{ key: id }}
  out:send={{ key: id }}
  bind:this={wrapper}
  class="wrapper"
  on:dragleave={dragLeave}
  on:dragenter={dragEnter}
  on:dragend={() => (spacer = false)}
  on:drop={() => (spacer = false)}>
  {#if spacer}
    <div class="dropper" />
  {/if}
  <div
    bind:this={item}
    class="item"
    draggable="true"
    on:click={toggleModal}
    on:dragstart={dragStart}
    on:drop={() => (spacer = false)}
    on:dragover|preventDefault={setHover}>

    <h3>{project}</h3>
    <div class="desription">
      Beschreibung:
      <p>{desc}</p>
    </div>
    <p>Dateien:</p>
    <Files {files} />
  </div>
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

  .dropper {
    height: 20px;
    background-color: var(--primary-text-color);
    border-radius: var(--roundness-small);
    margin: 0.5vw 1vw;
    opacity: 0.5;
  }
</style>
