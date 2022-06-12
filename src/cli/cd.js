import { currentFolder } from '../modules/currentFolder.js';

export const cd = async (args) => {
  if (args.length === 2) {
    try {
      if (args[1] === '..') {
        await currentFolder('../');
      } else if (await currentFolder(args[1])) {
        await currentFolder(args[1]);
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', error);
    }
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
  }
};
