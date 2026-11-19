<script lang="ts">
	import { page } from '$app/stores';
	import { Navbar, Footer } from '$components';
	import universitiesData from '$lib/universities.json';
	import { withSheetFees } from '$lib/fees';

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

	// Fees come live from the Google Sheet (falls back to universities.json)
	$: allUniversities = withSheetFees(universitiesData as University[], $page.data.fees);

	// Parse ids from query parameter (e.g., /Compare/results?ids=manipal,ignou,lpu)
	$: idsParam = $page.url.searchParams.get('ids') || '';
	$: selectedIds = idsParam
		.split(',')
		.map((id) => id.trim())
		.filter(Boolean);

	// Fallback to top 3 popular universities if none specified
	$: comparedUniversities = (() => {
		if (selectedIds.length > 0) {
			const matched = selectedIds
				.map((id) => allUniversities.find((u) => u.id === id))
				.filter((u): u is (typeof allUniversities)[number] => !!u);
			if (matched.length >= 2) return matched;
		}
		// Default trio
		return allUniversities.filter((u) => ['manipal', 'lpu', 'ignou'].includes(u.id));
	})();

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

<svelte:head>
	<title>Compare Universities - Kada Education</title>
	<meta
		name="description"
		content="Detailed side-by-side comparison of online MBA universities across fees, accreditations, ranking, and placements."
	/>
</svelte:head>

<main class="animated-gradient-bg flex min-h-screen flex-col">
	<!-- Navbar -->
	<Navbar />

	<div class="relative flex-grow overflow-hidden px-4 py-8 pt-24 sm:px-6 lg:px-8">
		<!-- Background Glows -->
		<div class="pointer-events-none absolute inset-0 opacity-40">
			<div
				class="animate-float-slow absolute top-20 left-10 h-52 w-52 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 blur-3xl"
			></div>
			<div
				class="animate-float-medium absolute right-10 bottom-24 h-60 w-60 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 blur-3xl"
			></div>
			<div
				class="animate-float-fast absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 blur-3xl"
			></div>
		</div>

		<div class="relative z-10 mx-auto max-w-7xl">
			<!-- Breadcrumb & Back Link -->
			<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center space-x-2 text-xs font-medium text-gray-500 sm:text-sm">
					<a href="/" class="transition-colors hover:text-orange-600">Home</a>
					<span>/</span>
					<a href="/Compare" class="transition-colors hover:text-orange-600">Compare Universities</a
					>
					<span>/</span>
					<span class="font-bold text-orange-600">Side-by-Side Comparison</span>
				</div>

				<a
					href="/Compare"
					class="inline-flex items-center space-x-2 rounded-xl border border-gray-200 bg-white/90 px-4 py-2 text-xs font-bold text-gray-700 shadow-sm backdrop-blur-sm transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					<span>← Change / Select Other Universities</span>
				</a>
			</div>

			<!-- Page Header -->
			<div class="mb-10 text-center">
				<div
					class="mb-3 inline-flex items-center space-x-2 rounded-full border border-orange-200 bg-orange-100/80 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-orange-700 uppercase shadow-xs"
				>
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
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
					<span>Comparing {comparedUniversities.length} Selected Universities</span>
				</div>
				<h1
					class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
				>
					Online MBA <span
						class="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
						>University Comparison</span
					>
				</h1>
				<div
					class="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
				></div>
				<p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
					Evaluate key parameters side-by-side across fees, NIRF rankings, accreditations,
					placements, and student satisfaction to make the right choice for your career.
				</p>
			</div>

			<!-- Comparison Table Section -->
			<div
				class="mb-14 overflow-hidden rounded-3xl border border-gray-200/90 bg-white/95 shadow-2xl backdrop-blur-xl"
			>
				<div class="custom-scrollbar overflow-x-auto">
					<table class="w-full min-w-[760px] border-collapse text-left">
						<!-- Sticky Header with University Cards -->
						<thead
							class="sticky top-0 z-20 border-b border-gray-200 bg-white/95 shadow-xs backdrop-blur-md"
						>
							<tr>
								<!-- Left Column: Parameter Label -->
								<th
									class="w-1/4 min-w-[190px] bg-gray-50/90 p-5 text-xs font-extrabold tracking-wider text-gray-500 uppercase sm:p-6"
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
								{#each comparedUniversities as university}
									<th class="border-l border-gray-100 p-5 text-left sm:p-6">
										<div class="flex flex-col justify-between space-y-3">
											<div class="flex items-start space-x-3.5">
												<div
													class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm sm:h-16 sm:w-16"
												>
													<img
														src={university.logo}
														alt="{university.name} logo"
														class="h-full w-full object-contain"
													/>
												</div>
												<div class="min-w-0 flex-1">
													<h3
														class="truncate text-base leading-snug font-extrabold text-gray-900 sm:text-lg"
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
													<div class="mt-1 flex items-center text-xs font-semibold text-amber-600">
														<span>★ {university.studentRating}</span>
													</div>
												</div>
											</div>

											<button
												type="button"
												on:click={openLeadForm}
												class="inline-flex w-full items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-bold text-orange-700 shadow-xs transition-all hover:scale-[1.02] hover:bg-orange-500 hover:text-white"
											>
												<span>Enquire for {university.name.split(' ')[0]}</span>
												<svg
													class="ml-1.5 h-3.5 w-3.5"
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
							<!-- 1. Program Fees -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Program Fees</span>
											<span class="text-[11px] font-normal text-gray-500">Semester / Total</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
									<td class="border-l border-gray-100 p-4 sm:p-5">
										<div class="text-base font-extrabold text-gray-900">{university.fees}</div>
										{#if university.fee.annual && university.fee.semester}
											<div class="mt-0.5 text-xs text-gray-600">
												Annual: <strong>{university.fee.annual}</strong>
											</div>
										{/if}
										{#if university.fee.total && (university.fee.semester || university.fee.annual)}
											<div class="mt-0.5 text-xs text-gray-600">
												Total: <strong>{university.fee.total}</strong>
											</div>
										{/if}
										{#if university.fee.monthly}
											<div class="mt-0.5 text-xs text-gray-600">
												Monthly: <strong>{university.fee.monthly}</strong>
											</div>
										{/if}
										<span
											class="mt-1 inline-block rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700"
										>
											{university.fee.emi || 'EMI Options Available'}
										</span>
									</td>
								{/each}
							</tr>

							<!-- 2. NIRF Ranking -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">NIRF & Standing</span>
											<span class="text-[11px] font-normal text-gray-500">National benchmark</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
									<td class="border-l border-gray-100 p-4 sm:p-5">
										<span
											class="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 uppercase"
										>
											🏆 {university.ranking}
										</span>
									</td>
								{/each}
							</tr>

							<!-- 3. Accreditations -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Accreditations</span>
											<span class="text-[11px] font-normal text-gray-500">UGC, NAAC, AICTE</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
									<td class="border-l border-gray-100 p-4 sm:p-5">
										<div class="flex flex-wrap gap-1.5">
											{#each university.accreditation.split(',') as acc}
												<span
													class="inline-flex items-center rounded-md border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-800"
												>
													✓ {acc.trim()}
												</span>
											{/each}
										</div>
									</td>
								{/each}
							</tr>

							<!-- 4. Eligibility -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Eligibility Criteria</span>
											<span class="text-[11px] font-normal text-gray-500"
												>Graduation requirements</span
											>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
									<td class="border-l border-gray-100 p-4 font-medium text-gray-700 sm:p-5">
										<div class="flex items-start space-x-1.5">
											<span class="font-bold text-orange-500">•</span>
											<span>{university.eligibility}</span>
										</div>
									</td>
								{/each}
							</tr>

							<!-- 5. Placement Rate -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Placement Rate</span>
											<span class="text-[11px] font-normal text-gray-500">Track record</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
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

							<!-- 6. Student Satisfaction -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Student Satisfaction</span>
											<span class="text-[11px] font-normal text-gray-500">Alumni review rating</span
											>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
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

							<!-- 7. Classes & Learning Mode -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Learning Mode</span>
											<span class="text-[11px] font-normal text-gray-500">Lecture delivery</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
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

							<!-- 8. Top Recruiting Companies -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Hiring Partners</span>
											<span class="text-[11px] font-normal text-gray-500">Top recruiters</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
									<td class="border-l border-gray-100 p-4 sm:p-5">
										<div class="flex flex-wrap gap-1.5">
											{#each parseCompanies(university.placementCompanies) as comp}
												<span
													class="rounded-md border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
												>
													{comp}
												</span>
											{/each}
										</div>
									</td>
								{/each}
							</tr>

							<!-- 9. Programs Available -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Programs Offered</span>
											<span class="text-[11px] font-normal text-gray-500">Degree offerings</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
									<td class="border-l border-gray-100 p-4 sm:p-5">
										<div class="flex flex-wrap gap-1.5">
											{#each university.programs as prog}
												<span
													class="rounded-md border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-xs font-bold text-orange-800"
												>
													{prog}
												</span>
											{/each}
										</div>
									</td>
								{/each}
							</tr>

							<!-- 10. Established Year -->
							<tr class="transition-colors hover:bg-orange-50/20">
								<td class="bg-gray-50/50 p-4 font-semibold text-gray-900 sm:p-5">
									<div class="flex items-center space-x-2.5">
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
											<span class="block font-bold">Established Year</span>
											<span class="text-[11px] font-normal text-gray-500">Heritage</span>
										</div>
									</div>
								</td>
								{#each comparedUniversities as university}
									<td class="border-l border-gray-100 p-4 font-bold text-gray-800 sm:p-5">
										{university.established}
									</td>
								{/each}
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Table Footer Action -->
				<div
					class="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/90 p-5 sm:flex-row sm:p-6"
				>
					<p class="text-center text-xs text-gray-500 sm:text-left">
						💡 Want to enroll or check direct scholarship eligibility? Our counselors handle your
						application free of charge.
					</p>

					<div class="flex w-full items-center justify-end space-x-3 sm:w-auto">
						<a
							href="/Compare"
							class="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 sm:text-sm"
						>
							Change Selection
						</a>
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

			<!-- Standout Verdict Cards for Each University -->
			<div class="mb-14">
				<h2 class="mb-6 text-xl font-extrabold text-gray-900 sm:text-2xl">
					Key Highlights for Each University
				</h2>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each comparedUniversities as univ}
						<div
							class="flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white/90 p-6 shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-xl"
						>
							<div>
								<div class="mb-4 flex items-center space-x-3">
									<div
										class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-1 shadow-sm"
									>
										<img
											src={univ.logo}
											alt="{univ.name} logo"
											class="h-full w-full object-contain"
										/>
									</div>
									<div>
										<h3 class="text-base font-bold text-gray-900">{univ.name}</h3>
										<p class="text-xs text-gray-500">{univ.location}</p>
									</div>
								</div>

								<div class="space-y-2 text-xs text-gray-600">
									<div class="flex items-start space-x-2">
										<span class="font-bold text-orange-500">✓</span>
										<span><strong>Accreditation:</strong> {univ.accreditation}</span>
									</div>
									<div class="flex items-start space-x-2">
										<span class="font-bold text-orange-500">✓</span>
										<span><strong>Placement Rate:</strong> {univ.placementRate}</span>
									</div>
									<div class="flex items-start space-x-2">
										<span class="font-bold text-orange-500">✓</span>
										<span><strong>Student Rating:</strong> ★ {univ.studentRating}</span>
									</div>
									<div class="flex items-start space-x-2">
										<span class="font-bold text-orange-500">✓</span>
										<span><strong>Tuition:</strong> {univ.fees}</span>
									</div>
								</div>
							</div>

							<button
								type="button"
								on:click={openLeadForm}
								class="mt-5 w-full rounded-xl border border-orange-200 bg-orange-50 py-2 text-xs font-bold text-orange-700 transition-colors hover:bg-orange-100"
							>
								Inquire About {univ.name.split(' ')[0]}
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<Footer />
</main>

<style lang="postcss">
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: #f8fafc;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 9999px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}

	@keyframes float-slow {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-15px) rotate(5deg);
		}
	}

	@keyframes float-medium {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(-3deg);
		}
	}

	@keyframes float-fast {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-25px) rotate(2deg);
		}
	}

	.animate-float-slow {
		animation: float-slow 8s ease-in-out infinite;
	}

	.animate-float-medium {
		animation: float-medium 6s ease-in-out infinite;
	}

	.animate-float-fast {
		animation: float-fast 4s ease-in-out infinite;
	}
</style>
