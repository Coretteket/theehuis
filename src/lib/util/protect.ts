import type { PageLoad } from '../../routes/$types';
import { redirect } from '@sveltejs/kit';

export const protect = (load?: PageLoad) => (e: Parameters<PageLoad>[0]) => {
  if (!e.session.user) throw redirect(307, '/inloggen');
  if (load) return load(e);
};

export const adminProtect = (load?: PageLoad) => (e: Parameters<PageLoad>[0]) => {
  if (!e.session.user) throw redirect(307, '/inloggen');
  if (!e.session.user?.admin) return {};
  if (load) return load(e);
};
