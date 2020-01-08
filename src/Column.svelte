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
  <div class="title">{name.toUpperCase()}</div>
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
    margin: 10px;
    padding: 20px;
    /*  min-width: 350px; */
    min-height: 600px;
  }

  .title {
    font-size: 200%;
    font-weight: 900;
    text-align: center;
    border: 2px solid var(--primary-text-color);
    color: var(--primary-text-color);
    border-radius: 10px;
    margin-bottom: 50px;
    padding: 20px;
    height: 100px;
  }

  .drag-container {
    border: 1px dashed var(--primary-text-color);
    border-radius: var(--roundness-big);
    min-height: 500px;
    padding-bottom: 100px;
  }
</style>
