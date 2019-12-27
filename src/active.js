import { writable } from 'svelte/store'

export const activeElement = writable()
export const noChange = writable(false)