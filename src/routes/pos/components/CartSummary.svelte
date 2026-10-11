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

<div class="p-5 bg-muted/40 border-t border-border shrink-0">
	<div class="flex justify-between text-sm font-medium text-muted-foreground mb-1">
		<span>Subtotal</span>
		<span>{formatCurrency(subtotal)}</span>
	</div>
	<div class="flex justify-between text-sm font-medium text-muted-foreground mb-1">
		<span>Diskon</span>
		<span class="text-destructive">-{formatCurrency(totalDiscount)}</span>
	</div>
	<div class="flex justify-between text-sm font-medium text-muted-foreground mb-4">
		<span>Pajak (11%)</span>
		<span>{formatCurrency(tax)}</span>
	</div>
	<div class="flex justify-between items-end border-t border-border pt-3">
		<span class="text-base font-bold text-foreground">Total</span>
		<span class="text-3xl font-black text-foreground tracking-tight">
			{formatCurrency(grandTotal)}
		</span>
	</div>
</div>
