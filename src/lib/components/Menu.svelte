<script lang="ts">
  import { Button } from 'attractions';
  import { useMediaQuery } from '$lib/util/mediaQuery';
  import { routes, isRoute } from '$lib/client/routes';

  let isMobile = useMediaQuery('(max-width: 900px)');
</script>

<ul>
  {#each routes as route}
    <li>
      <Button href="/{route.path}" round={$isMobile} selected={$isRoute(route.path)} class="wide">
        <svelte:component this={route.icon} size={$isMobile ? 22 : 18} />
        <span>{route.name}</span>
      </Button>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  span {
    display: none;
  }

  @media (--sm) {
    ul {
      display: block;
      width: min-content;
    }

    li {
      margin-bottom: 0.5rem;
    }
  }

  @media (--md) {
    span {
      display: inline;
      margin-left: 0.75rem;
    }
  }
</style>
