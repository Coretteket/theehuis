<script lang="ts">
  import Button from 'attractions/button/button.svelte';
  import { user } from '$lib/client/stores';
  import User from './User.svelte';
  import FavoriteFilled from 'carbon-icons-svelte/lib/FavoriteFilled.svelte';
  import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';
  import type { Writable } from 'svelte/store';
  import trpc from '$lib/client/trpc';

  export let data: Writable<{
    id: string;
    author: {
      name: string;
      gravatar: string | null;
      id: string;
    };
    likedBy: {
      name: string;
      gravatar: string | null;
      id: string;
    }[];
  }>;

  $: disabled = $data.author.id === $user?.id;
  $: liked = $data.likedBy.filter((liker) => liker.id === $user?.id).length > 0;

  const like = async () => {
    liked = !liked;
    const response = await trpc().mutation('bulletin:like', $data.id);
    $data.likedBy = response?.likedBy ?? $data.likedBy;
    liked = response?.liked ?? liked;
  };
</script>

<div class="flex justify-end items-center gap-2" {...$$restProps}>
  <div class="flex items-center gap-2">
    {#each $data.likedBy as like (like.id)}
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
