<script>

    import { beforeUpdate } from 'svelte';
    import {sessionPath, cfgFileName} from './configs.js';
    const {shell} = require('electron');
    const path = require('path')

    export let files = []
    export let project = false

    let fileData = []

    

    beforeUpdate(() => {
        fileData = []
		files.forEach(item => {
            fileData = [...fileData, {format: item.split(".")[1], name: item.split(".")[0]}]
        })
    });

    const showInFolder = () => {
        console.log("Opening Folder: " + path.resolve($sessionPath, project, $cfgFileName))
        shell.showItemInFolder(path.resolve($sessionPath, project, $cfgFileName))
    }

    const openItem = (name, format) => {
        if (project) {
            shell.openItem(path.resolve($sessionPath, project, [name, format].join(".")))
        }
    }


</script>

<div>
    {#if project}
        <button on:click={showInFolder}>FOLDER</button>
    {/if}
    
    {#each fileData as data}
    <div class="file" on:click={() => openItem(data.name, data.format)}>
        
        <span class="format"> {data.format.toUpperCase()}</span> 
        <span class="name"> {data.name}</span>
    </div>
    {/each}
    
</div>

<style>
    .file {
        margin: 5px;
        padding: 5px;
        cursor: pointer;
    }

    .format {
        padding: 5px;
        background-color: grey;
        font-size: 80%;
        color: white;
        border-radius: 5px;
    }
</style>