<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement, noChange } from "./active";
  import Card from "./Card.svelte";

  const jetpack = require('fs-jetpack')

  export let name;
  export let state;

  let newProjectName = ""

  const dropCard = () => {
      $activeElement.state = state
      $noChange = true
      jetpack.dir($sessionPath).dir($activeElement.path).write($cfgFileName, $activeElement, {atomic: true})
      $configs = [...$configs, $activeElement]
      $activeElement = []
  }

  const createProject = () => {
      jetpack.dir($sessionPath).dir(newProjectName)
  }
  
</script>

<style>
  .column {
    margin: 10px;
    padding: 20px;
    min-width: 350px;
    min-height: 600px;
  }

  .title {
    font-size: 250%;
    font-weight: 900;
    text-align: center;
    border: 2px solid;
    border-radius: 10px;
    margin-bottom: 50px;
    padding: 20px;
    height: 100px;
  }

  .drag-container {
    border: 1px dashed grey;
    border-radius: 10px;
    min-height: 500px;
  }
</style>

<div class="column">
  <div class="title">{name}</div>
  <div class="drag-container" on:drop={dropCard} on:dragover|preventDefault>
    {#each $configs.filter((config) => config.state == state) as item}
      <!-- {#if item.state == state} -->
        <Card {...item} />
      <!-- {/if} -->
    {/each}
  </div>
  {#if state == "angebot"}
    <input type="text" bind:value={newProjectName}>
    <button on:click={createProject}>+ ADD NEW PROJECT</button>
  {/if}
</div>

