<script>

let ids = [0,1,2,3,4,5]

function dragStart(e) {
	e.dataTransfer.setData("text", e.target.id)
}

function dragEnd(e) {
	console.log(e.dataTransfer.getData("text"))
}

</script>

<style>

.app {
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	background-color: black;
	font-family: 'Roboto', 'Montserrat', Arial, sans-serif;
	padding: 0;
	margin: 0;
	height: 100vh;
	width: 100vw;
}

h1 {
	color: white;
}

.container {
	display: flex;
	flex-direction: row;
}

.column {
	background-color: #333333;
	margin: 10px;
	padding: 20px;
	color: white;
	min-width: 350px;
	min-height: 600px;
}

.dropzone {
	border: 2px dashed;
	min-height: 200px;
}

.item {
	background-color: #888888;
	margin: 20px;
	padding: 20px;
	cursor: pointer;
	user-select: none;
}

</style>

<div class="app">
<h1>DnD Test</h1>
<div class="container">

	<div class="column">
		<h2>Container 1</h2>
		<div class="dropzone">
			{#each ids as id}
			<div class="item" draggable="true" on:dragstart={dragStart} on:dragend={dragEnd} id={id}>Item {id}</div>
			{/each}
		</div>
	</div>
	<div class="column">
		<h2>Container 2</h2>
		<div class="dropzone"></div>
	</div>
</div>
</div>
