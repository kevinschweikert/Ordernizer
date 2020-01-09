<script>
  const pjson = require("../package.json");

  const version = pjson.version;
  console.log("You are running Version: " + version);

  let darkMode = false;
  let logo = "../public/256x256.png";

  if (localStorage.getItem("theme")) {
    localStorage.getItem("theme") == "dark"
      ? (darkMode = true)
      : (darkMode = false);
  }

  const setTheme = () => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const setLogo = () => {
    switch (darkMode) {
      case true:
        logo = "../public/256x256_invert.png";
        break;
      case false:
        logo = "../public/256x256.png";
        break;
      default:
        logo = "../public/256x256.png";
        break;
    }
  };

  const toggleTheme = () => {
    darkMode = !darkMode;
    setTheme();
    setLogo();
  };

  setTheme();
  setLogo();
</script>

<div class="title">
  <img src={logo} alt="Ordernizer Logo" on:click={toggleTheme} />
  <h1 on:click={toggleTheme}>ORDERNIZER</h1>
  <span class="version">v{version}</span>
</div>

<style>
  .title {
    display: flex;
    align-items: center;
  }

  h1 {
    margin: 0 20px;
    user-select: none;
    text-align: center;
    cursor: pointer;
    color: var(--primary-text-color);
  }

  img {
    object-fit: contain;
    max-height: 80%;
    display: block;
    cursor: pointer;
  }

  .version {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    color: var(--light);
    border-radius: var(--roundness-small);
    position: fixed;
    top: calc(100vh - 30px);
    left: calc(100vw - 55px);
  }
</style>
