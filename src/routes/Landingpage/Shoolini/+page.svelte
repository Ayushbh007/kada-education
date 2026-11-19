<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { Formpopup } from '$components';
	import { page } from '$app/stores';
	import { getFee, pick } from '$lib/fees';

	// Live fees from the Google Sheet (falls back to the values written in the markup)
	$: fee = getFee($page.data.fees, 'shoolini');
	import { onMount } from 'svelte';

	let showForm = false;

	function openForm() {
		showForm = true;
	}

	function closeForm() {
		showForm = false;
	}

	function handleFormSubmit(
		event: CustomEvent<{ name: string; email: string; contactNo: string }>
	) {
		console.log('Form submitted with data:', event.detail);
		// Handle the form submission
	}

	const shooliniImages = ['/Images/shoolini/shoolini01.png', '/Images/shoolini/shoolini03.jpeg'];

	let isVisible = false;

	// Intersection Observer setup
	function inView(element: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(element);
					}
				});
			},
			{
				threshold: 0.2 // 20% of the element needs to be visible
			}
		);

		observer.observe(element);

		return {
			destroy() {
				observer.unobserve(element);
			}
		};
	}
</script>

<main class="flex min-h-screen flex-col">
	<div class="relative">
		<HeroSection images={shooliniImages} overlayOpacity={40}>
			<div class="animate-fade-in max-w-3xl px-4 text-center">
				<div
					class="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-600 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md"
				>
					PAY-AFTER-PLACEMENT
				</div>
				<h1 class="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
					Online MBA
				</h1>
				<p class="mb-2 text-base font-medium text-gray-200 sm:text-lg md:text-xl">
					Master of Business Administration
				</p>
				<p class="mb-6 text-sm font-bold tracking-wide text-pink-400 uppercase sm:text-base">
					Shoolini University — India's No. 1 Private University
				</p>
				<button
					on:click={openForm}
					class="inline-flex items-center gap-2 rounded-full bg-pink-600 px-7 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-pink-700 hover:shadow-xl sm:text-base"
				>
					Apply Now
				</button>
			</div>
		</HeroSection>

		<!-- Navbar overlayed on top -->
		<div class="pointer-events-none absolute inset-x-0 top-0 z-20">
			<div class="navbar-wrapper pointer-events-auto">
				<Navbar />
			</div>
		</div>
	</div>

	<!-- Why Choose Shoolini Section -->
	<section class="bg-white py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<div class="mb-6 flex items-center justify-center gap-4">
					<img
						src="/Images/shoolini/shoolini logo.png"
						alt="Shoolini University Logo"
						class="h-16"
					/>
					<div>
						<h2 class="text-3xl font-bold text-gray-900 md:text-4xl">Shoolini University</h2>
						<div class="mt-2 flex items-center justify-center gap-2">
							<span class="font-bold text-pink-600">Online Degrees</span>
							<span class="rounded bg-blue-600 px-2 py-1 text-sm text-white">NAAC A+</span>
							<span class="text-gray-600">UGC Entitled</span>
						</div>
					</div>
				</div>
				<p class="mx-auto max-w-2xl text-gray-600">
					Join India's No. 1 Private University and experience world-class education with our
					innovative Pay-After-Placement program
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- NAAC A+ Card -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
						<svg
							class="h-6 w-6 text-pink-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">NAAC A+ Accredited</h3>
					<p class="text-gray-600">
						Top-ranked institution recognized for academic excellence and innovative teaching
						methodologies.
					</p>
				</div>

				<!-- Global Rankings Card -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
						<svg
							class="h-6 w-6 text-pink-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Global Recognition</h3>
					<p class="text-gray-600">
						Partnerships with leading international universities and research institutions
						worldwide.
					</p>
				</div>

				<!-- Research Excellence Card -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
						<svg
							class="h-6 w-6 text-pink-600"
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
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Research Excellence</h3>
					<p class="text-gray-600">
						Leading research output with state-of-the-art laboratories and innovation centers.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Key Features Section -->
	<section class="bg-gray-50 py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-pink-600 md:text-4xl">Program Highlights</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Experience world-class education with our industry-leading MBA program
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
				<!-- Duration -->
				<div class="rounded-xl bg-white p-6 text-center shadow-lg">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100"
					>
						<svg
							class="h-6 w-6 text-pink-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Duration</h3>
					<p class="font-bold text-pink-600">2 YEARS</p>
					<p class="text-sm text-gray-600">Total of 4 Semesters</p>
				</div>

				<!-- Mode -->
				<div class="rounded-xl bg-white p-6 text-center shadow-lg">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100"
					>
						<svg
							class="h-6 w-6 text-pink-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Mode</h3>
					<p class="font-bold text-pink-600">100% ONLINE</p>
					<p class="text-sm text-gray-600">LIVE + RECORDED Sessions</p>
				</div>

				<!-- Fees -->
				<div class="rounded-xl bg-white p-6 text-center shadow-lg">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100"
					>
						<svg
							class="h-6 w-6 text-pink-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Fees</h3>
					<p class="font-bold text-pink-600">{pick(fee.semester, '₹30,000')}</p>
					<p class="text-sm text-gray-600">Per Semester</p>
				</div>

				<!-- Placement -->
				<div class="rounded-xl bg-white p-6 text-center shadow-lg">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100"
					>
						<svg
							class="h-6 w-6 text-pink-600"
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
					<h3 class="mb-2 font-bold">Placement</h3>
					<p class="font-bold text-pink-600">100% SUPPORT</p>
					<p class="text-sm text-gray-600">Expert Placement Services</p>
				</div>

				<!-- International Options -->
				<div class="rounded-xl bg-white p-6 text-center shadow-lg">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100"
					>
						<svg
							class="h-6 w-6 text-pink-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
							/>
						</svg>
					</div>
					<h3 class="mb-2 font-bold">Free Add on Course</h3>
					<p class="font-bold text-pink-600">Free Course</p>
					<p class="text-sm text-gray-600">Like Adda 24x7, Study IQ, Preinsta</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Programs Section -->
	<section class="bg-white py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">World-Class Programs</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Choose from our diverse range of internationally recognized programs
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				<!-- MCA Program -->
				<div
					class="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="h-48 bg-pink-600">
						<img
							src="/Images/shoolini/shoolinimca.png"
							alt="Engineering programs"
							class="h-full w-full object-contain"
						/>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">MCA Program</h3>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Fees - ₹1,50,000
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Duration: 2 Years
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Eligibility : Bachelor's with 50% marks.
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Mode: Online
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg bg-pink-600 py-2 text-white transition-colors hover:bg-pink-700"
						>
							Apply Now
						</button>
					</div>
				</div>

				<!-- BBA Program -->
				<div
					class="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="h-48 bg-pink-600">
						<img
							src="/Images/shoolini/shoolinibba.png"
							alt="Management programs"
							class="h-full w-full object-contain"
						/>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">BBA Program</h3>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Fees - ₹106,500
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Duration: 3 Years
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Eligibility: 10+2 with 40% marks.
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Mode: Online
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg bg-pink-600 py-2 text-white transition-colors hover:bg-pink-700"
						>
							Apply Now
						</button>
					</div>
				</div>

				<!-- BCA Program -->
				<div
					class="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="h-48 bg-pink-600">
						<img
							src="/Images/shoolini/shoolinibca.png"
							alt="Research programs"
							class="h-full w-full object-contain"
						/>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">BCA Programs</h3>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 text-orange-500">•</span>
								Fees - ₹1,06,500
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-orange-500">•</span>
								Duration: 3 Years
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-orange-500">•</span>
								Eligibility : 10+2 with 40% marks.
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-orange-500">•</span>
								Mode: Online
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg bg-pink-600 py-2 text-white transition-colors hover:bg-pink-700"
						>
							Apply Now
						</button>
					</div>
				</div>
				<!-- MBA Program -->
				<div
					class="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="h-48 bg-pink-600">
						<img
							src="/Images/shoolini/shoolinimba.png"
							alt="Engineering programs"
							class="h-full w-full object-contain"
						/>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold text-gray-900">MBA Program</h3>
						<ul class="mb-4 space-y-2 text-gray-600">
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Fees - ₹1,50,000
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Duration: 2 Years
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Eligibility : Bachelor's with 50% marks.
							</li>
							<li class="flex items-center">
								<span class="mr-2 text-pink-600">•</span>
								Mode: Online
							</li>
						</ul>
						<button
							on:click={openForm}
							class="w-full rounded-lg bg-pink-600 py-2 text-white transition-colors hover:bg-pink-700"
						>
							Apply Now
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="bg-gray-900 py-16 text-white">
		<div class="container mx-auto px-4">
			<div class="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center md:grid-cols-4">
				<div>
					<div class="mb-2 text-4xl font-bold text-pink-600">20+</div>
					<div class="text-gray-300">Years of Excellence</div>
				</div>
				<div>
					<div class="mb-2 text-4xl font-bold text-pink-600">15k+</div>
					<div class="text-gray-300">Students</div>
				</div>
				<div>
					<div class="mb-2 text-4xl font-bold text-pink-600">500+</div>
					<div class="text-gray-300">Faculty Members</div>
				</div>
				<div>
					<div class="mb-2 text-4xl font-bold text-pink-600">50+</div>
					<div class="text-gray-300">Research Centers</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Admission Process Section -->
	<section class="bg-gray-50 py-16">
		<div class="container mx-auto px-4" use:inView>
			<div
				class="mx-auto mb-12 max-w-2xl text-center"
				class:opacity-0={!isVisible}
				class:translate-y-10={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold text-pink-600 md:text-4xl">
					Student Admission Process and Assistance from us
				</h2>
				<p class="text-gray-600">
					We guide you through every step of your admission journey at Shoolini University, ensuring
					a smooth and hassle-free process.
				</p>
			</div>

			<div class="grid items-center gap-8 md:grid-cols-2">
				<!-- Image Section -->
				<div
					class="transform overflow-hidden rounded-lg shadow-lg"
					class:opacity-0={!isVisible}
					class:translate-x-[-100px]={!isVisible}
					class:opacity-100={isVisible}
					class:translate-x-0={isVisible}
					style="transition: all 0.8s ease-out"
				>
					<img
						src="/Images/shoolini/shoolini02.png"
						alt="Shoolini University admission process"
						class="h-full w-full object-cover"
					/>
				</div>

				<!-- Process Steps -->
				<div
					class="transform space-y-6"
					class:opacity-0={!isVisible}
					class:translate-x-[100px]={!isVisible}
					class:opacity-100={isVisible}
					class:translate-x-0={isVisible}
					style="transition: all 0.8s ease-out"
				>
					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 rounded-full bg-pink-600 p-2">
							<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								/>
							</svg>
						</div>
						<span class="text-lg text-gray-800">Complete everything as ordered</span>
					</div>

					<!-- Repeat the rest of the steps -->
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonial Section -->
	<section class="bg-gray-900 py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-pink-600 md:text-4xl">
					What Our Students Say About Us
				</h2>
				<p class="mx-auto max-w-2xl text-gray-400">
					Hear from our students about their experience with Shoolini University and how it
					transformed their careers.
				</p>
			</div>

			<div class="relative mx-auto max-w-3xl">
				<!-- Navigation Buttons -->
				<button
					class="absolute top-1/2 left-0 z-10 -translate-x-12 -translate-y-1/2 text-pink-600 transition-colors hover:text-pink-500"
					aria-label="Previous testimonial"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					class="absolute top-1/2 right-0 z-10 translate-x-12 -translate-y-1/2 text-pink-600 transition-colors hover:text-pink-500"
					aria-label="Next testimonial"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>

				<!-- Testimonial Card -->
				<div class="px-8 text-center md:px-12">
					<div class="mb-8">
						<img
							src="/Images/shoolini/student.png"
							alt="Student testimonial"
							class="mx-auto h-20 w-20 rounded-full border-4 border-pink-600 object-cover"
						/>
					</div>
					<h3 class="mb-1 text-xl font-semibold text-pink-600">Anshika Pandey</h3>
					<p class="mb-6 text-sm text-gray-400">MBA Graduate</p>
					<p class="leading-relaxed text-gray-300">
						"Studying at Shoolini University was a transformative experience. The cutting-edge
						facilities and supportive faculty helped me achieve my career goals. The beautiful
						campus in the Himalayas provided the perfect environment for learning."
					</p>
				</div>
			</div>
		</div>
	</section>

	<div class="footer-wrapper">
		<Footer />
	</div>
</main>

{#if showForm}
	<Formpopup on:close={closeForm} on:submit={handleFormSubmit} />
{/if}

<style lang="postcss">
	/* Override Navbar styles specifically for this page */
	:global(.navbar-wrapper .bg-orange-500) {
		background-color: rgb(219 39 119) !important; /* bg-pink-600 */
	}

	:global(.navbar-wrapper .hover\:bg-orange-600:hover) {
		background-color: rgb(190 24 93) !important; /* bg-pink-700 */
	}

	:global(.navbar-wrapper .text-orange-500) {
		color: rgb(219 39 119) !important; /* text-pink-600 */
	}

	:global(.navbar-wrapper .hover\:text-orange-600:hover) {
		color: rgb(190 24 93) !important; /* text-pink-700 */
	}

	/* Override Footer styles locally */
	:global(.footer-wrapper .bg-orange-500) {
		background-color: rgb(219 39 119) !important; /* bg-pink-600 */
	}

	:global(.footer-wrapper .hover\:bg-orange-600:hover) {
		background-color: rgb(190 24 93) !important; /* bg-pink-700 */
	}
</style>
