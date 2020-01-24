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
  export let state;

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
      .write($cfgFileName, config);
    toggle();
  };

  const archive = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const archiveFolderPath = jetpack
      .dir($sessionPath)
      .dir("..")
      .dir("Archive")
      .dir(year)
      .dir([year, month, path].join("_"));
    jetpack.dir($sessionPath).move(path, archiveFolderPath.cwd());
    toggle();
  };
</script>

<div
  id="myModal"
  class="modal"
  on:mousedown|preventDefault|stopPropagation={toggle}>

  <!-- Modal content -->
  <div
    class="modal-content"
    on:click|preventDefault|stopPropagation
    on:mousedown|stopPropagation>
    <div>
      <p>Projektname</p>
      <input type="text" bind:value={project} />
    </div>

    <div>
      <p>Beschreibung:</p>
      <textarea
        name="description"
        id="desc"
        bind:value={desc}
        placeholder="Gebe eine Beschreibung ein" />
    </div>

    <div>
      <p>Dateien:</p>
      <Files {files} {project} projectPath={path} />
    </div>
    <div class="buttons">
      {#if state == 'geliefert'}
        <button on:click={archive} id="archive">Archivieren</button>
        <!-- content here -->
      {/if}
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
    background-color: var(--card-bg);
    color: var(--primary-text-color);
    border-radius: var(--roundness-big);
    border: none;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    margin: 5vw auto; /* 15% from the top and centered */
    padding: 20px;
    width: 40%; /* Could be more or less, depending on screen size */
  }

  #desc {
    width: 100%;
    min-height: 100px;
  }

  #archive {
    background-color: darkred;
    color: var(--light);
  }

  input {
    width: 100%;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: var(--light-bg);
  }

  .buttons {
    margin-top: 50px;
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    grid-gap: 30px;
  }

  #save {
    background-color: green;
    color: var(--light);
  }
</style>
