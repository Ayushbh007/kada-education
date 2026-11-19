<script lang="ts">
	import type { UniversityProgram } from '$lib/Universitydetails';
	import { universityPrograms } from '$lib/Universitydetails';
	import { page } from '$app/stores';
	import { getFee, feeSummary } from '$lib/fees';

	export let title: string = 'Partner Universities & Programs';
	export let subtitle: string =
		'Explore government-approved, NAAC-accredited online universities and find the perfect degree for your career goals.';
	let programs: ReadonlyArray<UniversityProgram> = universityPrograms;
</script>

<section class="bg-gray-50/60 py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
			<div
				class="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-bold tracking-wider text-orange-600 uppercase"
			>
				<span class="h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
				Admission Partners
			</div>
			<h2 class="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
				{title}
			</h2>
			<p class="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
				{subtitle}
			</p>
		</div>

		<!-- University Cards Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each programs as p}
				<article
					class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-xl"
				>
					<!-- Banner Section -->
					<div class="relative h-44 w-full overflow-hidden bg-gray-100">
						<img
							src={p.image}
							alt={`${p.university} campus`}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
							decoding="async"
						/>
						<!-- Subtle gradient overlay -->
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
						></div>

						<!-- Top-Left Accreditation Badge -->
						{#if p.badge}
							<span
								class="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-gray-900 shadow-md backdrop-blur-md"
							>
								{p.badge}
							</span>
						{/if}

						<!-- Top-Right Tag -->
						{#if p.tag}
							<span
								class="absolute top-3 right-3 inline-flex items-center rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md"
							>
								{p.tag}
							</span>
						{/if}

						<!-- University Logo Pill (overlapping into body) -->
						<div class="absolute -bottom-6 left-5 z-10">
							<div
								class="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white bg-white p-1.5 shadow-lg transition-transform duration-300 group-hover:scale-110"
							>
								<img
									src={p.logo}
									alt={`${p.university} logo`}
									class="h-full w-full object-contain"
									loading="lazy"
								/>
							</div>
						</div>
					</div>

					<!-- Card Header & University Highlight -->
					<div class="border-b border-gray-100 px-5 pt-8 pb-3">
						<div class="flex items-center justify-between gap-2">
							<span class="text-[11px] font-semibold tracking-wider text-orange-600 uppercase">
								{p.country ? `${p.country} • Accredited` : 'Accredited University'}
							</span>
							<span
								class="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700"
							>
								UGC Approved
							</span>
						</div>

						<!-- Prominent University Name -->
						<h3
							class="mt-1 text-xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-orange-600"
						>
							<a href={p.href} class="hover:underline">
								{p.university}
							</a>
						</h3>

						<!-- Secondary Program Focus Tag -->
						<div
							class="mt-2 inline-flex items-center gap-1.5 rounded-md border border-orange-100 bg-orange-50/80 px-2 py-0.5 text-xs font-semibold text-orange-800"
						>
							<svg
								class="h-3.5 w-3.5 text-orange-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg>
							<span>{p.title}</span>
						</div>
					</div>

					<!-- Body Details -->
					<div class="flex-1 space-y-3.5 px-5 py-4">
						<!-- Programs / Specializations -->
						<div>
							<span class="block text-[11px] font-bold tracking-wider text-gray-400 uppercase"
								>Popular Degrees</span
							>
							<p class="mt-0.5 text-xs leading-snug font-medium text-gray-800">
								{p.programsOffered}
							</p>
						</div>

						<!-- Level & Duration Badges -->
						<div class="flex flex-wrap items-center gap-2 pt-0.5">
							<div
								class="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
							>
								<svg
									class="h-3.5 w-3.5 text-orange-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M12 14l9-5-9-5-9 5 9 5z" />
									<path
										d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
									/>
								</svg>
								<span class="font-medium">{p.level}</span>
							</div>

							<div
								class="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
							>
								<svg
									class="h-3.5 w-3.5 text-orange-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span class="font-medium">{p.duration}</span>
							</div>

							{#if feeSummary(getFee($page.data.fees, p.id, p.university), '')}
								<div
									class="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800"
								>
									<span>{feeSummary(getFee($page.data.fees, p.id, p.university), '')}</span>
								</div>
							{/if}
						</div>

						<!-- Key Highlights -->
						<div class="pt-1">
							<ul class="space-y-1.5 text-xs text-gray-600">
								{#each p.highlights as h}
									<li class="flex items-center gap-2">
										<svg
											class="h-3.5 w-3.5 shrink-0 text-emerald-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2.5"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span class="leading-tight">{h}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<!-- CTA Section -->
					<div class="p-5 pt-0">
						<a
							href={p.href}
							class="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none"
						>
							<span>{p.cta ?? `Explore ${p.university}`}</span>
							<svg
								class="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
