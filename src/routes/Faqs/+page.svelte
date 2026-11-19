<script lang="ts">
	import { Navbar, Footer } from '$components';
	import { slide } from 'svelte/transition';

	// FAQ data
	let faqs = [
		{
			question: 'What is Kada Education?',
			answer:
				'Kada Education is an online learning and career-guidance platform that helps students explore accredited programs, enroll in online or blended courses, and build industry-ready skills.',
			isOpen: false
		},
		{
			question: 'Are the programs recognized and accredited?',
			answer:
				'Yes. All programs offered through Kada Education come from authorized and recognized institutions or universities. Accreditation details are provided for each course.',
			isOpen: false
		},
		{
			question: 'What types of courses do you offer?',
			answer:
				'We offer Undergraduate and Postgraduate Degrees, Diploma and PG Diploma Programs, Professional Certification Courses, Skill-Based Short-Term Courses, and Career-focused Industry Programs.',
			isOpen: false
		},
		{
			question: 'Are the courses fully online?',
			answer:
				'Most programs are 100% online. Some may offer hybrid (online + on-campus) options depending on the university.',
			isOpen: false
		},
		{
			question: 'How do I apply for a course?',
			answer:
				'You can fill out the online application form on our website. Our counselor will guide you through eligibility verification, documentation, and enrollment steps.',
			isOpen: false
		},
		{
			question: 'What documents are required for admission?',
			answer:
				'Typically required documents include ID proof, 10th and 12th marksheets, graduation documents for PG programs, passport-size photographs, and any additional documents as per course requirements.',
			isOpen: false
		},
		{
			question: 'What is the fee structure?',
			answer:
				'The fee varies by course and university. Each course page displays complete fee details including registration and examination charges.',
			isOpen: false
		},
		{
			question: 'Do you offer EMI or installment payment options?',
			answer: 'Yes. Attractive EMI and installment plans are available for many programs.',
			isOpen: false
		},
		{
			question: 'Are scholarships or discounts available?',
			answer:
				'Yes. Some partner institutions provide scholarships or special fee waivers based on eligibility and academic profile.',
			isOpen: false
		},
		{
			question: 'How will I attend online classes?',
			answer:
				'You receive access to recorded lectures, live classes, e-books, study materials, assignments, quizzes, and discussion forums.',
			isOpen: false
		},
		{
			question: 'Do I need special equipment to study?',
			answer:
				'You only need a smartphone or laptop, a stable internet connection, and a basic headset or microphone for live sessions.',
			isOpen: false
		},
		{
			question: 'What if I miss a live class?',
			answer: 'All live sessions are recorded and available for you to watch anytime.',
			isOpen: false
		},
		{
			question: 'How are exams conducted?',
			answer:
				'Exams may be conducted online or offline depending on the university’s policy. Details are provided after enrollment.',
			isOpen: false
		},
		{
			question: 'Will I receive a certificate or degree?',
			answer:
				'Yes. After successful completion, you will receive a recognized certificate or degree from the offering institution.',
			isOpen: false
		},
		{
			question: 'Do you provide academic support?',
			answer:
				'Yes. Students get continuous support from faculty, mentors, and counselors throughout the program.',
			isOpen: false
		},
		{
			question: 'Is technical support available?',
			answer:
				'Yes. We provide dedicated technical assistance for login issues, LMS access, and content-related problems.',
			isOpen: false
		},
		{
			question: 'Do you offer placement assistance?',
			answer:
				'Yes. We offer resume building, interview training, internship guidance, and job referrals where applicable.',
			isOpen: false
		},
		{
			question: 'What are the career opportunities after completing a course?',
			answer:
				'Career opportunities depend on the selected program, but all courses are designed to improve job readiness and industry-relevant skills.',
			isOpen: false
		},
		{
			question: 'Can I study at my own pace?',
			answer:
				'Most programs are self-paced with flexible deadlines. Some may have fixed schedules for live sessions.',
			isOpen: false
		},
		{
			question: 'Can I pause or defer my course?',
			answer:
				'Deferral depends on university policies. Our team will assist you with the process if needed.',
			isOpen: false
		},
		{
			question: 'What is your refund policy?',
			answer:
				'Refund policies vary by university. Generally, refunds are allowed only before final enrollment confirmation.',
			isOpen: false
		},
		{
			question: 'Can I switch to another course?',
			answer: 'Course changes may be allowed based on university guidelines and program timelines.',
			isOpen: false
		}
	];

	// Toggle FAQ
	function toggleFaq(index: number) {
		faqs[index].isOpen = !faqs[index].isOpen;
		faqs.forEach((faq, i) => {
			if (i !== index) faq.isOpen = false;
		});
		faqs = [...faqs]; // Trigger reactivity
	}
</script>

<main class="flex min-h-screen flex-col">
	<!-- Navbar -->
	<div class="sticky top-0 z-50 w-full bg-white shadow-sm">
		<Navbar />
	</div>

	<!-- Main Content -->
	<div class="flex-grow bg-gray-50 px-4 py-20 sm:px-6 sm:py-24 md:py-28">
		<div class="mx-auto max-w-4xl">
			<!-- Header -->
			<div class="mb-8 text-center sm:mb-12">
				<h1 class="mb-3 text-3xl font-bold text-gray-900 sm:mb-4 sm:text-4xl md:text-5xl">
					Frequently asked
					<span
						class="block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent sm:inline"
					>
						questions
					</span>
				</h1>
				<p class="mx-auto max-w-2xl px-2 text-base text-gray-600 sm:text-lg">
					Do you need some help with something or do you have questions on some features?
				</p>
			</div>

			<!-- FAQ List -->
			<div class="space-y-3 sm:space-y-4">
				{#each faqs as faq, index}
					<div
						class="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md sm:rounded-2xl"
					>
						<button
							on:click={() => toggleFaq(index)}
							class="flex w-full items-start justify-between px-4 py-3 text-left sm:items-center sm:px-6 sm:py-4"
							aria-expanded={faq.isOpen}
						>
							<span class="pr-4 text-base font-medium text-gray-900 sm:text-lg">{faq.question}</span
							>
							<svg
								class="mt-1 h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 sm:mt-0 sm:h-6 sm:w-6"
								class:rotate-180={faq.isOpen}
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
						{#if faq.isOpen}
							<div
								class="px-4 pb-3 text-sm text-gray-600 sm:px-6 sm:pb-4 sm:text-base"
								transition:slide={{ duration: 200 }}
							>
								{faq.answer}
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Contact Section -->
			<div class="mt-8 px-2 text-center sm:mt-12">
				<h2 class="mb-3 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl">
					Have any other questions?
				</h2>
				<p class="mb-5 text-sm text-gray-600 sm:mb-6 sm:text-base">
					Can't find the answer you're looking for? Reach out to our dedicated counseling team.
				</p>
				<div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
					<a
						href="/Contact"
						class="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-lg"
					>
						<span>Contact Us</span>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</a>
					<a
						href="https://www.instagram.com/kadaeducation/"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
					>
						<span>Instagram</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<Footer />
</main>

<style>
	/* Add any component-specific styles here */
</style>
