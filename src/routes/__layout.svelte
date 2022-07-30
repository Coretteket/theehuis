<script>
  import Header from './_Header.svelte';
  import Menu from './_Menu.svelte';
  import '@fontsource/ubuntu/400.css';
  import '@fontsource/ubuntu/500.css';
  import '@fontsource/ubuntu/700.css';
  import '../app.css';
  import { currentRoute } from '../scripts/routes';
</script>

<svelte:head>
  <title>{$currentRoute?.name} ∙ Theehuis</title>
</svelte:head>

<Header />
<main>
  <nav>
    <Menu />
  </nav>
  <section>
    <slot />
  </section>
</main>

<style>
  .contain {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

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
      padding-left: calc(--contain-padding + --gap + --menu-width);
      padding-block: 6rem 2rem;
    }
  }
</style>
