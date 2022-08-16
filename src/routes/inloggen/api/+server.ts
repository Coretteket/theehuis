import type { RequestHandler } from '@sveltejs/kit';
import trpc from '$lib/client/trpc';
import cookie from 'cookie';
import { omitKey } from '$lib/util/omitKey';

export const POST: RequestHandler = async ({ request, setHeaders }) => {
  const input = await request.json();

  const response = await trpc().mutation('auth:login', input);

  if (response.token) {
    setHeaders({
      'Set-Cookie': cookie.serialize('session', response.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 2592000,
      }),
    });
  }

  return new Response(JSON.stringify(omitKey(response, 'token')));
};
