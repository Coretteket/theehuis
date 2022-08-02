import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

export const getRecaptchaToken = (action: string) =>
  new Promise<string>((resolve, _) => {
    window.grecaptcha.ready(async () => {
      const token = await window.grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action });
      resolve(token);
    });
  });
