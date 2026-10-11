<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Search } from 'lucide-svelte';

	export type Product = {
		id: string;
		name: string;
		price: number;
		category: string;
		image: string;
	};

	let {
		products = [],
		onSelectProduct
	}: {
		products: Product[];
		onSelectProduct: (product: Product) => void;
	} = $props();

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(amount);
	}

	function initials(name: string) {
		return name
			.split(' ')
			.map((w) => w[0])
			.join('')
			.substring(0, 2)
			.toUpperCase();
	}
</script>

<div class="flex-1 overflow-y-auto p-4 bg-[#F8FAFC]">
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
		{#each products as product}
			<!-- Ubin Produk Card Shadcn Odoo-Style -->
			<Card.Root
				tag="button"
				onclick={() => onSelectProduct(product)}
				class="group relative flex flex-col cursor-pointer bg-white border border-slate-100 hover:border-[#0080FF]/50 hover:shadow-md active:scale-95 transition-all duration-200 text-left overflow-hidden h-44 p-0 shadow-xs rounded-xl"
			>
				<!-- Thumbnail / Avatar Bulat Produk -->
				<div class="flex-1 w-full bg-slate-50/80 flex items-center justify-center border-b border-slate-100 group-hover:bg-blue-50/40 transition-colors p-3">
					<Avatar.Root class="w-16 h-16 rounded-full shadow-inner border-2 border-white bg-slate-100 ring-2 ring-slate-100 group-hover:ring-[#0080FF]/30 transition-all">
						{#if product.image}
							<Avatar.Image src={product.image} alt={product.name} class="object-cover" />
						{/if}
						<Avatar.Fallback class="bg-blue-50 text-[#0080FF] font-black text-lg group-hover:bg-[#0080FF] group-hover:text-white transition-colors">
							{initials(product.name)}
						</Avatar.Fallback>
					</Avatar.Root>
				</div>

				<!-- Judul Produk -->
				<Card.Content class="p-3 bg-white flex flex-col justify-between shrink-0">
					<span class="text-xs font-semibold text-slate-800 leading-tight line-clamp-2 group-hover:text-[#0080FF] transition-colors">
						{product.name}
					</span>
				</Card.Content>

				<!-- Badge Harga Mencolok -->
				<div class="absolute top-2 right-2">
					<Badge class="bg-white/95 backdrop-blur-md shadow-sm border border-slate-200 text-[#0080FF] font-black text-[11px] px-2 py-0.5 hover:bg-white">
						{formatCurrency(product.price)}
					</Badge>
				</div>
			</Card.Root>
		{/each}
	</div>

	<!-- Empty State -->
	{#if products.length === 0}
		<div class="flex flex-col items-center justify-center h-full text-slate-400 min-h-[300px]">
			<Search class="w-12 h-12 mb-2 opacity-25" />
			<p class="font-medium text-sm">Tidak ada produk yang sesuai kriteria.</p>
		</div>
	{/if}
</div>
