<script lang="ts">
	import { Navbar, Footer } from '$components';
	import { fade, fly } from 'svelte/transition';
	import Formpopup from '$lib/components/modal/Formpopup.svelte';

	// Form modal state
	let showFormModal = false;
	let selectedUniversity: (typeof universities)[0] | null = null;

	// Handle form submission
	function handleFormSubmit(
		event: CustomEvent<{ name: string; email: string; contactNo: string }>
	) {
		console.log('Form submitted:', event.detail);
		// Handle the form submission data here
	}

	// Close form modal
	function handleCloseForm() {
		showFormModal = false;
		selectedUniversity = null;
	}

	// Function to open form with specific university
	function openFormForUniversity(university: (typeof universities)[0]) {
		selectedUniversity = university;
		showFormModal = true;
	}

	// University Programs Data
	const universities = [
		{
			name: 'Manipal University',
			logoUrl: '/Images/Manipalimages/manipal01.png',
			rating: 4.8,
			reviews: 428,
			duration: '2 Years',
			fee: 'INR 1,80,000',
			specializations: [
				'Operation Mgt',
				'Healthcare Mgt',
				'Pharmaceutical Mgt',
				'Marketing',
				'Finance',
				'Human Resource Mgt',
				'Business Analytics',
				'Data Science'
			],
			features: [
				'NAAC A++ Accredited university',
				'TOP 3 UNIVERSITY IN INDIA',
				'100% placement assistance',
				'Dual specialization',
				'Legacy since 1951',
				'Coursera certification subscription'
			]
		},
		{
			name: 'Shoolini University',
			logoUrl: '/Images/shoolini/shoolini01.png',
			rating: 4.9,
			reviews: 512,
			duration: '2 Years',
			fee: 'INR 1,56,000',
			specializations: [
				'Retail Mgt',
				'Banking & Insurance',
				'IT Mgt',
				'Real Estate Mgt',
				'Agro Business Mgt',
				'Biotechnology Mgt',
				'Food Technology Mgt',
				'Pharma & Healthcare Mgt',
				'Marketing Mgt',
				'Human Resource Mgt',
				'Financial Mgt',
				'Digital Marketing',
				'Operation & Supply Chain Mgt',
				'Tourism Mgt',
				'Direct Selling Mgt',
				'Data Science & Business Analytics'
			],
			features: [
				'Indias first private university',
				'NAAC A+ Accredited university',
				'PAY AFTER PLACEMENT',
				'100% PLACEMENT GUARANTEE',
				'Industry focused',
				'Research Focus',
				'Multiple certificate courses',
				'Free value add-On courses'
			]
		},
		{
			name: 'Amity University',
			logoUrl: '/Images/amity/amity01.jpg',
			rating: 4.7,
			reviews: 385,
			duration: '2 Years',
			fee: 'INR 2,25,000',
			specializations: [
				'Digital Entrepreneurship',
				'Global Finance',
				'Hospitality',
				'Insurance Mgt',
				'Petroleum and Gas',
				'Retail Management',
				'Human Resource Mgt',
				'Marketing and Sales',
				'Finance Accounting',
				'Digital Marketing',
				'Information Technology',
				'HR Analytics',
				'Data Science',
				'Business Analytics',
				'International Finance',
				'Entrepreneurship and Leadership',
				'International Business',
				'Production and Operation'
			],
			features: [
				'NAAC A+ Accredited university',
				'100% PLACEMENT GUARANTEE',
				'Top 32 University in india',
				'Worldwide Campuses',
				'Industrial Collaboration',
				'Global Alumni Network'
			]
		},
		{
			name: 'DY Patil University',
			logoUrl: '/Images/DY/dy1.jpg',
			rating: 4.8,
			reviews: 456,
			duration: '2 Years',
			fee: 'INR 1,89,000',
			specializations: [
				'Entrepreneurship Mgt',
				'Sales and Marketing',
				'Human Resource Mgt',
				'Finance',
				'Digital Marketing',
				'Hospital and Healthcare Mgt',
				'Retail Management',
				'Logistics & Supply Chain Mgt',
				'Data Science & Business Analytics',
				'International Business',
				'Event Management'
			],
			features: [
				'NAAC A++ Accredited university',
				'TOP 50 PRIVATE UNIVERSITY',
				'40 YEAR OF LEGACY',
				'1,50,000+ Alumni Network',
				'Top Medical college in india'
			]
		},
		{
			name: 'Lovely Professional University',
			logoUrl: '/Images/LPU/lpu1.jpg',
			rating: 4.6,
			reviews: 342,
			duration: '2 Years',
			fee: 'INR 1,61,600',
			specializations: [
				'Banking and Finance',
				'Hospital & Healthcare Mgt',
				'Operation Management',
				'Human Resource Mgt',
				'Finance',
				'Marketing',
				'Logistics and Supply Chain Mgt',
				'International Business',
				'Information Technology',
				'Data Science',
				'Digital Marketing',
				'Business Analytics'
			],
			features: [
				'NAAC A++ Accredited university',
				'TOP 31 PRIVATE UNIVERSITY',
				'DUAL SPECIALIZATION',
				'Advance LMS portal',
				'100% placement assistance',
				'Industrial Partnership',
				'Best Online education services for 5+ years'
			]
		},
		{
			name: 'Uttranchal University',
			logoUrl: '/Images/Uttranchal/uttranchal1.jpg',
			rating: 4.7,
			reviews: 298,
			duration: '2 Years',
			fee: 'INR 98,000',
			specializations: [
				'Business Analytics',
				'Information Technology',
				'Logistics & Supply Chain',
				'Financial Mgt',
				'Marketing Mgt',
				'Human Resource',
				'Digital Marketing',
				'International Business'
			],
			features: [
				'NAAC A+ Accredited university',
				'100% placement assistance',
				'Industrial partnership',
				'Affordables fees',
				'Infosys certification free of cost'
			]
		}
	];
</script>

<main class="flex min-h-screen flex-col">
	<!-- Navbar -->
	<div class="p-4">
		<Navbar />
	</div>

	<!-- Main Content -->
	<div class="flex-grow bg-gray-50 px-4 py-12 pt-24 sm:px-6 md:py-16 md:pt-28">
		<div class="mx-auto max-w-7xl">
			<!-- Header -->
			<div class="mb-12 text-center md:mb-16">
				<h1 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
					Our Partner
					<span
						class="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
					>
						Universities
					</span>
				</h1>
				<p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
					Choose from India's top business schools offering online MBA programs designed for working
					professionals
				</p>
			</div>

			<!-- University Cards Grid -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
				{#each universities as university}
					<div
						class="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
						transition:fade={{ duration: 300 }}
					>
						<!-- University Header -->
						<div class="border-b border-gray-100 px-6 py-4">
							<div class="mb-4 flex items-center justify-between">
								<h3 class="text-xl font-bold text-gray-900">{university.name}</h3>
								<div class="flex items-center">
									<span class="mr-1 text-yellow-400">★</span>
									<span class="font-medium text-gray-700">{university.rating}</span>
									<span class="ml-1 text-sm text-gray-400">({university.reviews})</span>
								</div>
							</div>
							<div class="flex justify-between text-sm">
								<div>
									<span class="text-gray-500">Duration:</span>
									<span class="ml-1 font-medium text-gray-700">{university.duration}</span>
								</div>
								<div>
									<span class="text-gray-500">Fee:</span>
									<span class="ml-1 font-medium text-gray-700">{university.fee}</span>
								</div>
							</div>
						</div>

						<!-- Content Area -->
						<div class="flex flex-grow flex-col">
							<!-- Specializations -->
							<div class="border-b border-gray-100 px-6 py-4">
								<h4 class="mb-2 text-sm font-semibold text-gray-700">Specializations</h4>
								<div class="flex flex-wrap gap-2">
									{#each university.specializations as spec}
										<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
											{spec}
										</span>
									{/each}
								</div>
							</div>

							<!-- Features -->
							<div class="flex-grow px-6 py-4">
								<h4 class="mb-2 text-sm font-semibold text-gray-700">Key Features</h4>
								<ul class="space-y-2">
									{#each university.features as feature}
										<li class="flex items-center text-sm text-gray-600">
											<svg
												class="mr-2 h-4 w-4 text-green-500"
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
											{feature}
										</li>
									{/each}
								</ul>
							</div>
						</div>

						<!-- Action Button -->
						<div class="bg-gray-50 px-6 py-4">
							<button
								on:click={() => openFormForUniversity(university)}
								class="w-full rounded-lg bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 px-4 py-2 font-medium text-white transition-all duration-200 hover:from-red-700 hover:via-orange-600 hover:to-yellow-600"
							>
								Request Information
							</button>
						</div>
					</div>
				{/each}
			</div>

			<!-- Form Popup Modal -->
			{#if showFormModal}
				<Formpopup on:submit={handleFormSubmit} on:close={handleCloseForm} />
			{/if}
		</div>
	</div>

	<!-- Footer -->
	<Footer />
</main>

<style lang="postcss">
	/* Add any component-specific styles here */
</style>
