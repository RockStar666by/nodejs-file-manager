import path from 'path';
import { createGzip, createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { promisify } from 'node:util';
import { fileExists } from '../utils/fileExists.js';
import { folder } from '../modules/currentFolder.js';
import { exists } from '../utils/exists.js';

export const compressFile = async (args) => {
  if (args.length === 3) {
    try {
      if ((await fileExists(path.join(folder, args[1]))) && (await exists(args[2]))) {
        const pipe = promisify(pipeline);
        const gzip = createGzip();
        const source = createReadStream(path.join(folder, args[1]));
        const destination = createWriteStream(path.join(args[2], `${args[1]}.gz`));
        await pipe(source, gzip, destination);
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

export const decompressFile = async (args) => {
  if (args.length === 3) {
    try {
      if ((await fileExists(path.join(folder, args[1]))) && (await exists(args[2]))) {
        const pipe = promisify(pipeline);
        const gzip = createUnzip();
        const source = createReadStream(path.join(folder, args[1]));
        const destination = createWriteStream(path.join(args[2], `${args[1]}`));
        await pipe(source, gzip, destination);
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
