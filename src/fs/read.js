import path from 'path';
import { createReadStream } from 'node:fs';
import { fileExists } from '../utils/fileExists.js';
import { folder } from '../modules/currentFolder.js';

export let file = '';

export const read = async (args) => {
  if (args.length === 2) {
    if (await fileExists(path.join(folder, args[1]))) {
      file = path.join(folder, args[1]);
      return new Promise(function (resolve, reject) {
        const stream = createReadStream(file, { encoding: 'utf8' });
        stream.on('error', (err) => {
          console.log('Operation failed', err);
          resolve();
        });
        stream.on('data', (chunk) => process.stdout.write(chunk));
        stream.on('end', () => {
          console.log('\n');
          resolve();
        });
      });
    } else if (await fileExists(args[1])) {
      file = path.join(args[1]);
      return new Promise(function (resolve, reject) {
        const stream = createReadStream(file, { encoding: 'utf8' });
        stream.on('error', (err) => {
          console.log('Operation failed', err);
          resolve();
        });
        stream.on('data', (chunk) => process.stdout.write(chunk));
        stream.on('end', () => {
          console.log('\n');
          resolve();
        });
      });
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
    }
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
  }
};
