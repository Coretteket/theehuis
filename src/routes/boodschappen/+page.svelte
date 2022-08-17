<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ul>
  {#each data.listItems as item}
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
