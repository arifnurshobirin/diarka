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

<div class="flex-1 overflow-y-auto p-4 bg-muted/20">
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
		{#each products as product}
			<!-- Ubin Produk Card Shadcn -->
			<Card.Root
				tag="button"
				onclick={() => onSelectProduct(product)}
				class="group relative flex flex-col cursor-pointer hover:shadow-lg hover:border-primary/50 active:scale-95 transition-all duration-200 text-left overflow-hidden h-44 p-0 bg-card border-border"
			>
				<!-- Gambar Produk / Avatar Odoo-Style -->
				<div class="flex-1 w-full bg-muted/40 flex items-center justify-center border-b border-border/50 group-hover:bg-muted/70 transition-colors p-3">
					<Avatar.Root class="w-16 h-16 rounded-full shadow-inner border border-border bg-background">
						{#if product.image}
							<Avatar.Image src={product.image} alt={product.name} class="object-cover" />
						{/if}
						<Avatar.Fallback class="bg-primary/10 text-primary font-black text-lg">
							{initials(product.name)}
						</Avatar.Fallback>
					</Avatar.Root>
				</div>

				<!-- Judul Produk -->
				<Card.Content class="p-3 bg-card flex flex-col justify-between shrink-0">
					<span class="text-xs font-semibold text-foreground leading-tight line-clamp-2">
						{product.name}
					</span>
				</Card.Content>

				<!-- Badge Harga Mencolok -->
				<div class="absolute top-2 right-2">
					<Badge variant="secondary" class="bg-background/95 backdrop-blur-md shadow-sm border border-border text-primary font-black text-[11px] px-2 py-0.5">
						{formatCurrency(product.price)}
					</Badge>
				</div>
			</Card.Root>
		{/each}
	</div>

	<!-- Empty State -->
	{#if products.length === 0}
		<div class="flex flex-col items-center justify-center h-full text-muted-foreground min-h-[300px]">
			<Search class="w-12 h-12 mb-2 opacity-20" />
			<p class="font-medium text-sm">Tidak ada produk yang sesuai kriteria.</p>
		</div>
	{/if}
</div>
