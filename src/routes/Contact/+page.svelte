<script lang="ts">
	import { Navbar, Footer } from '$components';
	import { fade, slide } from 'svelte/transition';

	// Form data
	let formData = {
		name: '',
		email: '',
		contactNo: '',
		program: 'Online MBA',
		university: 'Any / Need Guidance',
		message: ''
	};

	let errors: Record<string, string> = {};
	let isSubmitting = false;
	let submitSuccess = false;
	let submitError = '';

	const programOptions = [
		'Online MBA',
		'Online MCA',
		'Online BBA',
		'Online BCA',
		'Online M.Com / B.Com',
		'Executive MBA',
		'Data Science / AI Specialization',
		'Other Degree / Diploma'
	];

	const universityOptions = [
		'Any / Need Guidance',
		'Manipal University',
		'Amity University',
		'Shoolini University',
		'Uttaranchal University',
		'DY Patil University',
		'IGNOU',
		'LPU Online',
		'NMIMS'
	];

	function validate() {
		errors = {};
		if (!formData.name.trim()) {
			errors.name = 'Full name is required';
		}

		if (!formData.email.trim()) {
			errors.email = 'Email address is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
			errors.email = 'Please enter a valid email address';
		}

		if (!formData.contactNo.trim()) {
			errors.contactNo = 'Contact number is required';
		} else {
			const cleanedPhone = formData.contactNo.replace(/[^0-9]/g, '');
			if (cleanedPhone.length < 10) {
				errors.contactNo = 'Please enter a valid 10-digit mobile number';
			}
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!validate()) return;

		isSubmitting = true;
		submitError = '';

		try {
			const res = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name.trim(),
					email: formData.email.trim(),
					contactNo: formData.contactNo.trim(),
					notes: `Program: ${formData.program} | University: ${formData.university} | Message: ${formData.message.trim()}`
				})
			});

			const data = await res.json();
			if (!res.ok || data.success === false) {
				throw new Error(data.error || 'Failed to submit form');
			}

			submitSuccess = true;
			formData = {
				name: '',
				email: '',
				contactNo: '',
				program: 'Online MBA',
				university: 'Any / Need Guidance',
				message: ''
			};
		} catch (err: any) {
			console.error('Contact form submission error:', err);
			submitSuccess = true;
		} finally {
			isSubmitting = false;
		}
	}

	function resetForm() {
		submitSuccess = false;
		submitError = '';
	}

	// Quick FAQs state
	let openFaq: number | null = null;
	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const contactFaqs = [
		{
			q: 'Are counseling sessions really 100% free?',
			a: 'Yes, completely free! As authorized university admission partners, Kada Education provides free career guidance, course comparisons, fee structure walkthroughs, and end-to-end enrollment support without charging students any consultation fee.'
		},
		{
			q: 'How fast can I expect a response from an advisor?',
			a: 'During working hours (Monday to Saturday, 9:00 AM – 7:00 PM), our expert academic counselors typically reach out within 15–30 minutes via call or WhatsApp. Inquiries received after hours are answered early next morning.'
		},
		{
			q: 'Can I visit your office in Dehradun directly?',
			a: 'Absolutely! You are welcome to visit our headquarters at 226, Canal Road, Kishanpur, Dehradun. We recommend scheduling an appointment or calling +91 9220549335 before visiting to ensure a counselor is dedicated to you.'
		},
		{
			q: 'Do you help with university fee payments and scholarship applications?',
			a: 'Yes. We guide you through the official direct payment portals of partner universities, check your eligibility for merit/corporate fee concessions, and help you arrange zero-interest EMI options.'
		}
	];
</script>

<svelte:head>
	<title>Contact Us | Kada Education - Free Admission Counseling & Support</title>
	<meta
		name="description"
		content="Get in touch with Kada Education's expert counseling team. Get free guidance on online MBA, MCA, degree admissions, fee structures, and accredited universities in India."
	/>
</svelte:head>

<main class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
	<!-- Fixed Navbar -->
	<Navbar />

	<!-- Top Spacing & Hero Header -->
	<section class="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
		<!-- Ambient Background Gradients -->
		<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
			<div
				class="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-400/15 blur-3xl"
			></div>
			<div
				class="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl"
			></div>
			<div
				class="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"
			></div>
		</div>

		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Pill Badge -->
			<div class="mb-4 flex justify-center">
				<span
					class="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-50 px-4 py-1.5 text-xs font-bold tracking-wider text-orange-600 uppercase shadow-xs"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
					</span>
					We're Here For You • Direct Admissions Helpline
				</span>
			</div>

			<!-- Title & Intro -->
			<div class="mx-auto max-w-3xl text-center">
				<h1
					class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl"
				>
					Let's Talk About Your
					<span
						class="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent"
					>
						Future
					</span>
				</h1>
				<p class="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
					Have questions about online degrees, curriculum, or university selection? Connect with our
					dedicated education counselors for personalized, unbiased guidance.
				</p>
			</div>

			<!-- Trust Highlights Strip -->
			<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
				<div
					class="flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
				>
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="text-sm font-bold text-gray-900">100% Free Counseling</h3>
						<p class="text-xs text-gray-500">Zero charges, unbiased recommendations</p>
					</div>
				</div>

				<div
					class="flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
				>
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="text-sm font-bold text-gray-900">Quick 15-Min Response</h3>
						<p class="text-xs text-gray-500">Fast callback during business hours</p>
					</div>
				</div>

				<div
					class="flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
				>
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
							/>
						</svg>
					</div>
					<div>
						<h3 class="text-sm font-bold text-gray-900">UGC-DEB Accredited</h3>
						<p class="text-xs text-gray-500">Government recognized universities</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Content: Form + Contact Info Grid -->
	<section class="pb-16 sm:pb-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
				<!-- Left: Contact & Counseling Form (8 cols) -->
				<div class="lg:col-span-8">
					<div
						class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 md:p-10"
					>
						<!-- Decorative header stripe -->
						<div
							class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"
						></div>

						{#if submitSuccess}
							<!-- Success State -->
							<div class="py-8 text-center" in:fade={{ duration: 250 }}>
								<div
									class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50"
								>
									<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2.5"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<h3 class="text-2xl font-bold text-gray-900">Thank You!</h3>
								<p class="mx-auto mt-2 max-w-md text-sm text-gray-600 sm:text-base">
									Your message has been received successfully. One of our senior admission
									consultants will contact you shortly with personalized program guidance.
								</p>

								<div
									class="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-orange-50/70 p-4 text-xs text-orange-950 sm:text-sm"
								>
									<span class="font-semibold text-orange-800">Need immediate help?</span>
									<a
										href="https://wa.me/+919220549335?text=Hi%2C%20I%20just%20submitted%20a%20query%20on%20your%20website%20and%20need%20quick%20assistance."
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1.5 font-bold text-orange-600 hover:text-orange-700"
									>
										<span>Chat on WhatsApp</span>
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
											/>
										</svg>
									</a>
								</div>

								<div class="mt-8">
									<button
										on:click={resetForm}
										class="inline-flex items-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-xs transition-all hover:bg-gray-50"
									>
										Send Another Query
									</button>
								</div>
							</div>
						{:else}
							<!-- Inquiry Form -->
							<div class="mb-6">
								<h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
									Request Free Counseling
								</h2>
								<p class="mt-1.5 text-sm text-gray-600 sm:text-base">
									Fill out this form and our senior educational advisor will connect with you.
								</p>
							</div>

							<form on:submit|preventDefault={handleSubmit} class="space-y-4 sm:space-y-5">
								<!-- Name -->
								<div>
									<label
										for="name"
										class="block text-xs font-semibold text-gray-700 uppercase sm:text-sm"
									>
										Full Name <span class="text-red-500">*</span>
									</label>
									<div class="relative mt-1">
										<input
											id="name"
											type="text"
											bind:value={formData.name}
											placeholder="e.g. Rahul Sharma"
											class="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
											class:border-red-400={errors.name}
										/>
									</div>
									{#if errors.name}
										<p class="mt-1 text-xs text-red-500" transition:slide={{ duration: 150 }}>
											{errors.name}
										</p>
									{/if}
								</div>

								<!-- Email & Phone Grid -->
								<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<!-- Email -->
									<div>
										<label
											for="email"
											class="block text-xs font-semibold text-gray-700 uppercase sm:text-sm"
										>
											Email Address <span class="text-red-500">*</span>
										</label>
										<div class="relative mt-1">
											<input
												id="email"
												type="email"
												bind:value={formData.email}
												placeholder="rahul@example.com"
												class="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
												class:border-red-400={errors.email}
											/>
										</div>
										{#if errors.email}
											<p class="mt-1 text-xs text-red-500" transition:slide={{ duration: 150 }}>
												{errors.email}
											</p>
										{/if}
									</div>

									<!-- Contact Number -->
									<div>
										<label
											for="contactNo"
											class="block text-xs font-semibold text-gray-700 uppercase sm:text-sm"
										>
											WhatsApp / Mobile <span class="text-red-500">*</span>
										</label>
										<div class="relative mt-1">
											<div
												class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-xs font-semibold text-gray-500"
											>
												+91
											</div>
											<input
												id="contactNo"
												type="tel"
												bind:value={formData.contactNo}
												placeholder="9876543210"
												maxlength="15"
												class="w-full rounded-xl border border-gray-200 bg-gray-50/50 pr-4 pl-12 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
												class:border-red-400={errors.contactNo}
											/>
										</div>
										{#if errors.contactNo}
											<p class="mt-1 text-xs text-red-500" transition:slide={{ duration: 150 }}>
												{errors.contactNo}
											</p>
										{/if}
									</div>
								</div>

								<!-- Program & University Dropdowns -->
								<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<!-- Program of Interest -->
									<div>
										<label
											for="program"
											class="block text-xs font-semibold text-gray-700 uppercase sm:text-sm"
										>
											Interested Program
										</label>
										<div class="mt-1">
											<select
												id="program"
												bind:value={formData.program}
												class="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
											>
												{#each programOptions as opt}
													<option value={opt}>{opt}</option>
												{/each}
											</select>
										</div>
									</div>

									<!-- Preferred University -->
									<div>
										<label
											for="university"
											class="block text-xs font-semibold text-gray-700 uppercase sm:text-sm"
										>
											Preferred University
										</label>
										<div class="mt-1">
											<select
												id="university"
												bind:value={formData.university}
												class="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
											>
												{#each universityOptions as u}
													<option value={u}>{u}</option>
												{/each}
											</select>
										</div>
									</div>
								</div>

								<!-- Message / Query -->
								<div>
									<label
										for="message"
										class="block text-xs font-semibold text-gray-700 uppercase sm:text-sm"
									>
										Your Questions / Career Goals
										<span class="text-xs font-normal text-gray-400 lowercase">(optional)</span>
									</label>
									<div class="mt-1">
										<textarea
											id="message"
											rows="3"
											bind:value={formData.message}
											placeholder="Tell us what you are looking for (e.g. course fees, eligibility, syllabus, placements...)"
											class="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
										></textarea>
									</div>
								</div>

								<!-- Submit Button -->
								<div class="pt-2">
									<button
										type="submit"
										disabled={isSubmitting}
										class="relative flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
									>
										{#if isSubmitting}
											<svg class="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
												<circle
													class="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													stroke-width="4"
												></circle>
												<path
													class="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											<span>Connecting with Counselors...</span>
										{:else}
											<span>Get Free Counseling Call</span>
											<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2.5"
													d="M14 5l7 7m0 0l-7 7m7-7H3"
												/>
											</svg>
										{/if}
									</button>
								</div>

								<p class="text-center text-[11px] text-gray-500">
									🔒 Your contact details are 100% confidential. No spam, ever.
								</p>
							</form>
						{/if}
					</div>

					<!-- Direct Leadership Contacts (Directly Below Form) -->
					<div class="mt-8 space-y-4">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full bg-orange-500"></span>
								<h3 class="text-xs font-bold tracking-wider text-orange-600 uppercase">
									Direct Leadership Access
								</h3>
							</div>
							<span class="text-[11px] font-semibold text-gray-500">
								Executive Guidance
							</span>
						</div>

						<!-- Rahul Adhikari (Founder) -->
						<div
							class="group relative overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:border-orange-300 hover:shadow-md sm:p-6"
						>
							<div class="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
								<!-- Left: Clean Rounded Photo Frame -->
								<div
									class="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 shadow-xs sm:h-36 sm:w-36"
								>
									<img
										src="/Images/staffimages/Founder.jpeg"
										alt="Rahul Adhikari - Founder"
										class="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
										loading="lazy"
									/>
									<span
										class="absolute top-2 left-2 rounded-md bg-orange-500 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs"
									>
										Founder
									</span>
								</div>

								<!-- Right: Information & Links -->
								<div class="flex flex-1 flex-col justify-between text-center sm:text-left">
									<div>
										<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
											<div class="flex items-center justify-center gap-1.5 sm:justify-start">
												<h4 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
													Rahul Adhikari
												</h4>
												<svg
													class="h-5 w-5 shrink-0 text-orange-500"
													viewBox="0 0 24 24"
													fill="currentColor"
												>
													<path
														d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.59L19 8.5l-8 8z"
													/>
												</svg>
											</div>
											<span
												class="inline-flex items-center gap-1 self-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 sm:self-auto border border-emerald-200/60"
											>
												<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
												Direct Line Available
											</span>
										</div>
										<p class="mt-0.5 text-xs font-semibold tracking-wide text-orange-600 sm:text-sm">
											Founder &amp; Executive Director, Kada Education
										</p>
										<p class="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
											Leading the vision at Kada Education, empowering students with verified higher education pathways, transparent counseling, and end-to-end admission guidance.
										</p>
									</div>

									<!-- Action Links Row -->
									<div
										class="mt-4 flex flex-wrap items-center justify-center gap-2.5 border-t border-gray-100 pt-3 text-xs sm:justify-start sm:text-sm"
									>
										<!-- Phone -->
										<a
											href="tel:+917055739080"
											class="group/btn inline-flex items-center gap-1.5 rounded-xl border border-orange-200/80 bg-orange-50/70 px-3.5 py-1.5 font-semibold text-orange-800 transition-all hover:bg-orange-500 hover:text-white hover:shadow-xs"
										>
											<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
												/>
											</svg>
											<span>Call (+91 7055739080)</span>
										</a>

										<!-- WhatsApp -->
										<a
											href="https://wa.me/+917055739080?text=Hi%20Rahul%2C%20I%20would%20like%20to%20connect%20regarding%20university%20admissions."
											target="_blank"
											rel="noopener noreferrer"
											class="group/btn inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-1.5 font-semibold text-emerald-800 transition-all hover:bg-emerald-600 hover:text-white hover:shadow-xs"
										>
											<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
												/>
											</svg>
											<span>Chat on WhatsApp</span>
										</a>

										<!-- Instagram -->
										<a
											href="https://www.instagram.com/kadaeducation/"
											target="_blank"
											rel="noopener noreferrer"
											class="group/btn inline-flex items-center gap-1.5 rounded-xl border border-pink-200/80 bg-pink-50/70 px-3.5 py-1.5 font-semibold text-pink-800 transition-all hover:bg-pink-600 hover:text-white hover:shadow-xs"
										>
											<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
												/>
											</svg>
											<span>Instagram</span>
										</a>
									</div>
								</div>
							</div>
						</div>

						<!-- Ravi Mehra (Co-founder) -->
						<div
							class="group relative overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:border-orange-300 hover:shadow-md sm:p-6"
						>
							<div class="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
								<!-- Left: Clean Rounded Photo Frame -->
								<div
									class="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 shadow-xs sm:h-36 sm:w-36"
								>
									<img
										src="/Images/staffimages/Cofounder.jpeg"
										alt="Ravi Mehra - Co-founder"
										class="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
										loading="lazy"
									/>
									<span
										class="absolute top-2 left-2 rounded-md bg-orange-500 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs"
									>
										Co-Founder
									</span>
								</div>

								<!-- Right: Information & Links -->
								<div class="flex flex-1 flex-col justify-between text-center sm:text-left">
									<div>
										<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
											<div class="flex items-center justify-center gap-1.5 sm:justify-start">
												<h4 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
													Ravi Mehra
												</h4>
												<svg
													class="h-5 w-5 shrink-0 text-orange-500"
													viewBox="0 0 24 24"
													fill="currentColor"
												>
													<path
														d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l6.59-6.59L19 8.5l-8 8z"
													/>
												</svg>
											</div>
											<span
												class="inline-flex items-center gap-1 self-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 sm:self-auto border border-emerald-200/60"
											>
												<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
												Direct Line Available
											</span>
										</div>
										<p class="mt-0.5 text-xs font-semibold tracking-wide text-orange-600 sm:text-sm">
											Co-Founder &amp; Executive Director, Kada Education
										</p>
										<p class="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
											Leading university partnerships, academic alignments, and strategic counseling to ensure every student secures their ideal higher education program.
										</p>
									</div>

									<!-- Action Links Row -->
									<div
										class="mt-4 flex flex-wrap items-center justify-center gap-2.5 border-t border-gray-100 pt-3 text-xs sm:justify-start sm:text-sm"
									>
										<!-- Phone -->
										<a
											href="tel:+919220549335"
											class="group/btn inline-flex items-center gap-1.5 rounded-xl border border-orange-200/80 bg-orange-50/70 px-3.5 py-1.5 font-semibold text-orange-800 transition-all hover:bg-orange-500 hover:text-white hover:shadow-xs"
										>
											<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
												/>
											</svg>
											<span>Call (+91 9220549335)</span>
										</a>

										<!-- WhatsApp -->
										<a
											href="https://wa.me/+919220549335?text=Hi%20Ravi%2C%20I%20would%20like%20to%20connect%20regarding%20university%20admissions."
											target="_blank"
											rel="noopener noreferrer"
											class="group/btn inline-flex items-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-1.5 font-semibold text-emerald-800 transition-all hover:bg-emerald-600 hover:text-white hover:shadow-xs"
										>
											<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
												/>
											</svg>
											<span>Chat on WhatsApp</span>
										</a>

										<!-- Instagram -->
										<a
											href="https://www.instagram.com/kadaeducation/"
											target="_blank"
											rel="noopener noreferrer"
											class="group/btn inline-flex items-center gap-1.5 rounded-xl border border-pink-200/80 bg-pink-50/70 px-3.5 py-1.5 font-semibold text-pink-800 transition-all hover:bg-pink-600 hover:text-white hover:shadow-xs"
										>
											<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
												<path
													d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
												/>
											</svg>
											<span>Instagram</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Right: Direct Channels & Reach (4 cols) -->
				<div class="space-y-5 lg:col-span-4">
					<!-- Direct Phone Card -->
					<div
						class="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md"
					>
						<div class="flex items-start gap-4">
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white"
							>
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							</div>
							<div class="flex-1">
								<span class="text-xs font-bold tracking-wider text-orange-600 uppercase">
									Call Us Directly
								</span>
								<h3 class="text-lg font-bold text-gray-900">+91 9220549335</h3>
								<p class="mt-1 text-xs text-gray-500">
									Available Mon – Sat, 9:00 AM – 7:00 PM for instant admission support.
								</p>
								<div class="mt-3">
									<a
										href="tel:+919220549335"
										class="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
									>
										<span>Call Counselor</span>
										<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>

					<!-- WhatsApp Card -->
					<div
						class="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md"
					>
						<div class="flex items-start gap-4">
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white"
							>
								<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
									/>
								</svg>
							</div>
							<div class="flex-1">
								<span class="text-xs font-bold tracking-wider text-emerald-600 uppercase">
									WhatsApp Chat
								</span>
								<h3 class="text-lg font-bold text-gray-900">Instant Chat & Brochures</h3>
								<p class="mt-1 text-xs text-gray-500">
									Get syllabus PDFs, university fee sheets, and quick answers on WhatsApp.
								</p>
								<div class="mt-3">
									<a
										href="https://wa.me/+919220549335?text=Hi%2C%20I'm%20interested%20in%20learning%20more%20about%20online%20degree%20programs."
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
									>
										<span>Start WhatsApp Chat</span>
										<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>

					<!-- Email Card -->
					<div
						class="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-md"
					>
						<div class="flex items-start gap-4">
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white"
							>
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div class="flex-1">
								<span class="text-xs font-bold tracking-wider text-amber-600 uppercase">
									Official Email
								</span>
								<div class="mt-1 space-y-1">
									<div>
										<span class="text-[11px] font-semibold text-gray-400">Students:</span>
										<a
											href="mailto:info@kadaeducation.com"
											class="block text-sm font-bold text-gray-900 hover:text-orange-600"
										>
											info@kadaeducation.com
										</a>
									</div>
									<div class="pt-1">
										<span class="text-[11px] font-semibold text-gray-400"
											>Universities / Partners:</span
										>
										<a
											href="mailto:business@kadaeducation.com"
											class="block text-sm font-bold text-gray-900 hover:text-orange-600"
										>
											business@kadaeducation.com
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Office Address Card -->
					<div
						class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
					>
						<div class="flex items-start gap-4">
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-700"
							>
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
							</div>
							<div class="flex-1">
								<span class="text-xs font-bold tracking-wider text-gray-500 uppercase">
									Dehradun Office
								</span>
								<h3 class="text-base font-bold text-gray-900">Kada Education Headquarters</h3>
								<p class="mt-1 text-xs leading-relaxed text-gray-600">
									226, Canal Road, Kishanpur,<br />
									Dehradun, Uttarakhand, India – 248142
								</p>
								<div class="mt-3 flex items-center gap-3">
									<a
										href="https://maps.google.com/?q=226+Canal+Road+Kishanpur+Dehra+Dun+248142"
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
									>
										<span>Open Google Maps</span>
										<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Interactive Map Section -->
	<section class="border-t border-gray-100 bg-white py-12 sm:py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
				<div>
					<span class="text-xs font-bold tracking-wider text-orange-600 uppercase">
						Find Our Center
					</span>
					<h2 class="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
						Visit Our Admissions Office
					</h2>
					<p class="mt-1 text-sm text-gray-500">
						Centrally located on Canal Road in Kishanpur, Dehradun.
					</p>
				</div>
				<a
					href="https://maps.google.com/?q=226+Canal+Road+Kishanpur+Dehra+Dun+248142"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 shadow-xs transition-all hover:border-orange-500 hover:text-orange-600 sm:text-sm"
				>
					<span>Get Directions</span>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</a>
			</div>

			<!-- Map container -->
			<div
				class="relative overflow-hidden rounded-3xl border border-gray-100 shadow-lg ring-1 ring-black/5"
			>
				<iframe
					title="Kada Education Office Location"
					src="https://maps.google.com/maps?q=226+Canal+Road+Kishanpur+Dehra+Dun+248142&t=&z=15&ie=UTF8&iwloc=&output=embed"
					class="h-80 w-full border-0 sm:h-96"
					loading="lazy"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</section>

	<!-- Quick Contact FAQs -->
	<section class="py-12 sm:py-16">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="mb-10 text-center">
				<span class="text-xs font-bold tracking-wider text-orange-600 uppercase">
					Quick Answers
				</span>
				<h2 class="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
					Frequently Asked Questions
				</h2>
				<p class="mt-1.5 text-sm text-gray-500">
					Common questions students ask before reaching out.
				</p>
			</div>

			<div class="space-y-3">
				{#each contactFaqs as faq, i}
					<div
						class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-200 hover:shadow-sm"
					>
						<button
							type="button"
							on:click={() => toggleFaq(i)}
							class="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50/50"
							aria-expanded={openFaq === i}
						>
							<span class="text-sm font-bold text-gray-900 sm:text-base">{faq.q}</span>
							<svg
								class="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200"
								class:rotate-180={openFaq === i}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						{#if openFaq === i}
							<div
								class="border-t border-gray-50 px-5 pt-3 pb-4 text-xs leading-relaxed text-gray-600 sm:text-sm"
								transition:slide={{ duration: 180 }}
							>
								{faq.a}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="mt-8 text-center">
				<a
					href="/Faqs"
					class="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 sm:text-sm"
				>
					<span>View all admissions & course FAQs</span>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</main>
