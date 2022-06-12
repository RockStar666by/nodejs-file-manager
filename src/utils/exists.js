import { access, stat } from 'node:fs/promises';

export const exists = async (path) => {
  try {
    const checkFile = await stat(path);
    const checkFolder = await access(path);
    if (checkFolder === undefined && checkFile.isDirectory()) return true;
  } catch {
    return false;
  }
};
