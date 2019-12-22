<script>
    import { configs, sessionPath, cfgFileName } from './configs'
    import {onDestroy} from 'svelte';

    const chokidar = require('chokidar')
    const fs = require('fs')
    const path = require('path')
    const dialog = require('electron').remote.dialog 
    const Store = require('electron-store')

    const configFileName = "project_config.json"
    $cfgFileName = configFileName

    let watcher
    const store = new Store()

    const createConfig = (projectPath, additionalFiles) => {
        return {
            id: Date.now(),
            path: path.basename(projectPath),
            project: "P - " + path.basename(projectPath),
            state: "angebot",
            desc: "",
            files: additionalFiles
        }
    }

    const createWatcher = (watchPath) => {
        console.info("Initializing Watcher")
        watcher = chokidar.watch(watchPath, {ignoreInitial: true})
        watcher
        .on('change', changePath => {
            console.log(changePath)
            fs.readFile(changePath,{encoding: 'utf-8'}, (e, data) => {
                if (e) {console.error("Could not read file: " + changePath) }
                const config = JSON.parse(data)

                try {
                    let tempConfig = []
                    $configs.forEach((element) => {
                        if (element.id != config.id) {
                            tempConfig = [...tempConfig, element]
                        }
                        $configs = [...tempConfig, config]
                    })
                }
                catch(err) {
                    console.warn("Could not update file" + err)
                }
            })
        })
        .on('add', changePath => {
            fs.readdir(path.dirname(changePath), (e, files) => {
                let newFiles = []
                files.forEach((file) => {
                    if (file != $cfgFileName) {
                        newFiles = [...newFiles, file]
                    }
                })
                fs.readFile(path.dirname(changePath) + "/" + $cfgFileName, {encoding: 'utf-8'}, (e, data) => {
                    const config = JSON.parse(data)
                    let newConfig = []
                    $configs.forEach((element) => {
                        if (element.id == config.id) {
                            element.files = newFiles
                            newConfig = [...newConfig, element]
                        } 
                        else {
                            newConfig = [...newConfig, element]
                        }
                    })
                    $configs = newConfig
                })
            })
        })
        .on('unlink', changePath => {
            fs.readdir(path.dirname(changePath), (e, files) => {
                let newFiles = []
                files.forEach((file) => {
                    if (file != $cfgFileName) {
                        newFiles = [...newFiles, file]
                    }
                })
                fs.readFile(path.dirname(changePath) + "/" + $cfgFileName, {encoding: 'utf-8'}, (e, data) => {
                    const config = JSON.parse(data)
                    let newConfig = []
                    $configs.forEach((element) => {
                        if (element.id == config.id) {
                            element.files = newFiles
                            newConfig = [...newConfig, element]
                        } 
                        else {
                            newConfig = [...newConfig, element]
                        }
                    })
                    $configs = newConfig
                })
            })
        });
    }

    const updateData = (folderPath) => {

        fs.readdir(folderPath, {withFileTypes: true}, (e, files) => {
            if (e) {console.error("Could not read contents of: " + folderPath)}
            files.forEach((file) => {
                if (file.isDirectory()) {
                    const projectPath = folderPath + "/" + file.name
                    const configPath = projectPath + "/" + configFileName
                    const additionalFiles = []

                    //check for additional files
                    fs.readdir(projectPath, (e, files) => {
                        files.forEach((file) => {
                            if (file !== configFileName) {
                                additionalFiles.push(file)
                            }
                        })
                    })

                    //check for config
                    fs.access(configPath, (e) => {
                        if (e) {
                            // create Config File
                            fs.writeFile(configPath, JSON.stringify(createConfig(projectPath, additionalFiles)), 'utf-8', (e) => {
                                if (e) {console.error("Could not write config to: " + configPath)}
                                console.log("Created Config File at: " + projectPath)
                                $configs = [...$configs, createConfig(projectPath, additionalFiles)]
                            })
                        }
                        else {
                            // read Config File
                            fs.readFile(configPath, {encoding: 'utf-8'}, (e, data) => {
                                if (e) {console.error("Could not read config from: " + configPath)}
                                let config = JSON.parse(data)
                                config.files = additionalFiles

                                //update Config File
                                fs.writeFile(configPath, JSON.stringify(config), 'utf-8', (e) => {
                                    if (e) {console.error("Could not write config to: " + configPath)}
                                    console.log("Updatet Config at: " + projectPath)
                                    $configs = [...$configs, config]
                                })
                            })
 
                        }

                    })

                }
            })
            if (!watcher) {
            createWatcher($sessionPath)
            }
        })

        

    }

    const selectPath = () => {
        const folderPath = dialog.showOpenDialogSync({properties: ['openDirectory'], title: "Select Path to Bestellungen", buttonLabel: "Select"})

        $sessionPath = folderPath[0]

        store.set('defaultPath', $sessionPath)

        updateData($sessionPath)        

    }

    if (store.get('defaultPath')){
        $sessionPath = store.get('defaultPath')
        updateData($sessionPath)
    }

    

</script>

<button on:click={selectPath}>Select Path</button>
{$sessionPath}

<style>
    /* your styles go here */
</style>
