<script lang="ts">
  import type { QueryOutput } from '$lib/client/trpc';
  import Likes from '$lib/components/Likes.svelte';

  import User from '$lib/components/User.svelte';

  import { fromNow } from '$lib/util/fromNow';
  import Button from 'attractions/button/button.svelte';
  import Launch from 'carbon-icons-svelte/lib/Launch.svelte';
  import type { Writable } from 'svelte/store';

  export let bulletin: Writable<NonNullable<QueryOutput<'bulletin:list'>>[number]>;
  export let launch = () => {};
</script>

<div>
  <div class="flex justify-between items-center -mt-2 mb-1">
    <User name={$bulletin.author.name} gravatar={$bulletin.author.gravatar} showName />

    <Button on:click={launch} round>
      <Launch class="inline-block text-gray-600" size={20} />
    </Button>
  </div>

  <h3 class="constrain text-lg font-medium">
    {$bulletin.title}
  </h3>

  <p class="text-sm text-gray-600 -mt-1 mb-3">
    {fromNow($bulletin.updatedAt)}
  </p>

  <div>
    <p class="constrain">
      {$bulletin.message}
    </p>
  </div>
</div>

<div class="-mb-2">
  <Likes data={bulletin} />
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
