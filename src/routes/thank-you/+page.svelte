<script lang="ts">
	import { onMount } from 'svelte';
	import { Navbar, Footer } from '$components';

	function handleGoBack() {
		if (typeof window !== 'undefined') {
			if (window.history.length > 1) {
				window.history.back();
			} else {
				window.location.href = '/';
			}
		}
	}

	onMount(() => {
		// Fire conversion tracking for Meta Pixel / Google Analytics if available
		if (typeof window !== 'undefined') {
			try {
				const win = window as any;
				if (typeof win.fbq === 'function') {
					win.fbq('track', 'Lead');
					win.fbq('trackCustom', 'LeadFormSubmitted');
				}
				if (typeof win.gtag === 'function') {
					win.gtag('event', 'generate_lead', {
						event_category: 'form',
						event_label: 'lead_submission'
					});
				}
			} catch (e) {
				console.error('Tracking event error:', e);
			}
		}
	});
</script>

<svelte:head>
	<title>Thank You | Kada Education - Request Received</title>
	<meta
		name="description"
		content="Thank you for reaching out to Kada Education. Our admission counselors will get in touch with you shortly."
	/>
	<!-- Keep search engines from indexing the conversion page -->
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<main class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
	<!-- Fixed Navbar -->
	<Navbar />

	<!-- Hero & Thank You Container -->
	<section class="relative flex-1 overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
		<!-- Ambient Background Gradients -->
		<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
			<div
				class="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-400/20 blur-3xl"
			></div>
			<div
				class="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
			></div>
			<div
				class="absolute bottom-10 -left-24 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl"
			></div>
		</div>

		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<!-- Main Card -->
			<div
				class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl sm:p-12 md:p-16 text-center"
			>
				<!-- Top Orange Accent Line -->
				<div
					class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"
				></div>

				<!-- Success Icon Animation -->
				<div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center relative">
					<div class="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-60"></div>
					<div
						class="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/30"
					>
						<svg
							class="h-10 w-10 animate-check"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				</div>

				<!-- Badge -->
				<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700 uppercase">
					<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
					Form Submitted Successfully
				</div>

				<!-- Heading -->
				<h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
					Thank You! You're
					<span
						class="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent"
					>
						All Set
					</span>
				</h1>

				<!-- Subtext -->
				<p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
					We have received your details. One of our senior admission advisors is already reviewing
					your request and will get in touch with you shortly.
				</p>

				<!-- Response Time Callout -->
				<div
					class="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl bg-orange-50/80 px-4 py-2.5 text-xs sm:text-sm font-semibold text-orange-800 border border-orange-200/60"
				>
					<svg class="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Expected callback time: <strong>15–30 Minutes</strong> (Mon–Sat, 9 AM – 7 PM)</span>
				</div>

				<!-- What Happens Next Strip -->
				<div class="mt-12 text-left">
					<h2 class="text-xs font-bold tracking-wider text-gray-400 uppercase text-center mb-6">
						What happens next?
					</h2>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<!-- Step 1 -->
						<div class="rounded-2xl border border-gray-100 bg-gray-50/80 p-5 transition-all hover:bg-white hover:shadow-md">
							<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 font-bold text-orange-600">
								1
							</div>
							<h3 class="text-sm font-bold text-gray-900">Eligibility Check</h3>
							<p class="mt-1 text-xs text-gray-500 leading-relaxed">
								Our counselor verifies your background and requirements against UGC-approved universities.
							</p>
						</div>

						<!-- Step 2 -->
						<div class="rounded-2xl border border-gray-100 bg-gray-50/80 p-5 transition-all hover:bg-white hover:shadow-md">
							<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 font-bold text-orange-600">
								2
							</div>
							<h3 class="text-sm font-bold text-gray-900">1-on-1 Guidance</h3>
							<p class="mt-1 text-xs text-gray-500 leading-relaxed">
								Get detailed comparisons of syllabus, faculty, zero-cost EMI plans, and scholarships.
							</p>
						</div>

						<!-- Step 3 -->
						<div class="rounded-2xl border border-gray-100 bg-gray-50/80 p-5 transition-all hover:bg-white hover:shadow-md">
							<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 font-bold text-orange-600">
								3
							</div>
							<h3 class="text-sm font-bold text-gray-900">Direct Enrollment</h3>
							<p class="mt-1 text-xs text-gray-500 leading-relaxed">
								Zero consultation fees. Direct access to authorized university admission portals.
							</p>
						</div>
					</div>
				</div>

				<!-- Navigation Actions -->
				<div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
					<a
						href="/"
						class="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-4 focus:ring-orange-500/30"
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Return to Home
					</a>

					<button
						type="button"
						on:click={handleGoBack}
						class="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-gray-700 shadow-xs transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200"
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						Go Back to Previous Page
					</button>

					<a
						href="/Program"
						class="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-orange-200 bg-orange-50/60 px-6 py-3.5 text-sm font-bold text-orange-700 transition-all duration-200 hover:bg-orange-100/80 focus:outline-none focus:ring-4 focus:ring-orange-200"
					>
						Explore All Programs
					</a>
				</div>

				<!-- Direct Contact Help -->
				<div class="mt-8 border-t border-gray-100 pt-6 text-xs text-gray-500">
					Need immediate help? Reach our student helpline at
					<a href="tel:+919220549335" class="font-bold text-orange-600 hover:underline">
						+91 9220549335
					</a>
					or
					<a
						href="https://wa.me/919220549335?text=Hello%20Kada%20Education,%20I%20just%20submitted%20a%20form%20and%20would%20like%20to%20connect%20with%20a%20counselor."
						target="_blank"
						rel="noopener noreferrer"
						class="font-bold text-emerald-600 hover:underline"
					>
						Chat on WhatsApp
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer />
</main>

<style>
	@keyframes check {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.animate-check {
		animation: check 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}
</style>
