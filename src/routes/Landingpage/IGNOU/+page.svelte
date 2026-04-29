<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { Formpopup } from '$components';
	import { onMount, tick } from 'svelte';

	let showForm = false;
	let formPopup: { openModal?: () => void; closeModal?: () => void } | null = null;

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

	function handleFormSubmit(event: CustomEvent<{ name: string; email: string; contactNo: string }>) {
		console.log('Form submitted with data:', event.detail);
	}

	const ignouImages = [
		'/Images/IGNOU/ignou_hero.png',
		'/Images/IGNOU/ignou_campus.png'
	];

	let universityVisible = false;
	let statsVisible = false;
	let statsVisible2 = false;
	let admissionVisible = false;

	function inView(node: HTMLElement, params: { callback: (visible: boolean) => void }) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
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

<main class="min-h-screen flex flex-col font-sans">
	<div class="relative">
		<HeroSection images={ignouImages} overlayOpacity={40}>
			<div class="text-center max-w-4xl px-4 animate-fade-in">
				<div class="inline-block text-[#004b87] bg-white px-6 py-2 rounded-full mb-4 font-bold text-xl shadow-lg animate-bounce uppercase tracking-wider">The People's University</div>
				<h1 class="text-4xl md:text-6xl font-bold mb-4 animate-slide-up text-white" style="animation-delay: 0.2s">IGNOU</h1>
				<p class="text-2xl md:text-3xl mb-2 animate-slide-up text-white font-light" style="animation-delay: 0.4s">Indira Gandhi National Open University</p>
				<p class="text-xl md:text-2xl mb-6 animate-slide-up text-[#cce8ff]" style="animation-delay: 0.6s">Grooming leaders who are thorough professionals and good human beings.</p>
				
				<button
					on:click={openForm}
					class="text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 inline-block hover:bg-[#003865] hover:scale-105 hover:shadow-2xl animate-pulse"
					style="background-color: #004b87; animation-delay: 1s"
					aria-expanded={showForm}
					aria-controls="contact-modal"
				>
					Enquire / Apply
				</button>
			</div>
		</HeroSection>

		<div class="pointer-events-none absolute inset-x-0 top-0 z-20">
			<div class="pointer-events-auto navbar-wrapper">
				<Navbar />
			</div>
		</div>
	</div>

	<section class="py-20 bg-white" use:inView={{ callback: (visible) => universityVisible = visible }}>
		<div class="container mx-auto px-4">
			<div class="text-center mb-16"
				class:opacity-0={!universityVisible}
				class:translate-y-10={!universityVisible}
				class:opacity-100={universityVisible}
				class:translate-y-0={universityVisible}
				style="transition: all 0.8s ease-out"
			>
				<div class="flex justify-center items-center gap-4 mb-6">
					<img src="/Images/IGNOU/ignou_logo.png" alt="IGNOU Logo" class="h-24 object-contain shadow-sm rounded-full bg-white p-2 animate-pulse" />
					<div class="text-left">
						<h2 class="text-3xl md:text-4xl font-extrabold text-[#004b87] uppercase tracking-tight">IGNOU</h2>
						<div class="flex flex-wrap items-center gap-2 mt-2">
							<span class="font-semibold text-gray-700">World's Largest Open University</span>
							<span class="bg-[#004b87] text-white px-3 py-1 rounded-full text-sm shadow-md animate-bounce">A++ Grade</span>
						</div>
					</div>
				</div>
				<p class="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">Indira Gandhi National Open University is uniquely positioned to democratize higher education by taking it to the doorsteps of the learners, providing access to high-quality education to all those who seek it irrespective of age, region, religion and gender.</p>
			</div>
		</div>
	</section>

	<section class="py-16 bg-[#004b87] relative overflow-hidden" use:inView={{ callback: (visible) => statsVisible = visible }}>
		<div class="absolute inset-0 opacity-10 bg-[url('/Images/IGNOU/ignou_campus.png')] bg-cover bg-center"></div>
		<div class="container mx-auto px-4 relative z-10">
			<div class="text-center mb-12"
				class:opacity-0={!statsVisible}
				class:translate-y-10={!statsVisible}
				class:opacity-100={statsVisible}
				class:translate-y-0={statsVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">University at a Glance</h2>
				<div class="w-24 h-1 bg-white mx-auto rounded-full"></div>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
				<!-- Stat 1 -->
				<div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
					class:opacity-0={!statsVisible} class:translate-y-10={!statsVisible} class:opacity-100={statsVisible} class:translate-y-0={statsVisible} style="transition: all 0.8s ease-out; transition-delay: 0.1s">
					<div class="text-4xl font-extrabold text-white mb-2">21M+</div>
					<div class="text-blue-100 font-medium">Students Enrolled</div>
					<div class="text-xs text-blue-200 mt-1">Since Inception</div>
				</div>
				<!-- Stat 2 -->
				<div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
					class:opacity-0={!statsVisible} class:translate-y-10={!statsVisible} class:opacity-100={statsVisible} class:translate-y-0={statsVisible} style="transition: all 0.8s ease-out; transition-delay: 0.2s">
					<div class="text-4xl font-extrabold text-white mb-2">333</div>
					<div class="text-blue-100 font-medium">Programmes</div>
					<div class="text-xs text-blue-200 mt-1">On Offer</div>
				</div>
				<!-- Stat 3 -->
				<div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
					class:opacity-0={!statsVisible} class:translate-y-10={!statsVisible} class:opacity-100={statsVisible} class:translate-y-0={statsVisible} style="transition: all 0.8s ease-out; transition-delay: 0.3s">
					<div class="text-4xl font-extrabold text-white mb-2">4.6M+</div>
					<div class="text-blue-100 font-medium">Certificates</div>
					<div class="text-xs text-blue-200 mt-1">Awarded</div>
				</div>
				<!-- Stat 4 -->
				<div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
					class:opacity-0={!statsVisible} class:translate-y-10={!statsVisible} class:opacity-100={statsVisible} class:translate-y-0={statsVisible} style="transition: all 0.8s ease-out; transition-delay: 0.4s">
					<div class="text-4xl font-extrabold text-white mb-2">21</div>
					<div class="text-blue-100 font-medium">Schools</div>
					<div class="text-xs text-blue-200 mt-1">Of Studies</div>
				</div>
			</div>
		</div>
	</section>

	<section class="py-16 bg-gray-50" use:inView={{ callback: (visible) => statsVisible2 = visible }}>
		<div class="container mx-auto px-4">
			<div class="text-center mb-12"
				class:opacity-0={!statsVisible2}
				class:translate-y-10={!statsVisible2}
				class:opacity-100={statsVisible2}
				class:translate-y-0={statsVisible2}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="text-3xl md:text-4xl font-bold text-[#004b87] mb-4">Massive Reach & Infrastructure</h2>
				<p class="text-gray-600 max-w-2xl mx-auto">Unparalleled network designed to support learners wherever they are.</p>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
				<!-- Infrastructure Stats -->
				<div class="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1" class:opacity-0={!statsVisible2} class:translate-y-5={!statsVisible2} class:opacity-100={statsVisible2} class:translate-y-0={statsVisible2} style="transition: all 0.5s ease-out; transition-delay: 0.1s">
					<div class="text-3xl font-bold text-[#00a2e8] mb-1">58</div>
					<div class="text-sm text-gray-600 font-semibold uppercase">Regional Centres</div>
				</div>
				<div class="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1" class:opacity-0={!statsVisible2} class:translate-y-5={!statsVisible2} class:opacity-100={statsVisible2} class:translate-y-0={statsVisible2} style="transition: all 0.5s ease-out; transition-delay: 0.2s">
					<div class="text-3xl font-bold text-[#00a2e8] mb-1">2,382</div>
					<div class="text-sm text-gray-600 font-semibold uppercase">Learner Support</div>
				</div>
				<div class="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1" class:opacity-0={!statsVisible2} class:translate-y-5={!statsVisible2} class:opacity-100={statsVisible2} class:translate-y-0={statsVisible2} style="transition: all 0.5s ease-out; transition-delay: 0.3s">
					<div class="text-3xl font-bold text-[#00a2e8] mb-1">25</div>
					<div class="text-sm text-gray-600 font-semibold uppercase">Overseas Centres</div>
				</div>
				<div class="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1" class:opacity-0={!statsVisible2} class:translate-y-5={!statsVisible2} class:opacity-100={statsVisible2} class:translate-y-0={statsVisible2} style="transition: all 0.5s ease-out; transition-delay: 0.4s">
					<div class="text-3xl font-bold text-[#00a2e8] mb-1">340</div>
					<div class="text-sm text-gray-600 font-semibold uppercase">MOOC Courses</div>
				</div>
				<div class="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 col-span-2 md:col-span-1" class:opacity-0={!statsVisible2} class:translate-y-5={!statsVisible2} class:opacity-100={statsVisible2} class:translate-y-0={statsVisible2} style="transition: all 0.5s ease-out; transition-delay: 0.5s">
					<div class="text-3xl font-bold text-[#00a2e8] mb-1">7</div>
					<div class="text-sm text-gray-600 font-semibold uppercase">DTH Channels</div>
				</div>
			</div>
		</div>
	</section>

	<section class="py-16 bg-white" use:inView={{ callback: (visible) => admissionVisible = visible }}>
		<div class="container mx-auto px-4">
			<div class="text-center max-w-2xl mx-auto mb-12"
				class:opacity-0={!admissionVisible}
				class:translate-y-10={!admissionVisible}
				class:opacity-100={admissionVisible}
				class:translate-y-0={admissionVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="text-3xl md:text-4xl font-bold text-[#004b87] mb-4">Highly Affordable Education</h2>
				<p class="text-gray-600">Making quality education accessible to everyone with highly subsidized and affordable fee structures.</p>
			</div>

			<div class="max-w-4xl mx-auto bg-gradient-to-br from-[#f8fbff] to-[#e6f3ff] rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 relative overflow-hidden" class:opacity-0={!admissionVisible} class:scale-95={!admissionVisible} class:opacity-100={admissionVisible} class:scale-100={admissionVisible} style="transition: all 0.8s ease-out; transition-delay: 0.2s">
				<!-- Decorative elements -->
				<div class="absolute top-0 right-0 w-64 h-64 bg-[#004b87] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
				<div class="absolute bottom-0 left-0 w-64 h-64 bg-[#00a2e8] opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

				<div class="relative z-10 grid md:grid-cols-2 gap-8 items-center">
					<div>
						<h3 class="text-2xl font-bold text-[#004b87] mb-6">Fee Structure Breakdown</h3>
						<div class="space-y-4">
							<div class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
								<span class="font-semibold text-gray-700">Registration Fee</span>
								<span class="text-xl font-bold text-[#00a2e8]">₹300</span>
							</div>
							<div class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
								<span class="font-semibold text-gray-700">Examination Fee</span>
								<span class="text-xl font-bold text-[#00a2e8]">₹3,000</span>
							</div>
							<div class="flex justify-between items-center bg-[#004b87] p-5 rounded-xl shadow-md text-white mt-6">
								<span class="font-bold text-lg">Total Program Fees</span>
								<span class="text-3xl font-extrabold">₹66,000</span>
							</div>
						</div>
					</div>
					
					<div class="text-center md:text-left md:pl-8 border-t md:border-t-0 md:border-l border-blue-200 pt-8 md:pt-0">
						<div class="w-16 h-16 bg-blue-100 text-[#004b87] rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-inner">
							<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h4 class="text-xl font-bold text-gray-900 mb-3">Simple Admission Process</h4>
						<p class="text-gray-600 mb-6">Apply online through the SAMARTH portal, submit required documents digitally, and confirm payment to get your enrollment number.</p>
						<button on:click={openForm} class="bg-[#004b87] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#003865] hover:shadow-xl transition-all hover:-translate-y-1 w-full md:w-auto">
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
	<Formpopup bind:this={formPopup} autoOpen={false} on:close={closeForm} on:submit={handleFormSubmit} />
{/if}

<style lang="postcss">
	:global(.navbar-wrapper .bg-orange-500) { background-color: #004b87 !important; }
	:global(.navbar-wrapper .hover\:bg-orange-600:hover) { background-color: #003865 !important; }
	:global(.navbar-wrapper .text-orange-500) { color: #004b87 !important; }
	:global(.footer-wrapper .bg-orange-500) { background-color: #004b87 !important; }
	:global(.footer-wrapper .hover\:text-orange-500:hover) { color: #003865 !important; }

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slide-up {
		from { transform: translateY(30px); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}

	.animate-fade-in {
		animation: fade-in 1s ease-out;
	}

	.animate-slide-up {
		animation: slide-up 0.8s ease-out forwards;
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-pulse, .animate-bounce, .animate-slide-up, .animate-fade-in {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
