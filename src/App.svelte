<script>
  import { onMount } from "svelte";
  import Filemanager from "./Filemanager.svelte";
  import Column from "./Column.svelte";
  import AddProject from "./AddProject.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";
  import Navbar from "./Navbar.svelte";

  let columns = [
    { name: "Angebote anfragen", state: "angebot" },
    { name: "BA erstellt", state: "beschaffungsantrag" },
    { name: "An Verwaltung", state: "verwaltung" },
    { name: "Bestellt", state: "bestellt" },
    { name: "Geliefert", state: "geliefert" }
  ];
</script>

<Navbar />

<div class="container">
  {#each columns as column}
    <Column {...column} />
  {/each}
</div>

<style>
  /*   .app {
    display: flex;
    flex-direction: column;
    justify-items: left;
    align-items: left;
    font-family: "Montserrat", Arial, sans-serif;
        padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
  } */

  .container {
    display: grid;
    grid-auto-columns: minmax(100px, 1fr);
    grid-auto-flow: column;
    grid-gap: 10px;
    min-width: 770px;
  }
</style>
