<script>
  import { configs, sessionPath, cfgFileName } from "./configs";
  import { activeElement, hoverElement } from "./active";
  import Card from "./Card.svelte";
  import Empty from "./Empty.svelte"
  import { onMount, afterUpdate } from "svelte";
  import { flip } from "svelte/animate";

  const jetpack = require("fs-jetpack");

  export let name;
  export let state;
  let items = [];
  let newProjectName = "";
  let lastID


  if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
  };
  if (!Array.prototype.sortByArray){
    Array.prototype.sortByArray = function(keyArray){
        if (this.length == keyArray.length) {
          let array = []
          keyArray.forEach((item) => {
            array.push(this.filter(i => i.id == item)[0])
          })
          return array
        }
        console.error("both arrays must be same size")
        return this
    };
  };

  onMount(() => {

    if (getOrdering(state)) {
      sortArray(items, getOrdering(state))
    }
    else {
      let array = []
      items.forEach(item => {
        array.push(item.id)
      })
      localStorage.setItem(state, JSON.stringify(array))
    }

    items = sortArray(items, getOrdering(state))

  })


  const getOrdering = (columnState) => {
    return JSON.parse(localStorage.getItem(columnState))
  }

  const sortArray = (itemsArray, orderingArray) => {
    if (itemsArray.length != orderingArray.length) {
      console.log("Unequal size!")
      return itemsArray
    } else {
        let sortedArray = []
      orderingArray.forEach(orderID => {
        sortedArray.push(itemsArray.filter(item => item.id == orderID)[0])
      })
      return sortedArray
    }
    
  }

  const removeFromSortingArray = (item) => {
    let array = JSON.parse(localStorage.getItem(item.state))
    array = array.filter(id => id != item.id)
    localStorage.setItem(item.state, JSON.stringify(array))
  }

  const insertIntoSortingArray = (index, item) => {
    let array = JSON.parse(localStorage.getItem(state))
    if (index == 0) {
      array.unshift(item.id)
    } else {
      array.splice(index, 0, item.id)
    }
    localStorage.setItem(state, JSON.stringify(array))
  }



  const dropCard = () => {
    // remove item from old sorting array
    removeFromSortingArray($activeElement)
    // add item id to new sorting array
    if ($hoverElement.state) {
      if (state == $hoverElement.state) {
        if ($hoverElement.type == "card") {
          insertIntoSortingArray($hoverElement.sortOrder, $activeElement)
        }
        else {
          insertIntoSortingArray(getOrdering(state).length -1, $activeElement)
        }
      }
    }


    $activeElement.state = state;
    jetpack
      .dir($sessionPath)
      .dir($activeElement.path)
      .write($cfgFileName, $activeElement);

    //items = sortArray(items, getOrdering(state))

    $hoverElement= {state: null, type: null, sortOrder: null}
  };

  $: {
    items = $configs.filter(config => config.state == state).sortByArray(getOrdering(state))
    //sortArray(items, getOrdering(state))
  }




</script>

<div class="column">
  <div class="title">
    <span>{name.toUpperCase()}</span>
  </div>
  <div class="drag-container" on:drop={dropCard} on:dragover|preventDefault>
    {#each items as item, index (item.id)}
      <div animate:flip={{ duration: 200 }}>
        <Card {...item} sortOrder = {index} lastCard={item.id == items.last().id ? true : false}/>
      </div>
    {/each}
    <Empty {state}/>
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
    min-height: 100vh;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
  }
</style>
