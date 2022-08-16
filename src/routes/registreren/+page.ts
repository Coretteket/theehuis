import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ session }) => {
  if (session.user) throw redirect(307, '/overzicht');
};
