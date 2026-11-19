export type ProgramLevel = "Master's Degree" | "Bachelor's Degree" | 'Diploma' | 'Certificate';

export interface UniversityProgram {
	id: string;
	university: string;
	logo: string;
	country: string;
	title: string;
	programsOffered: string;
	level: ProgramLevel;
	duration: string;
	highlights: string[];
	image: string; // banner/thumb
	badge?: string; // e.g., NAAC A+ Accredited
	tag?: string; // e.g., Pay-After-Placement, 100% Online
	cta?: string; // e.g., Explore University
	href: string; // Navigation link for the CTA button
}

export const universityPrograms: ReadonlyArray<UniversityProgram> = [
	{
		id: 'manipal-india',
		university: 'Manipal University',
		logo: '/Images/logos/manipallogo.jpg',
		country: 'India',
		title: 'Online Degree Programs',
		programsOffered: 'Online MBA, MCA, BBA, BCA & B.Com',
		level: "Master's Degree",
		duration: '2 Years',
		highlights: ['NAAC A+ Accredited', 'UGC-DEB Entitled', 'Dedicated Placement Drive'],
		image: '/Images/Manipalimages/manipal01.png',
		badge: 'NAAC A+ Grade',
		tag: '100% Online',
		cta: 'Explore Manipal',
		href: '/Landingpage/Manipal'
	},
	{
		id: 'shoolini-india',
		university: 'Shoolini University',
		logo: '/Images/logos/shoolini logo.png',
		country: 'India',
		title: 'Research & Global Programs',
		programsOffered: 'Online MBA, BBA, MCA & BCA',
		level: "Master's Degree",
		duration: '2 Years',
		highlights: [
			"India's No. 1 Private University",
			'Pay-After-Placement Option',
			'Top Global Rankings'
		],
		image: '/Images/shoolini/shoolini01.png',
		badge: 'India No. 1 Private',
		tag: 'Pay-After-Placement',
		cta: 'Explore Shoolini',
		href: '/Landingpage/Shoolini'
	},
	{
		id: 'amity-university',
		university: 'Amity University',
		logo: '/Images/logos/amitylogo.jpg',
		country: 'India',
		title: 'Global Online Programs',
		programsOffered: 'Online MBA, MCA, BBA & BCA',
		level: "Bachelor's Degree",
		duration: '3 Years',
		highlights: [
			'QS Ranked #1 Online University',
			'Global Alumni Network',
			'Industry Collaborative LMS'
		],
		image: '/Images/amity/amity01.jpg',
		badge: 'QS Top Ranked',
		tag: 'Global Degree',
		cta: 'Explore Amity',
		href: '/Landingpage/Amity'
	},
	{
		id: 'DY-Patil-university',
		university: 'DY Patil University',
		logo: '/Images/logos/DYpatil.png',
		country: 'India',
		title: 'Industry-Focused Degrees',
		programsOffered: 'Online MBA & Management Diplomas',
		level: "Bachelor's Degree",
		duration: '3 Years',
		highlights: ['NAAC A++ Accredited', 'Practical Business Training', 'Vibrant Alumni Network'],
		image: '/Images/DY/dy1.jpg',
		badge: 'NAAC A++ Grade',
		tag: 'Industry Focused',
		cta: 'Explore DY Patil',
		href: '/Landingpage/DY'
	},
	{
		id: 'LPU-university',
		university: 'Lovely Professional University',
		logo: '/Images/logos/lpu-logo.png',
		country: 'India',
		title: 'Comprehensive Online Degrees',
		programsOffered: 'Online MBA, MCA, BBA, BCA & M.Sc',
		level: "Bachelor's Degree",
		duration: '3 Years',
		highlights: ['NAAC A++ Accredited', 'Top Placement Record', 'Advanced LMS Mobile App'],
		image: '/Images/LPU/lpu1.jpg',
		badge: 'NAAC A++ Grade',
		tag: 'Top Placements',
		cta: 'Explore LPU',
		href: '/Landingpage/LPU'
	},
	{
		id: 'Uttranchal-university',
		university: 'Uttaranchal University',
		logo: '/Images/logos/uttranchal-logo.png',
		country: 'India',
		title: 'Professional Online Programs',
		programsOffered: 'Online MBA, MCA, BBA & BCA',
		level: "Bachelor's Degree",
		duration: '3 Years',
		highlights: ['NAAC A+ Accredited', 'Affordable Fee Structure', 'Flexible Exam Schedules'],
		image: '/Images/Uttranchal/uttranchal1.png',
		badge: 'NAAC A+ Grade',
		tag: 'Affordable Fees',
		cta: 'Explore Uttaranchal',
		href: '/Landingpage/Uttranchal'
	},
	{
		id: 'NMIMS-university',
		university: 'NMIMS University',
		logo: '/Images/logos/nmims.png',
		country: 'India',
		title: 'Premier Online MBA & Executive',
		programsOffered: 'Online MBA, Executive MBA & Diplomas',
		level: "Master's Degree",
		duration: '2 Years',
		highlights: [
			'Category-1 Autonomy University',
			'Top Corporate Recognition',
			'Premier B-School Curriculum'
		],
		image: '/Images/NMIMS/nmims01.png',
		badge: 'Category-1 Autonomy',
		tag: 'Top B-School',
		cta: 'Explore NMIMS',
		href: '/Landingpage/NMIMS'
	},
	{
		id: 'IGNOU-university',
		university: 'IGNOU',
		logo: '/Images/IGNOU/ignou_logo.png',
		country: 'India',
		title: 'Central Open Education',
		programsOffered: 'MBA, MCA, BA, B.Com, M.Com & 100+ Courses',
		level: "Master's Degree",
		duration: '2 Years',
		highlights: [
			"World's Largest Open University",
			'NAAC A++ Central University',
			'Lowest Cost & Govt Recognized'
		],
		image: '/Images/IGNOU/ignou_hero.png',
		badge: 'NAAC A++ Central',
		tag: 'Govt Recognized',
		cta: 'Explore IGNOU',
		href: '/Landingpage/IGNOU'
	}
];
