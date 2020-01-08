# Ordernizer
![Ordernizer Logo](./public/256x256.png)

This is an app that helps to keep track of our orders at university

## Download

Go to the 
[Release Page](https://github.com/kevinschweikert/Ordernizer/releases/)
and there you can download the latest build.

## Usage

### Start

- Click the Button "Pfad auswählen"
- Select the Folder with Orders
- there has to be a file named ".ordernizer" otherwise you get an error message. This is to prevent, selecting the wrong folder
- if there are folders which were manually created, the app will aks you if you want to create a config in this folder. This is necessary, because all the informations are stored there
- The path is stored on your machine and will be used at the next start of the application. If you want to change the path, just select another Path with "Pfad auswählen"

### Add Project

Click the "Neues Projekt anlegen" Button. A window will open and you have to type in a valid project name. It can't be empty and must only contain following letters: "A-Z", "a-z", "0-9" and "_". The description fiel is optional but advised.

### Change Status

You can change the status of a card by dragging and dropping. The status is automatically written to the config file

### Edit Card

To edit a card, click on it. A window will appear where you can change the project name and its description. You have to save you changes with the "Speichern" button. When you click "Abbrechen or click outside the window, your changes will be discarded. If you click on the folder icon, your file browser will open the folder of the project. If you click at a file, your system will open this file with the corresponding application.

### Change Theme

Click on the Logo or Heading to toggle light and dark theme. The settig will be remebered.

## TODO

- [x] Make create config Dialog a modal
- [x] make Add Project Button
- [x] Functionality to edit card properties
- [x] Add Upload and Download functionality (open native file dialog)
- [x] Add icon for app
- [x] Translate Interface to german
- [x] check for ".ordernizer" file in main folder to prevent wrong paths
- [x] HTML validate input when entering new project name
- [ ] Remove double card when new Project is added
- [ ] Make Cards sortable, animate and remember vertical position
- [ ] Make sure folder ist updated when path is changed
- [ ] Change resolution of main window and app
- [ ] Option to archive project
- [ ] Create animations for cards
- [x] Dark Mode
- [ ] OPTIONAL: add username field
