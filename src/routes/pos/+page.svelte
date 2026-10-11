<script lang="ts">
	import CatalogHeader from './components/CatalogHeader.svelte';
	import ProductGrid, { type Product } from './components/ProductGrid.svelte';
	import CartList, { type CartItem } from './components/CartList.svelte';
	import CartSummary from './components/CartSummary.svelte';
	import Keypad, { type NumpadMode } from './components/Keypad.svelte';

	// Mock Data Produk Internal (Odoo-Style Catalog)
	const products: Product[] = [
		{ id: '1', name: 'Kopi Susu Gula Aren', price: 25000, category: 'Minuman', image: '' },
		{ id: '2', name: 'Cappuccino Panas', price: 30000, category: 'Minuman', image: '' },
		{ id: '3', name: 'Americano Dingin', price: 22000, category: 'Minuman', image: '' },
		{ id: '4', name: 'Roti Bakar Coklat', price: 18000, category: 'Makanan', image: '' },
		{ id: '5', name: 'Croissant Butter', price: 28000, category: 'Makanan', image: '' },
		{ id: '6', name: 'Kentang Goreng', price: 20000, category: 'Snak', image: '' },
		{ id: '7', name: 'Singkong Keju', price: 15000, category: 'Snak', image: '' },
		{ id: '8', name: 'Teh Tarik', price: 18000, category: 'Minuman', image: '' }
	];

	const categories = ['Semua', 'Minuman', 'Makanan', 'Snak'];

	// State Management (Svelte 5 Runes)
	let searchQuery = $state('');
	let selectedCategory = $state('Semua');
	let cart = $state<CartItem[]>([]);
	let activeItemId = $state<string | null>(null);
	let numpadMode = $state<NumpadMode>('qty');

	// Derived Calculations
	let filteredProducts = $derived(
		products.filter((p) => {
			const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
			const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
			return matchCategory && matchSearch;
		})
	);

	let subtotal = $derived(
		cart.reduce((sum, item) => sum + item.price * item.qty, 0)
	);

	let totalDiscount = $derived(
		cart.reduce((sum, item) => sum + item.price * (item.discount / 100) * item.qty, 0)
	);

	let tax = $derived((subtotal - totalDiscount) * 0.11);
	let grandTotal = $derived(subtotal - totalDiscount + tax);

	// Actions
	function addToCart(product: Product) {
		const existing = cart.find((item) => item.product.id === product.id);
		if (existing) {
			existing.qty += 1;
			activeItemId = existing.id;
		} else {
			const newItem: CartItem = {
				id: crypto.randomUUID(),
				product,
				qty: 1,
				discount: 0,
				price: product.price
			};
			cart.push(newItem);
			activeItemId = newItem.id;
		}
		numpadMode = 'qty';
	}

	function handleNumpadInput(val: string) {
		if (!activeItemId) return;
		const itemIndex = cart.findIndex((i) => i.id === activeItemId);
		if (itemIndex === -1) return;

		let item = cart[itemIndex];

		// Backspace logic
		if (val === 'backspace') {
			if (numpadMode === 'qty') {
				const strQty = String(item.qty).slice(0, -1);
				item.qty = strQty ? parseInt(strQty, 10) : 0;
			} else if (numpadMode === 'disc') {
				const strDisc = String(item.discount).slice(0, -1);
				item.discount = strDisc ? parseInt(strDisc, 10) : 0;
			} else if (numpadMode === 'price') {
				const strPrice = String(item.price).slice(0, -1);
				item.price = strPrice ? parseInt(strPrice, 10) : 0;
			}
			return;
		}

		if (val === '+/-' || val === '.') return;

		const num = val;
		if (numpadMode === 'qty') {
			const newQty = parseInt(`${item.qty === 0 ? '' : item.qty}${num}`, 10);
			item.qty = newQty;
		} else if (numpadMode === 'disc') {
			const newDisc = parseInt(`${item.discount === 0 ? '' : item.discount}${num}`, 10);
			if (newDisc <= 100) item.discount = newDisc;
		} else if (numpadMode === 'price') {
			const newPrice = parseInt(`${item.price === 0 ? '' : item.price}${num}`, 10);
			item.price = newPrice;
		}
	}

	function handleDeleteActiveItem() {
		if (activeItemId) {
			cart = cart.filter((i) => i.id !== activeItemId);
			activeItemId = null;
		}
	}
</script>

<div class="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] font-sans text-slate-800">
	<!-- ================= PANEL KIRI: KATALOG (70%) ================= -->
	<div class="flex-1 flex flex-col h-full bg-[#F8FAFC] relative border-r border-slate-200 shadow-sm z-10">
		<CatalogHeader
			bind:searchQuery
			bind:selectedCategory
			{categories}
		/>
		<ProductGrid
			products={filteredProducts}
			onSelectProduct={addToCart}
		/>
	</div>

	<!-- ================= PANEL KANAN: KASIR (30%) ================= -->
	<div class="w-[30%] min-w-[360px] max-w-[420px] bg-white flex flex-col h-full z-20 shadow-xl border-l border-slate-200">
		<!-- Daftar Belanja (Keranjang) -->
		<CartList
			{cart}
			bind:activeItemId
		/>

		<!-- Ringkasan Total Tagihan -->
		<CartSummary
			{subtotal}
			{totalDiscount}
			{tax}
			{grandTotal}
		/>

		<!-- Numeric Keypad Kasir & Mode Aksi -->
		<Keypad
			bind:numpadMode
			{activeItemId}
			hasItems={cart.length > 0}
			onInput={handleNumpadInput}
			onDeleteItem={handleDeleteActiveItem}
		/>
	</div>
</div>
