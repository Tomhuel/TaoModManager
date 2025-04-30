<script lang="ts">
	import { Switch } from "bits-ui";

	let { id, active, enable, disable } = $props();

	function getActive() {
		return active;
	}

	function setActive(value: boolean) {
		active = value;
		if (active) enable();
		if (!active) disable();
	}
</script>

<div class="flex items-center space-x-3">
	<Switch.Root
		{id}
		bind:checked={getActive, setActive}
		class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 dark:data-[state=checked]:bg-foreground focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#a3a3a3]"
	>
		<Switch.Thumb
			class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 bg-light"
		/>
	</Switch.Root>
</div>
