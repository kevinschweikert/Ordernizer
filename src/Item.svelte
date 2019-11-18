<script>

export let title = "";
export let projectNumber = "";
export let description = "";

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
    on:drop|preventDefault|stopPropagation>
    <h3> {title} </h3>
    <span>NR: {projectNumber}</span>
    <div class="desription">
        {description}
    </div>
</div>