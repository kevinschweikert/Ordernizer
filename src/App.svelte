<script>
import Item from './Item.svelte';
import {onMount} from 'svelte';

let columns = [
	{name: "Angebote anfragen", state: "angebot", items: []},
	{name: "BA erstellen", state: "beschaffungsantrag", items: []},
	{name: "An Verwaltung", state: "verwaltung", items: []},
]

let items = [
	{name:"Test 1", pNumber: "201911_02", desc: "Llorem ipsum", state: "angebot"},
	{name:"Test 3", pNumber: "201911_04", desc: "Llorem ipsum", state: "angebot"},
	{name:"Test 2", pNumber: "201911_04", desc: "Llorem ipsum", state: "beschaffungsantrag"},
]


columns.forEach((column) => {
	items.forEach((item) => {
		if (item.state == column.state) {
			column.items.push(item)
		}
	})
})



function drop(e) {
	e.preventDefault();

	//order neu stezen
	//  splice    ....     insert

	//oder sortieren
	// ids.sort( (a,b)=>{
	// 	if(a.order > b.order){
	// 		return -1;
	// 	}else if (a.order < b.order){
	// 		return 1;

	// 	}else {
	// 		return 0;
	// 	}
	// });


	let data = e.dataTransfer.getData("text")
	let item = document.querySelectorAll("[data-id='" + data + "']")
	try {
		e.target.appendChild(item[0])
	}
	catch(e) {
		console.warn(e)
	}
	document.get
}

function dragOver(e) {
	e.preventDefault();
}


</script>

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
	height: 100px;
}

.dropzone {
	border: 2px dashed;
	border-radius: 10px;
	min-height: 200px;
	padding-bottom: 50px;
}



</style>

<div class="app">
<div class="container">
	{#each columns as column}
	<div class="column">
		<div class="title">{column.name}</div>
		<div class="dropzone" on:dragover={dragOver} on:drop={drop}>
			{#each column.items as item}
				<Item title={item.name} projectNumber={item.pNumber} description={item.desc} />
			{/each}
		</div>
	</div>
	{/each}
</div>
</div>
