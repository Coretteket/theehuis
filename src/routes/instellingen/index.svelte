<script context="module" lang="ts">
  import type { Fetch, QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';
  import trpc from '$lib/client/trpc';

  export const load = protect(async ({ session, fetch }) => {
    if (!session.user?.admin) return {};
    const users = await trpc(fetch as Fetch).query('admin:users');
    return { props: { users } };
  });
</script>

<script lang="ts">
  import { Card } from 'attractions';

  export let users: QueryOutput<'admin:users'>;
</script>

{#if users}
  <h2 class="text-lg mb-2">Admin</h2>
  <Card>
    <ul>
      {#each users as user}
        <li>{user.name} ({user.email}), {user.house?.name}</li>
      {/each}
    </ul>
  </Card>
{/if}
