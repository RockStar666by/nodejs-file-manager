import path from 'path';
import { createReadStream, unlink } from 'node:fs';
import { fileExists } from '../utils/fileExists.js';
import { folder } from '../modules/currentFolder.js';

export const deleteFile = async (args) => {
  if (args.length === 2) {
    try {
      if (await fileExists(path.join(folder, args[1]))) {
        return new Promise(function (resolve, reject) {
          let readStream = createReadStream(path.join(folder, args[1]));
          readStream.on('close', () => {
            unlink(path.join(folder, args[1]), (err) => {
              if (err) console.log(err);
            });
            console.log('File deleted!');
            resolve();
          });
          readStream.close();
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
