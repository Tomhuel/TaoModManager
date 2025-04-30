<script lang="ts">
	import Navbar from "./components/navbar/Navbar.svelte";
	import Modcard from "./components/card/ModCard.svelte";
	import { onMount } from "svelte";
	import { searchFilter } from "./global/store";

	const getMods = async () => {
		mods = await window.electron.getMods();
	};

	let mods = $state([]);
	let search = $state("");

	onMount(async () => {
		await getMods();
	});

	const filterMods = async () => {
		console.log('Reloading...');
		search = $searchFilter; // `search` toma el valor del store
		await getMods();
		mods = mods.filter((mod) =>
			mod.name.toLowerCase().includes(search.toLowerCase()),
		);
	};
</script>

<Navbar searchEvent={filterMods} />
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
				reload={filterMods}
			/>
		{/each}
	</div>
</main>
