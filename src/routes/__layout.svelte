<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation';

  import { currentRoute } from '$lib/client/routes';
  import { loading, loggedIn } from '$lib/client/stores';
  import Header from '$lib/components/Header.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import Snackbar from '$lib/components/Snackbar.svelte';
  import Loading from '$lib/components/Loading.svelte';
  import '../app.css';

  beforeNavigate(() => loading.set(true));
  afterNavigate(() => loading.set(false));
</script>

<svelte:head>
  {#if $currentRoute?.name}<title>{$currentRoute?.name} ∙ Theehuis</title>{/if}
</svelte:head>

<Header />
<main>
  {#if $loggedIn}
    <nav>
      <Menu />
    </nav>
  {/if}
  <section class:loggedIn={$loggedIn}>
    {#if $loading}
      <div class="my-12 mx-auto w-min">
        <Loading />
      </div>
    {:else}
      <slot />
    {/if}
  </section>
</main>

<Snackbar />

<style>
  main {
    max-width: --max-width;
    margin-inline: auto;
    @media (--sm) {
      margin-block: 0;
    }
  }

  nav {
    font-weight: bold;
    border-top: 1px solid #ddd;
    position: fixed;
    z-index: 2;
    bottom: 0;
    background-color: white;
    width: 100%;
    padding: 0.5rem --contain-padding;
    @media (--sm) {
      top: 0;
      border-top: none;
      border-right: 1px solid #ddd;
      padding-block: 6rem;
      width: --menu-width;
    }
  }

  section {
    width: 100%;
    padding: 6rem --contain-padding;
    @media (--sm) {
      padding-block: 6rem 2rem;
    }
  }

  section.loggedIn {
    @media (--sm) {
      padding-left: calc(--contain-padding + --gap + --menu-width);
    }
  }
</style>
