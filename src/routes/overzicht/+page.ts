import type { Fetch } from '$lib/client/trpc';
import type { PageLoad } from './$types';
import trpc from '$lib/client/trpc';

export const load: PageLoad = async ({ fetch }) => {
  const bulletins = await trpc(fetch as Fetch).query('bulletin:list');
  const housemates = await trpc(fetch as Fetch).query('user:housemates');

  return { bulletins, housemates };
};
