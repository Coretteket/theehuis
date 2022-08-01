<script context="module" lang="ts">
  import type { Fetch, QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';
  import trpc from '$lib/client/trpc';

  export const load = protect(async ({ fetch, session }) => {
    const listItems = await trpc(fetch as Fetch).query('grocery:list', session.user.houseId);
    return { props: { listItems } };
  });
</script>

<script lang="ts">
  export let listItems: QueryOutput<'grocery:list'>;
</script>

<ul>
  {#each listItems as item}
    <li class:archived={!item.active}>
      {item.name}
      {#if item.notes.length > 0}, {item.notes} {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: circle;
  }

  .archived {
    color: red;
  }
</style>
