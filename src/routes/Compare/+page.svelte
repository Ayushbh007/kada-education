<script lang="ts">
	import { goto } from '$app/navigation';
	import { Navbar, Footer } from '$components';
	import { flip } from 'svelte/animate';
	import { page } from '$app/stores';
	import universitiesData from '$lib/universities.json';
	import { withSheetFees } from '$lib/fees';

	interface University {
		id: string;
		name: string;
		location: string;
		fees: string;
		ranking: string;
		accreditation: string;
		programs: string[];
		established: number;
		campusSize?: string | null;
		studentPopulation?: string | null;
		placementRate: string;
		logo: string | null;
		satisfiedStudent: string;
		eligibility: string;
		placementAssistance: string;
		onlineClasses: string;
		placementCompanies: string;
		studentRating: string;
		payAfterPlacement?: string;
	}

	interface RecommendedMatch {
		university: University;
		score: number;
		matchReasons: string[];
	}

	$: universities = withSheetFees(universitiesData as University[], $page.data.fees);
	let selectedUniversities: University[] = [];
	let showModal: boolean = false;
	let searchTerm: string = '';
	let notificationMessage: string = '';
	let notificationTimeout: any = null;

	// Questionnaire State
	let currentStep: number = 1;
	let questionnaireCompleted: boolean = false;
	let questionnaireCollapsed: boolean = false;

	// 4 Questions definitions
	const question1Graduation = {
		id: 'percentage',
		title: '1. What is your graduation percentage?',
		subtitle: 'Used to verify eligibility across different university standards',
		options: ['Below 45%', '45%–49%', '50%–59%', '60%–69%', '70%–79%', '80% or above']
	};

	const question2Budget = {
		id: 'budget',
		title: '2. What is your total budget for an Online MBA?',
		subtitle: 'We match total 2-year program fees to your financial comfort',
		options: [
			'Below ₹50,000',
			'₹50,000–₹75,000',
			'₹75,000–₹1,00,000',
			'₹1,00,000–₹1,50,000',
			'₹1,50,000–₹2,00,000',
			'Above ₹2,00,000'
		]
	};

	const question3Specialization = {
		id: 'specialization',
		title: '3. Which MBA specialization are you interested in?',
		subtitle: 'Pick the domain you wish to accelerate your career in',
		options: [
			'Finance',
			'Marketing',
			'Human Resource Management',
			'Business Analytics',
			'International Business',
			'Operations Management',
			'Information Technology',
			'Digital Marketing',
			'Healthcare Management',
			'Entrepreneurship',
			'Supply Chain Management',
			'Not sure – Need guidance'
		]
	};

	const question4Payment = {
		id: 'paymentMode',
		title: '4. What is your preferred fee payment mode?',
		subtitle: 'Choose how you would like to structure your tuition payments',
		options: [
			'Full payment (One-time)',
			'Semester-wise payment',
			'EMI options',
			'No-cost EMI',
			'Flexible payment options'
		]
	};

	// User Answers
	let answers = {
		percentage: '',
		budget: '',
		specialization: '',
		paymentMode: ''
	};

	let recommendedMatches: RecommendedMatch[] = [];

	// Approximate total fee tier classification
	const univFeeTier: Record<string, string> = {
		'andhra-university': 'Below ₹50,000',
		ignou: '₹50,000–₹75,000',
		galgotia: '₹50,000–₹75,000',
		'noida-international-university': '₹75,000–₹1,00,000',
		uttranchal: '₹75,000–₹1,00,000',
		nmims: '₹1,00,000–₹1,50,000',
		shoolini: '₹1,00,000–₹1,50,000',
		'sikkim-manipal': '₹1,00,000–₹1,50,000',
		lpu: '₹1,50,000–₹2,00,000',
		'chandigarh-university': '₹1,50,000–₹2,00,000',
		'dy-patil': '₹1,50,000–₹2,00,000',
		'manipal-jaipur': '₹1,50,000–₹2,00,000',
		jain: '₹1,50,000–₹2,00,000',
		amity: 'Above ₹2,00,000',
		manipal: 'Above ₹2,00,000'
	};

	const budgetOrder = [
		'Below ₹50,000',
		'₹50,000–₹75,000',
		'₹75,000–₹1,00,000',
		'₹1,00,000–₹1,50,000',
		'₹1,50,000–₹2,00,000',
		'Above ₹2,00,000'
	];

	const flexibleGradUnivs = [
		'lpu',
		'amity',
		'ignou',
		'andhra-university',
		'noida-international-university'
	];

	const specStrengths: Record<string, string[]> = {
		Finance: ['nmims', 'manipal', 'manipal-jaipur', 'chandigarh-university', 'jain'],
		Marketing: ['manipal-jaipur', 'amity', 'nmims', 'lpu', 'dy-patil'],
		'Human Resource Management': ['uttranchal', 'ignou', 'nmims', 'amity', 'sikkim-manipal'],
		'Business Analytics': ['manipal-jaipur', 'chandigarh-university', 'jain', 'amity', 'lpu'],
		'International Business': ['amity', 'chandigarh-university', 'manipal', 'jain', 'lpu'],
		'Operations Management': ['lpu', 'uttranchal', 'amity', 'ignou', 'dy-patil'],
		'Information Technology': [
			'chandigarh-university',
			'amity',
			'manipal-jaipur',
			'lpu',
			'sikkim-manipal'
		],
		'Digital Marketing': [
			'shoolini',
			'amity',
			'manipal-jaipur',
			'chandigarh-university',
			'dy-patil'
		],
		'Healthcare Management': ['dy-patil', 'shoolini', 'amity', 'uttranchal'],
		Entrepreneurship: ['manipal', 'jain', 'amity', 'chandigarh-university'],
		'Supply Chain Management': ['lpu', 'nmims', 'amity', 'uttranchal'],
		'Not sure – Need guidance': ['manipal-jaipur', 'nmims', 'chandigarh-university', 'lpu', 'ignou']
	};

	function calculateRecommendations() {
		const { percentage, budget, specialization, paymentMode } = answers;
		const budgetIdx = budgetOrder.indexOf(budget);

		const scored: RecommendedMatch[] = universities.map((u) => {
			let score = 50;
			const reasons: string[] = [];

			// 1. Graduation percentage
			const isBelow50 = percentage === 'Below 45%' || percentage === '45%–49%';
			if (isBelow50) {
				if (flexibleGradUnivs.includes(u.id)) {
					score += 45;
					reasons.push('Eligible with relaxed graduation criteria');
				} else {
					score -= 35;
				}
			} else {
				score += 25;
				if (percentage === '70%–79%' || percentage === '80% or above') {
					if (['manipal', 'nmims', 'dy-patil', 'amity', 'manipal-jaipur'].includes(u.id)) {
						score += 20;
						reasons.push('Matches high-tier NIRF & NAAC A++ eligibility');
					}
				}
			}

			// 2. Budget
			const uTier = univFeeTier[u.id] || '₹1,00,000–₹1,50,000';
			const uIdx = budgetOrder.indexOf(uTier);
			if (budgetIdx !== -1 && uIdx !== -1) {
				const diff = Math.abs(budgetIdx - uIdx);
				if (diff === 0) {
					score += 50;
					reasons.push(`Matches your ${budget} budget`);
				} else if (diff === 1) {
					score += 30;
					reasons.push(`Close to your desired budget`);
				} else if (diff === 2) {
					score += 10;
				} else {
					score -= 20;
				}
			}

			// 3. Specialization
			const matchingSpecList =
				specStrengths[specialization] || specStrengths['Not sure – Need guidance'];
			if (matchingSpecList.includes(u.id)) {
				score += 35;
				reasons.push(`Strong curriculum for ${specialization}`);
			}

			// 4. Payment mode
			if (paymentMode === 'EMI options' || paymentMode === 'No-cost EMI') {
				if (
					[
						'manipal',
						'manipal-jaipur',
						'lpu',
						'amity',
						'chandigarh-university',
						'nmims',
						'dy-patil',
						'jain',
						'shoolini'
					].includes(u.id)
				) {
					score += 20;
					reasons.push('0% Interest EMI options available');
				}
			} else if (paymentMode === 'Full payment (One-time)') {
				if (['ignou', 'andhra-university', 'galgotia', 'uttranchal'].includes(u.id)) {
					score += 20;
					reasons.push('Cost-effective one-time fee structure');
				}
			} else {
				score += 15;
				reasons.push('Flexible semester-wise payment plans');
			}

			const ratingNum = parseFloat(u.studentRating) || 4.5;
			score += (ratingNum - 4.0) * 15;

			return {
				university: u,
				score,
				matchReasons: reasons.slice(0, 2)
			};
		});

		scored.sort((a, b) => b.score - a.score);
		recommendedMatches = scored.slice(0, 3);
		questionnaireCompleted = true;
		questionnaireCollapsed = true;

		// Default selection: select top 3 recommended
		selectedUniversities = recommendedMatches.map((m) => m.university);
	}

	function selectOption(key: keyof typeof answers, val: string) {
		answers[key] = val;
		if (currentStep < 4) {
			currentStep += 1;
		} else {
			calculateRecommendations();
		}
	}

	function resetQuestionnaire() {
		answers = {
			percentage: '',
			budget: '',
			specialization: '',
			paymentMode: ''
		};
		currentStep = 1;
		questionnaireCompleted = false;
		questionnaireCollapsed = false;
		recommendedMatches = [];
	}

	function showToast(msg: string) {
		notificationMessage = msg;
		if (notificationTimeout) clearTimeout(notificationTimeout);
		notificationTimeout = setTimeout(() => {
			notificationMessage = '';
		}, 3200);
	}

	// Toggle university selection (allows 2 or 3 universities)
	function toggleSelection(university: University) {
		const index = selectedUniversities.findIndex((u) => u.id === university.id);
		if (index > -1) {
			selectedUniversities = selectedUniversities.filter((u) => u.id !== university.id);
		} else {
			if (selectedUniversities.length >= 3) {
				showToast('Maximum 3 universities can be compared. Deselect one first.');
				return;
			}
			selectedUniversities = [...selectedUniversities, university];
		}
	}

	function isSelected(university: University): boolean {
		return selectedUniversities.some((u) => u.id === university.id);
	}

	function navigateToComparison(univs: University[]) {
		const ids = univs.map((u) => u.id).join(',');
		goto(`/Compare/results?ids=${encodeURIComponent(ids)}`);
	}

	function selectRecommendedTrio() {
		if (recommendedMatches.length > 0) {
			selectedUniversities = recommendedMatches.map((m) => m.university);
			navigateToComparison(selectedUniversities);
		}
	}

	function openComparison() {
		if (selectedUniversities.length < 2) {
			showToast('Please select at least 2 universities to compare.');
			return;
		}
		navigateToComparison(selectedUniversities);
	}

	function clearAllSelections() {
		selectedUniversities = [];
	}

	// Reorder universities: Selected universities float to the top automatically!
	// When deselected, they go back to their natural catalogue position.
	$: sortedFilteredUniversities = (() => {
		const filtered = universities.filter(
			(univ) =>
				univ.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				univ.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
				univ.accreditation.toLowerCase().includes(searchTerm.toLowerCase())
		);

		const selectedList: University[] = [];
		const unselectedList: University[] = [];

		for (const u of filtered) {
			if (selectedUniversities.some((s) => s.id === u.id)) {
				selectedList.push(u);
			} else {
				unselectedList.push(u);
			}
		}

		return [...selectedList, ...unselectedList];
	})();
</script>

<main class="animated-gradient-bg flex min-h-screen flex-col">
	<!-- Navbar -->
	<Navbar />

	<!-- Toast Notification -->
	{#if notificationMessage}
		<div
			class="animate-bounce-in fixed top-24 left-1/2 z-50 flex -translate-x-1/2 transform items-center space-x-2 rounded-full border border-gray-700 bg-gray-900/90 px-5 py-2.5 text-sm font-medium text-white shadow-2xl backdrop-blur-md"
		>
			<svg class="h-4 w-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{notificationMessage}</span>
		</div>
	{/if}

	<!-- Main Content -->
	<div class="relative flex-grow overflow-hidden px-4 py-8 pt-24">
		<!-- Background Glows -->
		<div class="pointer-events-none absolute inset-0 opacity-40">
			<div
				class="animate-float-slow absolute top-20 left-10 h-44 w-44 rounded-full bg-gradient-to-r from-orange-200 to-amber-200 blur-3xl"
			></div>
			<div
				class="animate-float-medium absolute right-10 bottom-20 h-52 w-52 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 blur-3xl"
			></div>
			<div
				class="animate-float-fast absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 blur-3xl"
			></div>
		</div>

		<div class="relative z-10 mx-auto max-w-7xl">
			<!-- Header -->
			<div class="mb-10 text-center">
				<div
					class="mb-4 inline-flex items-center space-x-2 rounded-full border border-orange-200 bg-orange-100/80 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-orange-700 uppercase shadow-sm"
				>
					<svg
						class="h-4 w-4 text-orange-500"
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
					<span>Smart University Finder & Comparison Tool</span>
				</div>
				<h1
					class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
				>
					Compare <span
						class="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
						>Online MBA</span
					> Universities
				</h1>
				<div
					class="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
				></div>
				<p class="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl">
					Answer 4 quick questions to find your personalized matches, or select <strong
						class="text-orange-600">2 or 3 universities</strong
					> below to compare side-by-side.
				</p>
			</div>

			<!-- SECTION 1: QUESTIONNAIRE -->
			<div class="mb-12">
				<div
					class="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 sm:p-8 lg:p-10"
				>
					<div
						class="flex flex-col items-start justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center"
					>
						<div>
							<div class="flex items-center space-x-2">
								<span class="relative flex h-3 w-3">
									<span
										class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"
									></span>
									<span class="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
								</span>
								<h2 class="text-xl font-bold text-gray-900 sm:text-2xl">
									Online MBA – Student Preference Questionnaire
								</h2>
							</div>
							<p class="mt-1 text-sm text-gray-500">
								Personalized evaluation based on your marks, budget, specialization, and payment
								preference.
							</p>
						</div>

						{#if questionnaireCompleted}
							<div class="flex items-center space-x-2">
								<button
									on:click={() => (questionnaireCollapsed = !questionnaireCollapsed)}
									class="flex items-center space-x-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-600"
								>
									<span
										>{questionnaireCollapsed ? 'View / Change Answers' : 'Collapse Questions'}</span
									>
									<svg
										class="h-3.5 w-3.5 transition-transform duration-200"
										class:rotate-180={!questionnaireCollapsed}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								<button
									on:click={resetQuestionnaire}
									class="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-100"
								>
									Retake
								</button>
							</div>
						{/if}
					</div>

					<!-- Step Tracker (When Questionnaire is Active) -->
					{#if !questionnaireCollapsed}
						<div class="mt-6">
							<!-- Progress Bar -->
							<div class="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-100">
								<div
									class="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 ease-out"
									style="width: {questionnaireCompleted ? 100 : (currentStep / 4) * 100}%"
								></div>
							</div>

							<!-- Step Navigation Pills -->
							<div class="mb-8 grid grid-cols-4 gap-2 text-center text-xs font-medium sm:text-sm">
								<button
									type="button"
									on:click={() => (currentStep = 1)}
									class="rounded-xl border px-1 py-2 transition-all {currentStep === 1
										? 'border-orange-500 bg-orange-500 font-bold text-white shadow-md shadow-orange-500/20'
										: answers.percentage
											? 'border-orange-200 bg-orange-50 text-orange-700'
											: 'border-gray-200 bg-gray-50 text-gray-400'}"
								>
									<span class="block text-[11px] tracking-wider uppercase opacity-80">Step 1</span>
									<span class="block truncate">Graduation %</span>
								</button>
								<button
									type="button"
									on:click={() => (currentStep = 2)}
									class="rounded-xl border px-1 py-2 transition-all {currentStep === 2
										? 'border-orange-500 bg-orange-500 font-bold text-white shadow-md shadow-orange-500/20'
										: answers.budget
											? 'border-orange-200 bg-orange-50 text-orange-700'
											: 'border-gray-200 bg-gray-50 text-gray-400'}"
								>
									<span class="block text-[11px] tracking-wider uppercase opacity-80">Step 2</span>
									<span class="block truncate">Budget</span>
								</button>
								<button
									type="button"
									on:click={() => (currentStep = 3)}
									class="rounded-xl border px-1 py-2 transition-all {currentStep === 3
										? 'border-orange-500 bg-orange-500 font-bold text-white shadow-md shadow-orange-500/20'
										: answers.specialization
											? 'border-orange-200 bg-orange-50 text-orange-700'
											: 'border-gray-200 bg-gray-50 text-gray-400'}"
								>
									<span class="block text-[11px] tracking-wider uppercase opacity-80">Step 3</span>
									<span class="block truncate">Specialization</span>
								</button>
								<button
									type="button"
									on:click={() => (currentStep = 4)}
									class="rounded-xl border px-1 py-2 transition-all {currentStep === 4
										? 'border-orange-500 bg-orange-500 font-bold text-white shadow-md shadow-orange-500/20'
										: answers.paymentMode
											? 'border-orange-200 bg-orange-50 text-orange-700'
											: 'border-gray-200 bg-gray-50 text-gray-400'}"
								>
									<span class="block text-[11px] tracking-wider uppercase opacity-80">Step 4</span>
									<span class="block truncate">Payment Mode</span>
								</button>
							</div>

							<!-- Question Content Based on currentStep -->
							<div class="min-h-[220px]">
								<!-- Question 1 -->
								{#if currentStep === 1}
									<div class="animate-fade-in-up">
										<div class="mb-5">
											<span class="text-xs font-bold tracking-wider text-orange-600 uppercase"
												>Question 1 of 4</span
											>
											<h3 class="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
												{question1Graduation.title}
											</h3>
											<p class="text-sm text-gray-500">{question1Graduation.subtitle}</p>
										</div>
										<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
											{#each question1Graduation.options as opt}
												<button
													type="button"
													on:click={() => selectOption('percentage', opt)}
													class="group flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all {answers.percentage ===
													opt
														? 'border-orange-500 bg-orange-50/70 font-bold text-orange-950 shadow-md shadow-orange-500/10'
														: 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/30'}"
												>
													<span class="text-sm sm:text-base">{opt}</span>
													<span
														class="flex h-5 w-5 items-center justify-center rounded-full border transition-colors {answers.percentage ===
														opt
															? 'border-orange-500 bg-orange-500 text-white'
															: 'border-gray-300 group-hover:border-orange-400'}"
													>
														{#if answers.percentage === opt}
															<svg
																class="h-3 w-3"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																><path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="3"
																	d="M5 13l4 4L19 7"
																/></svg
															>
														{/if}
													</span>
												</button>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Question 2 -->
								{#if currentStep === 2}
									<div class="animate-fade-in-up">
										<div class="mb-5">
											<span class="text-xs font-bold tracking-wider text-orange-600 uppercase"
												>Question 2 of 4</span
											>
											<h3 class="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
												{question2Budget.title}
											</h3>
											<p class="text-sm text-gray-500">{question2Budget.subtitle}</p>
										</div>
										<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
											{#each question2Budget.options as opt}
												<button
													type="button"
													on:click={() => selectOption('budget', opt)}
													class="group flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all {answers.budget ===
													opt
														? 'border-orange-500 bg-orange-50/70 font-bold text-orange-950 shadow-md shadow-orange-500/10'
														: 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/30'}"
												>
													<span class="text-sm sm:text-base">{opt}</span>
													<span
														class="flex h-5 w-5 items-center justify-center rounded-full border transition-colors {answers.budget ===
														opt
															? 'border-orange-500 bg-orange-500 text-white'
															: 'border-gray-300 group-hover:border-orange-400'}"
													>
														{#if answers.budget === opt}
															<svg
																class="h-3 w-3"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																><path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="3"
																	d="M5 13l4 4L19 7"
																/></svg
															>
														{/if}
													</span>
												</button>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Question 3 -->
								{#if currentStep === 3}
									<div class="animate-fade-in-up">
										<div class="mb-5">
											<span class="text-xs font-bold tracking-wider text-orange-600 uppercase"
												>Question 3 of 4</span
											>
											<h3 class="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
												{question3Specialization.title}
											</h3>
											<p class="text-sm text-gray-500">{question3Specialization.subtitle}</p>
										</div>
										<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
											{#each question3Specialization.options as opt}
												<button
													type="button"
													on:click={() => selectOption('specialization', opt)}
													class="group flex items-center justify-between rounded-2xl border-2 p-3.5 text-left transition-all {answers.specialization ===
													opt
														? 'border-orange-500 bg-orange-50/70 font-bold text-orange-950 shadow-md shadow-orange-500/10'
														: 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/30'}"
												>
													<span class="text-xs font-medium sm:text-sm">{opt}</span>
													<span
														class="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors {answers.specialization ===
														opt
															? 'border-orange-500 bg-orange-500 text-white'
															: 'border-gray-300 group-hover:border-orange-400'}"
													>
														{#if answers.specialization === opt}
															<svg
																class="h-2.5 w-2.5"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																><path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="3"
																	d="M5 13l4 4L19 7"
																/></svg
															>
														{/if}
													</span>
												</button>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Question 4 -->
								{#if currentStep === 4}
									<div class="animate-fade-in-up">
										<div class="mb-5">
											<span class="text-xs font-bold tracking-wider text-orange-600 uppercase"
												>Question 4 of 4</span
											>
											<h3 class="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
												{question4Payment.title}
											</h3>
											<p class="text-sm text-gray-500">{question4Payment.subtitle}</p>
										</div>
										<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
											{#each question4Payment.options as opt}
												<button
													type="button"
													on:click={() => selectOption('paymentMode', opt)}
													class="group flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all {answers.paymentMode ===
													opt
														? 'border-orange-500 bg-orange-50/70 font-bold text-orange-950 shadow-md shadow-orange-500/10'
														: 'border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:bg-orange-50/30'}"
												>
													<span class="text-sm font-medium sm:text-base">{opt}</span>
													<span
														class="flex h-5 w-5 items-center justify-center rounded-full border transition-colors {answers.paymentMode ===
														opt
															? 'border-orange-500 bg-orange-500 text-white'
															: 'border-gray-300 group-hover:border-orange-400'}"
													>
														{#if answers.paymentMode === opt}
															<svg
																class="h-3 w-3"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
																><path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="3"
																	d="M5 13l4 4L19 7"
																/></svg
															>
														{/if}
													</span>
												</button>
											{/each}
										</div>
									</div>
								{/if}
							</div>

							<!-- Footer Navigation of Questionnaire -->
							<div class="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
								<div>
									{#if currentStep > 1}
										<button
											type="button"
											on:click={() => (currentStep -= 1)}
											class="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
										>
											<svg
												class="mr-1.5 h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M15 19l-7-7 7-7"
												/></svg
											>
											Back
										</button>
									{/if}
								</div>

								<div class="flex items-center space-x-3">
									{#if currentStep < 4}
										<button
											type="button"
											on:click={() => (currentStep += 1)}
											class="inline-flex items-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] hover:bg-orange-600"
										>
											Next Question
											<svg
												class="ml-1.5 h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 5l7 7-7 7"
												/></svg
											>
										</button>
									{:else}
										<button
											type="button"
											on:click={calculateRecommendations}
											class="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:from-orange-600 hover:to-amber-600"
										>
											<svg
												class="mr-2 h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M13 10V3L4 14h7v7l9-11h-7z"
												/></svg
											>
											Get Personalized Recommendations
										</button>
									{/if}
								</div>
							</div>
						</div>
					{/if}

					<!-- Summary Chips when Completed -->
					{#if questionnaireCompleted}
						<div
							class="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 text-xs"
						>
							<span class="font-semibold tracking-wider text-gray-500 uppercase">Your Profile:</span
							>
							{#if answers.percentage}
								<span
									class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-medium text-orange-800"
								>
									🎓 Marks: {answers.percentage}
								</span>
							{/if}
							{#if answers.budget}
								<span
									class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-medium text-orange-800"
								>
									💰 Budget: {answers.budget}
								</span>
							{/if}
							{#if answers.specialization}
								<span
									class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-medium text-orange-800"
								>
									🎯 Focus: {answers.specialization}
								</span>
							{/if}
							{#if answers.paymentMode}
								<span
									class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-medium text-orange-800"
								>
									💳 Mode: {answers.paymentMode}
								</span>
							{/if}
						</div>
					{/if}
				</div>
			</div>

			<!-- SECTION 2: TOP 3 RECOMMENDED UNIVERSITIES -->
			{#if questionnaireCompleted && recommendedMatches.length > 0}
				<div class="animate-fade-in-up mb-14">
					<div
						class="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
					>
						<div>
							<div
								class="mb-1 inline-flex items-center space-x-2 rounded-full border border-orange-200 bg-orange-100/70 px-3 py-1 text-xs font-bold text-orange-600"
							>
								<span>✨ AI-Matched For Your Profile</span>
							</div>
							<h2 class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
								Top 3 Recommended Universities
							</h2>
							<p class="mt-0.5 text-sm text-gray-600">
								Selected from our catalog based on your budget, graduation score, and desired
								specialization.
							</p>
						</div>

						<div class="flex items-center space-x-3">
							<button
								on:click={selectRecommendedTrio}
								class="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:from-orange-600 hover:to-amber-600"
							>
								<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/></svg
								>
								Compare These 3 Recommended
							</button>
						</div>
					</div>

					<!-- 3 Cards Grid -->
					<div class="grid gap-6 md:grid-cols-3">
						{#each recommendedMatches as match, idx}
							{@const univ = match.university}
							{@const selected = isSelected(univ)}
							<div
								class="relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 bg-white/95 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl {selected
									? 'border-orange-500 bg-gradient-to-b from-orange-50/40 to-white shadow-xl ring-4 ring-orange-400/30'
									: 'border-orange-100 shadow-md'}"
							>
								<!-- Top Match Ribbon -->
								<div
									class="flex items-center justify-between border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 pt-4 pb-3"
								>
									<span
										class="inline-flex items-center space-x-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold {idx ===
										0
											? 'bg-amber-200/80 text-amber-800'
											: 'bg-orange-200/70 text-orange-800'}"
									>
										<span>#{idx + 1} Best Fit</span>
									</span>
									<span class="flex items-center text-xs font-semibold text-gray-500">
										<svg
											class="mr-1 h-3.5 w-3.5 text-amber-500"
											fill="currentColor"
											viewBox="0 0 20 20"
											><path
												d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
											/></svg
										>
										{univ.studentRating}
									</span>
								</div>

								<div class="flex flex-1 flex-col justify-between p-5">
									<div>
										<!-- Header Logo + Name -->
										<div class="mb-4 flex items-center space-x-3">
											<div
												class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-1 shadow-sm"
											>
												<img
													src={univ.logo}
													alt="{univ.name} logo"
													class="h-full w-full object-contain"
												/>
											</div>
											<div>
												<h3 class="text-lg leading-snug font-bold text-gray-900">{univ.name}</h3>
												<p class="mt-0.5 flex items-center text-xs text-gray-500">
													<svg
														class="mr-1 h-3.5 w-3.5 text-gray-400"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														><path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
														/><path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
														/></svg
													>
													{univ.location}
												</p>
											</div>
										</div>

										<!-- Quick Info Grid -->
										<div
											class="mb-4 grid grid-cols-2 gap-2 rounded-xl border border-gray-100 bg-gray-50/80 p-3 text-xs"
										>
											<div>
												<span class="block text-[11px] text-gray-400">Fees</span>
												<span class="font-bold text-gray-800">{univ.fees}</span>
											</div>
											<div>
												<span class="block text-[11px] text-gray-400">Accreditation</span>
												<span class="font-bold text-gray-800">{univ.accreditation}</span>
											</div>
											<div>
												<span class="block text-[11px] text-gray-400">Placement Rate</span>
												<span class="font-bold text-green-700">{univ.placementRate}</span>
											</div>
											<div>
												<span class="block text-[11px] text-gray-400">Eligibility</span>
												<span
													class="block truncate font-medium text-gray-700"
													title={univ.eligibility}>{univ.eligibility}</span
												>
											</div>
										</div>

										<!-- Why it matches badges -->
										<div class="mb-5 space-y-1.5">
											<span
												class="block text-[11px] font-bold tracking-wider text-orange-600 uppercase"
												>Why it fits you:</span
											>
											{#each match.matchReasons as reason}
												<div class="flex items-start space-x-1.5 text-xs text-gray-700">
													<svg
														class="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														><path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2.5"
															d="M5 13l4 4L19 7"
														/></svg
													>
													<span>{reason}</span>
												</div>
											{/each}
										</div>
									</div>

									<!-- Action Button -->
									<button
										on:click={() => toggleSelection(univ)}
										class="flex w-full items-center justify-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm {selected
											? 'border border-red-200 bg-red-50 text-red-600 shadow-sm hover:bg-red-100'
											: 'border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'}"
									>
										{#if selected}
											<svg
												class="h-4 w-4 text-red-500"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2.5"
													d="M6 18L18 6M6 6l12 12"
												/></svg
											>
											<span>Selected (Click to Remove)</span>
										{:else}
											<svg
												class="h-4 w-4 text-orange-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/></svg
											>
											<span>Add to Comparison</span>
										{/if}
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- SECTION 3: FULL CATALOGUE & COMPARISON SELECTION -->
			<div class="mt-8">
				<!-- Bar with Title, Selection Counter & Comparison CTA -->
				<div
					class="mb-8 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur-xl"
				>
					<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
						<div>
							<h2 class="flex items-center space-x-2 text-xl font-bold text-gray-900 sm:text-2xl">
								<span>University Catalogue</span>
								<span
									class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700"
								>
									{sortedFilteredUniversities.length} Universities
								</span>
							</h2>
							<p class="mt-0.5 text-xs text-gray-500 sm:text-sm">
								Select <strong class="text-orange-600">2 or 3 universities</strong> to compare side-by-side.
								Selected universities automatically float to the top of the list!
							</p>
						</div>

						<!-- Action buttons -->
						<div class="flex w-full items-center space-x-3 sm:w-auto">
							{#if selectedUniversities.length > 0}
								<button
									on:click={clearAllSelections}
									class="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:border-red-200 hover:text-red-600"
								>
									Clear Selection ({selectedUniversities.length})
								</button>
							{/if}

							<button
								on:click={openComparison}
								disabled={selectedUniversities.length < 2}
								class="inline-flex flex-1 items-center justify-center rounded-xl px-5 py-2.5 text-xs font-bold transition-all sm:flex-initial sm:text-sm {selectedUniversities.length >=
								2
									? 'cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02] hover:from-orange-600 hover:to-amber-600'
									: 'cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400'}"
							>
								<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/></svg
								>
								{#if selectedUniversities.length === 2}
									Compare 2 Universities
								{:else if selectedUniversities.length === 3}
									Compare 3 Universities
								{:else}
									Select 2 or 3 to Compare ({selectedUniversities.length}/3)
								{/if}
							</button>
						</div>
					</div>

					<!-- Search Input -->
					<div class="relative mt-4 border-t border-gray-100 pt-4">
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
								<svg
									class="h-4 w-4 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									></path>
								</svg>
							</div>
							<input
								type="text"
								placeholder="Search universities by name, location, or accreditation..."
								bind:value={searchTerm}
								class="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-2.5 pr-10 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
							/>
							{#if searchTerm}
								<button
									type="button"
									aria-label="Clear search"
									on:click={() => (searchTerm = '')}
									class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 transition-colors hover:text-red-500"
								>
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										></path></svg
									>
								</button>
							{/if}
						</div>
					</div>
				</div>

				<!-- Grid of University Cards (Selected float to top) -->
				<div class="grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
					{#each sortedFilteredUniversities as university (university.id)}
						{@const selected = isSelected(university)}
						{@const selectedSlot =
							selectedUniversities.findIndex((u) => u.id === university.id) + 1}
						<div
							animate:flip={{ duration: 300 }}
							role="button"
							tabindex="0"
							on:click={() => toggleSelection(university)}
							on:keydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									toggleSelection(university);
								}
							}}
							class="relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl {selected
								? 'border-2 border-orange-500 bg-gradient-to-b from-orange-50/90 via-white to-amber-50/20 shadow-xl ring-4 shadow-orange-500/10 ring-orange-500/20'
								: 'border-gray-200/90 bg-white/95 text-gray-900 backdrop-blur-md hover:border-orange-300'}"
						>
							<div>
								<!-- If Selected: Prominent Top Ribbon with Slot Number -->
								{#if selected}
									<div
										class="mb-3 flex items-center justify-between border-b border-orange-200/90 pb-2.5"
									>
										<span
											class="inline-flex items-center space-x-1.5 rounded-full border border-orange-200 bg-orange-100 px-3 py-0.5 text-xs font-extrabold text-orange-800"
										>
											<svg
												class="h-3.5 w-3.5 text-orange-600"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
											<span>SELECTED TO COMPARE</span>
										</span>
										<span
											class="rounded-md border border-orange-200 bg-white px-2 py-0.5 text-xs font-bold text-orange-700 shadow-xs"
										>
											Slot {selectedSlot} of 3
										</span>
									</div>
								{/if}

								<!-- Row: Logo, Name & Selection Checkbox Indicator -->
								<div class="mb-3 flex items-start justify-between space-x-3">
									<div class="flex items-center space-x-3">
										<div
											class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-1 shadow-sm"
										>
											<img
												src={university.logo}
												alt="{university.name} logo"
												class="h-full w-full object-contain"
											/>
										</div>
										<div>
											<h3 class="text-base leading-tight font-extrabold text-gray-900 sm:text-lg">
												{university.name}
											</h3>
											<p class="mt-0.5 flex items-center text-xs text-gray-500">
												<svg
													class="mr-1 h-3.5 w-3.5 text-gray-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													/><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													/></svg
												>
												{university.location}
											</p>
										</div>
									</div>

									<!-- Selection Indicator Icon -->
									<div
										class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all {selected
											? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30'
											: 'border-gray-300 bg-white/80'}"
									>
										{#if selected}
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="3"
													d="M5 13l4 4L19 7"
												/></svg
											>
										{/if}
									</div>
								</div>

								<!-- Key Meta Data -->
								<div class="my-3 space-y-2 border-t border-gray-100 pt-3 text-xs">
									<div class="flex items-center justify-between">
										<span class="text-gray-500">Fees:</span>
										<span class="font-bold text-gray-900">{university.fees}</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-500">Accreditation:</span>
										<span class="font-semibold text-gray-800">{university.accreditation}</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-500">Placement Rate:</span>
										<span class="font-bold text-green-700">{university.placementRate}</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-500">Student Rating:</span>
										<span class="font-bold text-amber-600">★ {university.studentRating}</span>
									</div>
								</div>
							</div>

							<!-- Bottom Action Button on Card -->
							<div class="mt-3 pt-2">
								{#if selected}
									<button
										type="button"
										on:click|stopPropagation={() => toggleSelection(university)}
										class="flex w-full items-center justify-center space-x-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
									>
										<svg
											class="h-3.5 w-3.5 text-red-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2.5"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
										<span>Deselect / Remove</span>
									</button>
								{:else}
									<button
										type="button"
										on:click|stopPropagation={() => toggleSelection(university)}
										class="flex w-full items-center justify-center space-x-1.5 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700 transition-colors hover:bg-orange-100"
									>
										<svg
											class="h-3.5 w-3.5 text-orange-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
										<span>Select to Compare</span>
									</button>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Sticky Floating Action Bar when 2 or 3 are selected -->
	{#if selectedUniversities.length >= 2}
		<div
			class="animate-fade-in-up fixed bottom-6 left-1/2 z-40 w-11/12 max-w-2xl -translate-x-1/2 transform"
		>
			<div
				class="flex items-center justify-between gap-3 rounded-2xl border border-gray-800 bg-gray-950/90 p-3.5 text-white shadow-2xl backdrop-blur-xl sm:p-4"
			>
				<div class="flex items-center space-x-3 overflow-hidden">
					<div class="flex -space-x-2">
						{#each selectedUniversities as u}
							<div
								class="h-8 w-8 shrink-0 rounded-full border-2 border-gray-900 bg-white p-0.5 shadow-md"
							>
								<img src={u.logo} alt={u.name} class="h-full w-full rounded-full object-contain" />
							</div>
						{/each}
					</div>
					<div class="text-xs sm:text-sm">
						<span class="font-bold text-orange-400"
							>{selectedUniversities.length} of 3 selected</span
						>
						<p class="hidden text-[11px] text-gray-400 sm:block">
							{selectedUniversities.map((u) => u.name).join(' vs ')}
						</p>
					</div>
				</div>

				<div class="flex shrink-0 items-center space-x-2">
					<button
						on:click={clearAllSelections}
						class="rounded-lg px-2.5 py-1.5 text-xs text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
					>
						Clear
					</button>
					<button
						on:click={openComparison}
						class="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:from-orange-600 hover:to-amber-600 sm:px-5 sm:text-sm"
					>
						<span>Compare Now</span>
						<svg class="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/></svg
						>
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Footer -->
	<Footer />
</main>

<style lang="postcss">
	@keyframes float-slow {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-15px) rotate(5deg);
		}
	}

	@keyframes float-medium {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(-3deg);
		}
	}

	@keyframes float-fast {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-25px) rotate(2deg);
		}
	}

	.animate-float-slow {
		animation: float-slow 8s ease-in-out infinite;
	}

	.animate-float-medium {
		animation: float-medium 6s ease-in-out infinite;
	}

	.animate-float-fast {
		animation: float-fast 4s ease-in-out infinite;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.35s ease-out forwards;
	}

	@keyframes bounceIn {
		0% {
			opacity: 0;
			transform: translate(-50%, -15px) scale(0.95);
		}
		70% {
			opacity: 1;
			transform: translate(-50%, 2px) scale(1.02);
		}
		100% {
			opacity: 1;
			transform: translate(-50%, 0) scale(1);
		}
	}

	.animate-bounce-in {
		animation: bounceIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
	}
</style>
