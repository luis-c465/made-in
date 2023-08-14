import { writable } from "svelte/store";

export const productsElms = writable<HTMLDivElement[]>([]);
export const renderedProducts = writable<HTMLDivElement[]>([]);
