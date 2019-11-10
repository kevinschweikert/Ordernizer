

<script>
import Item from './Item.svelte'


let ids = [0,1,2]

function drop(e) {
	e.preventDefault();
	let data = e.dataTransfer.getData("text")
	let item = document.getElementById("collapsed")
	e.target.appendChild(item)
	item.style.display = "block"
}

function dragOver(e) {
	e.preventDefault();
}

</script>

<style>

.app {
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
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
}

.column {

	margin: 10px;
	padding: 20px;
	min-width: 350px;
	min-height: 600px;
}

.title {
	font-size: 250%;
	font-weight: 900;
	text-align: center;
	border: 2px solid;
	border-radius: 10px;
	margin-bottom: 50px;
	padding: 20px;
}

.dropzone {
	border: 2px dashed;
	min-height: 200px;
}



</style>

<div class="app">
<div class="container">

	<div class="column">
		<div class="title">ANGEBOT ANFRAGEN</div>
		<div class="dropzone" on:dragover={dragOver} on:drop={drop}>
			{#each ids as id}
				<Item id={id}></Item>
			{/each}
		</div>
	</div>

</div>
</div>
