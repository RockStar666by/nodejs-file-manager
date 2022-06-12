import { readdir } from 'node:fs/promises';
import { folder } from '../modules/currentFolder.js';

export const list = async () => {
  try {
    const src = folder;
    const entries = await readdir(src);
    console.log('Folder entries:', entries);
    console.log(`\n`);
  } catch (error) {
    console.error('\x1b[31m', error, `\n`);
  }
};
