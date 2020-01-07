import { writable } from "svelte/store";
const path = require("path");

export const configs = writable([]);

export const sessionPath = writable("");

export const cfgFileName = writable("project_config.json");

export const mainFileName = writable(".ordernizer");

export const createConfig = (
  projectPath,
  additionalFiles = [],
  description = ""
) => {
  return {
    id:
      Math.random()
        .toString(36)
        .substr(2, 5) + Date.now().toString(36),
    path: path.basename(projectPath),
    project: path.basename(projectPath),
    state: "angebot",
    desc: description,
    files: additionalFiles
  };
};
