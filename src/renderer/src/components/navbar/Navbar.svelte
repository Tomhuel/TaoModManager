<script lang="ts">
	import PlayButton from "./playButton/playButton.svelte";
	import Logo from "./../../icons/logo.svelte";
	import SettingsModal from "../modal/settings/settingsModal.svelte";
	import Import from "../../icons/import.svelte";
	import Reset from "../../icons/reset.svelte";
	import { createEventDispatcher } from "svelte";
    import { searchFilter } from "../../global/store";

    let search = '';

    $: searchFilter.set(search);

    const dispatcher = createEventDispatcher();
    
	const importCompress = async (e) => {
		await window.electron.decompress(e.target.files[0].path);
	};

    const searchMods = async () => {
        dispatcher("search");
    }
</script>

<div class="sticky top-0 left-0 z-50">
    <div class="flex h-20 justify-between sticky bg-darker border-b-light border">
        <div class=" grid grid-cols-4 justify-start items-center gap-2">
            <Logo className="w-20 col-span-1" />
            <h1 class=" text-4xl font-yeon text-light col-span-3">Tao Mod Manager</h1>
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
                    on:change={importCompress}
                    id="import-input"
                    hidden
                    max="1"
                />
            </label>
            <input type="text" class="bg-dark border-light-blue rounded-input text-light px-4 h-full border focus-visible:outline-none py-1" bind:value={search} on:input={searchMods} placeholder="Search...">
        </div>
        <div class="flex gap-3">
            <button title="Reload Mods">
                <Reset className="" />
            </button>
            <SettingsModal />
        </div>
    </div>
</div>
