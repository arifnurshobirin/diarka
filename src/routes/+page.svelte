<script lang="ts">
	import {
		TrendingUp,
		Users,
		DollarSign,
		Activity,
		ArrowUpRight,
		ArrowDownRight,
		CreditCard,
		BarChart3,
		Bell,
		Search,
		ShieldCheck
	} from 'lucide-svelte';

	const stats = [
		{
			name: 'Total Revenue',
			value: '$45,231.89',
			change: '+20.1%',
			positive: true,
			icon: DollarSign
		},
		{
			name: 'Active Subscriptions',
			value: '+2,350',
			change: '+180.1%',
			positive: true,
			icon: Users
		},
		{
			name: 'Sales Conversion',
			value: '+12,234',
			change: '+19%',
			positive: true,
			icon: TrendingUp
		},
		{ name: 'Server Uptime', value: '99.98%', change: '-0.02%', positive: false, icon: Activity }
	];

	const recentTransactions = [
		{
			user: 'Olivia Martin',
			email: 'olivia.martin@email.com',
			amount: '+$1,999.00',
			status: 'Completed'
		},
		{ user: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00', status: 'Completed' },
		{
			user: 'Isabella Nguyen',
			email: 'isabella.nguyen@email.com',
			amount: '+$299.00',
			status: 'Pending'
		},
		{ user: 'William Kim', email: 'will@email.com', amount: '+$99.00', status: 'Completed' },
		{ user: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00', status: 'Failed' }
	];
</script>

<div class="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-10 font-sans">
	<!-- Top Navigation Header -->
	<header
		class="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4"
	>
		<div>
			<h1
				class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent"
			>
				Diarka Analytics
			</h1>
			<p class="text-sm text-slate-400 mt-1">SaaS Performance & Financial Metrics Overview</p>
		</div>
		<div class="flex items-center gap-3">
			<div class="relative">
				<Search class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
				<input
					type="text"
					placeholder="Search metrics..."
					class="bg-slate-900 text-sm rounded-lg pl-9 pr-4 py-2 border border-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
			</div>
			<button
				class="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
			>
				<Bell class="h-4 w-4" />
			</button>
			<div class="flex items-center gap-2 pl-3 border-l border-slate-800">
				<div
					class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold"
				>
					AD
				</div>
			</div>
		</div>
	</header>

	<!-- Main Dashboard Grid -->
	<main class="mt-8 space-y-8">
		<!-- Metric Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each stats as item}
				<div
					class="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-xl hover:border-slate-700 transition"
				>
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium text-slate-400 uppercase tracking-wider"
							>{item.name}</span
						>
						<div
							class="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
						>
							<svelte:component this={item.icon} class="h-5 w-5" />
						</div>
					</div>
					<div class="mt-4 flex items-baseline justify-between">
						<h2 class="text-2xl font-bold tracking-tight text-white">{item.value}</h2>
						<span
							class={`flex items-center text-xs font-semibold ${item.positive ? 'text-emerald-400' : 'text-rose-400'}`}
						>
							{#if item.positive}
								<ArrowUpRight class="h-3.5 w-3.5 mr-0.5" />
							{:else}
								<ArrowDownRight class="h-3.5 w-3.5 mr-0.5" />
							{/if}
							{item.change}
						</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- Charts & Activity Row -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Chart Mockup Card -->
			<div
				class="lg:col-span-2 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-xl"
			>
				<div class="flex items-center justify-between mb-6">
					<div>
						<h3 class="text-lg font-semibold text-white">Revenue Growth</h3>
						<p class="text-xs text-slate-400">Monthly recurring revenue progress</p>
					</div>
					<div
						class="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs text-slate-400"
					>
						<button class="px-3 py-1 bg-indigo-600 text-white rounded-md font-medium"
							>Monthly</button
						>
						<button class="px-3 py-1 hover:text-slate-200">Yearly</button>
					</div>
				</div>
				<!-- Visual Bar Representation -->
				<div
					class="h-64 flex items-end justify-between gap-3 pt-8 pb-2 px-4 bg-slate-950/50 rounded-xl border border-slate-800/50"
				>
					{#each [40, 65, 45, 80, 55, 90, 75, 100, 85, 95, 110, 125] as height, idx}
						<div class="w-full bg-slate-900 rounded-t-md flex flex-col justify-end group relative">
							<div
								style={`height: ${height * 0.45}%`}
								class="bg-gradient-to-t from-indigo-600 to-purple-500 group-hover:from-indigo-500 group-hover:to-purple-400 rounded-t-md transition-all duration-300"
							></div>
							<span class="text-[10px] text-slate-500 text-center mt-2 font-mono">M{idx + 1}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Recent Activity / Transactions -->
			<div
				class="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-xl flex flex-col justify-between"
			>
				<div>
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-semibold text-white">Recent Sales</h3>
						<span class="text-xs text-indigo-400 hover:underline cursor-pointer">View all</span>
					</div>
					<p class="text-xs text-slate-400 mb-6">You made 265 sales this month.</p>

					<div class="space-y-4">
						{#each recentTransactions as item}
							<div class="flex items-center justify-between text-sm">
								<div class="flex items-center gap-3">
									<div
										class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-300 border border-slate-700"
									>
										{item.user.charAt(0)}
									</div>
									<div>
										<p class="font-medium text-slate-200 leading-none">{item.user}</p>
										<p class="text-xs text-slate-500 mt-1">{item.email}</p>
									</div>
								</div>
								<span class="font-semibold text-slate-100">{item.amount}</span>
							</div>
						{/each}
					</div>
				</div>

				<div
					class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400"
				>
					<span class="flex items-center gap-1.5"
						><ShieldCheck class="h-4 w-4 text-emerald-400" /> Turso DB Synced</span
					>
					<span>v0.0.1</span>
				</div>
			</div>
		</div>
	</main>
</div>
