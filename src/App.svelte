<script>
import {onMount} from 'svelte';
import dragula  from 'dragula';
import atoa from 'atoa';
import { flip } from 'svelte/animate';

let columns = [
	{name: "Angebote anfragen", state: "angebot", items: []},
	{name: "BA erstellen", state: "beschaffungsantrag", items: []},
	{name: "An Verwaltung", state: "verwaltung", items: []},
]

let items = [
	{name:"Test 1", pNumber: "201911_02", desc: "Llorem ipsum", state: "angebot"},
	{name:"Test 3", pNumber: "201911_03", desc: "Llorem ipsum", state: "angebot"},
	{name:"Test 2", pNumber: "201911_04", desc: "Llorem ipsum", state: "beschaffungsantrag"},
	{name:"Test 4", pNumber: "201911_05", desc: "Llorem ipsum", state: "beschaffungsantrag"},
	{name:"Test 5", pNumber: "201911_06", desc: "Llorem ipsum", state: "beschaffungsantrag"},
	{name:"Test 6", pNumber: "201911_07", desc: "Llorem ipsum", state: "beschaffungsantrag"},
]

var drake = dragula({
  isContainer: function (el) {
    return el.classList.contains('dragula-container');
  },
  revertOnSpill: true
});

columns.forEach((column) => {
	items.forEach((item) => {
		if (item.state == column.state) {
			column.items.push(item)
		}
	})
})


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

.dragula-container {
	border: 1px dashed grey;
	border-radius: 10px;
	min-height: 500px;
}

.item {
    margin: 20px 20px;
    padding: 40px;
    cursor: pointer;
    user-select: none;
    box-shadow: 4px 4px 20px rgba(0,0,0,0.2);
    border-radius: 10px;
    font-size: 150%;
    overflow: hidden;
    transition: all 0.5s;
}

span {
    font-size: 80%;
}

</style>

<div class="app">
<div class="container">
	{#each columns as column}
	<div class="column">
		<div class="title">{column.name}</div>
		<div class="dragula-container">
			{#each column.items as item, i (item.pNumber)}
				<div class="item" animate:flip>
					<h3> {item.name} </h3>
					<span>NR: {item.pNumber}</span>
					<div class="desription">
					{item.desc}
				</div>
			</div>
			{/each}
		</div>
	</div>
	{/each}
</div>
</div>
