<script context="module" lang="ts">
  import trpc, { type QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';

  export const load = protect();
</script>

<script lang="ts">
  import { session } from '$app/stores';
  import { Card, Loading } from 'attractions';

  let users: Promise<QueryOutput<'admin:users'>>;
  if ($session.user?.admin) users = trpc().query('admin:users');
</script>

{#if $session.user?.admin}
  {#await users}
    <Loading />
  {:then usersList}
    <h2 class="text-lg mb-2">Admin</h2>
    <Card>
      <ul>
        {#each usersList as user}
          <li>{user.name} ({user.email}), {user.house?.name}</li>
        {/each}
      </ul>
    </Card>
  {/await}
{/if}
