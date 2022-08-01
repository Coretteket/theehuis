<script context="module" lang="ts">
  import type { Fetch, QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';
  import trpc from '$lib/client/trpc';

  export const load = protect();
</script>

<script lang="ts">
  import { session } from '$app/stores';
  import Loading from '$lib/components/Loading.svelte';

  let list = trpc().query('grocery:list', $session.user.houseId);
</script>

{#await list}
  <Loading />
{:then listItems}
  <ul>
    {#each listItems as item}
      <li class:archived={!item.active}>
        {item.name}
        {#if item.notes.length > 0}, {item.notes} {/if}
      </li>
    {/each}
  </ul>
{/await}

<style>
  ul {
    list-style: circle;
  }

  .archived {
    color: red;
  }
</style>
