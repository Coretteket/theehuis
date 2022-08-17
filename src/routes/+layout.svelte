<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { currentRoute } from '$lib/client/routes';
  import { loading, user } from '$lib/client/stores';
  import Header from './layout/Header.svelte';
  import Menu from './layout/Menu.svelte';
  import Loading from '$lib/components/Loading.svelte';
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
  import { page } from '$app/stores';

  beforeNavigate(() => loading.set(true));
  afterNavigate(() => loading.set(false));

  $: $user = $page.data.user;

  onMount(() => {
    if (browser) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${PUBLIC_RECAPTCHA_SITE_KEY}`;
      [script.async, script.defer] = [true, true];
      document.head.appendChild(script);
    }
  });
</script>

<svelte:head>
  {#if $currentRoute?.name}<title>{$currentRoute?.name} ∙ Theehuis</title>{/if}
</svelte:head>

<Header />
<main>
  {#if $user}
    <nav>
      <Menu />
    </nav>
  {/if}
  <section class:loggedIn={$user}>
    {#if $loading}
      <div class="my-12 mx-auto w-min">
        <Loading />
      </div>
    {:else}
      <slot />

      <footer class="text-gray-400 text-sm mt-6">
        Theehuis maakt gebruik van reCAPTCHA voor het afvangen van spam.
      </footer>
    {/if}
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
      padding-block: 6rem 3rem;
    }
  }

  section.loggedIn {
    @media (--sm) {
      padding-left: calc(--contain-padding + --gap + --menu-width);
    }
  }
</style>
