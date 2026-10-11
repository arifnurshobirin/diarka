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

<div class="p-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
	<!-- Mode Toggle (Qty / Disc / Price) & Hapus Item -->
	<div class="flex gap-2 mb-3">
		<Button
			class={`flex-1 font-bold h-10 transition-all duration-200 shadow-xs ${
				numpadMode === 'qty'
					? 'bg-[#0080FF] hover:bg-[#0070E0] active:bg-[#0060C0] text-white shadow-blue-500/25 border-transparent'
					: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-slate-200/80'
			}`}
			onclick={() => numpadMode = 'qty'}
		>
			Qty
		</Button>
		<Button
			class={`flex-1 font-bold h-10 transition-all duration-200 shadow-xs ${
				numpadMode === 'disc'
					? 'bg-[#0080FF] hover:bg-[#0070E0] active:bg-[#0060C0] text-white shadow-blue-500/25 border-transparent'
					: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-slate-200/80'
			}`}
			onclick={() => numpadMode = 'disc'}
		>
			Disc
		</Button>
		<Button
			class={`flex-1 font-bold h-10 transition-all duration-200 shadow-xs ${
				numpadMode === 'price'
					? 'bg-[#0080FF] hover:bg-[#0070E0] active:bg-[#0060C0] text-white shadow-blue-500/25 border-transparent'
					: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-slate-200/80'
			}`}
			onclick={() => numpadMode = 'price'}
		>
			Price
		</Button>

		<Button
			variant="destructive"
			size="icon"
			class="flex-none h-10 w-12 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-600 border border-rose-200/80 shadow-xs disabled:opacity-40 disabled:pointer-events-none"
			disabled={!activeItemId}
			onclick={onDeleteItem}
		>
			<Trash2 class="w-5 h-5" />
		</Button>
	</div>

	<!-- Grid Angka Utama & Backspace (Odoo Tactile Buttons) -->
	<div class="grid grid-cols-4 gap-2 mb-4">
		<div class="col-span-3 grid grid-cols-3 gap-2">
			{#each numpadKeys as key}
				<Button
					class="py-6 text-xl font-black bg-slate-100 hover:bg-slate-200 active:bg-slate-300 active:scale-95 text-slate-800 border border-slate-200/90 rounded-lg transition-all duration-100 shadow-xs"
					onclick={() => onInput(key)}
				>
					{key}
				</Button>
			{/each}
		</div>

		<!-- Kolom Backspace (Memanjang vertikal) -->
		<div class="col-span-1 flex flex-col">
			<Button
				class="flex-1 h-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 hover:text-rose-600 active:bg-slate-300 active:scale-95 text-slate-700 border border-slate-200/90 rounded-lg transition-all duration-100 shadow-xs"
				onclick={() => onInput('backspace')}
			>
				<Delete class="w-7 h-7" />
			</Button>
		</div>
	</div>

	<!-- Tombol Payment / Checkout CTA Hijau Kasir (#22C55E) -->
	<Button
		disabled={!hasItems}
		class="w-full py-6.5 bg-[#22C55E] hover:bg-[#1EA44F] active:bg-[#188842] active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all duration-200 border-none"
		onclick={onCheckout}
	>
		<Banknote class="w-6 h-6" />
		Payment
	</Button>
</div>
