<script lang="ts">
	import Checkbox from "./checkbox.svelte";
	import ChangeNameModal from "../modal/changeNameModal/changeNameModal.svelte";

	let {
		modName = "",
		realModName = "",
		active = false,
		path = "",
		reload,
	}: {
		modName: string;
		realModName: string;
		active: boolean;
		path: string;
		reload: () => void;
	} = $props();

	const openDir = async (path) => {
		await window.electron.openDir(path);
	};

	const deleteMod = async (realModName) => {
		await window.electron.deleteMod(realModName);
		reload();
	};

	const enableMod = async () => {
		console.log("enabling mod", realModName);
		await window.electron.enableMod(realModName);
	};

	const disableMod = async () => {
		console.log("disabling mod", realModName);
		await window.electron.disableMod(realModName);
	};
</script>

<div class="border border-light bg-gray rounded-button py-3 px-4 flex flex-col">
	<div class="flex justify-between gap-2">
		<h3 class=" text-light text-3xl font-yeon truncate">{modName}</h3>
		<Checkbox
			{active}
			id={realModName}
			enable={enableMod}
			disable={disableMod}
		/>
	</div>
	<button
		onclick={async () => await openDir(path)}
		class="text-start text-drown-gray text-xl font mb-3 truncate"
		>{realModName}</button
	>
	<!-- Open File System Window -->
	<div class="flex justify-between">
		<ChangeNameModal name={modName} realname={realModName} reload />
		<button
			class=" text-primary font-abz hover:underline"
			onclick={async () => await deleteMod(realModName)}>Delete</button
		>
	</div>
</div>
