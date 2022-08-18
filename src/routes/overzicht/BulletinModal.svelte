<script lang="ts">
  import type { QueryOutput } from '$lib/client/trpc';
  import Likes from '$lib/components/Likes.svelte';
  import { fromNow } from '$lib/util/fromNow';
  import Button from 'attractions/button/button.svelte';
  import TextField from 'attractions/text-field/text-field.svelte';
  import { user } from '$lib/client/stores';
  import type { Writable } from 'svelte/store';
  import { createForm } from 'felte';
  import Submit from '$lib/components/Submit.svelte';
  import trpc from '$lib/client/trpc';
  import { invalidate } from '$app/navigation';

  export let bulletin: Writable<NonNullable<QueryOutput<'bulletin:list'>>[number]>;

  $: editable = $bulletin.author.id === $user?.id;

  let editing = false;
  let confirm = false;

  $: if (confirm) {
    setTimeout(() => {
      confirm = false;
    }, 10e3);
  }

  const { form } = createForm({
    onSubmit: async (values) => {
      const response = await trpc().mutation('bulletin:edit', {
        id: $bulletin.id,
        authorId: $bulletin.author.id,
        message: values.message,
      });
      $bulletin = response ?? $bulletin;
      editing = false;
    },
  });

  const archive = async () => {
    await trpc().mutation('bulletin:archive', {
      id: $bulletin.id,
      authorId: $bulletin.author.id,
    });
    invalidate();
  };
</script>

<div>
  <p class="text-sm text-gray-600 -mt-1 mb-3">
    {fromNow($bulletin.updatedAt)}
    &#8211; door {$bulletin.author.name}
  </p>

  <div class="message">
    {#if !editing}
      <p class="mb-0">
        {$bulletin.message}
      </p>
    {:else}
      <form use:form>
        <TextField value={$bulletin.message} multiline name="message" />
        <div class="flex gap-3 mt-4">
          <Button outline on:click={() => (editing = false)}>Terug</Button>
          <Button outline type="submit">Opslaan</Button>
        </div>
      </form>
    {/if}
  </div>
</div>

{#if !editing}
  <div class={editable ? 'flex justify-between mt-2' : '-mb-2'}>
    {#if editable}
      <div class="flex gap-3  my-2">
        <Button outline on:click={() => (editing = true)}>Bewerken</Button>
        {#if !confirm}<Button outline danger on:click={() => (confirm = true)}>Archiveren</Button>
        {:else}<Button danger on:click={archive}>Zeker?</Button>{/if}
      </div>
    {/if}
    <Likes data={bulletin} />
  </div>
{/if}

<style>
  div.message {
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
