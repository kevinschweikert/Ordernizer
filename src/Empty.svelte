<script>

export let state;

import { activeElement, hoverElement } from "./active";
    const setHover = e => {
    $hoverElement = { state: state, type: "empty", id: false };
  };


</script>

<div class="empty"
on:dragover={setHover}
>
{#if $hoverElement.type == "empty" && $hoverElement.state == state}
    <div class="dropper"> {$activeElement.project} </div>
{/if}

</div>

<style>
    .empty {
        height: 100%;
        flex-grow: 1;
    }

    .dropper {
    height: 100%;
    background-color: var(--primary-text-color);
    border-radius: var(--roundness-small);
    margin: 0.5vw 1vw;
    padding: 10px;
    opacity: 0.5;
    color: var(--button-bg)
  }
</style>