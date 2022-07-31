import type { RequestHandler } from '@sveltejs/kit';
import trpc from '$lib/client/trpc';
import cookie from 'cookie';

export const POST: RequestHandler = async ({ request }) => {
  const input = await request.json();

  const response = await trpc().mutation('auth:login', input);
  const headers = response.success && response.token;

  return {
    status: 200,
    body: response,
    ...(headers && {
      headers: {
        'Set-Cookie': cookie.serialize('session', response.token, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 2592000,
        }),
      },
    }),
  };
};
