

<script>



export let title = "";
export let projectNumber = "";
export let description = "";

/* let top = false
let bottom = false

function dragEnter() {

}

function dragOver(e) {

    const height = e.target.clientHeight
    const y = e.offsetY
    const ratio = height/y
    
	if (ratio <= 0.5) {
        top = true
        bottom = false
    }
    else if (ratio > 0.5) {
        top = false
        bottom = true
    }
    else {
        top = false
        bottom = false
    }
}

function dragLeave() {
    top = false
    bottom = false
}

function dragEnd() {
    top = false
    bottom = false
} */


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
    overflow: hidden;
    transition: all 0.5s;
    opacity: 100%;
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



<div class="item">
    <h3> {title} </h3>
    <span>NR: {projectNumber}</span>
    <div class="desription">
        {description}
    </div>
</div>
