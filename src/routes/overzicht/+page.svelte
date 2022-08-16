<script context="module" lang="ts">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import type { Fetch, QueryOutput } from '$lib/client/trpc';
  // import { protect } from '$lib/util/protect';
  // import trpc from '$lib/client/trpc';

  // export const load = protect(async ({ fetch }) => {
  //   const bulletins = await trpc(fetch as Fetch).query('bulletin:list');
  //   const housemates = await trpc(fetch as Fetch).query('user:housemates');

  //   return { props: { bulletins, housemates } };
  // });
</script>

<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import { Card } from 'attractions';
  import BulletinCollection from './_BulletinCollection.svelte';
  import User from '$lib/components/User.svelte';

  export let bulletins: QueryOutput<'bulletin:list'>;
  export let housemates: QueryOutput<'user:housemates'>;
</script>

<h2 class="mb-3">Bulletin</h2>

<BulletinCollection {bulletins} />

{#if housemates}
  <h2 class="mb-3">Huisgenoten</h2>
  <Card class="mb-8">
    <ul>
      {#each housemates as housemate (housemate.id)}
        <li>
          <User name={housemate.name} gravatar={housemate.gravatar} size={2} showName />
        </li>
      {/each}
    </ul>
  </Card>
{/if}

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    width: 12rem;
  }
</style>
