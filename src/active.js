import { writable } from "svelte/store";

export const activeElement = writable(null);
export const hoverElement = writable({ state: null, sortOrder: null, type: null })
