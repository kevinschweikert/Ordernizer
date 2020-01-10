<script>
  import ThemeToggle from "./ThemeToggle.svelte";
  import AddProject from "./AddProject.svelte";
  import Filemanager from "./Filemanager.svelte";
</script>

<div class="navbar">
  <ThemeToggle />
  <div class="spacer" />
  <Filemanager />
  <AddProject />

</div>

<style>
  .navbar {
    height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: var(--roundness-big);
    background-color: var(--light-bg);
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr auto 1fr 6vw;
  }
</style>
