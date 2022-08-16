import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '@sveltejs/kit';

export const load: PageLoad = ({ session }) => {
  if (session.user) throw redirect(302, '/overzicht');
  throw redirect(302, '/inloggen');
};
