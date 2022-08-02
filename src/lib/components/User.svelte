<script lang="ts">
  import { Popover } from 'attractions';

  import { fade } from 'svelte/transition';

  export let name: string;
  export let gravatar: string | null;
  export let showName = false;
  export let size = 1.75;
  export let transition = false;
</script>

<span class="flex items-center" class:showName {...$$restProps}>
  <Popover position="top">
    <img
      alt={name}
      src={gravatar ?? 'https://www.gravatar.com/avatar/?d=mp'}
      class="rounded-full inline-block"
      style:--height="{size}rem"
      transition:fade|local={{ duration: transition ? 150 : 0 }}
    />
    <div slot="popover-content" class="text-gray-600 text-sm bg-gray-100 px-1 mb-1 rounded-lg">
      {#if !showName} {name} {/if}
    </div>
  </Popover>
  {#if showName} {name} {/if}
</span>

<style>
  img {
    height: --height;
  }

  .showName img {
    margin-block: 0.25em;
    margin-right: 0.75em;
  }

  :not(.showName) img {
    cursor: pointer;
  }

  .showName {
    padding-right: 0.75em;
  }
</style>
