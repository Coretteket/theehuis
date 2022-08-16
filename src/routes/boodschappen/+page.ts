import type { Fetch } from '$lib/client/trpc';
import { protect } from '$lib/util/protect';
import trpc from '$lib/client/trpc';

export const load = protect(async ({ fetch }) => {
  const listItems = await trpc(fetch as Fetch).query('grocery:list');
  return { listItems };
});
