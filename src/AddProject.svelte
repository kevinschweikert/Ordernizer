<script>
  import NewModal from "./NewModal.svelte";
  let modalActive = false;

  const toggleModal = () => {
    modalActive = !modalActive;
  };
</script>

<img
  src="../public/images/plus-square.svg"
  on:click={toggleModal}
  class="invert"
  title="Neues Projekt anlegen"
  alt="Projekt anlegen Button" />

{#if modalActive}
  <NewModal on:toggle={toggleModal} />
{/if}

<style>
  img {
    width: 3vw;
    margin: auto auto;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.5;
  }
</style>
