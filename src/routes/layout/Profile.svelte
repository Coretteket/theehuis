<script lang="ts">
  import Data from 'carbon-icons-svelte/lib/Data_1.svelte';
  import Logout from 'carbon-icons-svelte/lib/Logout.svelte';
  import Button from 'attractions/button/button.svelte';
  import Dropdown from 'attractions/dropdown/dropdown.svelte';
  import DropdownShell from 'attractions/dropdown/dropdown-shell.svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/client/stores';
  import { post } from '$lib/util/post';
  import { showSnackbar } from '$lib/client/snackbar';

  const openSettings = (toggle: () => void) => goto('/instellingen').then(toggle);

  const logOut = async (toggle: () => void) => {
    toggle();
    await post('/uitloggen/api');
    $user = null;
    $showSnackbar({ text: 'Je bent succesvol uitgelogd.' });
    goto('/inloggen');
  };
</script>

{#if $user}
  <DropdownShell let:toggle>
    <Button selected on:click={toggle} class="!p-0">
      <span class="pl-4 pr-3 py-3">{$user.name}</span>
      <img
        src={$user.gravatar ?? 'https://www.gravatar.com/avatar/?d=mp'}
        class="h-8 mr-1 rounded-3xl"
        alt={$user.name}
      />
    </Button>
    <Dropdown class="py-2 px-3" horizontalAlignment="end">
      <Button class="my-1" on:click={() => openSettings(toggle)}>
        <Data size={20} />
        <span class="ml-3">Instellingen</span>
      </Button>
      <Button class="my-1" on:click={() => logOut(toggle)}>
        <Logout size={20} />
        <span class="ml-3">Uitloggen</span>
      </Button>
    </Dropdown>
  </DropdownShell>
{/if}
