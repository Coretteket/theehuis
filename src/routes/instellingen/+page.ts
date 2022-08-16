import type { Fetch } from '$lib/client/trpc';
import { adminProtect } from '$lib/util/protect';
import trpc from '$lib/client/trpc';

export const load = adminProtect(async ({ fetch }) => {
  const adminUsersList = await trpc(fetch as Fetch).query('admin:users');
  return { adminUsersList };
});
