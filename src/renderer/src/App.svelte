<script>
	import Navbar from "./components/navbar/Navbar.svelte";
	import Modcard from "./components/card/modcard.svelte";
	import { onMount } from "svelte";
	import { searchFilter } from "./global/store";

	const getMods = async () => {
		mods = await window.electron.getMods();
	};

	let mods = [];

	let newUpdate = false;

	let search = "";

	onMount(async () => {
		document.addEventListener("updateMessage", () => {
			newUpdate = true;
			console.log('new update!');
		});

		await getMods();
	});

	const filterMods = async () => {
		search = $searchFilter; // `search` toma el valor del store
		await getMods();
		mods = mods.filter((mod) =>
			mod.name.toLowerCase().includes(search.toLowerCase()),
		);
	};
</script>

{#if newUpdate}
	<main class="px-6 py-5 h-screen">
		<div class="flex justify-center items-center h-full">
			<h2 class="text-light text-3xl">New Update avaiable. Please restart.</h2>
		</div>
	</main>
{:else}
	<Navbar on:search={filterMods} />
	<main class="px-6 py-5">
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-20 gap-8"
		>
			{#each mods ?? [] as mod}
				<Modcard
					modName={mod.name}
					active={mod.status === "ENABLED"}
					realModName={mod.realname}
					path={mod.path}
					on:reload={filterMods}
				/>
			{/each}
		</div>
	</main>
{/if}
