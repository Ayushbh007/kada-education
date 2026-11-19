<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import Formpopup from '$lib/components/modal/Formpopup.svelte';
	import { page } from '$app/stores';
	import { getFee, pick } from '$lib/fees';

	// Live fees from Google Sheet (falls back to defaults)
	$: fee = getFee($page.data.fees, 'gla', 'GLA University');

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
		console.log('Form submitted for GLA University:', event.detail);
	}

	const heroImages = [
		'/Images/GLA/banner1.webp',
		'/Images/GLA/banner2.webp',
		'/Images/GLA/mba.webp'
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
	type ProgramCategory = 'all' | 'pg' | 'ug' | 'cert';
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
			feeAnnual: '₹48,500 / Year',
			feeSemester: '₹24,250 / Sem',
			feeTotal: '₹1,03,000 Total',
			image: '/Images/GLA/mba.webp',
			badge: 'IACBE Accredited',
			eligibility: "Bachelor's degree in any discipline with min. 50% aggregate (45% for SC/ST)",
			specializations: [
				'Marketing Management',
				'Financial Management',
				'Human Resource Management',
				'Information Technology',
				'Banking & Financial Services',
				'Operations Management'
			],
			description:
				'Designed to transform ambitious professionals into visionary corporate leaders through rigorous case studies, Harvard simulations, and practical industry projects.',
			highlights: [
				'IACBE (USA) accredited management curriculum',
				'Dual Specialization with industry relevance',
				'Live weekend masterclasses by CXOs',
				'Dedicated career guidance & 100% placement support'
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
			feeAnnual: '₹47,000 / Year',
			feeSemester: '₹23,500 / Sem',
			feeTotal: '₹94,300 Total',
			image: '/Images/GLA/mca.webp',
			badge: 'High Placement',
			eligibility: 'BCA / B.Sc (IT / CS) or Bachelor degree with Mathematics at 10+2 or Graduation level',
			specializations: [
				'Cloud Computing & DevOps',
				'Data Science & Artificial Intelligence',
				'Full Stack Software Development',
				'Cyber Security & Blockchain'
			],
			description:
				'Comprehensive advanced curriculum covering modern algorithms, distributed cloud systems, modern web stacks, and enterprise software engineering.',
			highlights: [
				'Hands-on virtual coding sandboxes & GitHub projects',
				'Peak package offered up to ₹60 LPA by Microsoft',
				'Curriculum aligned with IEEE and ACM standards',
				'Interview grooming by senior technical mentors'
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
			feeAnnual: '₹30,000 / Year',
			feeSemester: '₹15,000 / Sem',
			feeTotal: '₹90,000 Total',
			image: '/Images/GLA/bba.webp',
			badge: 'Industry Preferred',
			eligibility: '10+2 in any stream from recognized board with min. 50% aggregate (45% for reserved)',
			specializations: [
				'General Management',
				'Digital Marketing',
				'Banking & Insurance',
				'Human Resource Management'
			],
			description:
				'Build foundational business acumen, entrepreneurial mindset, organizational leadership, and analytical thinking straight after higher secondary schooling.',
			highlights: [
				'Real-world business case studies & simulations',
				'Comprehensive personality & communication grooming',
				'Final year capstone company research project',
				'Direct bridge to top global MBA pathways'
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
			feeAnnual: '₹33,000 / Year',
			feeSemester: '₹16,500 / Sem',
			feeTotal: '₹99,800 Total',
			image: '/Images/GLA/bca.webp',
			badge: 'Tech Foundation',
			eligibility: '10+2 from a recognized board with Mathematics or Computer Science as a subject',
			specializations: [
				'Software Application Development',
				'Database Management & SQL',
				'Web Technologies & UI/UX',
				'Cloud & Network Infrastructure'
			],
			description:
				'In-depth training in programming languages (Python, Java, C++), software testing, web architectures, and modern database management.',
			highlights: [
				'Continuous practical coding labs every semester',
				'Technical interview bootcamps & live projects',
				'Access to global developer tools & communities',
				'Top IT recruiter tie-ups with TCS, Infosys, Capgemini'
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
			feeAnnual: '₹23,500 / Year',
			feeSemester: '₹11,750 / Sem',
			feeTotal: '₹71,300 Total',
			image: '/Images/GLA/bcom.webp',
			badge: 'Commerce & Finance',
			eligibility: '10+2 in Commerce or relevant stream with min. 50% marks from a recognized board',
			specializations: [
				'Corporate Accounting & Auditing',
				'Financial Markets & Banking',
				'Goods & Services Tax (GST) & Taxation',
				'Corporate Governance & Business Laws'
			],
			description:
				'Rigorous commerce training designed to prepare students for lucrative roles in investment banking, corporate financial management, and statutory accounting.',
			highlights: [
				'Hands-on Tally Prime & Advanced Excel training',
				'Preparatory guidance for CA, CS, and CMA tracks',
				'Practical ledger audits and GST filing simulations',
				'Industry-recognized certification upon completion'
			]
		},
		{
			id: 'cert-dm',
			category: 'cert',
			name: 'Certificate in Digital Marketing',
			fullName: 'Job-Oriented 6-Month Professional Certificate',
			duration: '6 Months',
			mode: '100% Online',
			level: "Certificate",
			feeAnnual: '₹14,000 Total',
			feeSemester: '₹14,000 All-Inclusive',
			feeTotal: '₹14,000 Total',
			image: '/Images/GLA/banner2.webp',
			badge: 'Job Ready',
			eligibility: '10+2 or Graduation in any discipline from a recognized board/university',
			specializations: [
				'SEO & Content Strategy',
				'Performance Google & Meta Ads',
				'Social Media Management',
				'Marketing Analytics'
			],
			description:
				'Fast-track 6-month hands-on certificate program designed to make learners job-ready for modern digital agency and brand marketing roles.',
			highlights: [
				'Live campaign simulations with real budgets',
				'Certifications from Google & HubSpot aligned',
				'Portfolio creation for freelance & full-time roles',
				'Dedicated placement mentorship'
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
			q: 'Are the degrees awarded by GLA Online UGC-entitled and legally valid?',
			a: 'Yes, GLA Online is the Centre for Distance and Online Education of GLA University, Mathura. Its online degree programs are approved and entitled by UGC (University Grants Commission) and DEB (Distance Education Bureau). The university also holds prestigious 12B status and NAAC A+ accreditation (3.46 CGPA).'
		},
		{
			q: 'Is GLA University recognized abroad for higher education and PR evaluation?',
			a: 'Yes! GLA University is recognized by WES (World Education Services), which evaluates Indian degrees for Canadian and US immigration, higher study admissions, and international employment. In addition, GLA’s business programs are accredited by IACBE (USA).'
		},
		{
			q: 'What was the highest salary package achieved by a GLA student?',
			a: 'GLA University students have achieved outstanding placement records, with the peak package reaching ₹60 LPA offered by Microsoft to a GLAdiator. Over 500 marquee recruiters hire from GLA annually with an 86-90% average placement record.'
		},
		{
			q: 'How are online lectures and proctored examinations conducted?',
			a: 'Teaching is conducted via GLA Online’s high-tech Learning Management System (LMS). Students get live interactive sessions, recorded lecture archives, digital study modules, and doubt clearing sessions. Examinations are conducted completely online through AI-assisted remote proctoring.'
		},
		{
			q: 'Can I pay my course fees in easy installments or no-cost EMI?',
			a: 'Yes, GLA Online allows you to pay your tuition fees semester-wise. Furthermore, easy zero-cost EMI plans are available through partner banking institutions to make payments hassle-free and affordable.'
		},
		{
			q: 'What is the eligibility for the Online MBA and MCA programs?',
			a: 'For Online MBA: Bachelor’s degree in any stream with a minimum of 50% aggregate marks (45% for reserved category). For Online MCA: Bachelor’s in Computer Applications (BCA/B.Sc IT/CS) or any graduation with Mathematics at 10+2 or Bachelor degree level.'
		}
	];

	// Top Recruiters list
	const recruiters = [
		{ name: 'Microsoft', domain: 'Top Recruiter (₹60 LPA)' },
		{ name: 'Amazon', domain: 'Cloud & E-Commerce' },
		{ name: 'Capgemini', domain: 'IT & Consulting' },
		{ name: 'Accenture', domain: 'Global Consulting' },
		{ name: 'TCS', domain: 'IT Services' },
		{ name: 'Infosys', domain: 'Digital Transformation' },
		{ name: 'Wipro', domain: 'Technology Services' },
		{ name: 'Cognizant', domain: 'Enterprise Tech' },
		{ name: 'HCL Technologies', domain: 'Software Services' },
		{ name: 'Tech Mahindra', domain: 'IT & Telecom' },
		{ name: 'Deloitte', domain: 'Advisory & Audit' },
		{ name: 'L&T Infotech', domain: 'Enterprise Engineering' }
	];
</script>

<svelte:head>
	<title>GLA University Online Programs - MBA, MCA, BBA, BCA | Kada Education</title>
	<meta
		name="description"
		content="Enroll in UGC-entitled & NAAC A+ (3.46 CGPA) Accredited Online Degrees from GLA University (glaonline.com). Explore Online MBA, MCA, BBA, BCA & B.Com with ₹60 LPA peak placements and free admission counseling."
	/>
	<meta property="og:title" content="GLA University Online Degree Programs | Kada Education" />
	<meta
		property="og:description"
		content="NAAC A+ Accredited (3.46 CGPA) & UGC 12B Status University. Peak package of ₹60 LPA from Microsoft. 100% online flexible degrees."
	/>
	<meta property="og:image" content="/Images/logos/gla-logo.png" />
	<meta property="og:type" content="website" />
</svelte:head>

<main class="flex min-h-screen flex-col bg-slate-50 font-sans text-gray-900 selection:bg-red-600 selection:text-white">
	<!-- Top Hero Section with Background Slider -->
	<div class="relative">
		<HeroSection images={heroImages} overlayOpacity={55}>
			<div class="animate-fade-in mx-auto max-w-4xl px-4 text-center">
				<!-- Accreditation Tag Badges -->
				<div class="mb-4 inline-flex flex-wrap items-center justify-center gap-2">
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-red-400/40 bg-red-600/25 px-3.5 py-1 text-xs font-bold tracking-wider text-red-200 uppercase shadow-lg backdrop-blur-md"
					>
						<span class="h-2 w-2 animate-ping rounded-full bg-red-400"></span>
						NAAC GRADE A+ (3.46 CGPA)
					</span>
					<span
						class="inline-flex items-center rounded-full border border-blue-400/40 bg-blue-600/30 px-3 py-1 text-xs font-bold tracking-wider text-blue-200 uppercase backdrop-blur-md"
					>
						UGC 12B STATUS
					</span>
					<span
						class="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-600/30 px-3 py-1 text-xs font-bold tracking-wider text-emerald-200 uppercase backdrop-blur-md"
					>
						WES RECOGNIZED • IACBE (USA)
					</span>
				</div>

				<h1 class="mb-3 text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
					GLA University
					<span class="block text-red-400">Online Degree Programs</span>
				</h1>

				<p class="mx-auto mb-3 max-w-2xl text-base font-medium text-slate-200 sm:text-lg md:text-xl">
					Centre for Distance and Online Education (CDOE), Mathura
				</p>

				<p class="mx-auto mb-8 max-w-2xl text-xs font-medium text-slate-300 sm:text-sm">
					Earn recognized Online MBA, MCA, BBA, BCA, B.Com and Job-Oriented Certificate Programs with live
					interactive webinars, world-class LMS, and premier placement opportunities.
				</p>

				<!-- Hero CTA Buttons -->
				<div class="flex flex-wrap items-center justify-center gap-4">
					<button
						on:click={openForm}
						class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-105 hover:from-red-500 hover:to-rose-500 focus:outline-none focus:ring-2 focus:ring-red-400 sm:text-base"
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

	<!-- Top Highlights Cards Bar (Non-overflowing, fully visible) -->
	<section class="relative z-10 border-b border-slate-800 bg-slate-900 py-5 px-4 text-white sm:px-6 lg:px-8 shadow-lg">
		<div class="mx-auto max-w-7xl">
			<div class="grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-6">
				<!-- NAAC A+ -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-red-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600/20 text-red-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-white sm:text-base">NAAC A+</div>
						<div class="text-[11px] text-slate-400">3.46 CGPA • Top in UP</div>
					</div>
				</div>

				<!-- ₹60 LPA Peak Offer -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-emerald-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-emerald-400 sm:text-base">₹60 LPA</div>
						<div class="text-[11px] text-slate-400">Offered by Microsoft</div>
					</div>
				</div>

				<!-- NIRF Ranked -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-blue-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-white sm:text-base">NIRF Ranked</div>
						<div class="text-[11px] text-slate-400">101-125 Management Band</div>
					</div>
				</div>

				<!-- WES Recognized -->
				<div class="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-3.5 sm:p-4 transition-all hover:border-purple-400/50">
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
						</svg>
					</div>
					<div>
						<div class="text-sm font-black text-white sm:text-base">WES Recognized</div>
						<div class="text-[11px] text-slate-400">USA & Canada Validity</div>
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
					<img src="/Images/logos/gla-logo.png" alt="GLA University Logo" class="h-12 w-auto object-contain" />
					<div class="border-l border-slate-300 pl-3">
						<div class="text-xs font-black tracking-wider text-slate-800 uppercase">Centre for Distance & Online Education</div>
						<div class="text-[11px] text-slate-500">GLA University, Mathura, Uttar Pradesh</div>
					</div>
				</div>

				<div class="flex flex-wrap items-center justify-center gap-6 text-center text-xs font-bold text-slate-700">
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold">✓</span>
						<span>UGC & UGC-DEB Entitled</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-800 font-bold">★</span>
						<span>NAAC 'A+' (3.46 CGPA)</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold">12B</span>
						<span>UGC 12B Status</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-bold">✦</span>
						<span>AICTE Approved</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold">◆</span>
						<span>IACBE (USA) Accredited</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- About GLA Online / Key Advantages -->
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
				<span class="inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-bold tracking-wider text-red-800 uppercase">
					About GLA Online
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					Empowering Career Aspirations with Accredited Online Education
				</h2>
				<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
					Established over 25 years ago, GLA University has established itself as an academic powerhouse
					in northern India. Through <strong class="text-slate-800">GLA Online (glaonline.com)</strong>,
					students and working professionals access prestigious UGC-entitled degrees with live interactive lectures,
					experienced corporate mentors, and an extensive recruitment network.
				</p>
			</div>

			<!-- 3 Pillar Feature Cards -->
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				<div
					class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:shadow-xl"
				>
					<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/10 text-red-600">
						<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-slate-900">UGC 12B & NAAC A+ Status</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						Degrees hold 100% equivalence to traditional on-campus degrees under UGC regulations, fully recognized
						for state & central government jobs, public sector undertakings, and global evaluations.
					</p>
				</div>

				<div
					class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
				>
					<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
						<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-slate-900">IACBE & WES Certified</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						Accredited by IACBE (USA) for business management curricula, and evaluated by WES (World Education Services)
						for smooth eligibility for immigration and master’s admissions in the US, Canada, and Europe.
					</p>
				</div>

				<div
					class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl"
				>
					<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600">
						<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-slate-900">Proven Placement Record</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						With peak offers reaching ₹60 LPA from Microsoft and over 3,000+ placement offers, GLA provides
						virtual career fairs, resume revamping, and interview coaching.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Key Highlights Strip -->
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
					<div class="text-xs font-bold tracking-wider text-red-400 uppercase">Program Duration</div>
					<div class="mt-1 text-2xl font-black text-white">2 - 3 Years</div>
					<div class="mt-1 text-xs text-slate-400">4 or 6 Semesters</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-red-400 uppercase">Learning Mode</div>
					<div class="mt-1 text-2xl font-black text-white">100% Online</div>
					<div class="mt-1 text-xs text-slate-400">Interactive live & recorded</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-red-400 uppercase">Semester Fee From</div>
					<div class="mt-1 text-2xl font-black text-amber-400">{pick(fee.semester, '₹11,750')}</div>
					<div class="mt-1 text-xs text-slate-400">No cost EMI available</div>
				</div>

				<div class="rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-red-400 uppercase">Peak Package</div>
					<div class="mt-1 text-2xl font-black text-emerald-400">₹60 LPA</div>
					<div class="mt-1 text-xs text-slate-400">Offered by Microsoft</div>
				</div>

				<div class="col-span-2 sm:col-span-1 rounded-xl border border-slate-800 bg-slate-800/60 p-5">
					<div class="text-xs font-bold tracking-wider text-red-400 uppercase">Examinations</div>
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
				<span class="inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-bold tracking-wider text-red-800 uppercase">
					UGC-DEB Entitled Courses
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
					Programs Offered at GLA Online
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
					Explore UGC-entitled degree and job-oriented certificate programs designed to give your career
					a decisive competitive advantage.
				</p>

				<!-- Filter Tabs -->
				<div class="mt-8 flex justify-center">
					<div class="inline-flex flex-wrap justify-center rounded-xl bg-slate-100 p-1.5 shadow-inner">
						<button
							on:click={() => (selectedCategory = 'all')}
							class="rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm"
							class:bg-red-600={selectedCategory === 'all'}
							class:text-white={selectedCategory === 'all'}
							class:shadow-md={selectedCategory === 'all'}
							class:text-slate-600={selectedCategory !== 'all'}
							class:hover:text-slate-900={selectedCategory !== 'all'}
						>
							All Programs ({programsList.length})
						</button>
						<button
							on:click={() => (selectedCategory = 'pg')}
							class="rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm"
							class:bg-red-600={selectedCategory === 'pg'}
							class:text-white={selectedCategory === 'pg'}
							class:shadow-md={selectedCategory === 'pg'}
							class:text-slate-600={selectedCategory !== 'pg'}
							class:hover:text-slate-900={selectedCategory !== 'pg'}
						>
							Postgraduate (2)
						</button>
						<button
							on:click={() => (selectedCategory = 'ug')}
							class="rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm"
							class:bg-red-600={selectedCategory === 'ug'}
							class:text-white={selectedCategory === 'ug'}
							class:shadow-md={selectedCategory === 'ug'}
							class:text-slate-600={selectedCategory !== 'ug'}
							class:hover:text-slate-900={selectedCategory !== 'ug'}
						>
							Undergraduate (3)
						</button>
						<button
							on:click={() => (selectedCategory = 'cert')}
							class="rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm"
							class:bg-red-600={selectedCategory === 'cert'}
							class:text-white={selectedCategory === 'cert'}
							class:shadow-md={selectedCategory === 'cert'}
							class:text-slate-600={selectedCategory !== 'cert'}
							class:hover:text-slate-900={selectedCategory !== 'cert'}
						>
							Certificates (1)
						</button>
					</div>
				</div>
			</div>

			<!-- Program Cards Grid -->
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredPrograms as prog}
					<article
						class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-red-400 hover:shadow-xl"
					>
						<!-- Card Banner / Image -->
						<div class="relative h-48 w-full overflow-hidden bg-slate-900">
							<img
								src={prog.image}
								alt={`${prog.name} GLA University`}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

							<!-- Badges -->
							<span class="absolute top-3 left-3 inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-bold text-red-300 shadow-md backdrop-blur-md">
								{prog.badge}
							</span>

							<span class="absolute top-3 right-3 inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold text-white shadow-md">
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
									<svg class="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									{prog.duration}
								</span>
								<span class="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
									{prog.feeSemester}
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
							<div class="mt-4 rounded-lg bg-red-600/10 p-3 text-[11px] text-red-950">
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
									class="flex-1 rounded-xl bg-red-600 py-2.5 text-center text-xs font-bold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none"
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

	<!-- Fee Schedule Table -->
	<section class="py-16 bg-slate-50 border-t border-slate-200">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold tracking-wider text-emerald-800 uppercase">
					Affordable Academic Investment
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					GLA Online Fee Structure
				</h2>
				<p class="mt-3 text-sm text-slate-600 sm:text-base">
					Pay per semester or opt for flexible no-cost EMI installments starting from ₹2,000/month.
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
								<td class="px-6 py-4 font-semibold text-slate-900">₹24,250</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹48,500</td>
								<td class="px-6 py-4 font-black text-red-600">₹1,03,000</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-700">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online MCA</td>
								<td class="px-6 py-4">2 Years (4 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹23,500</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹47,000</td>
								<td class="px-6 py-4 font-black text-red-600">₹94,300</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-700">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online BBA</td>
								<td class="px-6 py-4">3 Years (6 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹15,000</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹30,000</td>
								<td class="px-6 py-4 font-black text-red-600">₹90,000</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-700">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online BCA</td>
								<td class="px-6 py-4">3 Years (6 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹16,500</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹33,000</td>
								<td class="px-6 py-4 font-black text-red-600">₹99,800</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-700">
										Enquire
									</button>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4 font-bold text-slate-900">Online B.Com (Hons.)</td>
								<td class="px-6 py-4">3 Years (6 Semesters)</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹11,750</td>
								<td class="px-6 py-4 font-semibold text-slate-900">₹23,500</td>
								<td class="px-6 py-4 font-black text-red-600">₹71,300</td>
								<td class="px-6 py-4">
									<button on:click={openForm} class="rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-700">
										Enquire
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="border-t border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-4">
					<div>
						<strong class="text-slate-800">Financial Aid:</strong> Merit scholarships, defense benefits,
						and corporate group enrollment discounts available on verification.
					</div>
					<button
						on:click={openForm}
						class="text-xs font-bold text-red-600 hover:text-red-700 underline"
					>
						Check Scholarship Eligibility →
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- 3-Step Admission Process -->
	<section
		class="py-16 sm:py-24 bg-white"
		use:inView={{ callback: (v) => (admissionVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-bold tracking-wider text-blue-800 uppercase">
					100% Online Enrollment
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					Simple 3-Step Admission Process
				</h2>
				<p class="mt-3 text-sm text-slate-600 sm:text-base">
					Apply directly from home without visiting any study center or physical campus.
				</p>
			</div>

			<div class="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Step 01 -->
				<div class="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:shadow-lg">
					<div class="mx-auto -mt-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-xl font-black text-white shadow-lg">
						01
					</div>
					<h3 class="mt-6 text-xl font-bold text-slate-900">Online Registration</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						Submit your online application on the GLA Online portal with your academic records and qualifying marksheets.
					</p>
					<div class="mt-4 text-xs font-semibold text-red-600">Takes less than 5 minutes</div>
				</div>

				<!-- Step 02 -->
				<div class="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:shadow-lg">
					<div class="mx-auto -mt-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-black text-red-400 shadow-lg">
						02
					</div>
					<h3 class="mt-6 text-xl font-bold text-slate-900">Document Verification</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						University admission counselors verify your eligibility and issue your formal conditional offer letter.
					</p>
					<div class="mt-4 text-xs font-semibold text-blue-600">Dedicated counselor assistance</div>
				</div>

				<!-- Step 03 -->
				<div class="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:shadow-lg">
					<div class="mx-auto -mt-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-lg">
						03
					</div>
					<h3 class="mt-6 text-xl font-bold text-slate-900">Fee Payment & LMS</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						Pay your semester fee online, receive your student ID and LMS portal login credentials, and attend the online induction.
					</p>
					<div class="mt-4 text-xs font-semibold text-emerald-600">Immediate LMS access</div>
				</div>
			</div>

			<div class="mt-12 text-center">
				<button
					on:click={openForm}
					class="inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-700 hover:scale-105"
				>
					<span>Start Your Application Today</span>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>
		</div>
	</section>

	<!-- Placements & Recruiter Network -->
	<section
		class="py-16 sm:py-24 bg-slate-900 text-white"
		use:inView={{ callback: (v) => (statsVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-red-400/20 px-4 py-1 text-xs font-bold tracking-wider text-red-300 uppercase">
					Proven Career Impact
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
					Top Companies Hiring from GLA Online
				</h2>
				<p class="mt-3 text-sm text-slate-300 sm:text-base">
					Over 500 marquee recruiters hire GLAdiators every year with market-leading compensation packages.
				</p>
			</div>

			<!-- Placement Metrics -->
			<div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-red-400 sm:text-4xl">₹60 LPA</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Peak Package</div>
					<div class="text-[11px] text-slate-400">Offered by Microsoft</div>
				</div>

				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-emerald-400 sm:text-4xl">90%</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Placement Rate</div>
					<div class="text-[11px] text-slate-400">Batches placed across sectors</div>
				</div>

				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-amber-400 sm:text-4xl">₹6.3 LPA</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Average Package</div>
					<div class="text-[11px] text-slate-400">Consistent over last 5 years</div>
				</div>

				<div class="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 text-center">
					<div class="text-3xl font-black text-blue-400 sm:text-4xl">500+</div>
					<div class="mt-2 text-xs font-bold text-slate-300 uppercase">Recruiting Partners</div>
					<div class="text-[11px] text-slate-400">Visiting corporate giants</div>
				</div>
			</div>

			<!-- Recruiter Logo Grid -->
			<div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each recruiters as rec}
					<div class="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-800/40 p-4 text-center transition-all hover:border-red-400 hover:bg-slate-800">
						<span class="text-sm font-black text-white">{rec.name}</span>
						<span class="mt-0.5 text-[10px] text-slate-400">{rec.domain}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Student & Corporate Learner Testimonials -->
	<section
		class="py-16 sm:py-20 bg-white border-t border-slate-200"
		use:inView={{ callback: (v) => (testimonialVisible = v) }}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<span class="inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-bold tracking-wider text-red-800 uppercase">
					Learner Voices
				</span>
				<h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
					Hear from Our Online GLAdiators
				</h2>
				<p class="mt-3 text-sm text-slate-600 sm:text-base">
					Real career advancement stories from students and working professionals at GLA Online.
				</p>
			</div>

			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
					<div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
					<p class="mt-3 text-xs leading-relaxed text-slate-600 italic">
						"GLA Online’s MBA enabled me to elevate my managerial skills without leaving my job. The
						faculty were always accessible for doubts, and the curriculum was modern and directly
						applicable to real corporate challenges."
					</p>
					<div class="mt-6 border-t border-slate-200 pt-3">
						<div class="font-bold text-slate-900 text-sm">Vineet Kumar</div>
						<div class="text-[11px] text-slate-500">Online MBA Graduate • Corporate Professional</div>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
					<div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
					<p class="mt-3 text-xs leading-relaxed text-slate-600 italic">
						"The MCA program at GLA Online is top tier. The coding labs, cloud assignments, and
						interview guidance helped me crack multiple tech rounds. The WES recognition is also a major
						plus for my future plans."
					</p>
					<div class="mt-6 border-t border-slate-200 pt-3">
						<div class="font-bold text-slate-900 text-sm">Anurag Chowdhary</div>
						<div class="text-[11px] text-slate-500">Online MCA Graduate • Software Engineer</div>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
					<div class="flex items-center gap-1 text-amber-500 text-sm">★★★★★</div>
					<p class="mt-3 text-xs leading-relaxed text-slate-600 italic">
						"As a student from a remote city, pursuing Online BBA from a NAAC A+ accredited university
						like GLA was a dream come true. The AI-proctored exams from home were convenient and completely
						stress-free."
					</p>
					<div class="mt-6 border-t border-slate-200 pt-3">
						<div class="font-bold text-slate-900 text-sm">Shruti Sharma</div>
						<div class="text-[11px] text-slate-500">Online BBA Graduate • Business Analyst</div>
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
					Got Questions? We’ve Got Answers
				</h2>
				<p class="mt-3 text-sm text-slate-600">
					Important details you should know before enrolling in GLA University Online programs.
				</p>
			</div>

			<div class="mt-10 space-y-3">
				{#each faqs as item, index}
					<div class="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all">
						<button
							on:click={() => toggleFaq(index)}
							class="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 hover:text-red-600 transition-colors focus:outline-none"
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
	<section class="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 py-12 text-white">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<h2 class="text-2xl font-black tracking-tight sm:text-4xl">
				Ready to Accelerate Your Career with GLA Online?
			</h2>
			<p class="mx-auto mt-2 max-w-2xl text-xs sm:text-sm font-medium text-red-100">
				Admissions are currently open for the upcoming academic session. Connect with our counselors now.
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
					class="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/20 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/30"
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
