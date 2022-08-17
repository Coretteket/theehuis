import type { Fetch } from '$lib/client/trpc';
import type { PageLoad } from './$types';
import trpc from '$lib/client/trpc';

export const load: PageLoad = async ({ fetch }) => {
  const listItems = await trpc(fetch as Fetch).query('grocery:list');
  return { listItems };
};
