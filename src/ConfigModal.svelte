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
      <br />
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
    background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color:var(--card-bg);
    color: var(--primary-text-color);
    border-radius: var(--roundness-big);
    border: none;
    box-shadow: var(--shadow);
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    width: 50%; /* Could be more or less, depending on screen size */
  }

  input {
    transform: scale(2);
    margin: 10px;
  }
</style>
