<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement, noChange } from "./active";
  import Card from "./Card.svelte";

  const jetpack = require("fs-jetpack");

  export let name;
  export let state;

  let newProjectName = "";

  const dropCard = () => {
    $activeElement.state = state;
    $noChange = true;
    jetpack
      .dir($sessionPath)
      .dir($activeElement.path)
      .write($cfgFileName, $activeElement, { atomic: true });
    $configs = [...$configs, $activeElement];
    $activeElement = [];
  };
</script>

<div class="column">
  <div class="title">
    <span>{name.toUpperCase()}</span>
  </div>
  <div class="drag-container" on:drop={dropCard} on:dragover|preventDefault>
    {#each $configs.filter(config => config.state == state) as item}
      <!-- {#if item.state == state} -->
      <Card {...item} />
      <!-- {/if} -->
    {/each}
  </div>
</div>

<style>
  .column {
    grid-row: 1;
    /*  min-width: 350px; */
    min-height: 600px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: 900;
    text-align: center;
    border: 2px solid var(--primary-text-color);
    color: var(--primary-text-color);
    border-radius: 10px;
    margin-bottom: 1vw;
    padding: auto;
    min-height: 5vw;
  }

  .drag-container {
    border: 1px dashed var(--primary-text-color);
    border-radius: var(--roundness-big);
    min-height: 500px;
    padding-bottom: 100px;
  }
</style>
