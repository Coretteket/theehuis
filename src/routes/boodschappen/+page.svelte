<script context="module" lang="ts">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import type { Fetch, QueryOutput } from '$lib/client/trpc';
  // import { protect } from '$lib/util/protect';
  // import trpc from '$lib/client/trpc';

  // export const load = protect(async ({ fetch }) => {
  //   const listItems = await trpc(fetch as Fetch).query('grocery:list');
  //   return { props: { listItems } };
  // });
</script>

<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

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
