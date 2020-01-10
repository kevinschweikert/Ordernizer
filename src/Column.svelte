<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement, hoverElement } from "./active";
  import Card from "./Card.svelte";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  const jetpack = require("fs-jetpack");

  export let name;
  export let state;
  let items = [];
  let newProjectName = "";

  const dropCard = () => {
    $activeElement.sortOrder = 999;

    if ($hoverElement.state) {
      if (state == $hoverElement.state) {
        $activeElement.sortOrder = $hoverElement.sortOrder - 0.5;
      }
    }

    $activeElement.state = state;
    jetpack
      .dir($sessionPath)
      .dir($activeElement.path)
      .write($cfgFileName, $activeElement);
  };

  $: items = $configs
    .filter(config => config.state == state)
    .sort((order1, order2) => order1.sortOrder - order2.sortOrder)
    .map((item, index) => {
      item.sortOrder = index;
      return item;
    });
</script>

<div class="column">
  <div class="title">
    <span>{name.toUpperCase()}</span>
  </div>
  <div class="drag-container" on:drop={dropCard} on:dragover|preventDefault>
    {#each items as item, index (item.id)}
      <div animate:flip={{ duration: 200 }}>
        <Card {...item} />
      </div>
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
