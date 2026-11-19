<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { Formpopup } from '$components';
	import { page } from '$app/stores';
	import { getFee, pick } from '$lib/fees';

	// Live fees from the Google Sheet (falls back to the values written in the markup)
	$: muj = getFee($page.data.fees, 'manipal-jaipur');
	$: smu = getFee($page.data.fees, 'sikkim-manipal');
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

	const manipalImages = [
		'/Images/Manipalimages/manipal01.png',
		'/Images/Manipalimages/manipal02.png',
		'/Images/Manipalimages/manipal03.png'
	].map((img) => img.split('&')[0]);

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
		<HeroSection images={manipalImages} overlayOpacity={45}>
			<div class="animate-fade-in max-w-3xl px-4 text-center">
				<div
					class="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-md"
				>
					NAAC GRADE A+ • UGC-ENTITLED
				</div>
				<h1 class="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
					Online Degree Programs
				</h1>
				<p class="mb-2 text-base font-medium text-gray-200 sm:text-lg md:text-xl">
					Globally Recognized MBA, MCA, BBA & BCA
				</p>
				<p class="mb-6 text-sm font-bold tracking-wide text-orange-400 uppercase sm:text-base">
					Manipal University Jaipur / Online
				</p>
				<button
					on:click={openForm}
					class="inline-flex items-center gap-2 rounded-full bg-orange-600 px-7 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-700 hover:shadow-xl sm:text-base"
				>
					Apply Now
				</button>
			</div>
		</HeroSection>

		<!-- Navbar overlayed on top -->
		<div class="pointer-events-none absolute inset-x-0 top-0 z-20">
			<div class="pointer-events-auto">
				<Navbar />
			</div>
		</div>
	</div>

	<!-- Admission Process Section -->
	<section class="overflow-hidden bg-gray-50 py-16">
		<div class="container mx-auto px-4" use:inView>
			<div
				class="mx-auto mb-12 max-w-2xl text-center"
				class:opacity-0={!isVisible}
				class:translate-y-10={!isVisible}
				class:opacity-100={isVisible}
				class:translate-y-0={isVisible}
				style="transition: all 0.8s ease-out"
			>
				<h2 class="mb-4 text-3xl font-bold text-orange-500 md:text-4xl">
					Student Admission Process and Assistance from us
				</h2>
				<p class="text-gray-600">
					We guide you through every step of your admission journey at Manipal University, ensuring
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
						src="/Images/Manipalimages/manipal04.jpg"
						alt="Manipal University admission process"
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
						<div class="flex-shrink-0 rounded-full bg-orange-500 p-2">
							<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								/>
							</svg>
						</div>
						<span class="text-lg text-gray-800">Complete everything as ordered</span>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 rounded-full bg-orange-500 p-2">
							<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								/>
							</svg>
						</div>
						<span class="text-lg text-gray-800">Provide your last exam result</span>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 rounded-full bg-orange-500 p-2">
							<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								/>
							</svg>
						</div>
						<span class="text-lg text-gray-800">Choose your desired program</span>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 rounded-full bg-orange-500 p-2">
							<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								/>
							</svg>
						</div>
						<span class="text-lg text-gray-800">Get contact with the instructor</span>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex-shrink-0 rounded-full bg-orange-500 p-2">
							<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								/>
							</svg>
						</div>
						<span class="text-lg text-gray-800">Finally get started your program</span>
					</div>

					<div class="mt-8">
						<button
							on:click={openForm}
							class="inline-block rounded-full bg-orange-500 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
						>
							See all our admission
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Why Choose Manipal Section -->
	<section class="bg-white py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
					Why Choose Manipal University?
				</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Join one of India's most prestigious educational institutions with a legacy of excellence
					spanning over 70 years
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- NAAC A+ Card -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
						<svg
							class="h-6 w-6 text-orange-500"
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
						Highest grade of excellence by National Assessment and Accreditation Council,
						recognizing our outstanding academic standards.
					</p>
				</div>

				<!-- Global Rankings Card -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
						<svg
							class="h-6 w-6 text-orange-500"
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
						Ranked among top universities globally with strong international collaborations and
						worldwide alumni network.
					</p>
				</div>

				<!-- Industry Connection Card -->
				<div
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
						<svg
							class="h-6 w-6 text-orange-500"
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
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Industry Connections</h3>
					<p class="text-gray-600">
						Strong industry partnerships ensuring high placement rates and internship opportunities
						with leading companies.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Programs Section -->
	<section class="bg-gray-50 py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">World-Class Programs</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Choose from our diverse range of internationally recognized programs designed for the
					future
				</p>
			</div>

			<div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
				<!-- Manipal Jaipur -->
				<div
					class="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="h-48 bg-orange-500">
						<img
							src="/Images/Manipalimages/manipal02.png"
							alt="Manipal Jaipur"
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="p-6">
						<h3 class="mb-4 text-xl font-bold text-gray-900">Manipal University Jaipur (MUJ)</h3>
						<div class="mb-6 rounded-lg bg-orange-50 p-4">
							<ul class="space-y-3 text-gray-700">
								<li class="flex items-center justify-between border-b border-orange-100 pb-2">
									<span class="font-medium">Total Fees:</span>
									<span class="text-lg font-bold text-orange-600">{pick(muj.total, '₹1,80,000')}</span>
								</li>
								<li class="flex items-center justify-between border-b border-orange-100 pb-2">
									<span class="font-medium">Annual Fees:</span>
									<span class="font-semibold">{pick(muj.annual, '₹90,000')}</span>
								</li>
								<li class="flex items-center justify-between">
									<span class="font-medium">Semester Fees:</span>
									<span class="font-semibold">{pick(muj.semester, '₹45,000')}</span>
								</li>
							</ul>
						</div>
						<button
							on:click={openForm}
							class="w-full transform rounded-lg bg-orange-500 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
						>
							Apply Now
						</button>
					</div>
				</div>

				<!-- Sikkim Manipal -->
				<div
					class="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
				>
					<div class="h-48 bg-orange-500">
						<img
							src="/Images/Manipalimages/manipal03.png"
							alt="Sikkim Manipal"
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="p-6">
						<h3 class="mb-4 text-xl font-bold text-gray-900">Sikkim Manipal University (SMU)</h3>
						<div class="mb-6 rounded-lg bg-orange-50 p-4">
							<ul class="space-y-3 text-gray-700">
								<li class="flex items-center justify-between border-b border-orange-100 pb-2">
									<span class="font-medium">Total Fees:</span>
									<span class="text-lg font-bold text-orange-600">{pick(smu.total, '₹1,20,000')}</span>
								</li>
								<li class="flex items-center justify-between border-b border-orange-100 pb-2">
									<span class="font-medium">Annual Fees:</span>
									<span class="font-semibold">{pick(smu.annual, '₹60,000')}</span>
								</li>
								<li class="flex items-center justify-between">
									<span class="font-medium">Semester Fees:</span>
									<span class="font-semibold">{pick(smu.semester, '₹30,000')}</span>
								</li>
							</ul>
						</div>
						<button
							on:click={openForm}
							class="w-full transform rounded-lg bg-orange-500 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
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
					<div class="mb-2 text-4xl font-bold text-orange-500">50+</div>
					<div class="text-gray-300">Years of Excellence</div>
				</div>
				<div>
					<div class="mb-2 text-4xl font-bold text-orange-500">25k+</div>
					<div class="text-gray-300">Students</div>
				</div>
				<div>
					<div class="mb-2 text-4xl font-bold text-orange-500">2500+</div>
					<div class="text-gray-300">Faculty Members</div>
				</div>
				<div>
					<div class="mb-2 text-4xl font-bold text-orange-500">100+</div>
					<div class="text-gray-300">Industry Partners</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Placement Partners Section -->
	<section class="bg-white py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Our Placement Partners</h2>
				<p class="mx-auto max-w-2xl text-gray-600">
					Our students are placed in leading companies worldwide
				</p>
			</div>

			<div
				class="mx-auto grid max-w-6xl grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-4"
			>
				<!-- Replace these with actual company logos -->
				<div class="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 p-4">
					<span class="font-semibold text-gray-500">Company 1</span>
				</div>
				<div class="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 p-4">
					<span class="font-semibold text-gray-500">Company 2</span>
				</div>
				<div class="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 p-4">
					<span class="font-semibold text-gray-500">Company 3</span>
				</div>
				<div class="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 p-4">
					<span class="font-semibold text-gray-500">Company 4</span>
				</div>
			</div>

			<div class="mt-12 text-center">
				<button
					on:click={openForm}
					class="inline-block rounded-full bg-orange-500 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
				>
					Start Your Career Journey
				</button>
			</div>
		</div>
	</section>

	<!-- Research and Innovation Section -->
	<section class="bg-gray-50 py-16">
		<div class="container mx-auto px-4">
			<div class="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
				<div>
					<h2 class="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
						Research & Innovation Hub
					</h2>
					<p class="mb-6 text-gray-600">
						At Manipal University, we foster a culture of innovation and research excellence. Our
						state-of-the-art facilities and expert faculty members guide students in groundbreaking
						research across multiple disciplines.
					</p>
					<ul class="mb-8 space-y-4">
						<li class="flex items-start">
							<span class="mr-3 text-orange-500">✓</span>
							<span class="text-gray-600">Advanced Research Centers</span>
						</li>
						<li class="flex items-start">
							<span class="mr-3 text-orange-500">✓</span>
							<span class="text-gray-600">International Research Collaborations</span>
						</li>
						<li class="flex items-start">
							<span class="mr-3 text-orange-500">✓</span>
							<span class="text-gray-600">Industry-Sponsored Projects</span>
						</li>
					</ul>
					<button
						on:click={openForm}
						class="rounded-full bg-orange-500 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-orange-600"
					>
						Explore Research Opportunities
					</button>
				</div>
				<div class="overflow-hidden rounded-xl shadow-lg">
					<img
						src="/Images/Manipalimages/manipal04.jpg"
						alt="Research facilities"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonial Section -->
	<section class="bg-gray-900 py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold text-orange-500 md:text-4xl">
					What Our Students Say About Us
				</h2>
				<p class="mx-auto max-w-2xl text-gray-400">
					Hear from our students about their experience with Manipal University and how it
					transformed their careers.
				</p>
			</div>

			<div class="relative mx-auto max-w-3xl">
				<!-- Navigation Buttons -->
				<button
					class="absolute top-1/2 left-0 z-10 -translate-x-12 -translate-y-1/2 text-orange-500 transition-colors hover:text-orange-400"
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
					class="absolute top-1/2 right-0 z-10 translate-x-12 -translate-y-1/2 text-orange-500 transition-colors hover:text-orange-400"
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
							src="/Images/Manipalimages/student1.jpg"
							alt="Student testimonial"
							class="mx-auto h-20 w-20 rounded-full border-4 border-orange-500 object-cover"
						/>
					</div>
					<h3 class="mb-1 text-xl font-semibold text-orange-500">Carmen Hodkiewicz</h3>
					<p class="mb-6 text-sm text-gray-400">Global Markets Engineer</p>
					<p class="leading-relaxed text-gray-300">
						"The education and support I received at Manipal University were exceptional. The
						faculty's expertise and the practical approach to learning helped me develop the skills
						I needed for my career. I'm proud to be a Manipal alumnus."
					</p>
				</div>
			</div>
		</div>
	</section>

	<Footer />
</main>

{#if showForm}
	<Formpopup on:close={closeForm} on:submit={handleFormSubmit} />
{/if}

<style>
	/* Add any component-specific styles here */
</style>
