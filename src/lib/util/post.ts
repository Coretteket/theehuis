export const post = async (url: string, values?: {}) =>
  await fetch(url, {
    ...(values && {
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    }),
    method: 'POST',
  });
