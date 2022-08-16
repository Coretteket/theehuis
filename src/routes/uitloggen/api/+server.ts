import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const POST: RequestHandler = ({ setHeaders }) => {
  setHeaders({
    'Set-Cookie': cookie.serialize('session', '', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2592000,
    }),
  });

  return new Response();
};
