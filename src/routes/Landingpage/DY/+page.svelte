<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { Formpopup } from '$components';
	import { page } from '$app/stores';
	import { getFee, pick } from '$lib/fees';

	// Live fees from the Google Sheet (falls back to the values written in the markup)
	$: fee = getFee($page.data.fees, 'dy-patil');
	import { onMount } from 'svelte';

	let showForm = false;
	let formPopup: any;

	function openForm() {
		showForm = true;
		// Wait for the component to mount, then open the modal
		setTimeout(() => {
			if (formPopup) {
				formPopup.openModal();
			}
		}, 10);
	}

	function closeForm() {
		showForm = false;
	}

	function handleFormSubmit(
		event: CustomEvent<{ name: string; email: string; contactNo: string }>
	) {
		console.log('Form submitted with data:', event.detail);
	}

	const dyImages = ['/Images/DY/dy1.jpg', '/Images/DY/dy2.jpg', '/Images/DY/dy3.jpg'];

	let universityVisible = false;
	let highlightsVisible = false;
	let programsVisible = false;
	let statsVisible = false;
	let admissionVisible = false;
	let testimonialVisible = false;

	function inView(node: HTMLElement, params: { callback: (visible: boolean) => void }) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					params.callback(entry.isIntersecting);
				});
			},
			{ threshold: 0.2 }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.unobserve(node);
			}
		};
	}
</script>

<main class="flex min-h-screen flex-col">
	<div class="relative">
		<HeroSection images={dyImages} overlayOpacity={35}>
			<div class="animate-fade-in max-w-3xl px-4 text-center">
				<div
					class="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md"
					style="background-color: #831b33;"
				>
					PAY-AFTER-PLACEMENT
				</div>
				<h1 class="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
					Online MBA
				</h1>
				<p class="mb-2 text-base font-medium text-gray-200 sm:text-lg md:text-xl">
					Diploma in Business Management
				</p>
				<p
					class="mb-6 text-sm font-bold tracking-wide uppercase sm:text-base"
					style="color: #ff9fb4;"
				>
					DY Patil University - Industry Focused
				</p>
				<button
					on:click={openForm}
					class="inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#691529] hover:shadow-xl sm:text-base"
					style="background-color: #831b33;"
				>
					Apply Now
				</button>
			</div>
		</HeroSection>

		<div class="pointer-events-none absolute inset-x-0 top-0 z-20">
			<div class="navbar-wrapper pointer-events-auto">
				<Navbar />
			</div>
		</div>
	</div>

	<section
		class="bg-white py-16"
		use:inView={{ callback: (visible) => (universityVisible = visible) }}
	>
		<div class="container mx-auto px-4">
			<div
				class="mb-12 text-center"
				class:opacity-0={!universityVisible}
				class:translate-y-10={!universityVisible}
				class:opacity-100={universityVisible}
				class:translate-y-0={universityVisible}
				style="transition: all 0.8s ease-out"
			>
				<div class="mb-6 flex items-center justify-center gap-4">
					<img src="/Images/logos/DYpatil.png" alt="DY Logo" class="h-16 animate-pulse" />
					<div>
						<h2 class="text-3xl font-bold text-gray-900 md:text-4xl">DY University</h2>
						<div class="mt-2 flex items-center justify-center gap-2">
							<span class="font-bold" style="color: #831b33;">Online Degrees</span>
							<span class="animate-bounce rounded bg-blue-600 px-2 py-1 text-sm text-white"
								>NAAC A+</span
							>
							<span class="text-gray-600">UGC Entitled</span>
						</div>
					</div>
				</div>
				<p class="mx-auto max-w-2xl text-gray-600">
					Industry-aligned courses designed to accelerate your career.
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
					class:opacity-0={!universityVisible}
					class:translate-y-10={!universityVisible}
					class:opacity-100={universityVisible}
					class:translate-y-0={universityVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.2s"
				>
					<div
						class="animate-float mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Industry Oriented</h3>
					<p class="text-gray-600">
						Curriculum created with industry partners to make you job-ready.
					</p>
				</div>

				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
					class:opacity-0={!universityVisible}
					class:translate-y-10={!universityVisible}
					class:opacity-100={universityVisible}
					class:translate-y-0={universityVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.4s"
				>
					<div
						class="animate-float mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
						style="animation-delay: 0.2s"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Global Exposure</h3>
					<p class="text-gray-600">Partnerships and exchange programs to broaden your horizons.</p>
				</div>

				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
					class:opacity-0={!universityVisible}
					class:translate-y-10={!universityVisible}
					class:opacity-100={universityVisible}
					class:translate-y-0={universityVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.6s"
				>
					<div
						class="animate-float mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
						style="animation-delay: 0.4s"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Research & Labs</h3>
					<p class="text-gray-600">State-of-the-art labs and strong research culture.</p>
				</div>
			</div>
		</div>
	</section>

	<section
		class="bg-gradient-to-br from-gray-50 to-gray-100 py-16"
		use:inView={{ callback: (visible) => (highlightsVisible = visible) }}
	>
		<div class="container mx-auto px-4">
			<div
				class="mb-12 text-center"
				class:opacity-0={!highlightsVisible}
				class:translate-y-10={!highlightsVisible}
				class:opacity-100={highlightsVisible}
				class:translate-y-0={highlightsVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold md:text-4xl" style="color: #831b33;">
					Program Highlights
				</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Flexible schedules, industry mentors, and placement assistance.
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
				<div
					class="rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!highlightsVisible}
					class:translate-y-10={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.1s"
				>
					<div
						class="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Duration</h3>
					<p class="font-bold" style="color: #831b33;">2 YEARS</p>
					<p class="text-sm text-gray-600">Total of 4 Semesters</p>
				</div>

				<div
					class="rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!highlightsVisible}
					class:translate-y-10={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.2s"
				>
					<div
						class="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
						style="animation-delay: 0.2s"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Mode</h3>
					<p class="font-bold" style="color: #831b33;">100% ONLINE</p>
					<p class="text-sm text-gray-600">LIVE + RECORDED Sessions</p>
				</div>

				<div
					class="rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!highlightsVisible}
					class:translate-y-10={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.3s"
				>
					<div
						class="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
						style="animation-delay: 0.4s"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Fees</h3>
					<p class="font-bold" style="color: #831b33;">{pick(fee.total, '₹ 1,89,400')}</p>
					<p class="text-sm text-gray-600">Total Fees</p>
				</div>

				<div
					class="rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!highlightsVisible}
					class:translate-y-10={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.4s"
				>
					<div
						class="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
						style="animation-delay: 0.6s"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Placement</h3>
					<p class="font-bold" style="color: #831b33;">100% SUPPORT</p>
					<p class="text-sm text-gray-600">Expert Placement Services</p>
				</div>

				<div
					class="rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!highlightsVisible}
					class:translate-y-10={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.5s"
				>
					<div
						class="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f7f3e3] to-[#e8e0c8]"
						style="animation-delay: 0.8s"
					>
						<svg class="h-6 w-6" fill="none" stroke="#831b33" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Study Abroad</h3>
					<p class="font-bold" style="color: #831b33;">INTERNATIONAL</p>
					<p class="text-sm text-gray-600">Options in US/UK/Canada/Australia</p>
				</div>
			</div>
		</div>
	</section>

	<section
		class="bg-gradient-to-br from-white to-gray-50 py-16"
		use:inView={{ callback: (visible) => (programsVisible = visible) }}
	>
		<div class="container mx-auto px-4">
			<div
				class="mb-12 text-center"
				class:opacity-0={!programsVisible}
				class:translate-y-10={!programsVisible}
				class:opacity-100={programsVisible}
				class:translate-y-0={programsVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">World-Class Programs</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Choose from our diverse range of internationally recognized programs
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
				<div
					class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!programsVisible}
					class:translate-y-10={!programsVisible}
					class:opacity-100={programsVisible}
					class:translate-y-0={programsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.1s"
				>
					<div
						class="relative flex h-48 items-center justify-center overflow-hidden"
						style="background: linear-gradient(135deg, #831b33 0%, #a62b4a 100%);"
					>
						<div class="text-center text-white">
							<svg
								class="mx-auto mb-4 h-16 w-16 opacity-80"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
								/>
								<path
									d="M12 6.5l1.5 3.03L17 10.5l-2.5 2.44.59 3.44L12 14.5l-3.09 1.88.59-3.44L7 10.5l3.5-.97L12 6.5z"
								/>
							</svg>
							<h3 class="text-lg font-semibold">MBA</h3>
						</div>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">MBA</h3>
						<p class="mb-2 text-gray-600">Master of Business Administration</p>
						<p class="mb-2 font-semibold text-[#831b33]">Fee: ₹1,75,000/- per year</p>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]">•</span>Global business perspective
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.1s"
									>•</span
								>Industry partnerships
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.2s"
									>•</span
								>Placement assistance
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-[#691529] hover:shadow-lg"
							style="background-color: #831b33;">Apply Now</button
						>
					</div>
				</div>

				<div
					class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!programsVisible}
					class:translate-y-10={!programsVisible}
					class:opacity-100={programsVisible}
					class:translate-y-0={programsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.2s"
				>
					<div
						class="relative flex h-48 items-center justify-center overflow-hidden"
						style="background: linear-gradient(135deg, #831b33 0%, #a62b4a 100%);"
					>
						<div class="text-center text-white">
							<svg
								class="mx-auto mb-4 h-16 w-16 opacity-80"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
								/>
								<polyline points="7.5 4.27 12 6.11 16.5 4.27" />
								<line x1="12" y1="22.35" x2="12" y2="6.11" />
								<polyline points="16.5 19.73 12 17.89 7.5 19.73" />
								<polyline points="16.5 13.73 12 11.89 7.5 13.73" />
							</svg>
							<h3 class="text-lg font-semibold">BBA</h3>
						</div>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">BBA</h3>
						<p class="mb-2 text-gray-600">Bachelor of Business Administration</p>
						<p class="mb-2 font-semibold text-[#831b33]">Fee: ₹1,30,000/- per year</p>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]">•</span>Foundation in business
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.1s"
									>•</span
								>Leadership skills
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.2s"
									>•</span
								>Career development
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-[#691529] hover:shadow-lg"
							style="background-color: #831b33;">Apply Now</button
						>
					</div>
				</div>

				<div
					class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!programsVisible}
					class:translate-y-10={!programsVisible}
					class:opacity-100={programsVisible}
					class:translate-y-0={programsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.3s"
				>
					<div
						class="relative flex h-48 items-center justify-center overflow-hidden"
						style="background: linear-gradient(135deg, #831b33 0%, #a62b4a 100%);"
					>
						<div class="text-center text-white">
							<svg
								class="mx-auto mb-4 h-16 w-16 opacity-80"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
								/>
							</svg>
							<h3 class="text-lg font-semibold">MCA</h3>
						</div>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">MCA</h3>
						<p class="mb-2 text-gray-600">Master of Computer Applications</p>
						<p class="mb-2 font-semibold text-[#831b33]">Fee: ₹1,40,000/- per year</p>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]">•</span>Advanced computing skills
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.1s"
									>•</span
								>Software development
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.2s"
									>•</span
								>Industry projects
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-[#691529] hover:shadow-lg"
							style="background-color: #831b33;">Apply Now</button
						>
					</div>
				</div>

				<div
					class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:shadow-2xl"
					class:opacity-0={!programsVisible}
					class:translate-y-10={!programsVisible}
					class:opacity-100={programsVisible}
					class:translate-y-0={programsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.4s"
				>
					<div
						class="relative flex h-48 items-center justify-center overflow-hidden"
						style="background: linear-gradient(135deg, #831b33 0%, #a62b4a 100%);"
					>
						<div class="text-center text-white">
							<svg
								class="mx-auto mb-4 h-16 w-16 opacity-80"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
								/>
								<polyline points="7.5 4.27 12 6.11 16.5 4.27" />
								<line x1="12" y1="22.35" x2="12" y2="6.11" />
								<polyline points="16.5 19.73 12 17.89 7.5 19.73" />
								<polyline points="16.5 13.73 12 11.89 7.5 13.73" />
							</svg>
							<h3 class="text-lg font-semibold">BCA</h3>
						</div>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">BCA</h3>
						<p class="mb-2 text-gray-600">Bachelor of Computer Applications</p>
						<p class="mb-2 font-semibold text-[#831b33]">Fee: ₹1,32,000/- per year</p>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]">•</span>Programming fundamentals
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.1s"
									>•</span
								>Database management
							</li>
							<li class="flex items-center">
								<span class="mr-2 animate-pulse text-[#831b33]" style="animation-delay: 0.2s"
									>•</span
								>IT applications
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-[#691529] hover:shadow-lg"
							style="background-color: #831b33;">Apply Now</button
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		class="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 text-white"
		use:inView={{ callback: (visible) => (statsVisible = visible) }}
	>
		<div class="absolute inset-0 bg-gradient-to-r from-[#831b33]/10 to-transparent"></div>
		<div class="relative container mx-auto px-4">
			<div class="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center md:grid-cols-4">
				<div
					class="group cursor-pointer"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.1s"
				>
					<div
						class="mb-2 animate-pulse text-4xl font-bold text-[#831b33] transition-transform duration-300 group-hover:scale-110"
					>
						20+
					</div>
					<div class="text-gray-300 transition-colors duration-300 group-hover:text-white">
						Years of Excellence
					</div>
				</div>
				<div
					class="group cursor-pointer"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.2s"
				>
					<div
						class="mb-2 animate-pulse text-4xl font-bold text-[#831b33] transition-transform duration-300 group-hover:scale-110"
						style="animation-delay: 0.2s"
					>
						15k+
					</div>
					<div class="text-gray-300 transition-colors duration-300 group-hover:text-white">
						Students
					</div>
				</div>
				<div
					class="group cursor-pointer"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.3s"
				>
					<div
						class="mb-2 animate-pulse text-4xl font-bold text-[#831b33] transition-transform duration-300 group-hover:scale-110"
						style="animation-delay: 0.4s"
					>
						500+
					</div>
					<div class="text-gray-300 transition-colors duration-300 group-hover:text-white">
						Faculty Members
					</div>
				</div>
				<div
					class="group cursor-pointer"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.4s"
				>
					<div
						class="mb-2 animate-pulse text-4xl font-bold text-[#831b33] transition-transform duration-300 group-hover:scale-110"
						style="animation-delay: 0.6s"
					>
						50+
					</div>
					<div class="text-gray-300 transition-colors duration-300 group-hover:text-white">
						Research Centers
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		class="bg-gradient-to-br from-gray-50 to-white py-16"
		use:inView={{ callback: (visible) => (admissionVisible = visible) }}
	>
		<div class="container mx-auto px-4">
			<div
				class="mx-auto mb-12 max-w-2xl text-center"
				class:opacity-0={!admissionVisible}
				class:translate-y-10={!admissionVisible}
				class:opacity-100={admissionVisible}
				class:translate-y-0={admissionVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold text-[#831b33] md:text-4xl">
					Student Admission Process and Assistance from us
				</h2>
				<p class="text-gray-600">
					We guide you through every step of your admission journey at DY University, ensuring a
					smooth and hassle-free process.
				</p>
			</div>

			<div class="grid items-center gap-8 md:grid-cols-2">
				<div
					class="transform overflow-hidden rounded-lg shadow-2xl transition-all duration-500 hover:scale-105"
					class:opacity-0={!admissionVisible}
					class:translate-x-[-100px]={!admissionVisible}
					class:opacity-100={admissionVisible}
					class:translate-x-0={admissionVisible}
					style="transition: all 0.8s ease-out"
				>
					<img
						src="/Images/DY/dy4.png"
						alt="DY University admission process"
						class="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
					/>
				</div>

				<div
					class="transform space-y-6"
					class:opacity-0={!admissionVisible}
					class:translate-x-[100px]={!admissionVisible}
					class:opacity-100={admissionVisible}
					class:translate-x-0={admissionVisible}
					style="transition: all 0.8s ease-out"
				>
					<div class="group flex cursor-pointer items-center gap-4">
						<div
							class="flex-shrink-0 animate-bounce rounded-full bg-[#831b33] p-2 transition-transform duration-300 group-hover:scale-110"
						>
							<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"
								><path
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								/></svg
							>
						</div>
						<span
							class="text-lg text-gray-800 transition-colors duration-300 group-hover:text-[#831b33]"
							>Complete application & documents</span
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16"
		use:inView={{ callback: (visible) => (testimonialVisible = visible) }}
	>
		<div class="absolute inset-0 bg-gradient-to-r from-[#831b33]/5 to-transparent"></div>
		<div class="relative container mx-auto px-4">
			<div
				class="mb-12 text-center"
				class:opacity-0={!testimonialVisible}
				class:translate-y-10={!testimonialVisible}
				class:opacity-100={testimonialVisible}
				class:translate-y-0={testimonialVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold text-[#831b33] md:text-4xl">
					What Our Students Say About Us
				</h2>
				<p class="mx-auto max-w-2xl text-gray-400">
					Hear from our students about their experience with DY University and how it transformed
					their careers.
				</p>
			</div>

			<div class="relative mx-auto max-w-3xl">
				<button
					class="absolute top-1/2 left-0 z-10 -translate-x-12 -translate-y-1/2 text-[#831b33] transition-all duration-300 hover:scale-110 hover:text-[#691529]"
					aria-label="Previous testimonial"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/></svg
					>
				</button>
				<button
					class="absolute top-1/2 right-0 z-10 translate-x-12 -translate-y-1/2 text-[#831b33] transition-all duration-300 hover:scale-110 hover:text-[#691529]"
					aria-label="Next testimonial"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/></svg
					>
				</button>

				<div
					class="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-8 px-8 text-center shadow-2xl backdrop-blur-sm md:px-12"
					class:opacity-0={!testimonialVisible}
					class:scale-95={!testimonialVisible}
					class:opacity-100={testimonialVisible}
					class:scale-100={testimonialVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.2s"
				>
					<div class="mb-8">
						<img
							src="/Images/DY/student.png"
							alt="Student testimonial"
							class="mx-auto h-20 w-20 animate-pulse rounded-full border-4 border-[#831b33] object-cover shadow-lg"
						/>
					</div>
					<h3 class="mb-1 text-xl font-semibold text-[#831b33]">Ankit Verma</h3>
					<p class="mb-6 text-sm text-gray-400">Online MBA Graduate</p>
					<p class="leading-relaxed text-gray-300 italic">
						"Enrolling with DY University was a game-changer. The industry-focused curriculum and
						flexible timings helped me balance work and studies. I found the mentorship and
						placement support particularly valuable."
					</p>
					<div class="mt-4 flex justify-center gap-1">
						<span class="text-lg text-[#831b33]">★★★★★</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="footer-wrapper">
		<Footer />
	</div>
</main>

{#if showForm}
	<Formpopup
		bind:this={formPopup}
		on:close={closeForm}
		on:submit={handleFormSubmit}
	/>
{/if}

<style lang="postcss">
	:global(.navbar-wrapper .bg-orange-500) {
		background-color: #831b33 !important;
	}
	:global(.navbar-wrapper .hover\:bg-orange-600:hover) {
		background-color: #691529 !important;
	}
	:global(.navbar-wrapper .text-orange-500) {
		color: #831b33 !important;
	}
	:global(.footer-wrapper .bg-orange-500) {
		background-color: #831b33 !important;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slide-up {
		from {
			transform: translateY(30px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.animate-float {
		animation: float 3s ease-in-out infinite;
	}

	.animate-fade-in {
		animation: fade-in 1s ease-out;
	}

	.animate-slide-up {
		animation: slide-up 0.8s ease-out forwards;
		opacity: 0;
	}
</style>
