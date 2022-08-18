<script lang="ts">
  import type { QueryOutput } from '$lib/client/trpc';
  import Likes from '$lib/components/Likes.svelte';
  import { fromNow } from '$lib/util/fromNow';
  import Button from 'attractions/button/button.svelte';
  import TextField from 'attractions/text-field/text-field.svelte';
  import { user } from '$lib/client/stores';
  import type { Writable } from 'svelte/store';
  import { createForm } from 'felte';
  import trpc from '$lib/client/trpc';
  import { invalidate } from '$app/navigation';
  import Loading from '$lib/components/Loading.svelte';

  export let bulletin: Writable<NonNullable<QueryOutput<'bulletin:list'>>[number]>;

  $: editable = $bulletin.author.id === $user?.id;

  let editing = false;
  let confirm = false;
  let loading = false;

  $: if (confirm) {
    setTimeout(() => {
      confirm = false;
    }, 10e3);
  }

  const { form } = createForm({
    onSubmit: async (values) => {
      loading = true;
      const response = await trpc().mutation('bulletin:edit', {
        id: $bulletin.id,
        authorId: $bulletin.author.id,
        message: values.message,
      });
      $bulletin = response ?? $bulletin;
      editing = false;
      loading = false;
    },
  });

  const archive = async () => {
    loading = true;
    await trpc().mutation('bulletin:archive', {
      id: $bulletin.id,
      authorId: $bulletin.author.id,
    });
    invalidate((href) => href.includes('bulletin:list'));
  };
</script>

<p class="text-sm text-gray-600 -mt-1 mb-3">
  {fromNow($bulletin.updatedAt)}
  &#8211; door {$bulletin.author.name}
</p>

{#if !editing}
  <div class="message">
    <p class="mb-2">
      {$bulletin.message}
    </p>
  </div>

  {#if editable}
    <div class="flex flex-wrap gap-3 my-2">
      <Button outline on:click={() => (editing = true)}>Bewerken</Button>
      {#if !confirm}<Button outline danger on:click={() => (confirm = true)}>Archiveren</Button>
      {:else if !loading}<Button danger on:click={archive}>Zeker?</Button>
      {:else}<Loading class="ml-4" />{/if}
    </div>
  {/if}
{:else}
  <form use:form>
    <TextField value={$bulletin.message} multiline name="message" />
    <div class="flex gap-3 mt-4">
      <Button outline on:click={() => (editing = false)}>Terug</Button>
      {#if !loading}<Button outline type="submit">Opslaan</Button>
      {:else}<Loading class="ml-4" />{/if}
    </div>
  </form>
{/if}

<style>
  div.message {
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
