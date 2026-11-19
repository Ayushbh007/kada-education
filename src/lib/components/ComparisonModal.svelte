<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface University {
		id: string;
		name: string;
		location: string;
		fees: string;
		ranking: string;
		accreditation: string;
		programs: string[];
		established: number;
		campusSize?: string | null;
		studentPopulation?: string | null;
		placementRate: string;
		logo: string | null;
		satisfiedStudent: string;
		eligibility: string;
		placementAssistance: string;
		onlineClasses: string;
		placementCompanies: string;
		studentRating: string;
		payAfterPlacement?: string;
	}

	export let universities: University[];

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function openLeadForm() {
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new Event('openFormPopup'));
		}
	}

	function parseCompanies(companiesStr: string): string[] {
		if (!companiesStr) return [];
		return companiesStr
			.split(',')
			.map((c) => c.trim())
			.filter(Boolean);
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape') close();
	}}
/>

<!-- Modal Overlay -->
<div
	class="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md transition-all duration-300 sm:p-6"
	on:click={close}
	role="dialog"
	aria-modal="true"
	aria-labelledby="comparison-title"
>
	<!-- Modal Container -->
	<div
		class="animate-fade-in-up relative my-auto flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
		on:click|stopPropagation
		role="document"
	>
		<!-- Modal Header -->
		<div
			class="flex items-center justify-between border-b border-gray-200/90 bg-gradient-to-r from-orange-50/70 via-white to-amber-50/50 px-5 py-4 sm:px-8 sm:py-5"
		>
			<div class="flex items-center space-x-3.5">
				<div
					class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				</div>
				<div>
					<div class="flex items-center space-x-2">
						<span
							class="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-extrabold tracking-wider text-orange-700 uppercase"
						>
							Side-by-Side Analysis
						</span>
						<span class="text-xs text-gray-400">•</span>
						<span class="text-xs font-semibold text-gray-500"
							>{universities.length} Universities Selected</span
						>
					</div>
					<h2
						id="comparison-title"
						class="text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl"
					>
						Online MBA University Comparison
					</h2>
				</div>
			</div>

			<!-- Close Button -->
			<button
				type="button"
				aria-label="Close modal"
				on:click={close}
				class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<!-- Table Scroll Container -->
		<div class="custom-scrollbar flex-1 overflow-x-auto overflow-y-auto">
			<table class="w-full min-w-[700px] border-collapse text-left">
				<!-- Sticky Table Header: Universities Info -->
				<thead
					class="sticky top-0 z-20 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md"
				>
					<tr>
						<!-- Left Corner Cell -->
						<th
							class="w-1/4 min-w-[180px] bg-gray-50/80 p-4 text-xs font-extrabold tracking-wider text-gray-500 uppercase sm:p-5"
						>
							<div class="flex items-center space-x-2">
								<svg
									class="h-4 w-4 text-orange-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 4h18M3 10h18M3 16h18M3 20h18"
									/>
								</svg>
								<span>Key Parameters</span>
							</div>
						</th>

						<!-- University Columns -->
						{#each universities as university}
							<th class="border-l border-gray-100 p-4 text-left sm:p-5">
								<div class="flex flex-col justify-between space-y-3">
									<div class="flex items-start space-x-3">
										<div
											class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm sm:h-14 sm:w-14"
										>
											<img
												src={university.logo}
												alt="{university.name} logo"
												class="h-full w-full object-contain"
											/>
										</div>
										<div class="min-w-0 flex-1">
											<h3
												class="truncate text-base leading-snug font-bold text-gray-900 sm:text-lg"
												title={university.name}
											>
												{university.name}
											</h3>
											<p class="mt-0.5 flex items-center text-xs text-gray-500">
												<svg
													class="mr-1 h-3.5 w-3.5 shrink-0 text-gray-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													/>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
												<span class="truncate">{university.location}</span>
											</p>
										</div>
									</div>

									<button
										type="button"
										on:click={openLeadForm}
										class="inline-flex w-full items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 transition-all hover:bg-orange-100"
									>
										<span>Enquire for {university.name.split(' ')[0]}</span>
										<svg
											class="ml-1 h-3.5 w-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>
								</div>
							</th>
						{/each}
					</tr>
				</thead>

				<tbody class="divide-y divide-gray-100 text-sm">
					<!-- Row: Fees -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-emerald-50 p-1.5 text-emerald-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Program Fees</span>
									<span class="text-[11px] font-normal text-gray-500">Per semester / Total</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 font-bold text-gray-900 sm:p-5">
								<div class="text-base font-extrabold text-gray-900">{university.fees}</div>
								<span
									class="mt-1 inline-block rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
								>
									EMI Options Available
								</span>
							</td>
						{/each}
					</tr>

					<!-- Row: Ranking -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-amber-50 p-1.5 text-amber-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
										/>
									</svg>
								</div>
								<div>
									<span class="block">NIRF & Standing</span>
									<span class="text-[11px] font-normal text-gray-500">National benchmark</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 sm:p-5">
								<span
									class="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 uppercase"
								>
									🏆 {university.ranking}
								</span>
							</td>
						{/each}
					</tr>

					<!-- Row: Accreditation -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-purple-50 p-1.5 text-purple-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Accreditations</span>
									<span class="text-[11px] font-normal text-gray-500">UGC, NAAC, AICTE</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 sm:p-5">
								<div class="flex flex-wrap gap-1.5">
									{#each university.accreditation.split(',') as acc}
										<span
											class="inline-flex items-center rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-800"
										>
											✓ {acc.trim()}
										</span>
									{/each}
								</div>
							</td>
						{/each}
					</tr>

					<!-- Row: Eligibility -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-blue-50 p-1.5 text-blue-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 14l9-5-9-5-9 5 9 5z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Eligibility</span>
									<span class="text-[11px] font-normal text-gray-500">Graduation % & criteria</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 font-medium text-gray-700 sm:p-5">
								<div class="flex items-start space-x-1.5">
									<span class="font-bold text-orange-500">•</span>
									<span>{university.eligibility}</span>
								</div>
							</td>
						{/each}
					</tr>

					<!-- Row: Placement Rate -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-emerald-50 p-1.5 text-emerald-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Placement Rate</span>
									<span class="text-[11px] font-normal text-gray-500">Track record</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 sm:p-5">
								<div class="flex items-center space-x-2">
									<span
										class="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-base font-extrabold text-emerald-700"
									>
										{university.placementRate}
									</span>
									<span class="text-xs text-gray-500">
										{#if university.placementAssistance.toLowerCase().includes('yes')}
											(100% Placement Support)
										{/if}
									</span>
								</div>
							</td>
						{/each}
					</tr>

					<!-- Row: Student Rating & Satisfaction -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-amber-50 p-1.5 text-amber-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H13m-3 3h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 14H13m-3 3h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 17H13M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Student Satisfaction</span>
									<span class="text-[11px] font-normal text-gray-500">Alumni review rating</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 sm:p-5">
								<div class="flex items-center space-x-2">
									<span
										class="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 font-bold text-amber-700"
									>
										★ {university.studentRating}
									</span>
									<span class="text-xs font-medium text-gray-600">
										({university.satisfiedStudent} Satisfied)
									</span>
								</div>
							</td>
						{/each}
					</tr>

					<!-- Row: Classes & Learning Mode -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-indigo-50 p-1.5 text-indigo-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Learning Mode</span>
									<span class="text-[11px] font-normal text-gray-500">Lecture delivery</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 font-medium text-gray-700 sm:p-5">
								<span
									class="inline-flex items-center space-x-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs text-indigo-800"
								>
									<span class="h-2 w-2 animate-pulse rounded-full bg-indigo-500"></span>
									<span>{university.onlineClasses}</span>
								</span>
							</td>
						{/each}
					</tr>

					<!-- Row: Top Recruiting Companies -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-cyan-50 p-1.5 text-cyan-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Hiring Partners</span>
									<span class="text-[11px] font-normal text-gray-500">Top recruiters</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 sm:p-5">
								<div class="flex flex-wrap gap-1">
									{#each parseCompanies(university.placementCompanies) as comp}
										<span
											class="rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700"
										>
											{comp}
										</span>
									{/each}
								</div>
							</td>
						{/each}
					</tr>

					<!-- Row: Programs Offered -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-rose-50 p-1.5 text-rose-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Programs Available</span>
									<span class="text-[11px] font-normal text-gray-500">Degree offerings</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 sm:p-5">
								<div class="flex flex-wrap gap-1.5">
									{#each university.programs as prog}
										<span
											class="rounded-md border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-bold text-orange-800"
										>
											{prog}
										</span>
									{/each}
								</div>
							</td>
						{/each}
					</tr>

					<!-- Row: Established -->
					<tr class="transition-colors hover:bg-orange-50/20">
						<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
							<div class="flex items-center space-x-2">
								<div class="rounded-lg bg-teal-50 p-1.5 text-teal-600">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<div>
									<span class="block">Established Year</span>
									<span class="text-[11px] font-normal text-gray-500">University heritage</span>
								</div>
							</div>
						</td>
						{#each universities as university}
							<td class="border-l border-gray-100 p-4 font-semibold text-gray-800 sm:p-5">
								{university.established}
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Modal Footer -->
		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/90 px-6 py-4 sm:flex-row"
		>
			<p class="text-center text-xs text-gray-500 sm:text-left">
				💡 Still confused? Our expert academic counselors help you find scholarship & EMI options
				with zero charge.
			</p>

			<div class="flex w-full items-center justify-end space-x-3 sm:w-auto">
				<button
					type="button"
					on:click={close}
					class="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 sm:text-sm"
				>
					Close
				</button>
				<button
					type="button"
					on:click={openLeadForm}
					class="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-105 hover:from-orange-600 hover:to-amber-600 sm:text-sm"
				>
					<span>Free Expert Counseling</span>
					<svg class="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: #f1f5f9;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 9999px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
