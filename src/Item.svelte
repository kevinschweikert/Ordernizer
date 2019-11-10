<script>

export let id = nil;

let list_items = ["1x Sony Alpha 6500", "2x Sachtler Stativ", "3x BNC Kabel"]

function dragStart(e) {
e.dataTransfer.setData("text", e.target.id)
setTimeout(() => {
    e.target.id = "collapsed"
}, 0)
}


function dragEnd(e) {
    e.target.id = ""
}

</script>

<style>

* {
    margin: 0;
    padding: 0;
}

.item {
    margin: 20px 20px;
    padding: 40px;
    cursor: pointer;
    user-select: none;
    box-shadow: 4px 4px 20px rgba(0,0,0,0.2);
    border-radius: 10px;
    font-size: 150%;
    height: 200px;
    overflow: hidden;
    transition: all 0.5s;
    opacity: 100%;
}

#collapsed {
    height: 0px;
    padding: 0;
    margin: 0;
    opacity: 0;
}

span {
    font-size: 80%;
}

ul {
    margin: 20px 0;
}

li {
    list-style-type: none;
    margin: 0;
    padding: 0;
    line-height: 200%;
}


</style>

<div 
    class="item" 
    draggable="true" 
    on:dragstart={dragStart} 
    on:drop|preventDefault|stopPropagation 
    on:dragend={dragEnd} 
    id={id}>
    <h3> CASE CUBE.X {id}</h3>
    <span>NR: 201911_02</span>
    <div class="desription">
       <ul>
        {#each list_items as li}
            <li>{li}</li>
        {/each}
       </ul> 
    </div>
</div>