<script lang="ts">
  import { Button } from 'attractions';
  import User from './User.svelte';
  import FavoriteFilled from 'carbon-icons-svelte/lib/FavoriteFilled.svelte';
  import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';

  export let likedBy: {
    name: string;
    gravatar: string | null;
    id: string;
  }[];

  export let like: () => void;
  export let liked = false;
  export let disabled = false;
</script>

<div class="flex justify-end items-center gap-2" {...$$restProps}>
  <div class="flex items-center gap-2">
    {#each likedBy as like (like.id)}
      <User name={like.name} gravatar={like.gravatar} size={1.25} transition />
    {/each}
  </div>
  <Button round on:click={like} {disabled}>
    {#if liked}
      <FavoriteFilled size={20} />
    {:else}
      <Favorite size={20} />
    {/if}
  </Button>
</div>
