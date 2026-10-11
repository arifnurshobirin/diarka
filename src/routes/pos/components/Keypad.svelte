<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Trash2, Delete, Banknote } from 'lucide-svelte';

	export type NumpadMode = 'qty' | 'disc' | 'price';

	let {
		numpadMode = $bindable('qty'),
		activeItemId = null,
		hasItems = false,
		onInput,
		onDeleteItem,
		onCheckout
	}: {
		numpadMode: NumpadMode;
		activeItemId: string | null;
		hasItems: boolean;
		onInput: (val: string) => void;
		onDeleteItem: () => void;
		onCheckout?: () => void;
	} = $props();

	const numpadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-', '0', '.'];
</script>

<div class="p-4 bg-background border-t border-border shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
	<!-- Mode Toggle (Qty / Disc / Price) & Hapus Item -->
	<div class="flex gap-2 mb-3">
		<Button
			variant={numpadMode === 'qty' ? 'default' : 'secondary'}
			class="flex-1 font-bold h-10 transition-all duration-200"
			onclick={() => numpadMode = 'qty'}
		>
			Qty
		</Button>
		<Button
			variant={numpadMode === 'disc' ? 'default' : 'secondary'}
			class="flex-1 font-bold h-10 transition-all duration-200"
			onclick={() => numpadMode = 'disc'}
		>
			Disc
		</Button>
		<Button
			variant={numpadMode === 'price' ? 'default' : 'secondary'}
			class="flex-1 font-bold h-10 transition-all duration-200"
			onclick={() => numpadMode = 'price'}
		>
			Price
		</Button>

		<Button
			variant="destructive"
			size="icon"
			class="flex-none h-10 w-12"
			disabled={!activeItemId}
			onclick={onDeleteItem}
		>
			<Trash2 class="w-5 h-5" />
		</Button>
	</div>

	<!-- Grid Angka Utama & Backspace -->
	<div class="grid grid-cols-4 gap-2 mb-4">
		<div class="col-span-3 grid grid-cols-3 gap-2">
			{#each numpadKeys as key}
				<Button
					variant="outline"
					class="py-6 text-xl font-bold bg-muted/30 hover:bg-muted/70 active:scale-95 transition-all duration-100"
					onclick={() => onInput(key)}
				>
					{key}
				</Button>
			{/each}
		</div>

		<!-- Kolom Backspace (Memanjang vertikal) -->
		<div class="col-span-1 flex flex-col">
			<Button
				variant="outline"
				class="flex-1 h-full flex items-center justify-center bg-muted/30 hover:bg-destructive/10 hover:text-destructive active:scale-95 transition-all duration-100"
				onclick={() => onInput('backspace')}
			>
				<Delete class="w-7 h-7" />
			</Button>
		</div>
	</div>

	<!-- Tombol Payment / Checkout CTA -->
	<Button
		disabled={!hasItems}
		class="w-full py-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-muted disabled:text-muted-foreground text-white rounded-xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all duration-200"
		onclick={onCheckout}
	>
		<Banknote class="w-6 h-6" />
		Payment
	</Button>
</div>
