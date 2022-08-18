<script lang="ts">
  import Card from 'attractions/card/card.svelte';
  import Switch from 'attractions/switch/switch.svelte';
  import { showSnackbar } from '$lib/client/snackbar';
  import { user } from '$lib/client/stores';
  import type { PageData } from './$types';
  import trpc from '$lib/client/trpc';

  export let data: PageData;

  let gravatarValue = !!$user?.gravatar;

  const handleGravatarChange = async ({ detail }: CustomEvent) => {
    const { gravatar } = await trpc().mutation('settings:gravatar', !!detail.value);
    if ($user) $user.gravatar = gravatar;
    if (gravatar) $showSnackbar({ text: 'Gravatar succesvol ingeschakeld.' });
    else $showSnackbar({ text: 'Gravatar uitgeschakeld.' });
  };
</script>

{#if data.adminUsersList}
  <h2 class="text-lg font-medium mb-2">Admin</h2>
  <Card class="mb-8">
    <ul>
      {#each data.adminUsersList as user}
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
