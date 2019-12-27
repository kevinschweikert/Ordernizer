<script>
    import { configs, sessionPath, cfgFileName } from './configs';
    import { noChange } from './active.js';
    import {onDestroy} from 'svelte';

    const chokidar = require('chokidar')
    const jetpack = require('fs-jetpack')
    const path = require('path')
    const dialog = require('electron').remote.dialog 
    const Store = require('electron-store')

 
    $cfgFileName = "project_config.json"

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
        watcher = chokidar.watch(watchPath, {ignoreInitial: true})
        watcher
        .on('change', changePath => {
            //check is file write was own
            if ($noChange) {
                $noChange = false
            }
            else {
                if (jetpack.inspect(changePath).name == $cfgFileName) { 
                const changed = jetpack.read(changePath, "json") 
                $configs = $configs.map(conf => conf.id == changed.id ? changed : conf) 
                }
            }
        })
        .on('add', changePath => {


            const dirPath = path.dirname(changePath)
            const dirName = path.basename(dirPath)
            const files = jetpack.list(dirPath).filter(file => file !== $cfgFileName)
            const tempConf = $configs.filter(conf => conf.path == dirName)[0]
            tempConf.files = files
            $configs = $configs.map(conf => conf.path == dirName ? tempConf : conf)

        })
        .on('unlink', changePath => {

            const dirPath = path.dirname(changePath)
            const dirName = path.basename(dirPath)
            const files = jetpack.list(dirPath).filter(file => file !== $cfgFileName)
            const tempConf = $configs.filter(conf => conf.path == dirName)[0]
            tempConf.files = files
            $configs = $configs.map(conf => conf.path == dirName ? tempConf : conf)

        })
        .on('addDir', changePath => updateData($sessionPath))
        .on('unlinkDir', changePath => updateData($sessionPath))
        .on('error', error => console.error(error));
    }

    const updateData = (folderPath) => {

        //Get all Folders and Contents
        const folderCont = jetpack.inspectTree(folderPath)
            .children
            .filter(obj => obj.type == "dir")
            .map(obj => ({name: obj.name, files: obj.children.map(obj => obj.name)})) 

        //Check for Config file
        folderCont.forEach((folder) => {
            if (folder.files.some((file) => file == $cfgFileName)) {
            }
            else {
                const answer = dialog.showMessageBoxSync({
                    type: "question",
                    buttons: ["NEIN", "JA"],
                    defaultId: 1,
                    title: "Neue Konfiguration erstellen?",
                    message:"Es wurde keine Konfiguration in dem Ordner " + folder.name + " gefunden. Wollen sie automatisch Eine erstellen lassen?",

                })

                if (answer == 1) {
                    jetpack.dir(folderPath).dir(folder.name).write($cfgFileName, createConfig(folder.name, folder.files), {atomic: true})
                }
            }

            //Load config
            const config = jetpack.dir(folderPath).dir(folder.name).read($cfgFileName, "json")
            config.files = jetpack.dir(folderPath).dir(folder.name).list().filter(file => file != $cfgFileName)
            jetpack.dir(folderPath).dir(folder.name).write($cfgFileName, config, {atomic: true})
            $configs = [...$configs, config]
        })
        

        if (!watcher) {
            createWatcher($sessionPath)
        }
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
Ausgewählter Ordner: {$sessionPath}

<style>
    /* your styles go here */
</style>
