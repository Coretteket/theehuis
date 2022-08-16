throw new Error("@migration task: Update load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");

import type { Fetch, QueryOutput } from '$lib/client/trpc';
import { protect } from '$lib/util/protect';
import trpc from '$lib/client/trpc';

export const load = protect(async ({ fetch }) => {
  const listItems = await trpc(fetch as Fetch).query('grocery:list');
  return { props: { listItems } };
});
