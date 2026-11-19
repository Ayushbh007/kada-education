<script lang="ts">
	export let subtitle: string = 'TRUSTED ADMISSION TIE-UPS';
	export let title: string = 'Our Top Accredited University Partners';
	export let description: string =
		'Direct partnerships with premier UGC-entitled & NAAC-accredited institutions for online & distance education';

	export let universities = [
		{
			src: '/Images/logos/manipallogo.jpg',
			name: 'Manipal University',
			tag: 'NAAC A+ Accredited',
			href: '/Landingpage/Manipal'
		},
		{
			src: '/Images/logos/shoolini logo.png',
			name: 'Shoolini University',
			tag: "India's No. 1 Private",
			href: '/Landingpage/Shoolini'
		},
		{
			src: '/Images/logos/amitylogo.jpg',
			name: 'Amity University',
			tag: 'QS #1 Online Ranked',
			href: '/Landingpage/Amity'
		},
		{
			src: '/Images/IGNOU/ignou_logo.png',
			name: 'IGNOU',
			tag: 'Central University A++',
			href: '/Landingpage/IGNOU'
		},
		{
			src: '/Images/logos/graphic-era-logo.png',
			name: 'Graphic Era University',
			tag: 'NAAC A+ • NIRF #48',
			href: '/Landingpage/GraphicEra'
		},
		{
			src: '/Images/logos/gla-logo.png',
			name: 'GLA University',
			tag: 'NAAC A+ • ₹60 LPA Peak',
			href: '/Landingpage/GLA'
		},
		{
			src: '/Images/logos/uttranchal-logo.png',
			name: 'Uttaranchal University',
			tag: 'NAAC A+ Grade',
			href: '/Landingpage/Uttranchal'
		},
		{
			src: '/Images/logos/lpu-logo.png',
			name: 'LPU Online',
			tag: 'NAAC A++ Grade',
			href: '/Landingpage/LPU'
		},
		{
			src: '/Images/logos/DYpatil.png',
			name: 'DY Patil University',
			tag: 'NAAC A++ Accredited',
			href: '/Landingpage/DY'
		},
		{
			src: '/Images/logos/nmims.png',
			name: 'NMIMS University',
			tag: 'Category-1 Autonomy',
			href: '/Landingpage/NMIMS'
		},
		{
			src: '/Images/logos/jainlogo.png',
			name: 'Jain University',
			tag: 'NAAC A++ Accredited',
			href: '/Compare'
		},
		{
			src: '/Images/logos/chandigarhlogo.png',
			name: 'Chandigarh University',
			tag: 'NAAC A+ Accredited',
			href: '/Compare'
		},
		{
			src: '/Images/logos/galgotiaslogo.jpeg',
			name: 'Galgotias University',
			tag: 'NAAC A+ Accredited',
			href: '/Compare'
		},
		{
			src: '/Images/logos/andhralogo.png',
			name: 'Andhra University',
			tag: 'NAAC A Grade',
			href: '/Compare'
		},
		{
			src: '/Images/logos/noidalogo.png',
			name: 'Noida International',
			tag: 'UGC Recognized',
			href: '/Compare'
		}
	];

	export let speedSeconds: number = 34; // smooth comfortable scroll speed

	// Duplicate list for seamless infinite loop
	$: repeated = [...universities, ...universities];
</script>

<section
	class="border-y border-gray-100 bg-gradient-to-b from-white via-orange-50/20 to-white py-12 sm:py-16"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mx-auto mb-10 max-w-3xl text-center">
			<div
				class="mb-2.5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-[11px] font-bold tracking-wider text-orange-600 uppercase"
			>
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500"></span>
				{subtitle}
			</div>
			<h2 class="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
				{title}
			</h2>
			<p class="mt-2 text-xs text-gray-600 sm:text-sm">
				{description}
			</p>
		</div>

		<!-- Marquee Track Wrapper -->
		<div class="relative overflow-hidden py-2">
			<div
				class="marquee-track flex items-center gap-5 will-change-transform"
				style={`--duration: ${speedSeconds}s;`}
				aria-label="Partner university logos scrolling marquee"
			>
				{#each repeated as uni}
					<a
						href={uni.href}
						class="group flex h-20 w-64 shrink-0 items-center gap-3.5 rounded-2xl border border-gray-200/90 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-lg sm:h-22 sm:w-72 sm:p-3.5"
					>
						<!-- Logo container with high contrast -->
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/80 p-1 shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-orange-200 sm:h-14 sm:w-14"
						>
							<img
								src={uni.src}
								alt={`${uni.name} logo`}
								class="max-h-full max-w-full object-contain"
								loading="lazy"
								decoding="async"
							/>
						</div>

						<!-- University info stack -->
						<div class="flex min-w-0 flex-1 flex-col justify-center text-left">
							<span
								class="truncate text-sm font-bold text-gray-900 transition-colors group-hover:text-orange-600"
							>
								{uni.name}
							</span>
							<span
								class="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600"
							>
								<svg
									class="h-3 w-3 shrink-0 text-emerald-500"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="truncate">{uni.tag}</span>
							</span>
						</div>

						<!-- Micro Arrow on hover -->
						<div
							class="text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-orange-500"
						>
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</a>
				{/each}
			</div>

			<!-- Soft gradient edge fades -->
			<div
				class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28"
			></div>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28"
			></div>
		</div>
	</div>
</section>

<style>
	.marquee-track {
		width: max-content;
		animation: marquee var(--duration, 34s) linear infinite;
	}

	.marquee-track:hover {
		animation-play-state: paused;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
			overflow-x: auto;
		}
	}
</style>
