<script>
  import { createEventDispatcher } from "svelte";
  import Files from "./Files.svelte";
  import { configs, sessionPath, cfgFileName } from "./configs";
  const jetpack = require("fs-jetpack");

  export let project;
  export let desc;
  export let files;
  export let path;
  export let id;

  const dispatcher = createEventDispatcher();

  const toggle = () => {
    dispatcher("toggle");
  };

  const save = () => {
    const config = $configs.filter(config => config.id == id)[0];
    config.project = project;
    config.desc = desc;
    jetpack
      .dir($sessionPath)
      .dir(path)
      .write($cfgFileName, config, { atomic: true });
    toggle();
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
      <p>Dateien:</p>
      <Files {files} {project} projectPath={path} />
    </div>
    <div class="buttons">
      <button on:click={toggle}>Abbrechen</button>
      <button id="save" on:click={save}>Speichern</button>
    </div>

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
    width: 40%; /* Could be more or less, depending on screen size */
  }

  #desc {
    width: 100%;
    min-height: 100px;
  }

  input {
    width: 100%;
  }

  button {
    cursor: pointer;
  }

  .buttons {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }

  #save {
    background-color: green;
  }
</style>
