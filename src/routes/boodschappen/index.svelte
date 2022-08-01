<script context="module" lang="ts">
  import { protect } from '$lib/util/protect';
  export const load = protect();
</script>

<script lang="ts">
  import { Loading } from 'attractions';
  import trpc from '$lib/client/trpc';

  let list = trpc().query('grocery:list');
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
