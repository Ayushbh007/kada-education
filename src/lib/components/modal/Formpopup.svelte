<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		close: void;
		submit: { name: string; email: string; contactNo: string };
	}>();

	// Form data
	let formData: { name: string; email: string; contactNo: string } = {
		name: '',
		email: '',
		contactNo: ''
	};

	// Form validation
	let errors: { [key: string]: string } = {};
	let isSubmitting = false;
	let showConfirmation = false;

	// Animation states
	let modalVisible = false;
	let formStep = 0;
	let fieldFocus: { [key: string]: boolean } = {
		name: false,
		email: false,
		contactNo: false
	};

	// Initialize modal animation
	import { onMount } from 'svelte';
	onMount(() => {
		setTimeout(() => {
			modalVisible = true;
		}, 50);
	});

	// Close modal with animation
	function closeModal() {
		modalVisible = false;
		setTimeout(() => {
			dispatch('close');
		}, 300);
	}

	// Handle overlay click
	function handleOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	// Handle confirmation overlay click
	function handleConfirmationOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeConfirmation();
		}
	}

	// Handle form submission
	async function handleSubmit() {
		// Reset errors
		errors = {};

		// Validate form
		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		}

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!isValidEmail(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!formData.contactNo.trim()) {
			errors.contactNo = 'Contact number is required';
		} else if (!isValidPhone(formData.contactNo)) {
			errors.contactNo = 'Please enter a valid contact number';
		}

		// If there are errors, don't submit
		if (Object.keys(errors).length > 0) {
			return;
		}

		isSubmitting = true;

		try {
			// Send data to your SvelteKit API endpoint
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (result.success) {
				// Dispatch success event
				dispatch('submit', formData);

				// Show confirmation modal
				showConfirmation = true;

				// Reset form
				formData = { name: '', email: '', contactNo: '' };
			} else {
				// Handle validation errors
				if (result.error) {
					alert(`Error: ${result.error}`);
				} else {
					alert('Failed to submit form. Please try again.');
				}
			}
		} catch (error) {
			console.error('Form submission error:', error);
			alert('Network error. Please check your connection and try again.');
		} finally {
			isSubmitting = false;
		}
	}

	// Email validation
	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Phone validation (basic)
	function isValidPhone(phone: string): boolean {
		const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
		return phoneRegex.test(phone.replace(/\s/g, ''));
	}

	// Handle escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (showConfirmation) {
				showConfirmation = false;
			} else {
				closeModal();
			}
		}
	}

	// Close confirmation modal
	function closeConfirmation() {
		showConfirmation = false;
	}

	// Close form after confirmation
	function closeFormAfterConfirmation() {
		showConfirmation = false;
		closeModal();
	}
</script>
<svelte:window on:keydown={handleKeydown} />

<!-- Modal Overlay -->
<div
	class="fixed inset-0 overflow-y-auto bg-slate-900/50 backdrop-blur-md transition-all duration-500 flex items-center justify-center p-4 sm:p-6 z-[1100]"
	class:opacity-0={!modalVisible}
	class:opacity-100={modalVisible}
	class:pointer-events-none={!modalVisible}
	on:click={handleOverlayClick}
	role="dialog"
	aria-modal="true"
	aria-labelledby="form-title"
>
	<!-- Premium Modal Container (Split Layout) -->
	<div
		class="relative w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform transition-all duration-500"
		class:scale-95={!modalVisible}
		class:scale-100={modalVisible}
		class:translate-y-8={!modalVisible}
		class:translate-y-0={modalVisible}
		role="document"
	>
		<!-- Close Button (Absolute Top Right) -->
		<button
			on:click={closeModal}
			class="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 bg-gray-100/50 hover:bg-gray-200 text-gray-500 hover:text-gray-800 backdrop-blur-sm rounded-full transition-all duration-300 hover:rotate-90 focus:outline-none"
			aria-label="Close form"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<!-- Left Side: Visual / Value Prop (Hidden on small mobile, visible on sm+) -->
		<div class="relative hidden sm:flex md:w-5/12 bg-gradient-to-br from-[#f97316] via-[#ea580c] to-[#e11d48] p-10 flex-col justify-between overflow-hidden text-white">
			<!-- Abstract Background Elements -->
			<div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
				<div class="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
				<div class="absolute top-1/2 right-[-20%] w-72 h-72 bg-rose-500/30 rounded-full blur-3xl mix-blend-multiply"></div>
				<div class="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-orange-400/30 rounded-full blur-3xl mix-blend-overlay"></div>
			</div>

			<div class="relative z-10">
				<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold mb-8">
					<span class="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
					Available for Counseling
				</div>
				<h2 class="text-3xl md:text-4xl font-extrabold leading-tight mb-4 tracking-tight">
					Accelerate Your<br/>
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-white">Career Growth</span>
				</h2>
				<p class="text-orange-50/90 text-lg leading-relaxed mb-8">
					Join 10,000+ students who found their dream university through our expert guidance.
				</p>
			</div>

			<div class="relative z-10 space-y-5">
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
						<svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
						</svg>
					</div>
					<div>
						<h4 class="font-bold text-white">Top Universities</h4>
						<p class="text-sm text-orange-100/80">Direct tie-ups with premium institutes</p>
					</div>
				</div>
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
						<svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
						</svg>
					</div>
					<div>
						<h4 class="font-bold text-white">100% Free Counseling</h4>
						<p class="text-sm text-orange-100/80">No hidden charges, pure guidance</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Side: Form -->
		<div class="w-full md:w-7/12 p-8 sm:p-10 md:p-12 bg-white relative">
			<!-- Mobile Header (Only shows when left panel is hidden on ultra-small screens) -->
			<div class="sm:hidden mb-8 text-center">
				<h2 class="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
				<p class="text-gray-500 text-sm">Expert guidance is just a click away.</p>
			</div>

			<div class="mb-8 hidden sm:block">
				<h3 class="text-2xl font-bold text-gray-900 mb-2">Book Your Free Session</h3>
				<p class="text-gray-500">Fill in your details and we'll reach out to you.</p>
			</div>

			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<!-- Custom Floating Label Input: Name -->
				<div class="relative group">
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						class="peer w-full h-14 bg-gray-50 text-gray-900 placeholder-transparent border-2 border-gray-100 rounded-xl px-4 pt-4 pb-2 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300"
						placeholder="Full Name"
						class:border-red-500={errors.name}
					/>
					<label
						for="name"
						class="absolute left-4 top-2 text-xs font-semibold text-gray-400 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-orange-500"
					>
						Full Name
					</label>
					{#if errors.name}
						<div class="absolute -bottom-5 left-1 text-xs text-red-500 font-medium flex items-center gap-1 animate-fade-in">
							<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
							{errors.name}
						</div>
					{/if}
				</div>

				<!-- Custom Floating Label Input: Email -->
				<div class="relative group mt-8">
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						class="peer w-full h-14 bg-gray-50 text-gray-900 placeholder-transparent border-2 border-gray-100 rounded-xl px-4 pt-4 pb-2 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300"
						placeholder="Email Address"
						class:border-red-500={errors.email}
					/>
					<label
						for="email"
						class="absolute left-4 top-2 text-xs font-semibold text-gray-400 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-orange-500"
					>
						Email Address
					</label>
					{#if errors.email}
						<div class="absolute -bottom-5 left-1 text-xs text-red-500 font-medium flex items-center gap-1 animate-fade-in">
							<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
							{errors.email}
						</div>
					{/if}
				</div>

				<!-- Custom Floating Label Input: Contact Number -->
				<div class="relative group mt-8">
					<input
						id="contactNo"
						type="tel"
						bind:value={formData.contactNo}
						class="peer w-full h-14 bg-gray-50 text-gray-900 placeholder-transparent border-2 border-gray-100 rounded-xl px-4 pt-4 pb-2 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300"
						placeholder="Contact Number"
						class:border-red-500={errors.contactNo}
					/>
					<label
						for="contactNo"
						class="absolute left-4 top-2 text-xs font-semibold text-gray-400 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-orange-500"
					>
						Contact Number
					</label>
					{#if errors.contactNo}
						<div class="absolute -bottom-5 left-1 text-xs text-red-500 font-medium flex items-center gap-1 animate-fade-in">
							<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
							{errors.contactNo}
						</div>
					{/if}
				</div>

				<!-- Premium Submit Button -->
				<div class="pt-6">
					<button
						type="submit"
						disabled={isSubmitting}
						class="relative w-full h-14 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 p-[2px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.8)] focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none group"
					>
						<!-- Inner container for button content -->
						<div class="relative flex h-full w-full items-center justify-center gap-3 rounded-[10px] bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-300 group-hover:from-orange-400 group-hover:to-rose-400">
							{#if isSubmitting}
								<svg class="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span class="font-bold text-white tracking-wide">Processing...</span>
							{:else}
								<span class="font-bold text-white tracking-wide text-lg">Talk to an Expert</span>
								<svg class="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
								</svg>
							{/if}
						</div>
					</button>
				</div>
				
				<p class="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
					Your information is 100% secure
				</p>
			</form>
		</div>
	</div>
</div>

<!-- Premium Confirmation Modal -->
{#if showConfirmation}
	<div
		class="fixed inset-0 overflow-y-auto bg-slate-900/60 backdrop-blur-md transition-all duration-500 flex items-center justify-center p-4 z-[1200]"
		on:click={handleConfirmationOverlayClick}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div
			class="relative w-full max-w-sm rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 text-center transform transition-all duration-500 animate-modal-in overflow-hidden"
			role="document"
		>
			<!-- Confetti / Abstract Background -->
			<div class="absolute -top-20 -right-20 w-40 h-40 bg-green-400/20 rounded-full blur-2xl"></div>
			<div class="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-400/20 rounded-full blur-2xl"></div>

			<div class="relative z-10">
				<!-- Success Icon Animation -->
				<div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center relative">
					<div class="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-50"></div>
					<div class="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-green-400 to-green-500 shadow-[0_10px_25px_rgba(34,197,94,0.4)]">
						<svg class="h-10 w-10 text-white animate-success-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
						</svg>
					</div>
				</div>

				<h3 class="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">You're All Set!</h3>
				<p class="text-gray-500 mb-8 leading-relaxed">
					Thank you for reaching out. Our expert counselors will contact you shortly to guide your journey.
				</p>

				<button
					on:click={closeFormAfterConfirmation}
					class="w-full h-14 rounded-xl bg-gray-900 px-6 font-bold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-gray-900/30"
				>
					Return to Site
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes modalSlideIn {
		0% {
			opacity: 0;
			transform: scale(0.9) translateY(20px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes fade-in {
		0% { opacity: 0; transform: translateY(-5px); }
		100% { opacity: 1; transform: translateY(0); }
	}

	@keyframes success-check {
		0% { transform: scale(0); }
		50% { transform: scale(1.2); }
		100% { transform: scale(1); }
	}

	.animate-modal-in {
		animation: modalSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}

	.animate-success-check {
		animation: success-check 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}

	/* Optional: Smooth autofill styles */
	input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus, 
	input:-webkit-autofill:active{
		-webkit-box-shadow: 0 0 0 30px white inset !important;
		-webkit-text-fill-color: #111827 !important;
		transition: background-color 5000s ease-in-out 0s;
	}
</style>
