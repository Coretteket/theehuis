<script lang="ts">
  import type { PageData } from './$types';
  import { Button, Card } from 'attractions';
  import BulletinCollection from './BulletinCollection.svelte';
  import User from '$lib/components/User.svelte';

  export let data: PageData;
  $: ({ bulletins, housemates } = data);
</script>

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
