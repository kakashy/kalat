import { writable } from 'svelte/store';

export const debouncedColor = writable<string | null>(null);
