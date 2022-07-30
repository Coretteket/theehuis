<script lang="ts">
  import { Button } from 'attractions';
  import { useMediaQuery } from '../scripts/media-query';
  import { routes, isRoute } from '../scripts/routes';

  let isMobile = useMediaQuery('(max-width: 600px)');
</script>

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

<style>
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
