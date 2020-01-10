<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement, noChange } from "./active";
  import Card from "./Card.svelte";
  import Sortable from "sortablejs/modular/sortable.core.esm.js";
  import { onMount } from "svelte";

  const jetpack = require("fs-jetpack");

  export let name;
  export let state;

  let newProjectName = "";
  let column;

  onMount(() => {
    let sortable = Sortable.create(column, {
      group: "orders",
      dataIdAttr: "data-state",
      animation: 100,
      direction: "vertical",
      easing: "cubic-bezier(1, 0, 0, 1)",
      store: {
        get: function(sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split("|") : [];
        },
        set: function(sortable) {
          var order = sortable.toArray();
          localStorage.setItem(sortable.options.group.name, order.join("|"));
        }
      },
      onAdd: e => {
        const item = $configs.filter(
          config => config.id == e.item.dataset.id
        )[0];
        console.log("Moved: " + item.project);
        item.state = e.to.dataset.state;
        $noChange = true;
        jetpack
          .dir($sessionPath)
          .dir(item.path)
          .write($cfgFileName, item);
        const index = $configs.findIndex(config => config.id == item.id);
        $configs[index].state = e.to.dataset.state;
      },
      setData: function(
        /** DataTransfer */ dataTransfer,
        /** HTMLElement*/ dragEl
      ) {
        //dataTransfer.setData('Text', dragEl.dataset.id); // `dataTransfer` object of HTML5 DragEvent
      },
      // Element is chosen
      onChoose: function(/**Event*/ evt) {},
      // Element is unchosen
      onUnchoose: function(/**Event*/ evt) {
        // same properties as onEnd
      },
      // Element dragging started
      onStart: function(/**Event*/ evt) {},
      // Element dragging ended
      onEnd: function(/**Event*/ evt) {},
      // Changed sorting within list
      onUpdate: function(/**Event*/ evt) {
        // same properties as onEnd
      },
      // Called by any change to the list (add / update / remove)
      onSort: function(/**Event*/ evt) {
        // same properties as onEnd
      },
      // Element is removed from the list into another list
      onRemove: function(/**Event*/ evt) {
        // same properties as onEnd
      },
      // Attempt to drag a filtered element
      onFilter: function(/**Event*/ evt) {},
      // Event when you move an item in the list or between lists
      onMove: function(/**Event*/ evt, /**Event*/ originalEvent) {},
      // Called when creating a clone of element
      onClone: function(/**Event*/ evt) {},
      // Called when dragging element changes position
      onChange: function(/**Event*/ evt) {}
    });
  });
</script>

<div class="column">
  <div class="title">
    <span>{name.toUpperCase()}</span>
  </div>
  <div class="drag-container" data-state={state} bind:this={column}>
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
