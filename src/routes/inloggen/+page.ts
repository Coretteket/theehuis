import { redirect } from '@sveltejs/kit';
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ session }) => {
  if (session.user) throw redirect(302, '/overzicht');
};
