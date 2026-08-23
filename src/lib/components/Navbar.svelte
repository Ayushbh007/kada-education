<script>
	import { onMount } from 'svelte';

	let isMenuOpen = false;
	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 10;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function openForm() {
		window.dispatchEvent(new Event('openFormPopup'));
	}

	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'About Us', href: '/Ourwhy' },
		{ label: 'Programs', href: '/Program' },
		{ label: 'Partner Universities', href: '/Compare' },
		{ label: 'Contact Us', href: '/Faqs' }
	];
</script>

<nav class="navbar" class:scrolled>
	<div class="navbar-inner">
		<!-- Logo -->
		<a href="/" class="logo-link">
			<div class="logo">
				<div class="logo-text-group">
					<div class="logo-text">
						<span class="logo-kada">kada</span><span class="logo-education">education</span>
					</div>
					<div class="logo-tagline">Your Future, Our Guidance</div>
				</div>
			</div>
		</a>

		<!-- Desktop Nav Links -->
		<div class="nav-links">
			{#each navLinks as link}
				<a href={link.href} class="nav-link">{link.label}</a>
			{/each}
		</div>

		<!-- CTA Button -->
		<div class="nav-cta">
			<button class="enquire-btn" on:click={openForm}>Enquire Now</button>
		</div>

		<!-- Mobile Hamburger -->
		<button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
			{#if !isMenuOpen}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/>
				</svg>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
				</svg>
			{/if}
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="mobile-menu">
			{#each navLinks as link}
				<a href={link.href} class="mobile-link" on:click={() => isMenuOpen = false}>{link.label}</a>
			{/each}
			<button class="enquire-btn mobile-enquire" on:click={openForm}>Enquire Now</button>
		</div>
	{/if}
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: #ffffff;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
		transition: box-shadow 0.3s ease;
	}

	.navbar.scrolled {
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
	}

	.navbar-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
		height: 68px;
		display: flex;
		align-items: center;
		gap: 20px;
	}

	/* Logo */
	.logo-link {
		text-decoration: none;
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.logo-img {
		height: 36px;
		width: auto;
		object-fit: contain;
	}

	.logo-text-group {
		display: flex;
		flex-direction: column;
		line-height: 1;
	}

	.logo-text {
		font-size: 20px;
		font-weight: 700;
		letter-spacing: -0.3px;
	}

	.logo-kada {
		color: #f97316;
		font-weight: 800;
		font-size: 20px;
	}

	.logo-education {
		color: #1a1a1a;
		font-weight: 700;
		font-size: 20px;
	}

	.logo-tagline {
		font-size: 10px;
		color: #888;
		font-weight: 400;
		margin-top: 2px;
		letter-spacing: 0.2px;
	}

	/* Desktop Nav Links */
	.nav-links {
		display: flex;
		align-items: center;
		gap: 22px;
		flex: 1;
		justify-content: center;
	}

	.nav-link {
		text-decoration: none;
		color: #374151;
		font-size: 14.5px;
		font-weight: 500;
		position: relative;
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 0;
		right: 0;
		height: 2px;
		background: #f97316;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s ease;
		border-radius: 2px;
	}

	.nav-link:hover {
		color: #f97316;
	}

	.nav-link:hover::after {
		transform: scaleX(1);
	}

	/* CTA Button */
	.nav-cta {
		flex-shrink: 0;
	}

	.enquire-btn {
		background: #f97316;
		color: #ffffff;
		border: none;
		padding: 10px 22px;
		border-radius: 6px;
		font-size: 14.5px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
		white-space: nowrap;
		letter-spacing: 0.1px;
	}

	.enquire-btn:hover {
		background: #ea6c0a;
		transform: translateY(-1px);
		box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
	}

	.enquire-btn:active {
		transform: translateY(0);
	}

	/* Hamburger */
	.hamburger {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		color: #374151;
		padding: 4px;
		margin-left: auto;
	}

	/* Mobile Menu */
	.mobile-menu {
		background: #ffffff;
		border-top: 1px solid #f0f0f0;
		padding: 16px 32px 20px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.mobile-link {
		text-decoration: none;
		color: #374151;
		font-size: 15px;
		font-weight: 500;
		padding: 12px 0;
		border-bottom: 1px solid #f5f5f5;
		transition: color 0.2s ease;
	}

	.mobile-link:hover {
		color: #f97316;
	}

	.mobile-enquire {
		margin-top: 12px;
		width: 100%;
		padding: 12px;
		border-radius: 8px;
		font-size: 15px;
	}

	@media (max-width: 900px) {
		.nav-links {
			display: none;
		}
		.nav-cta {
			display: none;
		}
		.hamburger {
			display: flex;
		}
		.navbar-inner {
			gap: 0;
		}
	}
</style>

