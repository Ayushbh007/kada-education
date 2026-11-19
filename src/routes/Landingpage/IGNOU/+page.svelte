<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { Formpopup } from '$components';
	import { page } from '$app/stores';
	import { getFee, pick } from '$lib/fees';

	// Live fees from the Google Sheet (falls back to the values written in the markup)
	$: fee = getFee($page.data.fees, 'ignou');
	import { onMount, tick } from 'svelte';

	let showForm = false;
	let formPopup: any = null;

	async function openForm() {
		showForm = true;
		await tick();
		if (formPopup?.openModal) {
			formPopup.openModal();
		}
	}

	function closeForm() {
		showForm = false;
	}

	function handleFormSubmit(
		event: CustomEvent<{ name: string; email: string; contactNo: string }>
	) {
		console.log('Form submitted with data:', event.detail);
	}

	const ignouImages = ['/Images/IGNOU/ignou_hero.png', '/Images/IGNOU/ignou_campus.png'];

	let universityVisible = false;
	let statsVisible = false;
	let statsVisible2 = false;
	let highlightsVisible = false;
	let admissionVisible = false;

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
				observer.disconnect();
			}
		};
	}
</script>

<main class="flex min-h-screen flex-col font-sans">
	<div class="relative">
		<HeroSection images={ignouImages} overlayOpacity={45}>
			<div class="animate-fade-in max-w-3xl px-4 text-center">
				<div
					class="mb-3 inline-flex items-center gap-2 rounded-full bg-[#004b87] px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md"
				>
					NAAC GRADE A++ • CENTRAL UNIVERSITY
				</div>
				<h1 class="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
					IGNOU Online & Distance
				</h1>
				<p class="mb-2 text-base font-medium text-gray-200 sm:text-lg md:text-xl">
					Empowering Learners with Flexible & Affordable Higher Education
				</p>
				<p class="mb-6 text-sm font-bold tracking-wide text-sky-300 uppercase sm:text-base">
					Indira Gandhi National Open University
				</p>
				<button
					on:click={openForm}
					class="inline-flex items-center gap-2 rounded-full bg-[#004b87] px-7 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#003866] hover:shadow-xl sm:text-base"
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
		class="bg-white py-20"
		use:inView={{ callback: (visible) => (universityVisible = visible) }}
	>
		<div class="container mx-auto px-4">
			<div
				class="mb-16 text-center"
				class:opacity-0={!universityVisible}
				class:translate-y-10={!universityVisible}
				class:opacity-100={universityVisible}
				class:translate-y-0={universityVisible}
				style="transition: all 0.8s ease-out"
			>
				<div class="mb-6 flex items-center justify-center gap-4">
					<img
						src="/Images/IGNOU/ignou_logo.png"
						alt="IGNOU Logo"
						class="h-24 animate-pulse rounded-full bg-white object-contain p-2 shadow-sm"
					/>
					<div class="text-left">
						<h2 class="text-3xl font-extrabold tracking-tight text-[#004b87] uppercase md:text-4xl">
							IGNOU
						</h2>
						<div class="mt-2 flex flex-wrap items-center gap-2">
							<span class="font-semibold text-gray-700">World's Largest Open University</span>
							<span
								class="animate-bounce rounded-full bg-[#004b87] px-3 py-1 text-sm text-white shadow-md"
								>A++ Grade</span
							>
						</div>
					</div>
				</div>
				<p class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
					Indira Gandhi National Open University is uniquely positioned to democratize higher
					education by taking it to the doorsteps of the learners, providing access to high-quality
					education to all those who seek it irrespective of age, region, religion and gender.
				</p>
			</div>
		</div>
	</section>

	<section
		class="relative overflow-hidden bg-[#004b87] py-16"
		use:inView={{ callback: (visible) => (statsVisible = visible) }}
	>
		<div
			class="absolute inset-0 bg-[url('/Images/IGNOU/ignou_campus.png')] bg-cover bg-center opacity-10"
		></div>
		<div class="relative z-10 container mx-auto px-4">
			<div
				class="mb-12 text-center"
				class:opacity-0={!statsVisible}
				class:translate-y-10={!statsVisible}
				class:opacity-100={statsVisible}
				class:translate-y-0={statsVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">University at a Glance</h2>
				<div class="mx-auto h-1 w-24 rounded-full bg-white"></div>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
				<!-- Stat 1 -->
				<div
					class="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/20"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.1s"
				>
					<div class="mb-2 text-4xl font-extrabold text-white">21M+</div>
					<div class="font-medium text-blue-100">Students Enrolled</div>
					<div class="mt-1 text-xs text-blue-200">Since Inception</div>
				</div>
				<!-- Stat 2 -->
				<div
					class="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/20"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.2s"
				>
					<div class="mb-2 text-4xl font-extrabold text-white">333</div>
					<div class="font-medium text-blue-100">Programmes</div>
					<div class="mt-1 text-xs text-blue-200">On Offer</div>
				</div>
				<!-- Stat 3 -->
				<div
					class="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/20"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.3s"
				>
					<div class="mb-2 text-4xl font-extrabold text-white">4.6M+</div>
					<div class="font-medium text-blue-100">Certificates</div>
					<div class="mt-1 text-xs text-blue-200">Awarded</div>
				</div>
				<!-- Stat 4 -->
				<div
					class="rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/20"
					class:opacity-0={!statsVisible}
					class:translate-y-10={!statsVisible}
					class:opacity-100={statsVisible}
					class:translate-y-0={statsVisible}
					style="transition: all 0.8s ease-out; transition-delay: 0.4s"
				>
					<div class="mb-2 text-4xl font-extrabold text-white">21</div>
					<div class="font-medium text-blue-100">Schools</div>
					<div class="mt-1 text-xs text-blue-200">Of Studies</div>
				</div>
			</div>
		</div>
	</section>

	<section
		class="bg-gray-50 py-16"
		use:inView={{ callback: (visible) => (statsVisible2 = visible) }}
	>
		<div class="container mx-auto px-4">
			<div
				class="mb-12 text-center"
				class:opacity-0={!statsVisible2}
				class:translate-y-10={!statsVisible2}
				class:opacity-100={statsVisible2}
				class:translate-y-0={statsVisible2}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold text-[#004b87] md:text-4xl">
					Massive Reach & Infrastructure
				</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Unparalleled network designed to support learners wherever they are.
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-5">
				<!-- Infrastructure Stats -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 text-center shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					class:opacity-0={!statsVisible2}
					class:translate-y-5={!statsVisible2}
					class:opacity-100={statsVisible2}
					class:translate-y-0={statsVisible2}
					style="transition: all 0.5s ease-out; transition-delay: 0.1s"
				>
					<div class="mb-1 text-3xl font-bold text-[#00a2e8]">58</div>
					<div class="text-sm font-semibold text-gray-600 uppercase">Regional Centres</div>
				</div>
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 text-center shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					class:opacity-0={!statsVisible2}
					class:translate-y-5={!statsVisible2}
					class:opacity-100={statsVisible2}
					class:translate-y-0={statsVisible2}
					style="transition: all 0.5s ease-out; transition-delay: 0.2s"
				>
					<div class="mb-1 text-3xl font-bold text-[#00a2e8]">2,382</div>
					<div class="text-sm font-semibold text-gray-600 uppercase">Learner Support</div>
				</div>
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 text-center shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					class:opacity-0={!statsVisible2}
					class:translate-y-5={!statsVisible2}
					class:opacity-100={statsVisible2}
					class:translate-y-0={statsVisible2}
					style="transition: all 0.5s ease-out; transition-delay: 0.3s"
				>
					<div class="mb-1 text-3xl font-bold text-[#00a2e8]">25</div>
					<div class="text-sm font-semibold text-gray-600 uppercase">Overseas Centres</div>
				</div>
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 text-center shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					class:opacity-0={!statsVisible2}
					class:translate-y-5={!statsVisible2}
					class:opacity-100={statsVisible2}
					class:translate-y-0={statsVisible2}
					style="transition: all 0.5s ease-out; transition-delay: 0.4s"
				>
					<div class="mb-1 text-3xl font-bold text-[#00a2e8]">340</div>
					<div class="text-sm font-semibold text-gray-600 uppercase">MOOC Courses</div>
				</div>
				<div
					class="col-span-2 rounded-xl border border-gray-100 bg-white p-6 text-center shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-1"
					class:opacity-0={!statsVisible2}
					class:translate-y-5={!statsVisible2}
					class:opacity-100={statsVisible2}
					class:translate-y-0={statsVisible2}
					style="transition: all 0.5s ease-out; transition-delay: 0.5s"
				>
					<div class="mb-1 text-3xl font-bold text-[#00a2e8]">7</div>
					<div class="text-sm font-semibold text-gray-600 uppercase">DTH Channels</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Highlights Section -->
	<section
		class="bg-white py-16"
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
				<h2 class="mb-4 text-3xl font-bold text-[#004b87] md:text-4xl">University Highlights</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Key information about accreditations, courses, and eligibility.
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- Accreditation -->
				<div
					class="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
					class:opacity-0={!highlightsVisible}
					class:translate-y-5={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.5s ease-out; transition-delay: 0.1s"
				>
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
					>
						<svg
							class="h-6 w-6 text-[#004b87]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold text-gray-900">Accreditation</h3>
					<p class="font-bold text-[#00a2e8]">UGC-DEB & NAAC A++</p>
					<p class="mt-1 text-sm text-gray-600">Fully Approved & Accredited</p>
				</div>

				<!-- Established -->
				<div
					class="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
					class:opacity-0={!highlightsVisible}
					class:translate-y-5={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.5s ease-out; transition-delay: 0.2s"
				>
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
					>
						<svg
							class="h-6 w-6 text-[#004b87]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold text-gray-900">Established</h3>
					<p class="font-bold text-[#00a2e8]">1985</p>
					<p class="mt-1 text-sm text-gray-600">Decades of Excellence</p>
				</div>

				<!-- Courses Offered -->
				<div
					class="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
					class:opacity-0={!highlightsVisible}
					class:translate-y-5={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.5s ease-out; transition-delay: 0.3s"
				>
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
					>
						<svg
							class="h-6 w-6 text-[#004b87]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold text-gray-900">Courses Offered</h3>
					<p class="font-bold text-[#00a2e8]">MBA, BBA, M.Com, MA, BA & more</p>
					<p class="mt-1 text-sm text-gray-600">Wide Range of Programs</p>
				</div>

				<!-- Eligibility -->
				<div
					class="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
					class:opacity-0={!highlightsVisible}
					class:translate-y-5={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.5s ease-out; transition-delay: 0.4s"
				>
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
					>
						<svg
							class="h-6 w-6 text-[#004b87]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold text-gray-900">Eligibility</h3>
					<p class="font-bold text-[#00a2e8]">Min 50% in Graduation</p>
					<p class="mt-1 text-sm text-gray-600">For MBA (Varies by Course)</p>
				</div>

				<!-- Certification / Weightage -->
				<div
					class="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
					class:opacity-0={!highlightsVisible}
					class:translate-y-5={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.5s ease-out; transition-delay: 0.5s"
				>
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
					>
						<svg
							class="h-6 w-6 text-[#004b87]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold text-gray-900">Certification</h3>
					<p class="font-bold text-[#00a2e8]">Min 45% Marks</p>
					<p class="mt-1 text-sm text-gray-600">Required for Some Programs</p>
				</div>

				<!-- Placement -->
				<div
					class="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
					class:opacity-0={!highlightsVisible}
					class:translate-y-5={!highlightsVisible}
					class:opacity-100={highlightsVisible}
					class:translate-y-0={highlightsVisible}
					style="transition: all 0.5s ease-out; transition-delay: 0.6s"
				>
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
					>
						<svg
							class="h-6 w-6 text-[#004b87]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold text-gray-900">Placement</h3>
					<p class="font-bold text-[#00a2e8]">Independent Application</p>
					<p class="mt-1 text-sm text-gray-600">No Direct Placement Support</p>
				</div>
			</div>
		</div>
	</section>

	<section
		class="bg-gray-50 py-16"
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
				<h2 class="mb-4 text-3xl font-bold text-[#004b87] md:text-4xl">
					Highly Affordable Education
				</h2>
				<p class="text-gray-600">
					Making quality education accessible to everyone with highly subsidized and affordable fee
					structures.
				</p>
			</div>

			<div
				class="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-[#f8fbff] to-[#e6f3ff] p-8 shadow-xl md:p-12"
				class:opacity-0={!admissionVisible}
				class:scale-95={!admissionVisible}
				class:opacity-100={admissionVisible}
				class:scale-100={admissionVisible}
				style="transition: all 0.8s ease-out; transition-delay: 0.2s"
			>
				<!-- Decorative elements -->
				<div
					class="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full bg-[#004b87] opacity-5 blur-3xl"
				></div>
				<div
					class="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#00a2e8] opacity-10 blur-3xl"
				></div>

				<div class="relative z-10 grid items-center gap-8 md:grid-cols-2">
					<div>
						<h3 class="mb-6 text-2xl font-bold text-[#004b87]">Fee Structure Breakdown</h3>
						<div class="space-y-4">
							<div
								class="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
							>
								<span class="font-semibold text-gray-700">Registration Fee</span>
								<span class="text-xl font-bold text-[#00a2e8]">₹300</span>
							</div>
							<div
								class="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
							>
								<span class="font-semibold text-gray-700">Examination Fee</span>
								<span class="text-xl font-bold text-[#00a2e8]">₹3,000</span>
							</div>
							<div
								class="mt-6 flex items-center justify-between rounded-xl bg-[#004b87] p-5 text-white shadow-md"
							>
								<span class="text-lg font-bold">Total Program Fees</span>
								<span class="text-3xl font-extrabold">{pick(fee.total, '₹66,000')}</span>
							</div>
						</div>
					</div>

					<div
						class="border-t border-blue-200 pt-8 text-center md:border-t-0 md:border-l md:pt-0 md:pl-8 md:text-left"
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-[#004b87] shadow-inner md:mx-0"
						>
							<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h4 class="mb-3 text-xl font-bold text-gray-900">Simple Admission Process</h4>
						<p class="mb-6 text-gray-600">
							Apply online through the SAMARTH portal, submit required documents digitally, and
							confirm payment to get your enrollment number.
						</p>
						<button
							on:click={openForm}
							class="w-full rounded-full bg-[#004b87] px-8 py-3 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#003865] hover:shadow-xl md:w-auto"
						>
							Apply Online Now
						</button>
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
		background-color: #004b87 !important;
	}
	:global(.navbar-wrapper .hover\:bg-orange-600:hover) {
		background-color: #003865 !important;
	}
	:global(.navbar-wrapper .text-orange-500) {
		color: #004b87 !important;
	}
	:global(.footer-wrapper .bg-orange-500) {
		background-color: #004b87 !important;
	}
	:global(.footer-wrapper .hover\:text-orange-500:hover) {
		color: #003865 !important;
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

	.animate-fade-in {
		animation: fade-in 1s ease-out;
	}

	.animate-slide-up {
		animation: slide-up 0.8s ease-out forwards;
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-pulse,
		.animate-bounce,
		.animate-slide-up,
		.animate-fade-in {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
