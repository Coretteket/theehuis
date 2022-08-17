<script lang="ts">
  import type { QueryOutput } from '$lib/client/trpc';
  import trpc from '$lib/client/trpc';
  import Likes from '$lib/components/Likes.svelte';

  import User from '$lib/components/User.svelte';

  import { fromNow } from '$lib/util/fromNow';
  import { Button } from 'attractions';
  import Launch from 'carbon-icons-svelte/lib/Launch.svelte';
  import { session } from '$app/stores';
  import type { Writable } from 'svelte/store';

  export let bulletin: Writable<NonNullable<QueryOutput<'bulletin:list'>>[number]>;
  export let modal: boolean = false;
  export let launch = () => {};

  $: disabled = $bulletin.user.id === $session.user?.id;
  $: liked = $bulletin.likedBy.filter((user) => user.id === $session.user?.id).length > 0;
  $: editable = modal && $bulletin.user.id === $session.user?.id;

  const like = async () => {
    liked = !liked;
    const response = await trpc().mutation('bulletin:like', $bulletin.id);
    $bulletin.likedBy = response?.likedBy ?? $bulletin.likedBy;
    liked = response?.liked ?? liked;
  };
</script>

<div>
  {#if !modal}
    <div class="flex justify-between items-center -mt-2 mb-1">
      <User name={$bulletin.user.name} gravatar={$bulletin.user.gravatar} showName />

      <Button on:click={launch} round>
        <Launch class="inline-block text-gray-600" size={20} />
      </Button>
    </div>

    <h3 class:constrain={!modal} class="text-lg font-medium">
      {$bulletin.title}
    </h3>
  {/if}

  <p class="text-sm text-gray-600 -mt-1 mb-3">
    {fromNow($bulletin.updatedAt)}
    {#if modal}
      &#8211; door {$bulletin.user.name}
    {/if}
  </p>

  <div class:message={modal}>
    <p class:constrain={!modal}>
      {$bulletin.message}
    </p>
  </div>
</div>

<div class={editable ? 'flex justify-between' : '-mb-2'}>
  {#if editable}<Button outline>Edit</Button>{/if}
  <Likes likedBy={$bulletin.likedBy} {like} {liked} {disabled} />
</div>

<style>
  h3.constrain {
    max-width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  h3:not(.constrain) {
    line-height: 1;
    margin-bottom: 0.5em;
  }

  p.constrain {
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  div.message {
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
