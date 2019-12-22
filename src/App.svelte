<script>
import {onMount} from 'svelte';
import Files from './Files.svelte';
import Column from './Column.svelte'


let columns = [
	{name: "Angebote anfragen", state: "angebot"},
	{name: "BA erstellen", state: "beschaffungsantrag"},
	{name: "An Verwaltung", state: "verwaltung"},
	{name: "Fertig", state: "fertig"},
]

</script>


<Files/>


<div class="app">
<div class="container">
	{#each columns as column}
		<Column {...column}/>
	{/each}
</div>
</div>


<style>

.app {
	display: flex;
	flex-direction: column;
	justify-items: left;
	align-items: left;
	font-family: 'Montserrat', Arial, sans-serif;
	padding: 0;
	margin: 0;
	height: 100vh;
	width: 100vw;
}


.container {
	display: flex;
	flex-direction: row;
	margin-top: 50px;
	width: 300px;
}

</style>
