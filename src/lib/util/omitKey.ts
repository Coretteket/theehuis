export const omitKey = <T extends Record<string, any>, K extends keyof T>(obj: T, key: K) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};
