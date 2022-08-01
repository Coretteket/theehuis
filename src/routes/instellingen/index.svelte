<script context="module" lang="ts">
  import type { Fetch, QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';
  import trpc from '$lib/client/trpc';

  export const load = protect(async ({ session, fetch }) => {
    if (!session.user.admin) return {};

    const usersList = await trpc(fetch as Fetch).query('admin:users');

    return { props: { usersList } };
  });
</script>

<script lang="ts">
  import { Card } from 'attractions';
  import Loading from '$lib/components/Loading.svelte';

  export let usersList: QueryOutput<'admin:users'> | undefined;
</script>

{#if usersList}
  <h2 class="text-lg mb-2">Admin</h2>
  <Card>
    <ul>
      {#each usersList as user}
        <li>{user.name} ({user.email}), {user.house?.name}</li>
      {/each}
    </ul>
  </Card>
{/if}
