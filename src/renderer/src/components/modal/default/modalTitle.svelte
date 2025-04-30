<script lang="ts">
	let {
		children,
		buttonContent,
		buttonClassname = "",
		title,
		modalBodyClassname = "p-5",
		displayModal = false,
	} = $props();

	const closeModal = () => {
		displayModal = false;
		document.body.style.overflow = "visible";
	};

	const openModal = () => {
		document.body.style.overflow = "hidden";
		displayModal = true;
	};
</script>

<!-- Button -->
<button onclick={openModal} class={buttonClassname} {title}>
	{#if buttonContent}
		{@render buttonContent()}
	{:else}
		<span>No name found!</span>
	{/if}
</button>
<!-- Modal Body -->
<div
	class="flex justify-center items-center fixed min-h-screen w-screen z-10 opacity-65 top-0 left-0 bg-darker p-5 {displayModal
		? ''
		: 'hidden'}"
></div>
<div
	class="fixed top-0 left-0 flex h-screen w-screen justify-center items-center opacity-100 z-20 {displayModal
		? ''
		: 'hidden'}"
>
	<div class=" bg-dark rounded-button border border-gray flex flex-col z-20">
		<div
			class="h-full flex flex-col justify-center items-center min-w-96 max-h-96"
		>
			<div
				class="flex p-5 border-b border-light w-full justify-between items-center"
			>
				<span class="text-light text-2xl font-abz">{title}</span>
				<button onclick={closeModal} aria-label="Close modal">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-x text-light"
						><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</button>
			</div>
			<div class="{modalBodyClassname} w-full overflow-y-scroll">
				{@render children()}
			</div>
		</div>
	</div>
</div>
