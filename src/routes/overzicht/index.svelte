<script context="module" lang="ts">
  import type { Fetch, QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';
  import trpc from '$lib/client/trpc';

  export const load = protect(async ({ session, fetch }) => {
    const bulletins = await trpc(fetch as Fetch).query('bulletin:list');
    const housemates = await trpc(fetch as Fetch).query('user:housemates');

    return { props: { bulletins, housemates } };
  });
</script>

<script lang="ts">
  import { Card } from 'attractions';
  import Bulletin from './_Bulletin.svelte';

  export let bulletins: QueryOutput<'bulletin:list'>;
  export let housemates: QueryOutput<'user:housemates'>;
</script>

<h2 class="mb-3">Bulletin</h2>

{#if bulletins}
  <div class="bulletin-container flex gap-5 overflow-x-scroll">
    {#each bulletins as bulletin}
      <Bulletin {bulletin} />
    {/each}
  </div>
{:else}
  <p>Geen bulletins gevonden.</p>
{/if}

{#if housemates}
  <h2 class="mb-3">Huisgenoten</h2>
  <Card class="mb-8">
    <ul>
      {#each housemates as housemate (housemate.id)}
        <li>
          <img
            src={housemate.gravatar ?? 'https://www.gravatar.com/avatar/?d=mp'}
            class="h-8 mr-2 my-1 rounded-3xl inline-block"
            alt={housemate.name}
          />
          {housemate.name}
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

  .bulletin-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 0 calc(-1 * --contain-padding);
    padding: 0.25em --contain-padding;
    @media (--sm) {
      margin-right: 0.25em;
      padding-right: 0.25em;
    }
  }

  .bulletin-container::-webkit-scrollbar {
    display: none;
  }
</style>
