import type { RequestHandler } from '@sveltejs/kit';
import trpc from '$lib/client/trpc';
import cookie from 'cookie';
import { omitKey } from '$lib/util/omitKey';

export const POST: RequestHandler = async ({ request }) => {
  const input = await request.json();

  const response = await trpc().mutation('auth:login', input);

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  return {
    status: 200,
    body: omitKey(response, 'token'),
    ...(response.token && {
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
