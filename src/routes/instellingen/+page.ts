import type { Fetch } from '$lib/client/trpc';
import type { PageLoad } from './$types';
import trpc from '$lib/client/trpc';

export const load: PageLoad = async ({ parent, fetch }) => {
  const { user } = await parent();
  if (!user?.admin) return {};

  const adminUsersList = await trpc(fetch as Fetch).query('admin:users');
  return { adminUsersList };
};
