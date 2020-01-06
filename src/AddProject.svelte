<script>
  import NewModal from "./NewModal.svelte";
  let modalActive = false;

  const toggleModal = () => {
    modalActive = !modalActive;
  };
</script>

<button on:click={toggleModal}>Neues Projekt anlegen</button>
{#if modalActive}
  <NewModal on:toggle={toggleModal} />
{/if}

<style>
  button {
    margin: 0 30px;
    min-width: 10%;
    min-height: 70px;
    border-radius: 10px;
    cursor: pointer;
  }
</style>
