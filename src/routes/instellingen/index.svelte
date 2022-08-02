<script context="module" lang="ts">
  import type { Fetch, QueryOutput } from '$lib/client/trpc';
  import { protect } from '$lib/util/protect';
  import trpc from '$lib/client/trpc';

  export const load = protect(async ({ session, fetch }) => {
    if (!session.user?.admin) return {};

    const usersList = await trpc(fetch as Fetch).query('admin:users');

    return { props: { usersList } };
  });
</script>

<script lang="ts">
  import { Card, Switch } from 'attractions';
  import { showSnackbar } from '$lib/client/snackbar';
  import { session } from '$app/stores';

  export let usersList: QueryOutput<'admin:users'> | undefined;

  let gravatarValue = !!$session.user?.gravatar;

  const handleGravatarChange = async ({ detail }: CustomEvent) => {
    const { gravatar } = await trpc().mutation('settings:gravatar', !!detail.value);
    if ($session.user) $session.user.gravatar = gravatar;
    if (gravatar) $showSnackbar({ text: 'Gravatar succesvol ingeschakeld.' });
    else $showSnackbar({ text: 'Gravatar uitgeschakeld.' });
  };
</script>

{#if usersList}
  <h2 class="text-lg font-medium mb-2">Admin</h2>
  <Card class="mb-8">
    <ul>
      {#each usersList as user}
        <li>
          <img
            src={user.gravatar ?? 'https://www.gravatar.com/avatar/?d=mp'}
            class="h-8 mr-2 my-1 rounded-3xl inline-block"
            alt={user.name}
          />
          {user.name}:
          {user.house?.name ?? 'Geen huis'}
        </li>
      {/each}
    </ul>
  </Card>
{/if}

<h2 class="text-lg font-medium mb-2">Profielfoto</h2>
<Card>
  <p>
    Om een profielfoto in te stellen kun je een account op <a href="https://gravatar.com" target="_blank">Gravatar</a> aanmaken.
    Je e-mailadres op Gravatar moet hiervoor hetzelfde zijn als die op Theehuis. Je kan er ook voor kiezen om geen account
    aan te maken en toch Gravatar te gebruiken, dan wordt jou een willekeurig patroon toegewezen.
  </p>
  <Switch on:change={handleGravatarChange} bind:value={gravatarValue}>
    <span class="ml-4">Gravatar gebruiken</span>
  </Switch>
</Card>
