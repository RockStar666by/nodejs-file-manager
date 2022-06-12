import { access } from 'node:fs/promises';

export const fileExists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};
