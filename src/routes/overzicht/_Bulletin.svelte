<script lang="ts">
  import type { QueryOutput } from '$lib/client/trpc';
  import { fromNow } from '$lib/util/fromNow';
  import { Button, Card } from 'attractions';
  import Launch from 'carbon-icons-svelte/lib/Launch.svelte';
  import FavoriteFilled from 'carbon-icons-svelte/lib/FavoriteFilled.svelte';
  import Favorite from 'carbon-icons-svelte/lib/Favorite.svelte';
  import trpc from '$lib/client/trpc';
  import { session } from '$app/stores';
  import { fade } from 'svelte/transition';

  export let bulletin: QueryOutput<'bulletin:list'>[number];

  let liked = bulletin.likedBy.filter((user) => user.id === $session.user?.id).length > 0;

  const like = async () => {
    liked = !liked;
    const response = await trpc().mutation('bulletin:like', bulletin.id);
    bulletin.likedBy = response.likedBy;
    liked = response.liked ?? liked;
  };
</script>

<Card class="min-w-[18rem] mb-8 flex flex-col justify-between">
  <div>
    <div class="flex justify-between items-center -mt-2 mb-1">
      <span class="flex items-center">
        <img
          src={bulletin.user.gravatar ?? 'https://www.gravatar.com/avatar/?d=mp'}
          class="h-7 mr-3 my-1 rounded-3xl inline-block"
          alt={bulletin.user.name}
        />
        {bulletin.user.name}
      </span>
      <Button round>
        <Launch class="inline-block text-gray-600" size={20} />
      </Button>
    </div>

    <h3 class="text-lg font-medium">
      {bulletin.title}
    </h3>

    <p class="text-sm text-gray-600 -mt-1 mb-3">{fromNow(bulletin.updatedAt)}</p>

    <p>{bulletin.message}</p>
  </div>

  <div class="flex justify-end items-center -mb-2">
    <div class="mr-2">
      {#each bulletin.likedBy as like (like.id)}
        <img
          transition:fade|local={{ duration: 100 }}
          src={like.gravatar ?? 'https://www.gravatar.com/avatar/?d=mp'}
          class="h-5 aspect-square ml-1 rounded-3xl inline-block"
          alt={like.name}
          title={like.name}
        />
      {/each}
    </div>
    <Button round on:click={like}>
      {#if liked}
        <FavoriteFilled size={20} />
      {:else}
        <Favorite size={20} />
      {/if}
    </Button>
  </div>
</Card>

<style>
  h3 {
    max-width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
