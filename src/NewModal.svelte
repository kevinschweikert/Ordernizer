<script>
  import { createEventDispatcher } from "svelte";
  import { configs, sessionPath, cfgFileName, createConfig } from "./configs";
  const jetpack = require("fs-jetpack");
  const path = require("path");

  let project = "";
  let desc = "";

  let nameWarning = false;
  let emptyWarning = false;
  let forbiddenCharacter = false;
  const regex = "[^a-zäöüA-Z0-9_ ]"

  const dispatcher = createEventDispatcher();

  const toggle = e => {
    dispatcher("toggle");
  };

  $: $configs.map(config => config.project).some(name => name == project)
    ? (nameWarning = true)
    : (nameWarning = false);
  $: project == ""
    ? (emptyWarning = true)
    : (emptyWarning = false);
  $: project.match(regex)
    ? (forbiddenCharacter = true)
    : (forbiddenCharacter = false);

  const save = () => {
    if (!nameWarning && !emptyWarning && !forbiddenCharacter) {
      const config = createConfig(
        project,
        path.join($sessionPath, project.replace(/\s/g, "_")),
        [],
        desc
      );
      jetpack
        .dir($sessionPath)
        .dir(project.replace(/\s/g, "_"))
        .write($cfgFileName, config);
      toggle();
    }
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
    <p>
      <label for="projektname">Projektname</label>
      <input
        type="text"
        bind:value={project}
        id="projektname"
        placeholder="Gebe einen Projektnamen ein"
        required
        pattern="[a-zäöüA-Z0-9_\s]+" />
      <span class="warning" />
    </p>
    {#if nameWarning}
      <p class="warning">
        Name existiert bereits. Wählen Sie einen anderen Namen
      </p>
    {/if}
    {#if emptyWarning}
      <p class="warning">Der Projektname darf nicht leer bleiben</p>
    {/if}
    <p>
      <label for="desc">Beschreibung:</label>
      <textarea
        name="description"
        id="desc"
        bind:value={desc}
        placeholder="Gebe eine kurze Beschreibung ein" />
    </p>
    <div>
      <button on:click={toggle}>Abbrechen</button>
      <button on:click={save} id="save" disabled={(nameWarning || emptyWarning || forbiddenCharacter)}>Speichern</button>
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
    background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: var(--card-bg);
    color: var(--primary-text-color);
    border-radius: var(--roundness-big);
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
  input:invalid:not(:placeholder-shown) + span.warning:after {
    content: "Deine Eingabe enthält ungültige Zeichen. Erlaubte Zeichen sind 'a-z', 'A-Z', 'aöü', '0-9' und '_'";
  }

  input:valid {
    border: 2px solid green;
  }

  .warning {
    color: red;
  }

  label {
    margin: 20px 0;
  }

  #save {
    background-color: green;
    color: var(--light);
  }

  button {
    background-color: var(--light-bg);
    border: none;
  }

  #save:disabled{
    background-color: var(--light-bg);
    color: #ff000055;
  }
</style>
