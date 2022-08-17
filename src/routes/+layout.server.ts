import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const unprotectedRoutes = ['/inloggen', '/registreren'];

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const unprotected = unprotectedRoutes.includes(url.pathname);
  if (!locals.user && !unprotected) throw redirect(307, '/inloggen');
  else if (locals.user && unprotected) throw redirect(307, '/overzicht');
  return { user: locals.user };
};
