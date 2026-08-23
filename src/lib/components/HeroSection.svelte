<script lang="ts">
	function openForm() {
		window.dispatchEvent(new Event('openFormPopup'));
	}
</script>

<!-- Hero Section - matching reference design -->
<section class="hero">
	<div class="hero-inner">
		<!-- Left: Text Content -->
		<div class="hero-content">
			<!-- Badge -->
			<div class="hero-badge">
				<span class="badge-dot"></span>
				INDIA'S TRUSTED EDUCATION PARTNER
			</div>

			<!-- Headline -->
			<h1 class="hero-headline">
				Confusion Hatao,<br />
				<span class="headline-orange">Kada Education Pe Aao!</span>
			</h1>

			<!-- Description -->
			<p class="hero-desc">
				From choosing the right university to admission support,<br />
				<strong>we simplify your journey</strong> to success.
			</p>

			<!-- Feature Icons -->
			<div class="hero-features">
				<div class="feature-item">
					<div class="feature-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<path d="M12 8v4l3 3"/>
						</svg>
					</div>
					<span>Top Online<br/>Universities</span>
				</div>
				<div class="feature-item">
					<div class="feature-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2">
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
							<circle cx="9" cy="7" r="4"/>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
						</svg>
					</div>
					<span>End-to-End<br/>Admission Support</span>
				</div>
				<div class="feature-item">
					<div class="feature-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
						</svg>
					</div>
					<span>Best Fees &amp;<br/>Scholarships</span>
				</div>
			</div>

			<!-- CTA Buttons -->
			<div class="hero-ctas">
				<a href="/Program" class="btn-primary">
					Explore Programs
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
				<button class="btn-secondary" on:click={openForm}>
					Talk to Expert
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
					</svg>
				</button>
			</div>

			<!-- Social Proof -->
			<div class="hero-social-proof">
				<div class="proof-avatars">
					<div class="avatar" style="background: #f97316;">S</div>
					<div class="avatar" style="background: #3b82f6;">A</div>
					<div class="avatar" style="background: #10b981;">R</div>
					<div class="avatar" style="background: #8b5cf6;">M</div>
				</div>
				<p>Trusted by <strong class="orange">10,000+</strong> students across India</p>
			</div>
		</div>

		<!-- Right: Image + Floating Cards -->
		<div class="hero-image-wrapper">
			<!-- Floating stat cards -->
			<div class="float-card float-card-top">
				<div class="float-icon">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
						<circle cx="9" cy="7" r="4"/>
					</svg>
				</div>
				<div>
					<div class="float-label">Personalized</div>
					<div class="float-sublabel">Counseling</div>
				</div>
			</div>

			<div class="float-card float-card-mid">
				<div class="float-icon">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
						<circle cx="9" cy="7" r="4"/>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				</div>
				<div>
					<div class="float-label">100+</div>
					<div class="float-sublabel">University Partners</div>
				</div>
			</div>

			<!-- The main photo -->
			<img
				src="/Images/logos/kadaimage05.PNG"
				alt="Kada Education counselors helping students"
				class="hero-photo"
			/>
		</div>
	</div>
</section>

<style>
	.hero {
		background: #ffffff;
		padding-top: 68px; /* exact navbar height */
		min-height: calc(100vh - 68px);
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.hero-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 0 40px 48px;
		display: grid;
		grid-template-columns: 1fr 1.1fr;
		gap: 0;
		align-items: center;
		width: 100%;
	}

	/* ── Left Content ── */
	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* Badge */
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #fff7ed;
		border: 1px solid #fed7aa;
		color: #c2410c;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 1px;
		padding: 6px 14px;
		border-radius: 20px;
		width: fit-content;
		text-transform: uppercase;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #f97316;
		flex-shrink: 0;
	}

	/* Headline */
	.hero-headline {
		font-size: clamp(30px, 4vw, 46px);
		font-weight: 800;
		line-height: 1.2;
		color: #111827;
		margin: 0;
		letter-spacing: -0.5px;
	}

	.headline-orange {
		color: #f97316;
	}

	/* Description */
	.hero-desc {
		font-size: 16px;
		color: #4b5563;
		line-height: 1.7;
		margin: 0;
	}

	/* Features */
	.hero-features {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 13px;
		font-weight: 600;
		color: #374151;
		line-height: 1.4;
	}

	.feature-icon {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		border: 2px solid #fed7aa;
		background: #fff7ed;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* CTA Buttons */
	.hero-ctas {
		display: flex;
		gap: 14px;
		align-items: center;
		flex-wrap: wrap;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #f97316;
		color: #ffffff;
		text-decoration: none;
		padding: 13px 26px;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 700;
		transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
		border: none;
		cursor: pointer;
	}

	.btn-primary:hover {
		background: #ea6c0a;
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(249, 115, 22, 0.35);
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		color: #374151;
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 600;
		border: 2px solid #e5e7eb;
		cursor: pointer;
		transition: border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
	}

	.btn-secondary:hover {
		border-color: #f97316;
		color: #f97316;
		transform: translateY(-2px);
	}

	/* Social Proof */
	.hero-social-proof {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.proof-avatars {
		display: flex;
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 2px solid #fff;
		margin-left: -8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		font-weight: 700;
		color: #fff;
	}

	.avatar:first-child {
		margin-left: 0;
	}

	.hero-social-proof p {
		font-size: 14px;
		color: #6b7280;
		margin: 0;
	}

	.orange {
		color: #f97316;
	}

	/* ── Right Image ── */
	.hero-image-wrapper {
		position: relative;
		height: 100%;
		min-height: 500px;
		display: flex;
		align-items: center;
	}

	.hero-photo {
		width: 100%;
		height: 100%;
		min-height: 500px;
		object-fit: cover;
		object-position: center top;
		border-radius: 0;
		display: block;
		/* Gradient mask: fades left edge and top/bottom into white */
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			white 22%,
			white 100%
		);
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			white 22%,
			white 100%
		);
	}

	/* Floating Cards */
	.float-card {
		position: absolute;
		background: #ffffff;
		border-radius: 12px;
		padding: 12px 18px;
		display: flex;
		align-items: center;
		gap: 12px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
		z-index: 10;
		animation: floatY 4s ease-in-out infinite;
	}

	.float-card-top {
		top: 24px;
		left: -30px;
		animation-delay: 0s;
	}

	.float-card-mid {
		top: 190px;
		left: -30px;
		animation-delay: 2s;
	}

	@keyframes floatY {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-8px); }
	}

	.float-icon {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: #fff7ed;
		border: 2px solid #fed7aa;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.float-label {
		font-size: 14px;
		font-weight: 700;
		color: #111827;
		line-height: 1.2;
	}

	.float-sublabel {
		font-size: 12px;
		color: #6b7280;
		margin-top: 1px;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.hero-inner {
			grid-template-columns: 1fr;
			gap: 0;
			padding: 40px 20px 0;
		}

		.hero-image-wrapper {
			order: -1;
			min-height: 280px;
		}

		.hero-photo {
			min-height: 280px;
			-webkit-mask-image: linear-gradient(
				to bottom,
				transparent 0%,
				white 15%,
				white 85%,
				transparent 100%
			);
			mask-image: linear-gradient(
				to bottom,
				transparent 0%,
				white 15%,
				white 85%,
				transparent 100%
			);
		}

		.float-card-top {
			left: 8px;
			top: 12px;
		}

		.float-card-mid {
			left: 8px;
			top: 120px;
		}

		.hero-headline {
			font-size: 28px;
		}
	}

	@media (max-width: 480px) {
		.hero-features {
			flex-direction: column;
			gap: 14px;
		}
		.hero-ctas {
			flex-direction: column;
		}
		.btn-primary,
		.btn-secondary {
			width: 100%;
			justify-content: center;
		}
	}
</style>
