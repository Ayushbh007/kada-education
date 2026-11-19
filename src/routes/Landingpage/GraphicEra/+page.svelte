<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import Formpopup from '$lib/components/modal/Formpopup.svelte';
	import { page } from '$app/stores';
	import { getFee, pick } from '$lib/fees';

	// Live fees from the Google Sheet (falls back to defaults)
	$: fee = getFee($page.data.fees, 'graphic-era', 'Graphic Era University');

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
		console.log('Form submitted for Graphic Era:', event.detail);
	}

	const heroImages = [
		'/Images/GraphicEra/slider1.png',
		'/Images/GraphicEra/mba.jpg',
		'/Images/GraphicEra/bba.jpg'
	];

	// Intersection Observer tracking
	let universityVisible = false;
	let highlightsVisible = false;
	let programsVisible = false;
	let statsVisible = false;
	let admissionVisible = false;
	let testimonialVisible = false;
	let faqVisible = false;

	function inView(node: HTMLElement, params: { callback: (visible: boolean) => void }) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					params.callback(entry.isIntersecting);
				});
			},
			{ threshold: 0.15 }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.unobserve(node);
			}
		};
	}

	// Active program filter for programs section
	type ProgramCategory = 'all' | 'pg' | 'ug';
	let selectedCategory: ProgramCategory = 'all';

	const programsList = [
		{
			id: 'mba',
			category: 'pg',
			name: 'Online MBA',
			fullName: 'Master of Business Administration',
			duration: '2 Years (4 Semesters)',
			mode: '100% Online',
			level: "Postgraduate Degree",
			feeAnnual: '₹35,000 / Year',
			feeSemester: '₹17,500 / Sem',
			feeTotal: '₹70,000 Total',
			image: '/Images/GraphicEra/mba.jpg',
			badge: 'Most Popular',
			eligibility: "Bachelor's degree in any discipline with min. 50% aggregate (45% for reserved)",
			specializations: [
				'Marketing Management',
				'Financial Management',
				'Human Resource Management',
				'Information Technology',
				'International Business',
				'Operations Management'
			],
			description:
				'Equips future leaders with strategic thinking, case-study analytics, leadership essentials, and hands-on business simulations.',
			highlights: [
				'Harvard Business Publishing case studies',
				'Industry-led Masterclasses & Seminars',
				'Dual Specialization opportunity',
				'100% Placement assistance support'
			]
		},
		{
			id: 'mca',
			category: 'pg',
			name: 'Online MCA',
			fullName: 'Master of Computer Applications',
			duration: '2 Years (4 Semesters)',
			mode: '100% Online',
			level: "Postgraduate Degree",
			feeAnnual: '₹35,000 / Year',
			feeSemester: '₹17,500 / Sem',
			feeTotal: '₹70,000 Total',
			image: '/Images/GraphicEra/mca.jpg',
			badge: 'High Demand',
			eligibility: 'BCA / B.Sc (IT / CS) or Bachelor degree with Mathematics at 10+2 or Graduation level',
			specializations: [
				'Cloud Computing & DevOps',
				'Artificial Intelligence & Data Science',
				'Full Stack Software Development',
				'Information Cyber Security'
			],
			description:
				'Rigorous software engineering, advanced algorithms, cloud architecture, and modern full-stack development methodologies.',
			highlights: [
				'Hands-on virtual coding sandboxes',
				'Industry projects on GitHub & Cloud platforms',
				'Curriculum reviewed by tech giants',
				'Highest tech placements up to ₹84.88 LPA'
			]
		},
		{
			id: 'bba',
			category: 'ug',
			name: 'Online BBA',
			fullName: 'Bachelor of Business Administration',
			duration: '3 Years (6 Semesters)',
			mode: '100% Online',
			level: "Undergraduate Degree",
			feeAnnual: '₹25,000 / Year',
			feeSemester: '₹12,500 / Sem',
			feeTotal: '₹75,000 Total',
			image: '/Images/GraphicEra/bba.jpg',
			badge: 'UG Career Builder',
			eligibility: '10+2 (Higher Secondary) in any stream from recognized board with min. 50% aggregate',
			specializations: [
				'General Management',
				'Digital Marketing',
				'Banking & Financial Services',
				'Human Resources'
			],
			description:
				'Build solid foundations in corporate management, market analytics, accounting, and entrepreneurship straight after school.',
			highlights: [
				'Industry relevant business curriculum',
				'Soft-skills, grooming & communication labs',
				'Capstone real-world project in final year',
				'Pathway to leading MBA programs globally'
			]
		},
		{
			id: 'bca',
			category: 'ug',
			name: 'Online BCA',
			fullName: 'Bachelor of Computer Applications',
			duration: '3 Years (6 Semesters)',
			mode: '100% Online',
			level: "Undergraduate Degree",
			feeAnnual: '₹25,000 / Year',
			feeSemester: '₹12,500 / Sem',
			feeTotal: '₹75,000 Total',
			image: '/Images/GraphicEra/bca.jpg',
			badge: 'Tech Foundation',
			eligibility: '10+2 from a recognized board with Mathematics or Computer Science as a subject',
			specializations: [
				'Software Application Development',
				'Database Management Systems',
				'Web Technologies & UI/UX',
				'Cloud & Networking Fundamentals'
			],
			description:
				'Designed for aspiring developers and IT professionals. Covers core programming in Java, Python, C++, DBMS, and Web development.',
			highlights: [
				'Practical coding assignments every semester',
				'Technical interview grooming',
				'Access to global developer communities',
				'Top entry-level software recruiter tie-ups'
			]
		},
		{
			id: 'bcom',
			category: 'ug',
			name: 'Online B.Com (Hons.)',
			fullName: 'Bachelor of Commerce (Honours)',
			duration: '3 Years (6 Semesters)',
			mode: '100% Online',
			level: "Undergraduate Degree",
			feeAnnual: '₹25,000 / Year',
			feeSemester: '₹12,500 / Sem',
			feeTotal: '₹75,000 Total',
			image: '/Images/GraphicEra/bcom.jpg',
			badge: 'Commerce & Finance',
			eligibility: '10+2 from a recognized board in Commerce or relevant stream with min. 50% aggregate',
			specializations: [
				'Accounting & Auditing',
				'Banking & Insurance',
				'Taxation & Corporate Laws',
				'Financial Markets'
			],
			description:
				'In-depth knowledge of financial accounting, Indian & international taxation, financial analysis, and statutory compliance.',
			highlights: [
				'Tally Prime & Advanced Excel training',
				'Preparation support for CA/CS/CMA tracks',
				'Practical ledger & tax filing exercises',
				'Direct pathways to corporate finance roles'
			]
		}
	];

	$: filteredPrograms =
		selectedCategory === 'all'
			? programsList
			: programsList.filter((p) => p.category === selectedCategory);

	// Interactive FAQ state
	let openFaqIndex: number | null = 0;
	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}

	const faqs = [
		{
			q: 'Are the online degrees from Graphic Era University UGC and AICTE approved?',
			a: 'Yes! Graphic Era (Deemed to be University) is the first and only university in Uttarakhand to be approved by UGC (University Grants Commission) and DEB (Distance Education Bureau) for offering online degree programs. The management and computer application courses are also duly recognized.'
		},
		{
			q: 'Is an online degree from Graphic Era equivalent to a conventional on-campus degree?',
			a: 'Yes, as per University Grants Commission (UGC) Regulations, online degrees awarded by UGC-entitled higher education institutions are treated on equal footing with regular on-campus degrees for all employment purposes, civil services exams, government appointments, and higher education in India and abroad.'
		},
		{
			q: 'How will the classes and examinations be conducted?',
			a: 'All academic delivery takes place through GEU Online’s modern Learning Management System (LMS). You get access to live interactive online lectures, recorded lecture archives, digital study material, and e-library access 24/7. Exams are conducted fully online with AI-assisted proctoring, allowing you to appear safely from your home or office.'
		},
		{
			q: 'What placement and career support does Graphic Era Online provide?',
			a: 'Students enrolled in Graphic Era Online have access to career guidance, resume rebuilding, interview preparation bootcamps, and virtual recruitment drives. Graphic Era boasts a network of 500+ recruitment partners including Microsoft, Amazon, Adobe, Atlassian, Google, Cognizant, and TCS, with past top packages reaching up to ₹84.88 LPA.'
		},
		{
			q: 'Can I pay my tuition fees in installments or through no-cost EMI?',
			a: 'Yes, GEU Online offers flexible payment plans. You can pay fees per semester or choose zero-cost EMI plans with easy monthly options starting from ₹2,083 per month depending on the program.'
		},
		{
			q: 'What is the eligibility requirement for the Online MBA and MCA programs?',
			a: 'For Online MBA: Any candidate who has completed a Bachelor’s degree in any discipline with a minimum of 50% marks (45% for reserved category). For Online MCA: Bachelor’s degree in Computer Applications (BCA/B.Sc IT/CS) or any graduation with Mathematics at 10+2 or Degree level.'
		}
	];

	// Top Recruiters list
	const recruiters = [
		{ name: 'Adobe', domain: 'Tech & Creative' },
		{ name: 'Amazon', domain: 'Cloud & E-Commerce' },
		{ name: 'Atlassian', domain: 'Enterprise Software' },
		{ name: 'Google', domain: 'Tech & Search' },
		{ name: 'Microsoft', domain: 'Technology' },
		{ name: 'Deloitte', domain: 'Consulting' },
		{ name: 'Cognizant', domain: 'IT Services' },
		{ name: 'Infosys', domain: 'Technology Services' },
		{ name: 'TCS', domain: 'Global Tech' },
		{ name: 'Wipro', domain: 'IT Consulting' },
		{ name: 'Tech Mahindra', domain: 'Telecom & IT' },
		{ name: 'HCL Technologies', domain: 'Software & Cloud' }
	];
</script>

<svelte:head>
	<title>Graphic Era University Online Programs - MBA, MCA, BBA, BCA | Kada Education</title>
	<meta
		name="description"
		content="Enroll in UGC-entitled & NAAC A+ accredited Online Degrees from Graphic Era University (geuonline.com). Explore Online MBA, MCA, BBA, BCA & B.Com with flexible payments, top placements, and free counseling."
	/>
	<meta property="og:title" content="Graphic Era University Online Programs | Kada Education" />
	<meta
		property="og:description"
		content="Uttarakhand's First and Only UGC-Entitled Online University. NAAC A+ Grade, NIRF Rank 48, top corporate placements up to ₹84.88 LPA."
	/>
	<meta property="og:image" content="/Images/logos/graphic-era-logo.png" />
	<meta property="og:type" content="website" />
</svelte:head>

<main class="flex min-h-screen flex-col bg-slate-50 font-sans text-gray-900 selection:bg-amber-500 selection:text-white">
	<!-- Top Hero Section with Background Slider -->
	<div class="relative">
		<HeroSection images={heroImages} overlayOpacity={55}>
			<div class="animate-fade-in mx-auto max-w-4xl px-4 text-center">
				<!-- Accreditation Tag Badge -->
				<div class="mb-4 inline-flex flex-wrap items-center justify-center gap-2">
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-3.5 py-1 text-xs font-bold tracking-wider text-amber-300 uppercase shadow-lg backdrop-blur-md"
					>
						<span class="h-2 w-2 animate-ping rounded-full bg-amber-400"></span>
						NAAC GRADE A+ ACCREDITED
					</span>
					<span
						class="inline-flex items-center rounded-full border border-blue-400/40 bg-blue-600/30 px-3 py-1 text-xs font-bold tracking-wider text-blue-200 uppercase backdrop-blur-md"
					>
						NIRF RANK 48
					</span>
					<span
						class="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-600/30 px-3 py-1 text-xs font-bold tracking-wider text-emerald-200 uppercase backdrop-blur-md"
					>
						UGC-DEB ENTITLED
					</span>
				</div>

				<h1 class="mb-3 text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
					Graphic Era University
					<span class="block text-amber-400">Online Degree Programs</span>
				</h1>

				<p class="mx-auto mb-3 max-w-2xl text-base font-medium text-slate-200 sm:text-lg md:text-xl">
					Uttarakhand’s 1st and Only University Approved by UGC for Online Education
				</p>

				<p class="mx-auto mb-8 max-w-2xl text-xs font-medium text-slate-300 sm:text-sm">
					Earn recognized Online MBA, MCA, BBA, BCA & B.Com degrees with live interactive sessions,
					world-class LMS, and exceptional corporate placement support.
				</p>

				<!-- Hero CTA Buttons -->
				<div class="flex flex-wrap items-center justify-center gap-4">
					<button
						on:click={openForm}
						class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:from-amber-400 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:text-base"
					>
						<span>Apply for Admission</span>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</button>

					<a
						href="#programs"
						class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:text-base"
					>
						<span>Explore Programs</span>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</a>
				</div>
			</div>
		</HeroSection>

		<!-- Floating Navbar overlay -->
		<div class="pointer-events-none absolute inset-x-0 top-0 z-20">
			<div class="pointer-events-auto">
				<Navbar />
			</div>
		</div>
	</div>

	<!-- Top Highlights Cards Bar (Properly structured, non-overflowing) -->
	<section class="relative z-10 border-b border-slate-800 bg-slate-900 py-5 px-4 text-white sm:px-6 lg:px-8 shadow-lg">
		<div class="mx-auto max-w-7xl">
			<div class="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-6">
				<!-- NAAC A+ -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-amber-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-white sm:text-base">NAAC A+</div>
						<div class="text-[11px] text-slate-400">Deemed to be University</div>
					</div>
				</div>

				<!-- NIRF #48 -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-blue-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-white sm:text-base">NIRF #48</div>
						<div class="text-[11px] text-slate-400">Top 50 in India</div>
					</div>
				</div>

				<!-- ₹84.88 LPA -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-emerald-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-emerald-400 sm:text-base">₹84.88 LPA</div>
						<div class="text-[11px] text-slate-400">Peak Placement Offer</div>
					</div>
				</div>

				<!-- 500+ Hiring -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-purple-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-white sm:text-base">500+ Hiring</div>
						<div class="text-[11px] text-slate-400">Corporate Partners</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Accreditations & Recognitions Bar -->
	<section class="border-y border-slate-200 bg-white py-6 shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:justify-between">
				<div class="flex items-center gap-3">
					<img src="/Images/logos/graphic-era-logo.png" alt="Graphic Era University Logo" class="h-12 w-auto object-contain" />
					<div class="border-l border-slate-300 pl-3">
						<div class="text-xs font-black tracking-wider text-slate-800 uppercase">Directorate of Online Education</div>
						<div class="text-[11px] text-slate-500">Graphic Era (Deemed to be University), Dehradun</div>
					</div>
				</div>

				<div class="flex flex-wrap items-center justify-center gap-6 text-center text-xs font-bold text-slate-700">
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-800">✓</span>
						<span>UGC & UGC-DEB Approved</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-800">★</span>
						<span>NAAC 'A+' Grade</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">#</span>
						<span>NIRF Rank 48 (Univ.)</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-800">✦</span>
						<span>AICTE Approved</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-800">◆</span>
						<span>QS-I.GAUGE Diamond</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- University Overview / Why Choose Graphic Era Online -->
	<section
		class="py-16 sm:py-20 bg-slate-50"
		use:inView={{ callback: (v) => (universityVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="mx-auto max-w-3xl text-center transition-all duration-700"
				class:opacity-0={!universityVisible}
				class:translate-y-8={!universityVisible}
				class:opacity-100={universityVisible}
				class:translate-y-0={universityVisible}
			>
				<span class="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold tracking-wider text-amber-800 uppercase">
					About GEU Online
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					First & Only University in Uttarakhand Approved for Online Education
				</h2>
				<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
					Graphic Era (Deemed to be University) was established in 1993 and has nurtured over 30 years
					of educational distinction. Through <strong class="text-slate-800">GEU Online (geuonline.com)</strong>,
					the university brings world-class undergraduate and postgraduate programs right to your screen
					with interactive pedagogy, industry curriculum, and robust placement support.
				</p>
			</div>

			<!-- 3 Pillar Feature Cards -->
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				<div
					class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
				>
					<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
						<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-slate-900">UGC-DEB Recognized Degree</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						Your degree holds identical legal and academic value to regular on-campus degrees under UGC
						guidelines, eligible for all Government jobs, UPSC, PSU, and global higher study pursuits.
					</p>
				</div>

				<div
					class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
				>
					<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
						<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-slate-900">Modern Cloud LMS Platform</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						Attend weekend live webinars, watch recorded lecture archives, download digital e-books,
						participate in peer discussion boards, and take AI-proctored online exams conveniently from home.
					</p>
				</div>

				<div
					class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl"
				>
					<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
						<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-slate-900">Elite Career & Placement Cell</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						Benefit from centralized placement assistance with over 500 marquee recruiters like Adobe,
						Amazon, Google, Atlassian, and Microsoft, backed by resume building and mock interviews.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Key Highlights Strip (Duration, Mode, Fee, Approvals) -->
	<section
		class="border-y border-slate-200 bg-slate-900 py-12 text-white"
		use:inView={{ callback: (v) => (highlightsVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 text-center transition-all duration-700"
				class:opacity-0={!highlightsVisible}
				class:translate-y-6={!highlightsVisible}
				class:opacity-100={highlightsVisible}
				class:translate-y-0={highlightsVisible}
			>
				<div class="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-amber-400 uppercase">Program Duration</div>
					<div class="mt-1 text-2xl font-black text-white">2 - 3 Years</div>
					<div class="mt-1 text-xs text-slate-400">4 or 6 Semesters</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-amber-400 uppercase">Learning Mode</div>
					<div class="mt-1 text-2xl font-black text-white">100% Online</div>
					<div class="mt-1 text-xs text-slate-400">Live & Recorded Lectures</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-amber-400 uppercase">Annual Fee From</div>
					<div class="mt-1 text-2xl font-black text-amber-400">{pick(fee.annual, '₹25,000')}</div>
					<div class="mt-1 text-xs text-slate-400">Easy EMI options available</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-amber-400 uppercase">Highest Package</div>
					<div class="mt-1 text-2xl font-black text-emerald-400">₹84.88 LPA</div>
					<div class="mt-1 text-xs text-slate-400">Atlassian / International</div>
				</div>

				<div class="col-span-2 sm:col-span-1 rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-amber-400 uppercase">Examinations</div>
					<div class="mt-1 text-2xl font-black text-white">Proctored Online</div>
					<div class="mt-1 text-xs text-slate-400">Attend anywhere from home</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Programs Offered Section (Filterable Tabs + Detailed Cards) -->
	<section
		id="programs"
		class="py-16 sm:py-24 bg-white"
		use:inView={{ callback: (v) => (programsVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold tracking-wider text-amber-800 uppercase">
					UGC-DEB Entitled Courses
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
					Programs Offered at GEU Online
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
					Select from career-defining undergraduate and postgraduate degree programs designed for working
					professionals and fresh graduates.
				</p>

				<!-- Filter Tabs -->
				<div class="mt-8 flex justify-center">
					<div class="inline-flex rounded-xl bg-slate-100 p-1.5 shadow-inner">
						<button
							on:click={() => (selectedCategory = 'all')}
							class="rounded-lg px-5 py-2 text-xs font-bold transition-all sm:text-sm"
							class:bg-amber-500={selectedCategory === 'all'}
							class:text-slate-950={selectedCategory === 'all'}
							class:shadow-md={selectedCategory === 'all'}
							class:text-slate-600={selectedCategory !== 'all'}
							class:hover:text-slate-900={selectedCategory !== 'all'}
						>
							All Programs ({programsList.length})
						</button>
						<button
							on:click={() => (selectedCategory = 'pg')}
							class="rounded-lg px-5 py-2 text-xs font-bold transition-all sm:text-sm"
							class:bg-amber-500={selectedCategory === 'pg'}
							class:text-slate-950={selectedCategory === 'pg'}
							class:shadow-md={selectedCategory === 'pg'}
							class:text-slate-600={selectedCategory !== 'pg'}
							class:hover:text-slate-900={selectedCategory !== 'pg'}
						>
							Postgraduate (2)
						</button>
						<button
							on:click={() => (selectedCategory = 'ug')}
							class="rounded-lg px-5 py-2 text-xs font-bold transition-all sm:text-sm"
							class:bg-amber-500={selectedCategory === 'ug'}
							class:text-slate-950={selectedCategory === 'ug'}
							class:shadow-md={selectedCategory === 'ug'}
							class:text-slate-600={selectedCategory !== 'ug'}
							class:hover:text-slate-900={selectedCategory !== 'ug'}
						>
							Undergraduate (3)
						</button>
					</div>
				</div>
			</div>

			<!-- Program Cards Grid -->
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredPrograms as prog}
					<article
						class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl"
					>
						<!-- Card Banner / Image -->
						<div class="relative h-48 w-full overflow-hidden bg-slate-900">
							<img
								src={prog.image}
								alt={`${prog.name} Graphic Era`}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

							<!-- Badges -->
							<span class="absolute top-3 left-3 inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-bold text-amber-400 shadow-md backdrop-blur-md">
								{prog.badge}
							</span>

							<span class="absolute top-3 right-3 inline-flex items-center rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold text-slate-950 shadow-md">
								{prog.level}
							</span>

							<div class="absolute bottom-3 left-4 right-4">
								<h3 class="text-2xl font-black text-white">{prog.name}</h3>
								<div class="text-xs font-medium text-slate-200">{prog.fullName}</div>
							</div>
						</div>

						<!-- Card Body -->
						<div class="flex flex-1 flex-col p-6">
							<!-- Key Meta Info -->
							<div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
								<span class="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
									<svg class="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									{prog.duration}
								</span>
								<span class="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
									{prog.feeAnnual}
								</span>
							</div>

							<p class="text-xs leading-relaxed text-slate-600">
								{prog.description}
							</p>

							<!-- Specializations Pill List -->
							<div class="mt-4">
								<span class="block text-[11px] font-bold tracking-wider text-slate-400 uppercase">Specializations</span>
								<div class="mt-1.5 flex flex-wrap gap-1.5">
									{#each prog.specializations as spec}
										<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
											{spec}
										</span>
									{/each}
								</div>
							</div>

							<!-- Eligibility -->
							<div class="mt-4 rounded-lg bg-amber-500/10 p-3 text-[11px] text-amber-900">
								<strong class="font-bold">Eligibility:</strong> {prog.eligibility}
							</div>

							<!-- Key Bullets -->
							<ul class="mt-4 space-y-1.5 text-xs text-slate-600">
								{#each prog.highlights as h}
									<li class="flex items-center gap-2">
										<svg class="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
										</svg>
										<span>{h}</span>
									</li>
								{/each}
							</ul>

							<!-- Action Buttons -->
							<div class="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
								<button
									on:click={openForm}
									class="flex-1 rounded-xl bg-amber-500 py-2.5 text-center text-xs font-bold text-slate-950 shadow-md transition-all hover:bg-amber-400 focus:outline-none"
								>
									Apply Now
								</button>
								<button
									on:click={openForm}
									class="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
								>
									Syllabus
								</button>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Fee Structure & Transparency Table -->
	<section class="py-16 bg-slate-50 border-t border-slate-200">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold tracking-wider text-emerald-800 uppercase">
					Affordable Higher Education
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					Transparent Fee Structure
				</h2>
				<p class="mt-3 text-sm text-slate-600 sm:text-base">
					Zero hidden charges. Semester installment options and 0% interest EMI schemes available
					for eligible students.
				</p>
			</div>

			<!-- Fee Table Container -->
			<div class="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead class="border-b border-slate-200 bg-slate-900 text-xs font-bold text-white uppercase tracking-wider">
							<tr>
								<th class="px-6 py-4">Degree Program</th>
								<th class="px-6 py-4">Duration</th>
								<th class="px-6 py-4">Semester Fee</th>
								<th class="px-6 py-4">Annual Fee</th>
								<th class="px-6 py-4">Total Course Fee</th>
								<th class="px-6 py-4">Action</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-100 text-slate-700">
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online MBA</td>
								<td class="px-6 py-4">2 Years (4 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹17,500</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹35,000</td>
								<td class="px-6 py-4 font-black text-amber-600">₹70,000</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online MCA</td>
								<td class="px-6 py-4">2 Years (4 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹17,500</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹35,000</td>
								<td class="px-6 py-4 font-black text-amber-600">₹70,000</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online BBA</td>
								<td class="px-6 py-4">3 Years (6 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹12,500</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹25,000</td>
								<td class="px-6 py-4 font-black text-amber-600">₹75,000</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online BCA</td>
								<td class="px-6 py-4">3 Years (6 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹12,500</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹25,000</td>
								<td class="px-6 py-4 font-black text-amber-600">₹75,000</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online B.Com (Hons.)</td>
								<td class="px-6 py-4">3 Years (6 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹12,500</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹25,000</td>
								<td class="px-6 py-4 font-black text-amber-600">₹75,000</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400">
										Enquire
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Scholarship Footer Note -->
				<div class="border-t border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-4">
					<div>
						<strong class="text-slate-800">Scholarship Opportunities:</strong> Merit scholarships, defense
						personnel benefits, and special alumni concessions available upon application review.
					</div>
					<button
						on:click={openForm}
						class="text-xs font-bold text-amber-600 hover:text-amber-700 underline"
					>
						Check Scholarship Eligibility →
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- 3-Step Simple Admission Process (From geuonline.com) -->
	<section
		class="py-16 sm:py-24 bg-white"
		use:inView={{ callback: (v) => (admissionVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-bold tracking-wider text-blue-800 uppercase">
					Simple & 100% Online
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					How to Apply in 3 Easy Steps
				</h2>
				<p class="mt-3 text-sm text-slate-600 sm:text-base">
					Complete your enrollment without having to visit any physical campus or admission center.
				</p>
			</div>

			<div class="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Step 01 -->
				<div class="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:shadow-lg">
					<div class="mx-auto -mt-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-xl font-black text-slate-950 shadow-lg">
						01
					</div>
					<h3 class="mt-6 text-xl font-bold text-slate-900">You Apply</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						Fill out the online application form on our portal with your basic academic history and
						upload soft copies of your qualifying documents.
					</p>
					<div class="mt-4 text-xs font-semibold text-amber-600">Takes less than 5 minutes</div>
				</div>

				<!-- Step 02 -->
				<div class="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:shadow-lg">
					<div class="mx-auto -mt-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-black text-amber-400 shadow-lg">
						02
					</div>
					<h3 class="mt-6 text-xl font-bold text-slate-900">We Connect</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						Our dedicated admission counseling experts review your eligibility, assist with document
						verification, and issue your official admission offer letter.
					</p>
					<div class="mt-4 text-xs font-semibold text-blue-600">Counselor guided verification</div>
				</div>

				<!-- Step 03 -->
				<div class="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:shadow-lg">
					<div class="mx-auto -mt-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-lg">
						03
					</div>
					<h3 class="mt-6 text-xl font-bold text-slate-900">You Get Ready</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						Confirm your seat by paying your course fee through safe online channels, receive your LMS
						login credentials, and attend the virtual orientation.
					</p>
					<div class="mt-4 text-xs font-semibold text-emerald-600">Immediate LMS access & orientation</div>
				</div>
			</div>

			<div class="mt-12 text-center">
				<button
					on:click={openForm}
					class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:scale-105"
				>
					<span>Start Your Application Today</span>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>
		</div>
	</section>

	<!-- Placements & Top Recruiters Network -->
	<section
		class="py-16 sm:py-24 bg-slate-900 text-white"
		use:inView={{ callback: (v) => (statsVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-amber-400/20 px-4 py-1 text-xs font-bold tracking-wider text-amber-300 uppercase">
					Corporate Placement Ecosystem
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
					Connect with 500+ Top Recruiters
				</h2>
				<p class="mt-3 text-sm text-slate-300 sm:text-base">
					Graphic Era graduates are trusted by Fortune 500 tech leaders, top consulting firms, and
					global banking conglomerates.
				</p>
			</div>

			<!-- Key Placement Metrics Grid -->
			<div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-amber-400 sm:text-4xl">₹84.88 LPA</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Highest International Offer</div>
					<div class="text-[11px] text-slate-400">Atlassian / Global tech</div>
				</div>

				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-amber-400 sm:text-4xl">₹50.17 LPA</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Highest Domestic Offer</div>
					<div class="text-[11px] text-slate-400">Top Indian MNC packages</div>
				</div>

				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-amber-400 sm:text-4xl">500+</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Hiring Partners</div>
					<div class="text-[11px] text-slate-400">Visiting recruitments annually</div>
				</div>

				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-amber-400 sm:text-4xl">95%+</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Placement Support</div>
					<div class="text-[11px] text-slate-400">Interview prep & resume clinic</div>
				</div>
			</div>

			<!-- Recruiter Logo / Name Badges Grid -->
			<div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each recruiters as rec}
					<div class="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-800/40 p-4 text-center transition-all hover:border-amber-400 hover:bg-slate-800">
						<span class="text-sm font-black text-white">{rec.name}</span>
						<span class="mt-0.5 text-[10px] text-slate-400">{rec.domain}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- President's Message / Visionary Leadership -->
	<section class="py-16 bg-white border-b border-slate-200">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl">
				<div class="grid grid-cols-1 lg:grid-cols-12 items-center">
					<div class="lg:col-span-5 relative h-72 lg:h-full min-h-[340px]">
						<img
							src="/Images/GraphicEra/president.jpg"
							alt="Prof. (Dr.) Kamal Ghanshala"
							class="h-full w-full object-cover object-top"
							loading="lazy"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-slate-950 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/80"></div>
					</div>

					<div class="p-8 sm:p-12 lg:col-span-7">
						<span class="inline-block rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold tracking-wider text-amber-300 uppercase">
							Visionary Leadership
						</span>
						<h2 class="mt-3 text-2xl font-bold sm:text-3xl text-white">
							Prof. (Dr.) Kamal Ghanshala
						</h2>
						<p class="text-xs font-semibold text-amber-400 uppercase tracking-wider">
							Founder & President, Graphic Era Group of Institutions
						</p>

						<blockquote class="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 italic border-l-2 border-amber-400 pl-4">
							"At Graphic Era, our mission has always been to make world-class higher education accessible,
							inclusive, and transformative. With GEU Online, we dismantle geographic constraints,
							empowering learners across India and beyond with cutting-edge academic excellence, digital agility,
							and direct corporate readiness."
						</blockquote>

						<div class="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400">
							<div>
								<div class="font-bold text-white">30+ Years</div>
								<div>Academic Leadership</div>
							</div>
							<div class="border-l border-slate-700 pl-6">
								<div class="font-bold text-white">100,000+</div>
								<div>Global Alumni Network</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Student Testimonials Section -->
	<section
		class="py-16 sm:py-20 bg-white border-t border-slate-200"
		use:inView={{ callback: (v) => (testimonialVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold tracking-wider text-amber-800 uppercase">
					Alumni Voices
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					What Students Say About GEU Online
				</h2>
				<p class="mt-3 text-sm text-slate-600 sm:text-base">
					Real experiences from working professionals and students studying via Graphic Era Online.
				</p>
			</div>

			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
					<div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
					<p class="mt-3 text-xs leading-relaxed text-slate-600 italic">
						"Balancing my job in digital marketing and pursuing the Online MBA was seamless. The faculty
						are responsive, the LMS video lectures are top-notch, and the weekend live doubt sessions
						helped me clarify key strategic concepts."
					</p>
					<div class="mt-6 border-t border-slate-200 pt-3">
						<div class="font-bold text-slate-900 text-sm">Pooja Negi</div>
						<div class="text-[11px] text-slate-500">Online MBA Graduate • Marketing Lead</div>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
					<div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
					<p class="mt-3 text-xs leading-relaxed text-slate-600 italic">
						"Graphic Era's Online MCA curriculum matches current tech industry demands. We built
						practical projects in cloud computing and full-stack engineering. The placement cell helped
						me crack my software engineer interview."
					</p>
					<div class="mt-6 border-t border-slate-200 pt-3">
						<div class="font-bold text-slate-900 text-sm">Rohit Rawat</div>
						<div class="text-[11px] text-slate-500">Online MCA Graduate • Associate Software Eng.</div>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
					<div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
					<p class="mt-3 text-xs leading-relaxed text-slate-600 italic">
						"The affordability and flexibility of Graphic Era Online BBA made it the best decision.
						Taking proctored exams from home without missing family commitments or work made higher
						education genuinely accessible."
					</p>
					<div class="mt-6 border-t border-slate-200 pt-3">
						<div class="font-bold text-slate-900 text-sm">Ananya Joshi</div>
						<div class="text-[11px] text-slate-500">Online BBA Graduate • Business Development</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section (Accordion) -->
	<section
		class="py-16 sm:py-20 bg-slate-50 border-t border-slate-200"
		use:inView={{ callback: (v) => (faqVisible = v) }}
	>
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<span class="inline-block rounded-full bg-slate-200 px-4 py-1 text-xs font-bold tracking-wider text-slate-700 uppercase">
					Frequently Asked Questions
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					Everything You Need to Know
				</h2>
				<p class="mt-3 text-sm text-slate-600">
					Got questions about Graphic Era Online programs? Here are the answers to our most common queries.
				</p>
			</div>

			<div class="mt-10 space-y-3">
				{#each faqs as item, index}
					<div class="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all">
						<button
							on:click={() => toggleFaq(index)}
							class="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors focus:outline-none"
						>
							<span>{item.q}</span>
							<span class="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
								{openFaqIndex === index ? '−' : '+'}
							</span>
						</button>
						{#if openFaqIndex === index}
							<div class="border-t border-slate-100 bg-slate-50/60 p-5 pt-3 text-xs leading-relaxed text-slate-600">
								{item.a}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Final CTA Banner -->
	<section class="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 py-12 text-slate-950">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<h2 class="text-2xl font-black tracking-tight sm:text-4xl">
				Ready to Advance Your Career with Graphic Era Online?
			</h2>
			<p class="mx-auto mt-2 max-w-2xl text-xs sm:text-sm font-medium text-amber-950">
				Admissions open for the current academic session. Speak to our counselors and secure your seat.
			</p>
			<div class="mt-6 flex flex-wrap justify-center gap-4">
				<button
					on:click={openForm}
					class="rounded-xl bg-slate-950 px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-slate-900 hover:scale-105"
				>
					Apply for Free Counseling
				</button>
				<a
					href="tel:+918000000000"
					class="inline-flex items-center gap-2 rounded-xl border border-slate-950/20 bg-white/20 px-7 py-3.5 text-sm font-bold text-slate-950 backdrop-blur-sm hover:bg-white/30"
				>
					<span>Call Admissions Desk</span>
				</a>
			</div>
		</div>
	</section>

	<Footer />
</main>

{#if showForm}
	<Formpopup on:close={closeForm} on:submit={handleFormSubmit} />
{/if}

<style lang="postcss">
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.8s ease-out forwards;
	}
</style>
