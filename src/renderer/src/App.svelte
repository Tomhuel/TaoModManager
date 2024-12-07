<script>
	import Navbar from "./components/navbar/Navbar.svelte";
	import Modcard from "./components/card/modcard.svelte";
	import { onMount } from "svelte";

	const getMods = async () => {
		mods = await window.electron.getMods();
	};

	let mods = [];

	onMount(async () => {
		await getMods();
	});

	const filterMods = async (e) => {
		const { detail: search } = e;
    await getMods();
    mods = mods.filter((mod) => mod.name.toLowerCase().includes(search.toLowerCase()));
	};
</script>

<Navbar on:search={filterMods} />
<main class="px-6 py-5">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-20 gap-8">
		{#each mods ?? [] as mod}
			<Modcard
				modName={mod.name}
				active={mod.status === "ENABLED"}
				realModName={mod.realname}
				path={mod.path}
				on:reload={getMods}
			/>
		{/each}
	</div>
</main>
