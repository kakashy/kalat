<script lang="ts">
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fly } from 'svelte/transition';
	import { fetchKalas, saveColor } from '$lib/utils/db';
	import { onMount } from 'svelte';
	import type { AllIDBKalas } from '$lib/types';
	import { getTextColor, sortColorsByHue } from '$lib/utils/colors';
	import { debounce } from '$lib';
	import { debouncedColor } from '$lib/stores';
	let kala: string;
	$: debouncedUpdate(kala);
	let kalas: AllIDBKalas;

	const debouncedUpdate = debounce((color: string) => {
		debouncedColor.set(color);
	}, 300);

	onMount(async () => {
		const { docs } = await fetchKalas();
		if (docs.length > 0) {
			kalas = sortColorsByHue(docs);
		}
	});
	async function handleSaveColor() {
		toast.promise(saveColor(kala), {
			loading: 'Saving this color locally',
			success: (d) => {
				fetchKalas().then(({ docs }) => {
					kalas = sortColorsByHue(docs);
				});
				return d.message;
			},
			error: (e) => {
				// @ts-expect-error custom error code
				if (e.includes(409)) {
					return 'This color has already been saved';
				} else {
					return 'Something went wrong';
				}
			}
		});
	}
</script>

<main class="flex flex-col items-center p-5">
	<h1 class="text-3xl font-semibold uppercase sm:text-5xl">Kalat</h1>
	<aside class="flex w-full max-w-xl flex-col">
		<label class="my-6 grid">
			Please pick a color:
			<input
				bind:value={kala}
				type="color"
				class="my-2 h-12 w-2/3 rounded-xl border-2 border-muted/10 shadow outline-none"
			/>
		</label>
		{#if $debouncedColor}
			<div
				in:fly={{ y: -20, duration: 600 }}
				class="{getTextColor(
					$debouncedColor
				)} my-5 flex h-[25vh] w-full flex-col items-center justify-center rounded shadow-xl transition-colors duration-200"
				style="background-color: {$debouncedColor};"
			>
				<span class="text-lg sm:text-2xl">{kala}</span>
			</div>
			<span in:fly={{ y: -20, duration: 400, delay: 300 }} class="ml-auto">
				<Button on:click={handleSaveColor}>Save this color</Button>
			</span>
		{/if}
	</aside>

	{#if kalas}
		{#key kalas.length}
			<h2 class="mt-2 text-xl font-semibold">Here are your favorites:</h2>
			<aside
				class="my-2 grid grid-flow-row grid-cols-3 gap-3 p-5 md:grid-cols-5 md:gap-6 lg:grid-cols-6"
			>
				{#each kalas as k}
					<Button
						on:click={() => (kala = k.id)}
						class="rounded-lg border p-5 shadow"
						style="background-color: {k.id};"
					>
						<span>
							<p class={getTextColor(k.id)}>{k.doc?._id}</p>
						</span>
					</Button>
				{/each}
			</aside>
		{/key}
	{/if}
</main>
