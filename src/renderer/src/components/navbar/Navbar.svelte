<script lang="ts">
	import PlayButton from "./playButton/playButton.svelte";
	import Logo from "./../../icons/logo.svelte";
	import SettingsModal from "../modal/SettingsModal.svelte";
	import Import from "../../icons/import.svelte";
	import Reset from "../../icons/reset.svelte";
	import { searchFilter } from "../../global/store";

	let { searchEvent } = $props();

	let search = $state("");

	$effect(() => {
		searchFilter.set(search);
	});

	const importCompress = async (e) => {
		await window.electron.decompress(e.target.files[0].path);
	};

	const fixModels = async () => {
		await window.electron.fixModels();
	};

	const searchMods = async () => {
		searchEvent();
	};
</script>

<div class="sticky top-0 left-0 z-50">
	<div
		class="flex h-20 justify-between sticky bg-darker border-b-light/40 border-t-0 border-e-0 border-s-0 border"
	>
		<div class=" grid grid-cols-4 justify-start items-center gap-2">
			<Logo className="w-20 col-span-1" />
			<h1 class=" text-4xl font-yeon text-light col-span-3">
				Tao Mod Manager
			</h1>
		</div>
		<div class="flex justify-center px-3 gap-3">
			<PlayButton />
		</div>
	</div>
	<div class="flex justify-between text-light-blue px-6 py-5 bg-dark">
		<div class="flex gap-8 items-center">
			<label for="import-input" class="cursor-pointer" title="Import">
				<Import />
				<input
					type="file"
					accept=".zip,.rar"
					onchange={importCompress}
					id="import-input"
					hidden
					max="1"
				/>
			</label>
			<input
				type="text"
				class="bg-dark border-light/45 rounded-input text-light px-4 h-full border focus-visible:outline-none py-1"
				bind:value={search}
				oninput={searchMods}
				placeholder="Search..."
			/>
		</div>
		<div class="flex gap-3">
			<button
				title="Reload Mods"
				onclick={fixModels}
				class="hover:rotate-180 transition-transform duration-700"
			>
				<Reset className="" />
			</button>
			<SettingsModal />
		</div>
	</div>
</div>
