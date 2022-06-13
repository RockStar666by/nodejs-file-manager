import path from 'path';
import { createWriteStream } from 'node:fs';
import { folder } from '../modules/currentFolder.js';

export const add = async (args) => {
  if (args.length === 2) {
    return new Promise(function (resolve, reject) {
      const stream = createWriteStream(path.join(folder, args[1]));
      stream.write('');
      stream.end();
      stream.on('close', () => {
        console.log('File was created!');
        resolve();
      });
      stream.on('error', (error) => console.log(error));
    });
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
  }
};
