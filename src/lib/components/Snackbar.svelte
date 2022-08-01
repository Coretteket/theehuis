<script lang="ts">
  import { SnackbarContainer } from 'attractions';
  import { snackbar } from '$lib/client/stores';

  let snackbarContainer: SnackbarContainer;
  $: $snackbar = snackbarContainer;
</script>

<div class="snackbar-container">
  <SnackbarContainer position="top right" bind:this={snackbarContainer} />
</div>

<style>
  .snackbar-container {
    --margin-inline: 1rem;
    --margin-block: 4rem;

    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 10;
    right: --margin-inline;
    top: --margin-block;
    width: calc(100% - --margin-inline * 2);

    @media (--sm) {
      width: unset;
    }
  }
</style>
