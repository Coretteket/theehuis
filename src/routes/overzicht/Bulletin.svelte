<script lang="ts">
  import type { QueryOutput } from '$lib/client/trpc';

  import { Card, Dialog, Modal } from 'attractions';
  import { writable } from 'svelte/store';
  import BulletinContent from './BulletinContent.svelte';
  import BulletinModal from './BulletinModal.svelte';

  export let bulletin: NonNullable<QueryOutput<'bulletin:list'>>[number];

  const bulletinStore = writable(bulletin);

  let modalOpen = false;
</script>

<Card class="min-w-[18rem] mb-8 flex flex-col justify-between">
  <BulletinContent bulletin={bulletinStore} launch={() => (modalOpen = true)} />
</Card>

<Modal bind:open={modalOpen} let:closeCallback>
  <Dialog title={$bulletinStore.title} {closeCallback} constrainWidth>
    <BulletinModal bulletin={bulletinStore} />
  </Dialog>
</Modal>
