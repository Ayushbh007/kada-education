<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	export let images: string[] = [
		'/Images/Manipalimages/manipal01.png',
		'/Images/Manipalimages/manipal02.png',
		'/Images/Manipalimages/manipal03.png',
		'/Images/shoolini/shoolini01.png',
		'/Images/shoolini/shoolini02.png',
		'/Images/shoolini/shoolini03.jpeg'
	];

	export let slideIntervalMs: number = 5000;
	export let overlayOpacity: number = 40; // 0 to 100, default 40%
	export let showOverlay: boolean = true;

	let activeIndex = 0;
	let intervalId: ReturnType<typeof setInterval> | undefined;
	let isReady = false;

	async function preloadImages(srcs: string[]): Promise<void> {
		await Promise.all(
			srcs.map(
				(src) =>
					new Promise<void>((resolve) => {
						const img = new Image();
						img.src = src;
						img.onload = () => resolve();
						img.onerror = () => resolve();
					})
			)
		);
	}

	function startSlider() {
		stopSlider();
		intervalId = setInterval(() => {
			activeIndex = (activeIndex + 1) % images.length;
		}, slideIntervalMs);
	}

	function stopSlider() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = undefined;
		}
	}

	onMount(() => {
		preloadImages(images).then(() => {
			isReady = true;
			startSlider();
		});
	});

	onDestroy(() => {
		stopSlider();
	});
</script>

<!-- Sleek compact hero section with cross-fade slider -->
<section class="relative w-full overflow-hidden bg-black">
	<!-- Container with well-balanced height (comfortably taller than compact mode, yet not oversized) -->
	<div class="relative h-[58vh] max-h-[680px] min-h-[480px] md:h-[66vh] lg:h-[72vh]">
		<!-- Stacked images; active slide cross-fades -->
		<div class="absolute inset-0">
			{#key activeIndex}
				<img
					src={images[activeIndex]}
					alt="Campus preview slide"
					class="absolute inset-0 h-full w-full object-cover"
					decoding="async"
					loading={activeIndex === 0 ? 'eager' : 'lazy'}
					fetchpriority={activeIndex === 0 ? 'high' : undefined}
					sizes="100vw"
					in:fade={{ duration: 700 }}
					out:fade={{ duration: 700 }}
				/>
			{/key}
		</div>

		<!-- Multi-stop dark gradient overlay for crystal-clear readability -->
		{#if showOverlay}
			<div
				class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/75"
				style="opacity: {Math.min(1, Math.max(0.2, overlayOpacity / 40))}"
			></div>
		{/if}

		<!-- Centered hero content with clearance for fixed navbar -->
		<div
			class="relative z-10 flex h-full items-center justify-center px-4 pt-20 pb-10 text-center text-white md:px-6 md:pt-24 md:pb-12"
		>
			<slot />
		</div>

		<!-- Minimalist slide indicator pills -->
		{#if images.length > 1}
			<div
				class="pointer-events-auto absolute inset-x-0 bottom-3.5 z-20 flex items-center justify-center gap-1.5"
			>
				{#each images as _, i}
					<button
						type="button"
						on:click={() => (activeIndex = i)}
						class="h-1.5 rounded-full transition-all duration-300 focus:outline-none {activeIndex ===
						i
							? 'w-6 bg-orange-500'
							: 'w-1.5 bg-white/40 hover:bg-white/70'}"
						aria-label="Go to slide {i + 1}"
					></button>
				{/each}
			</div>
		{/if}
	</div>
</section>
