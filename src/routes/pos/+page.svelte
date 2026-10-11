<script lang="ts">
	import { Search, ShoppingCart, Trash2, Delete, Banknote } from 'lucide-svelte';

	// Mock Data Produk Internal (Odoo-Style Catalog)
	type Product = { id: string; name: string; price: number; category: string; image: string };
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
	
	type CartItem = { id: string; product: Product; qty: number; discount: number; price: number };
	let cart = $state<CartItem[]>([]);
	let activeItemId = $state<string | null>(null);
	
	// Numpad Mode (Odoo Style)
	type NumpadMode = 'qty' | 'disc' | 'price';
	let numpadMode = $state<NumpadMode>('qty');

	// Derived Calculations
	let filteredProducts = $derived(
		products.filter(p => {
			const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
			const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
			return matchCategory && matchSearch;
		})
	);

	let subtotal = $derived(
		cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
	);

	let totalDiscount = $derived(
		cart.reduce((sum, item) => sum + ((item.price * (item.discount / 100)) * item.qty), 0)
	);

	let tax = $derived((subtotal - totalDiscount) * 0.11);
	let grandTotal = $derived(subtotal - totalDiscount + tax);

	// Actions
	function addToCart(product: Product) {
		const existing = cart.find(item => item.product.id === product.id);
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
		// Default numpad mode ke Qty setelah menambah barang
		numpadMode = 'qty';
	}

	function handleNumpadInput(val: string) {
		if (!activeItemId) return;
		const itemIndex = cart.findIndex(i => i.id === activeItemId);
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
		
		// Ignore +/- and . for this simplified POS
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

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
	}
	
	function initials(name: string) {
		return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
	}
</script>

<div class="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] font-sans text-[#1E293B]">
	
	<!-- ================= PANEL KIRI: KATALOG (70%) ================= -->
	<div class="flex-1 flex flex-col h-full bg-[#F8FAFC] relative border-r border-slate-200 shadow-sm z-10">
		
		<!-- Header Kiri: Search & Kategori -->
		<div class="p-4 bg-white border-b border-slate-200 flex flex-col gap-4 shrink-0">
			<!-- Top Bar: Judul & Search -->
			<div class="flex items-center justify-between gap-4">
				<h1 class="text-xl font-black tracking-tight text-[#0080FF] flex items-center gap-2">
					<div class="bg-[#0080FF] text-white p-1.5 rounded-md shadow-sm"><ShoppingCart class="w-5 h-5" /></div>
					Antigravity POS
				</h1>
				<div class="relative w-full max-w-md">
					<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
					<input 
						type="text" 
						bind:value={searchQuery}
						placeholder="Cari produk..." 
						class="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-[#0080FF] focus:ring-2 focus:ring-[#0080FF]/20 rounded-lg text-sm transition-all outline-none"
					/>
				</div>
			</div>
			
			<!-- Categories Tab -->
			<div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
				{#each categories as cat}
					<button 
						onclick={() => selectedCategory = cat}
						class={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === cat ? 'bg-[#0080FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
					>
						{cat}
					</button>
				{/each}
			</div>
		</div>

		<!-- Area Grid Produk -->
		<div class="flex-1 overflow-y-auto p-4 bg-slate-100/50">
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{#each filteredProducts as product}
					<!-- Ubin Produk Odoo Style -->
					<button 
						onclick={() => addToCart(product)}
						class="group relative flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#0080FF]/40 active:scale-95 transition-all duration-200 text-left overflow-hidden h-40"
					>
						<!-- Gambar / Placeholder -->
						<div class="flex-1 w-full bg-slate-50 flex items-center justify-center border-b border-slate-100 group-hover:bg-slate-100 transition-colors">
							{#if product.image}
								<img src={product.image} alt={product.name} class="w-full h-full object-cover" />
							{:else}
								<span class="text-3xl font-black text-slate-200 group-hover:text-[#0080FF]/20 transition-colors">{initials(product.name)}</span>
							{/if}
						</div>
						<!-- Teks Bawah -->
						<div class="p-3 bg-white flex flex-col justify-between shrink-0">
							<span class="text-sm font-semibold text-slate-700 leading-tight line-clamp-2">{product.name}</span>
						</div>
						<!-- Price Badge Mencolok -->
						<div class="absolute top-2 right-2 bg-white/95 backdrop-blur-md border border-slate-200 px-2 py-0.5 rounded-md shadow-sm">
							<span class="text-xs font-black text-[#0080FF] tracking-tight">{formatCurrency(product.price)}</span>
						</div>
					</button>
				{/each}
			</div>
			
			<!-- Empty State -->
			{#if filteredProducts.length === 0}
				<div class="flex flex-col items-center justify-center h-full text-slate-400">
					<Search class="w-12 h-12 mb-2 opacity-20" />
					<p class="font-medium">Tidak ada produk yang sesuai kriteria.</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- ================= PANEL KANAN: KASIR (30%) ================= -->
	<!-- Lebar dijaga agar proporsional sebagai sidebar kasir -->
	<div class="w-[30%] min-w-[360px] max-w-[420px] bg-white flex flex-col h-full z-20 shadow-xl border-l border-slate-200">
		
		<!-- Daftar Belanja (Keranjang) -->
		<div class="flex-1 overflow-y-auto bg-white">
			{#if cart.length === 0}
				<div class="flex items-center justify-center h-full text-slate-400 flex-col gap-3">
					<ShoppingCart class="w-16 h-16 opacity-10" />
					<span class="text-sm font-medium">Belum ada pesanan</span>
				</div>
			{:else}
				<ul class="divide-y divide-slate-100">
					{#each cart as item}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li 
							onclick={() => activeItemId = item.id}
							class={`p-4 cursor-pointer transition-all duration-200 ${activeItemId === item.id ? 'bg-[#0080FF]/10 border-l-4 border-l-[#0080FF]' : 'border-l-4 border-l-transparent hover:bg-slate-50'}`}
						>
							<div class="flex justify-between items-start mb-1.5">
								<span class="font-bold text-slate-800 text-sm leading-tight pr-2">{item.product.name}</span>
								<span class="font-black text-slate-900 text-sm">{formatCurrency((item.price * (1 - item.discount/100)) * item.qty)}</span>
							</div>
							<div class="flex items-center text-xs text-slate-500 gap-2">
								<!-- Aksen Warna Sekunder untuk Qty -->
								<span class="font-bold text-[#8B00FF] bg-[#8B00FF]/10 px-1.5 py-0.5 rounded">{item.qty} Unit</span>
								<span>@ {formatCurrency(item.price)}/unit</span>
								{#if item.discount > 0}
									<span class="text-rose-600 font-bold bg-rose-100 px-1.5 py-0.5 rounded">Disc. {item.discount}%</span>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- Ringkasan Total (Bagian Tengah Struk) -->
		<div class="p-5 bg-[#F8FAFC] border-t border-slate-200 shrink-0">
			<div class="flex justify-between text-sm font-medium text-slate-500 mb-1">
				<span>Subtotal</span>
				<span>{formatCurrency(subtotal)}</span>
			</div>
			<div class="flex justify-between text-sm font-medium text-slate-500 mb-1">
				<span>Diskon</span>
				<span class="text-rose-500">-{formatCurrency(totalDiscount)}</span>
			</div>
			<div class="flex justify-between text-sm font-medium text-slate-500 mb-4">
				<span>Pajak (11%)</span>
				<span>{formatCurrency(tax)}</span>
			</div>
			<div class="flex justify-between items-end border-t border-slate-200 pt-3">
				<span class="text-lg font-bold text-slate-800">Total</span>
				<span class="text-4xl font-black text-[#1E293B] tracking-tighter">{formatCurrency(grandTotal)}</span>
			</div>
		</div>

		<!-- Odoo Keypad Numerik & Mode Aksi -->
		<div class="p-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
			
			<!-- Mode Toggle (Qty / Disc / Price) & Hapus Item -->
			<div class="flex gap-2 mb-3">
				<button onclick={() => numpadMode = 'qty'} class={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${numpadMode === 'qty' ? 'bg-[#0080FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Qty</button>
				<button onclick={() => numpadMode = 'disc'} class={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${numpadMode === 'disc' ? 'bg-[#0080FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Disc</button>
				<button onclick={() => numpadMode = 'price'} class={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${numpadMode === 'price' ? 'bg-[#0080FF] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Price</button>
				
				<button 
					onclick={() => { if(activeItemId) { cart = cart.filter(i => i.id !== activeItemId); activeItemId = null; } }} 
					class="flex-none px-4 py-2 text-rose-500 bg-rose-50 hover:bg-rose-100 hover:text-rose-600 active:scale-95 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:active:scale-100"
					disabled={!activeItemId}
				>
					<Trash2 class="w-5 h-5" />
				</button>
			</div>

			<!-- Grid Angka Utama -->
			<div class="grid grid-cols-4 gap-2 mb-4">
				<div class="col-span-3 grid grid-cols-3 gap-2">
					{#each ['1','2','3','4','5','6','7','8','9','+/-','0','.'] as key}
						<button 
							onclick={() => handleNumpadInput(key)}
							class="py-3 bg-[#F8FAFC] border border-slate-200 hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200 active:scale-95 rounded-lg text-xl font-bold text-slate-700 transition-all duration-100"
						>
							{key}
						</button>
					{/each}
				</div>
				<!-- Kolom Backspace (Memanjang) -->
				<div class="col-span-1 flex flex-col gap-2">
					<button 
						onclick={() => handleNumpadInput('backspace')}
						class="flex-1 flex items-center justify-center bg-[#F8FAFC] border border-slate-200 hover:bg-slate-100 hover:text-rose-500 active:bg-slate-200 active:scale-95 rounded-lg text-slate-600 transition-all duration-100"
					>
						<Delete class="w-7 h-7" />
					</button>
				</div>
			</div>

			<!-- Tombol Payment / Checkout Hijau Sukses CTA -->
			<button 
				disabled={cart.length === 0}
				class="w-full py-4.5 bg-[#22C55E] hover:bg-[#16a34a] active:bg-[#15803d] active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-green-500/25"
			>
				<Banknote class="w-6 h-6" />
				Payment
			</button>
		</div>
	</div>
</div>

<style>
	/* Utilitas sembunyikan scrollbar global namun tetap bisa discroll */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
