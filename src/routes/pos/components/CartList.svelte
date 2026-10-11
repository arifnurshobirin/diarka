<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Badge } from '$lib/components/ui/badge';
	import { ShoppingCart } from 'lucide-svelte';
	import type { Product } from './ProductGrid.svelte';

	export type CartItem = {
		id: string;
		product: Product;
		qty: number;
		discount: number;
		price: number;
	};

	let {
		cart = [],
		activeItemId = $bindable(null),
		onSelectItem
	}: {
		cart: CartItem[];
		activeItemId: string | null;
		onSelectItem?: (id: string) => void;
	} = $props();

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(amount);
	}
</script>

<div class="flex-1 overflow-hidden bg-white">
	{#if cart.length === 0}
		<div class="flex items-center justify-center h-full text-slate-400 flex-col gap-3 p-6">
			<ShoppingCart class="w-16 h-16 opacity-15" />
			<span class="text-sm font-medium">Belum ada pesanan</span>
		</div>
	{:else}
		<ScrollArea class="h-full">
			<ul class="divide-y divide-slate-100">
				{#each cart as item}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<li
						onclick={() => {
							activeItemId = item.id;
							onSelectItem?.(item.id);
						}}
						class={`p-4 cursor-pointer transition-all duration-200 select-none ${
							activeItemId === item.id
								? 'bg-[#0080FF]/10 border-l-4 border-l-[#0080FF]'
								: 'border-l-4 border-l-transparent hover:bg-slate-50'
						}`}
					>
						<div class="flex justify-between items-start mb-1.5">
							<span class="font-bold text-slate-800 text-sm leading-tight pr-2">
								{item.product.name}
							</span>
							<span class="font-black text-slate-900 text-sm">
								{formatCurrency((item.price * (1 - item.discount / 100)) * item.qty)}
							</span>
						</div>
						<div class="flex items-center text-xs text-slate-500 gap-2">
							<Badge class="font-bold border border-[#8B00FF]/30 text-[#8B00FF] bg-[#8B00FF]/10 px-2 py-0.5 rounded shadow-none hover:bg-[#8B00FF]/15">
								{item.qty} Unit
							</Badge>
							<span>@ {formatCurrency(item.price)}/unit</span>
							{#if item.discount > 0}
								<Badge variant="destructive" class="font-bold text-[10px] px-1.5 py-0.5 rounded shadow-none">
									Disc. {item.discount}%
								</Badge>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</ScrollArea>
	{/if}
</div>
