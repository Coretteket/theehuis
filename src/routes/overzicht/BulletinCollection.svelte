<script lang="ts">
  import { browser } from '$app/env';

  import type { QueryOutput } from '$lib/client/trpc';
  import { useConveyer } from '@egjs/svelte-conveyer/src/svelte-conveyer/index';
  import Bulletin from './Bulletin.svelte';

  export let bulletins: QueryOutput<'bulletin:list'>;

  const drag = browser ? useConveyer({ horizontal: true }).ref : () => {};

  let grabbing = false;
</script>

{#if bulletins}
  <div
    class="flex gap-5 overflow-x-scroll cursor-grab"
    use:drag
    on:mousedown={() => (grabbing = true)}
    on:mouseup={() => (grabbing = false)}
    on:mouseleave={() => (grabbing = false)}
    class:grabbing
  >
    {#each bulletins as bulletin (bulletin.id)}
      <Bulletin {bulletin} />
    {/each}
  </div>
{:else}
  <p>Geen bulletins gevonden.</p>
{/if}

<style>
  div {
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 0 calc(-1 * --contain-padding);
    padding: 0.25em --contain-padding;
    @media (--sm) {
      margin-right: 0.25em;
      padding-right: 0.25em;
    }
  }

  div::-webkit-scrollbar {
    display: none;
  }

  .grabbing {
    cursor: grabbing;
  }
</style>
