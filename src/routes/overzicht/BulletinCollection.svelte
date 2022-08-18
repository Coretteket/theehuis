<script lang="ts">
  import { browser } from '$app/env';
  import type { QueryOutput } from '$lib/client/trpc';
  import trpc from '$lib/client/trpc';
  import { useConveyer } from '@egjs/svelte-conveyer/src/svelte-conveyer/index';
  import Button from 'attractions/button/button.svelte';
  import Dialog from 'attractions/dialog/dialog.svelte';
  import Modal from 'attractions/modal/modal.svelte';
  import TextField from 'attractions/text-field/text-field.svelte';
  import { createForm } from 'felte';
  import Bulletin from './Bulletin.svelte';

  export let bulletins: QueryOutput<'bulletin:list'>;

  const drag = browser ? useConveyer({ horizontal: true }).ref : () => {};

  let grabbing = false;

  let modalOpen = false;

  const { form } = createForm({
    onSubmit: async (values) => {
      const response = await trpc().mutation('bulletin:create', {
        title: values.title,
        message: values.message,
      });
      if (bulletins) bulletins = [response, ...bulletins];
      modalOpen = false;
    },
  });
</script>

<div class="flex justify-between items-center mb-2">
  <h2>Bulletin</h2>
  <Button outline on:click={() => (modalOpen = true)}>Nieuw</Button>
</div>

<Modal bind:open={modalOpen} let:closeCallback>
  <Dialog title="Nieuwe bulletin" {closeCallback} constrainWidth>
    <form use:form>
      <label for="title" class="block mb-1">Titel</label>
      <TextField name="title" class="mb-4" />
      <label for="title" class="block mb-1">Bericht</label>
      <TextField name="message" multiline class="mb-4" />
      <Button type="submit" outline>Opslaan</Button>
    </form>
  </Dialog>
</Modal>

{#if bulletins && bulletins.length > 0}
  <div
    class="bulletins flex gap-5 overflow-x-scroll cursor-grab"
    use:drag
    on:mousedown={() => (grabbing = true)}
    on:mouseup={() => (grabbing = false)}
    class:grabbing
  >
    {#each bulletins as bulletin (bulletin.id)}
      <Bulletin {bulletin} />
    {/each}
  </div>
{:else}
  <p class="mb-8 text-gray-600">Geen bulletins gevonden.</p>
{/if}

<style>
  .bulletins {
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 0 calc(-1 * --contain-padding);
    padding: 0.25em --contain-padding;
    @media (--sm) {
      margin-right: 0.25em;
      padding-right: 0.25em;
    }
  }

  .bulletins::-webkit-scrollbar {
    display: none;
  }

  .grabbing {
    cursor: grabbing;
  }
</style>
