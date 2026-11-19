<script lang="ts">
	export let phoneNumber: string = '+919220549335'; // Replace with your actual phone number
</script>

<a href="tel:{phoneNumber}" class="group fixed right-6 bottom-28 z-50" aria-label="Call us">
	<div
		class="relative flex items-center gap-2 rounded-full bg-orange-500 p-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-7 w-7"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
			/>
		</svg>
		<span
			class="pointer-events-none absolute right-12 rounded-lg bg-black px-4 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-[-8px] group-hover:opacity-100"
		>
			Call us
		</span>
	</div>
</a>

<style>
	/* Add a subtle bounce animation on hover */
	a:hover {
		animation: bounce 0.5s;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0) scale(1.05);
		}
		50% {
			transform: translateY(-5px) scale(1.05);
		}
	}
</style>
