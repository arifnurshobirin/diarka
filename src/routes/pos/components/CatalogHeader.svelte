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

<div class="p-4 bg-white border-b border-slate-200 flex flex-col gap-4 shrink-0 shadow-xs">
	<!-- Top Bar: Judul & Input Search -->
	<div class="flex items-center justify-between gap-4">
		<h1 class="text-xl font-black tracking-tight text-[#0080FF] flex items-center gap-2">
			<div class="bg-[#0080FF] text-white p-2 rounded-lg shadow-sm shadow-blue-500/20">
				<ShoppingCart class="w-5 h-5" />
			</div>
			Diarka Retail POS
		</h1>
		<div class="relative w-full max-w-md">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
			<Input
				type="text"
				bind:value={searchQuery}
				placeholder="Cari produk atau scan barcode..."
				class="pl-9 bg-slate-100/80 border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0080FF] focus-visible:ring-2 focus-visible:ring-[#0080FF]/20 rounded-lg transition-all"
			/>
		</div>
	</div>

	<!-- Categories Tab / Filter -->
	<div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
		{#each categories as cat}
			<Button
				size="sm"
				class={`rounded-full text-xs font-bold px-4 py-1.5 transition-all duration-200 ${
					selectedCategory === cat
						? 'bg-[#8B00FF] hover:bg-[#7800DE] active:bg-[#6700BE] text-white shadow-md shadow-purple-500/25 border-transparent'
						: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 border border-slate-200/80'
				}`}
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
