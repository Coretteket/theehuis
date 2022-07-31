<script context="module" lang="ts">
  import trpc, { type Fetch, type QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';

  export const load = protect(async ({ fetch }) => {
    const listItems = await trpc(fetch as Fetch).query('shop:list');
    return { props: { listItems } };
  });
</script>

<script lang="ts">
  export let listItems: QueryOutput<'shop:list'>;
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
