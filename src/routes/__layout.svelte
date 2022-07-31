<script lang="ts">
  import { currentRoute } from '$lib/client/routes';
  import { loggedIn } from '$lib/client/stores';
  import Header from '$lib/components/Header.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import '../app.css';
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
    <slot />
  </section>
</main>

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
