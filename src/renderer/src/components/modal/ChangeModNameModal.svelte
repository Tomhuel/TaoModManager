<script lang="ts">
	import { fade } from "svelte/transition";
	import Dialog from "../bitsui/Dialog.svelte";

	let { name = "", realname = "", reload } = $props();

	const updateName = async (e) => {
		e.preventDefault();
		await window.electron.setModName(realname, name);
		reload();
	};
</script>

<Dialog dialogTitle="Change mod name">
	{#snippet buttonContent()}
		<span class=" text-light-blue font-abz hover:underline"
			>Change name...</span
		>
	{/snippet}
	<form class="flex justify-between gap-5 pt-6" onsubmit={updateName} transition:fade>
		<input
			type="text"
			class="col-span-3 bg-gray rounded-input text-light p-1 focus-visible:outline-none font-abz overflow-x-scroll w-full"
			bind:value={name}
		/>
		<button
			class="col-span-1 px-3 bg-primary text-light rounded-input font-abz flex justify-center items-center hover:bg-primary-darker transition-all duration-500"
			onclick={updateName}
			>Save
		</button>
	</form>
</Dialog>

<!--

<ModalTitle title="Set Mod Name" modalBodyClassname="p-4">
	{#snippet buttonContent()}
		<span class=" text-light-blue font-abz hover:underline"
			>Change name...</span
		>
	{/snippet}
	<form class="flex justify-between gap-5" onsubmit={updateName}>
		<input
			type="text"
			class="col-span-3 bg-gray rounded-input text-light p-1 focus-visible:outline-none font-abz overflow-x-scroll w-full"
			bind:value={name}
		/>
		<button
			class="col-span-1 px-3 bg-primary text-light rounded-input font-abz flex justify-center items-center hover:bg-primary-darker transition-all duration-500"
			onclick={updateName}
			>Save
		</button>
	</form>
</ModalTitle>

-->
