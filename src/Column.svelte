<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement, noChange } from "./active";
  import { onMount } from "svelte"
  import Card from "./Card.svelte";
  import Sortable from "sortablejs"

  const jetpack = require("fs-jetpack");

  export let name;
  export let state;

  let column;

  let newProjectName = "";

  onMount(() => {
    let sortable = Sortable.create(column, {group: "cards"})
  })

  

</script>


<div class="column">
  <div class="title">{name.toUpperCase()}</div>
  <div class="drag-container" bind:this={column}>
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
    padding-bottom: 100px;
  }
</style>
