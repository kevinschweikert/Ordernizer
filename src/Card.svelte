<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement } from "./active";
  const fs = require('fs')

  export let id;
  export let path;
  export let project;
  export let state;
  export let desc;
  export let files;

  let activeItem = "";

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

  const getIndexInConfig = () => {
    let index = 0;
    $configs.some((e, i) => {
      index = i;
      return e.id == id;
    });
    return index;
  };
  
  const indexInConfig = getIndexInConfig();


</script>

<style>
  .item {
    margin: 20px 20px;
    padding: 40px;
    cursor: pointer;
    user-select: none;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 150%;
    min-height: 200px;
    overflow: hidden;
    transition: all 0.5s;
  }

  span {
    font-size: 80%;
  }

  input {
      margin: 5px;
      width: 100%;
      border: none;
  }

  input:focus {
      border: 3px solid #555;
  }
</style>

<div
  class="item"
  draggable="true"
  on:dragstart={dragStart}
  on:dragover|preventDefault>
  <input type="text"  bind:value={project}>
  <span>NR: {id}</span>
  <div class="desription" contenteditable="true">
    Beschreibung:
    <input type="text" bind:value={desc}>
  </div>
  <p>Files:</p>
  <ul>
    {#each files as file}
      <li>{file}</li>
    {/each}
  </ul>
</div>
