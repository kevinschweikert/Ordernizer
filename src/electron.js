const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let watcher;
let appIcon = null;

function createWindow() {
  console.log(__dirname);
  appIcon = nativeImage.createFromPath("public/256x256.png");
  mainWindow = new BrowserWindow({
    minWidth: 500,
    width: 1600,
    height: 1000,
    icon: appIcon,
    title: "Ordernizer",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${path.join(__dirname, "../public/index.html")}`);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV == "development") {
    mainWindow.openDevTools();
    watcher = require("chokidar").watch(
      path.join(__dirname, "../public/bundle.js"),
      { ignoreInitial: true }
    );
    watcher.on("change", () => {
      mainWindow.reload();
    });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
  if (watcher) {
    watcher.close();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
