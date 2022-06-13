import path from 'path';
import crypto from 'crypto';
import { createReadStream } from 'node:fs';
import { fileExists } from '../utils/fileExists.js';
import { folder } from '../modules/currentFolder.js';

export const calculateHash = async (args) => {
  if (args.length === 2) {
    try {
      if (await fileExists(path.join(folder, args[1]))) {
        return new Promise((resolve, reject) => {
          const hash = crypto.createHash('sha256');
          const stream = createReadStream(path.join(folder, args[1]));
          stream.on('error', (err) => console.log(err));
          stream.on('data', (chunk) => hash.update(chunk));
          stream.on('end', () => {
            const hex = hash.digest('hex');
            console.log(hex);
            resolve();
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
