import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

const unprotectedRoutes = ['/inloggen', '/registreren'];

export const load: LayoutLoad = ({ session, url }) => {
  const unprotected = unprotectedRoutes.includes(url.pathname);
  if (!session.user && !unprotected) throw redirect(307, '/inloggen');
  else if (session.user && unprotected) throw redirect(307, '/overzicht');
};
