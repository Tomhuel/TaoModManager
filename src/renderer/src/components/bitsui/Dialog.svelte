<script lang="ts">
	import { Dialog } from "bits-ui";

	let {
		children,
		buttonContent,
		dialogTitle,
		buttonContentClasses = ""
	} : any = $props();

</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonContentClasses}>
		{@render buttonContent()}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] p-5 sm:max-w-[490px] md:w-fulld border-light/20 border rounded-button bg-dark text-light"
		>
			<Dialog.Title
				class="flex w-full items-center justify-between text-2xl font-semibold tracking-tight text-light"
			>
				{dialogTitle}
				<Dialog.Close>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-x text-light"
						><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</Dialog.Close>
			</Dialog.Title>

			{@render children()}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
