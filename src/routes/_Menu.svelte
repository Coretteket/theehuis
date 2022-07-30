<script lang="ts">
	import { Button } from 'attractions';
	import { useMediaQuery } from '../scripts/media-query';
	import { routes, isRoute } from '../scripts/routes';

	let isMobile = useMediaQuery('(max-width: 600px)');
</script>

<nav>
	<ul>
		{#each routes as route}
			<li>
				<Button href="/{route.path}" round={$isMobile} selected={$isRoute(route.path)}>
					<svelte:component this={route.icon} size="18" />
					<span>{route.name}</span>
				</Button>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		font-weight: bold;
		border-top: 1px solid #ddd;
		position: fixed;
		z-index: 2;
		bottom: 0;
		background-color: white;
		width: 100%;
		padding: 0.6rem --contain-padding;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	span {
		display: none;
	}

	@media (--sm) {
		nav {
			top: 0;
			border-top: none;
			border-right: 1px solid #ddd;
			padding-block: 6rem;
			width: --menu-width;
		}

		ul {
			display: block;
			width: min-content;
		}

		li {
			margin-bottom: 0.5rem;
		}

		span {
			display: inline;
			margin-left: 0.75rem;
		}
	}
</style>
