<script lang="ts">
  import Loading from './Loading.svelte';
  import { Button } from 'attractions';
  export let loading: boolean;
  export let name = 'Opslaan';
</script>

{#if loading}
  <div class="ml-auto mr-5 w-min"><Loading /></div>
{:else}
  <Button outline type="submit" class="ml-auto">{name}</Button>
{/if}
