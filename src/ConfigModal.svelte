<script>
  import { createEventDispatcher } from "svelte";
  import { configs, sessionPath, cfgFileName, createConfig } from "./configs";

  export let paths = [];
  export let selected = [];
  $: buttonText = selected.length == 0 ? "Abbrechen" : "Anlegen";
  $: paths = [...new Set(paths)];

  const dispatcher = createEventDispatcher();

  const toggle = () => {
    dispatcher("toggle");
  };

  const createConfigs = selected => {
    dispatcher("create");
  };
</script>

<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <p>
      In den folgenden Ordnern konnten keine Konfigurationsdateien gefunden
      werden. Welche möchten Sie automatisch anlegen?
    </p>

    {#each paths as path}
      <label>
        <input type="checkbox" bind:group={selected} value={path} />
        {path}
      </label>
    {/each}
    <p>
      <button on:click={createConfigs}>{buttonText}</button>
    </p>

  </div>

</div>

<style>
  .modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0, 0, 0, 0.2); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    border-radius: 10px;
    border: none;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    width: 300px; /* Could be more or less, depending on screen size */
  }
</style>
