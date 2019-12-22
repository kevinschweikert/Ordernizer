<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement } from "./active";
  import Card from "./Card.svelte";

  const fs = require('fs')

  export let name;
  export let state;

  const dropCard = () => {
      $activeElement.state = state
      const writePath = $sessionPath + "/" + $activeElement.path + "/" + $cfgFileName
      fs.writeFile(writePath, JSON.stringify($activeElement), 'utf-8',(e) => {
        if (e) {console.error("Could not write config to: " + writePath + e)}
        })
      $configs = [...$configs, $activeElement]
      $activeElement = []
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
    {#each $configs as item}
      {#if item.state == state}
        <Card {...item} />
      {/if}
    {/each}
  </div>
</div>
