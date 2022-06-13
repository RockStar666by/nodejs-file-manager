import os from 'os';
import path from 'path';
import { exists } from '../utils/exists.js';

export let folder = os.homedir();

export const currentFolder = async (checkPath = '') => {
  if (await exists(path.join(folder, checkPath))) {
    folder = path.join(folder, checkPath);
    return true;
  } else if (await exists(checkPath)) {
    folder = checkPath;
    return true;
  } else {
    return false;
  }
};
