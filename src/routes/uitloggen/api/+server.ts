import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
export const POST: RequestHandler = () => ({
  status: 200,
  headers: {
    'Set-Cookie': cookie.serialize('session', '', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2592000,
    }),
  },
});
