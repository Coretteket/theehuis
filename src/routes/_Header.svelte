<script lang="ts">
	import Data from 'carbon-icons-svelte/lib/Data_1.svelte';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';
	import Cafe from 'carbon-icons-svelte/lib/Cafe.svelte';
	import { Button, Dropdown, DropdownShell } from 'attractions';
	import { currentRoute } from '../scripts/routes';
	import { goto } from '$app/navigation';

	const openSettings = (close: () => void) => goto('/instellingen').then(close);
</script>

<header>
	<div class="contain">
		<div class="left">
			<h1 class="!hidden sm:!flex sm:ml-3">
				<Cafe size={24} fill="purple" class="mb-[1px]" />
				<span class="ml-4">Theehuis</span>
			</h1>
			<h1 class="sm:!hidden">
				<span>{$currentRoute?.title}</span>
			</h1>
		</div>
		<div class="right">
			<DropdownShell let:toggle>
				<Button selected on:click={toggle} class="!p-0">
					<span class="pl-4 pr-3">Quinten</span>
					<img
						src="https://avatars.githubusercontent.com/u/33397397?s=400&u=18e15c28ab6d432f44ca1f6398630ac20a5638c4&v=4"
						class="h-8 mr-1 my-1 rounded-3xl"
						alt="Quinten"
					/>
				</Button>
				<Dropdown class="py-2 px-3" horizontalAlignment="end">
					<Button class="my-1" on:click={() => openSettings(toggle)}>
						<Data size={20} />
						<span class="ml-3">Instellingen</span>
					</Button>
					<Button class="my-1">
						<Logout size={20} />
						<span class="ml-3">Uitloggen</span>
					</Button>
				</Dropdown>
			</DropdownShell>
		</div>
	</div>
</header>

<style>
	header {
		border-bottom: 1px solid #ddd;
		background-color: white;
		position: fixed;
		width: 100%;
		z-index: 3;

		@media (--sm) {
			/* position: unset; */
		}
	}

	.contain {
		max-width: --max-width;
		margin-inline: auto;
		padding: 0.6rem --contain-padding;
		display: flex;
		justify-content: space-between;
	}

	.contain > div {
		display: flex;
		align-items: center;
	}

	h1 {
		display: flex;
		align-items: center;
		font-size: 1.5em;
		font-weight: 500;
		/* color: purple; */
	}
</style>
