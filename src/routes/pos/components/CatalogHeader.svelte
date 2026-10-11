<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ShoppingCart, Search } from 'lucide-svelte';

	let {
		searchQuery = $bindable(''),
		categories = [],
		selectedCategory = $bindable('Semua')
	}: {
		searchQuery: string;
		categories: string[];
		selectedCategory: string;
	} = $props();
</script>

<div class="p-4 bg-white border-b border-border flex flex-col gap-4 shrink-0">
	<!-- Top Bar: Judul & Input Search -->
	<div class="flex items-center justify-between gap-4">
		<h1 class="text-xl font-black tracking-tight text-primary flex items-center gap-2">
			<div class="bg-primary text-primary-foreground p-1.5 rounded-md shadow-sm">
				<ShoppingCart class="w-5 h-5" />
			</div>
			Antigravity POS
		</h1>
		<div class="relative w-full max-w-md">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
			<Input
				type="text"
				bind:value={searchQuery}
				placeholder="Cari produk..."
				class="pl-9 bg-muted/50 focus-visible:bg-background"
			/>
		</div>
	</div>

	<!-- Categories Tab / Filter -->
	<div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
		{#each categories as cat}
			<Button
				variant={selectedCategory === cat ? 'default' : 'secondary'}
				size="sm"
				class="rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
				onclick={() => selectedCategory = cat}
			>
				{cat}
			</Button>
		{/each}
	</div>
</div>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
