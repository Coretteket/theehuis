<script lang="ts">
  import Cafe from 'carbon-icons-svelte/lib/Cafe.svelte';
  import { currentRoute } from '$lib/client/routes';
  import Profile from './Profile.svelte';
  import { user } from '$lib/client/stores';
  import { Button } from 'attractions';
  import Snackbar from './Snackbar.svelte';
</script>

<header>
  <Snackbar />
  <div class="contain">
    <div class="left">
      <h1 class="!hidden sm:!flex sm:ml-3">
        <Cafe size={24} fill="purple" class="mb-[1px]" />
        <span class="ml-4">Theehuis</span>
      </h1>
      <h1 class="sm:!hidden">
        <span>{$currentRoute?.title ?? $currentRoute?.name}</span>
      </h1>
    </div>
    <div class="right">
      <Profile />
      {#if !$user}
        <Button href="/registreren" class="!p-0 mr-4 !hidden sm:!flex">
          <span class="px-5 my-3">Registreren</span>
        </Button>

        <Button selected href="/inloggen" class="!p-0">
          <span class="px-7 my-3">Inloggen</span>
        </Button>
      {/if}
    </div>
  </div>
</header>

<style>
  header {
    border-bottom: 1px solid #ddd;
    background-color: white;
    position: fixed;
    width: 100%;
    z-index: 3;

    @media (--sm) {
      /* position: unset; */
    }
  }

  .contain {
    max-width: --max-width;
    margin-inline: auto;
    padding: 0.6rem --contain-padding;
    display: flex;
    justify-content: space-between;
  }

  .contain > div {
    display: flex;
    align-items: center;
  }

  h1 {
    display: flex;
    align-items: center;
    font-size: 1.5em;
    font-weight: 500;
    /* color: purple; */
  }
</style>
