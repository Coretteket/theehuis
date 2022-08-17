<script lang="ts">
  import type { QueryOutput } from '$lib/client/trpc';
  import Likes from '$lib/components/Likes.svelte';
  import { fromNow } from '$lib/util/fromNow';
  import { Button, TextField } from 'attractions';
  import { user } from '$lib/client/stores';
  import type { Writable } from 'svelte/store';
  import { createForm } from 'felte';
  import Submit from '$lib/components/Submit.svelte';
  import trpc from '$lib/client/trpc';

  export let bulletin: Writable<NonNullable<QueryOutput<'bulletin:list'>>[number]>;

  $: editable = $bulletin.author.id === $user?.id;

  let editing = false;

  const { form } = createForm({
    onSubmit: async (values) => {
      const response = await trpc().mutation('bulletin:edit', {
        id: $bulletin.id,
        authorId: $bulletin.author.id,
        text: values.text,
      });
      $bulletin = response ?? $bulletin;
      editing = false;
    },
  });
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
        <TextField value={$bulletin.message} multiline name="text" />
        <div class="flex gap-3 mt-4">
          <Button outline on:click={() => (editing = false)}>Terug</Button>
          <Button outline type="submit">Opslaan</Button>
        </div>
      </form>
    {/if}
  </div>
</div>

{#if !editing}
  <div class={editable ? 'flex justify-between mt-4' : '-mb-2'}>
    {#if editable}<Button outline on:click={() => (editing = true)}>Edit</Button>{/if}
    <Likes data={bulletin} />
  </div>
{/if}

<style>
  h3.constrain {
    max-width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  h3:not(.constrain) {
    line-height: 1;
    margin-bottom: 0.5em;
  }

  p.constrain {
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  div.message {
    max-height: 50vh;
    overflow-y: auto;
  }
</style>
