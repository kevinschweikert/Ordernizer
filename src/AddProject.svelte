<script>
  import NewModal from "./NewModal.svelte";
  let modalActive = false;

  const toggleModal = () => {
    modalActive = !modalActive;
  };
</script>

<style>
  button {
    margin: 0 30px;
    min-width: 10%;
    min-height: 70px;
    border-radius: 10px;
    cursor: pointer;
  }
</style>

<button on:click={toggleModal}>+ ADD NEW PROJECT</button>
{#if modalActive}
  <NewModal on:toggle={toggleModal} />
{/if}

