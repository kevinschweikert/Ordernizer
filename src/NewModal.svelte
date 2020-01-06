<script>
  import { createEventDispatcher } from "svelte";
  import { configs, sessionPath, cfgFileName, createConfig } from "./configs";
  const jetpack = require("fs-jetpack");
  const sanitize = require("sanitize-filename");

  let project;
  let desc;

  let warning = false;

  const dispatcher = createEventDispatcher();

  const toggle = () => {
    dispatcher("toggle");
  };

  const save = () => {
    const folderName = sanitize(project);
    console.log(folderName);
    const folderNames = $configs.map(config => config.project);
    if (folderNames.some(name => name == folderName)) {
      warning = true;
    } else {
      warning = false;
      const path = [$sessionPath, folderName].join("/");
      const config = createConfig(path, [], desc);
      jetpack.dir(path).write($cfgFileName, config, { atomic: true });
      toggle();
    }
  };
</script>

<div id="myModal" class="modal" on:click|preventDefault={toggle}>

  <!-- Modal content -->
  <div class="modal-content" on:click|preventDefault|stopPropagation>
    <div>
      <p>Projektname</p>
      <input type="text" bind:value={project} />
    </div>

    <div>
      <p>Beschreibung:</p>
      <textarea name="description" id="desc" bind:value={desc} />
    </div>
    <div>
      <button on:click={toggle}>Abbrechen</button>
      <button on:click={save}>Speichern</button>
    </div>
    {#if warning}
      <p class="warning">
        Name existiert bereits. Wählen Sie einen anderen Namen
      </p>
    {/if}
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

  #desc {
    width: 100%;
    min-height: 100px;
  }

  input {
    width: 100%;
  }

  .warning {
    color: red;
  }
</style>
