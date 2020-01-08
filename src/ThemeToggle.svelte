

   
<img src={logo} alt="Ordernizer Logo" on:click={toggleTheme}>
<h1 on:click={toggleTheme}>    ORDERNIZER {version}</h1>





<style>
    h1 {
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        user-select: none;
        text-align: center;
        cursor: pointer;
        color: var(--primary-text-color)
    }

    img {
        width: 100px;
        display: block;
        margin: 0 auto;
        cursor: pointer;
    }

</style>
<script>
const pjson = require("../package.json")

const version = pjson.version
console.log("You are running Version: " + version)

let darkMode = false
let logo = "../public/256x256.png"


if (localStorage.getItem("theme")) {
    localStorage.getItem("theme") == "dark" ? darkMode = true : darkMode = false
}

const setTheme = () => {
    if (darkMode) {
        document.documentElement.setAttribute("data-theme", "dark")
        localStorage.setItem("theme", "dark") 
    } else {
        document.documentElement.setAttribute("data-theme", "light")
        localStorage.setItem("theme", "light") 
    }
}

const setLogo = () => {
    switch(darkMode) {
        case true:
            logo = "../public/256x256_invert.png"
            break;
        case false:
            logo = "../public/256x256.png"
            break
        default:
            logo = "../public/256x256.png"
            break
    }
}


const toggleTheme = () => {

    darkMode = !darkMode;
    setTheme()
    setLogo()
    
}

setTheme()
setLogo()
    
</script>