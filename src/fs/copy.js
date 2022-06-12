import path from 'path';
import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { fileExists } from '../utils/fileExists.js';
import { folder } from '../modules/currentFolder.js';
import { pipeline } from 'stream';
import { exists } from '../utils/exists.js';

export const copy = async (args) => {
  if (args.length === 3) {
    try {
      if ((await fileExists(path.join(folder, args[1]))) && (await exists(args[2]))) {
        return new Promise(function (resolve, reject) {
          let readStream = createReadStream(path.join(folder, args[1]));
          let writeStream = createWriteStream(path.join(args[2], args[1]));
          pipeline(readStream, writeStream, () => {
            console.log('File copied!');
            resolve();
          });
        });
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error);
    }
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
  }
};
