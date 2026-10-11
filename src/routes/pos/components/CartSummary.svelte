<script lang="ts">
	let {
		subtotal = 0,
		totalDiscount = 0,
		tax = 0,
		grandTotal = 0
	}: {
		subtotal: number;
		totalDiscount: number;
		tax: number;
		grandTotal: number;
	} = $props();

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(amount);
	}
</script>

<div class="p-5 bg-[#F8FAFC] border-t border-slate-200 shrink-0">
	<div class="flex justify-between text-sm font-medium text-slate-500 mb-1">
		<span>Subtotal</span>
		<span class="text-slate-700 font-semibold">{formatCurrency(subtotal)}</span>
	</div>
	<div class="flex justify-between text-sm font-medium text-slate-500 mb-1">
		<span>Diskon</span>
		<span class="text-rose-600 font-semibold">-{formatCurrency(totalDiscount)}</span>
	</div>
	<div class="flex justify-between text-sm font-medium text-slate-500 mb-4">
		<span>Pajak (11%)</span>
		<span class="text-slate-700 font-semibold">{formatCurrency(tax)}</span>
	</div>
	<div class="flex justify-between items-end border-t border-slate-200 pt-3">
		<span class="text-base font-bold text-slate-800">Total</span>
		<span class="text-3xl font-black text-slate-900 tracking-tight">
			{formatCurrency(grandTotal)}
		</span>
	</div>
</div>
