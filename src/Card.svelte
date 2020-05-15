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
  export let lastCard = false;

  let activeItem = "";
  let modalActive = false;
  let item;
  let spacer = false;
  let upperHalf = false;
  let wrapper;

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });

  const toggleModal = () => {
    modalActive = !modalActive;
  };

  const dragStart = () => {
    $activeElement = $configs.filter(config => config.id == id)[0];
  };

  const setHover = e => {
    $hoverElement = { state: state, type: "card", id: id };
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
    <div class="dropper">{$activeElement.project}</div>
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
      <p class="desc">{desc ? desc : ''}</p>
    </div>
    <p>Dateien:</p>
    <Files {files} />
  </div>
  {#if $hoverElement.type == 'column' && $hoverElement.state == state && lastCard}
    <div class="dropper">{$activeElement.project}</div>
  {/if}
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
    font-size: calc(10px + 0.75vw);
    margin: 0;
    margin-bottom: 20px;
    word-wrap: break-word;
  }

  p {
    white-space: pre-wrap;
  }

  .desc {
    box-sizing: border-box;
    border-radius: 5px;
    background-color: var(--light-bg);
    padding: 10px;
    width: 100%;
    word-break: break-all;
    overflow: hidden;
  }

  .dropper {
    height: 100%;
    background-color: var(--primary-text-color);
    border-radius: var(--roundness-small);
    margin: 0.5vw 1vw;
    padding: 10px;
    opacity: 0.5;
    color: var(--button-bg);
  }
</style>
