<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Something went wrong - Kalat</title>
</svelte:head>

<main
	class="div mx-auto my-6 flex w-full max-w-sm flex-col items-center rounded-lg bg-rose-500/20 p-3 shadow"
>
	<span class="grid">
		<h1 in:fly={{ duration: 300, y: 20 }} class="text-xl md:text-3xl">
			{$page.status}
		</h1>
		{#if $page.error}
			<p in:fly={{ duration: 300, delay: 200, y: 15 }} class="opacity-80">
				{$page.error.message}
			</p>
		{/if}
	</span>
	<a href="/" class="my-3">
		<Button class="text-xs">Go back home</Button>
	</a>
</main>
