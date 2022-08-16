throw new Error("@migration task: Update load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");

import type { Fetch, QueryOutput } from '$lib/client/trpc';
import { protect } from '$lib/util/protect';
import trpc from '$lib/client/trpc';

export const load = protect(async ({ fetch }) => {
  const bulletins = await trpc(fetch as Fetch).query('bulletin:list');
  const housemates = await trpc(fetch as Fetch).query('user:housemates');

  return { props: { bulletins, housemates } };
});
