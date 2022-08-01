<script lang="ts">
  import Data from 'carbon-icons-svelte/lib/Data_1.svelte';
  import Logout from 'carbon-icons-svelte/lib/Logout.svelte';
  import { Button, Dropdown, DropdownShell } from 'attractions';
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { post } from '$lib/util/post';

  const openSettings = (toggle: () => void) => goto('/instellingen').then(toggle);

  const logOut = (toggle: () => void) => {
    $session.user = null;
    post('/uitloggen/api').then(toggle);
    goto('/inloggen');
  };
</script>

<DropdownShell let:toggle>
  <Button selected on:click={toggle} class="!p-0">
    <span class="pl-4 pr-3 py-3">{$session.user.name}</span>
    <img
      src="https://avatars.githubusercontent.com/u/33397397?s=400&u=18e15c28ab6d432f44ca1f6398630ac20a5638c4&v=4"
      class="h-8 mr-1 rounded-3xl"
      alt="Quinten"
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
