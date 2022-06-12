import process from 'process';
import { parseUserName } from './cli/parseName.js';
import { folder, currentFolder } from './modules/currentFolder.js';
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import { cd } from './cli/cd.js';
import { list } from './utils/list.js';
import { add, read, rename, copy, move, deleteFile } from './fs/index.js';
import { calculateHash } from './hash/calcHash.js';
import { osInfo } from './os/os.js';

const rl = readline.createInterface({ input, output });
const userName = parseUserName();

const onInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes('.exit')) {
    console.log(`Thank you for using File Manager, ${userName}!`);
  }
  process.exit(0);
};

rl.resume();

const question = () => {
  console.log('You are currently in', folder);
  rl.question('Please, enter command and wait for result:  \n', async (answer) => {
    const args = answer.split(' ');
    switch (args[0]) {
      case 'cd':
        await cd(args);
        break;
      case 'up':
        await currentFolder('../');
        break;
      case 'ls':
        await list(folder);
        break;
      case 'cat':
        await read(args);
        break;
      case 'add':
        await add(args);
        break;
      case 'rn':
        await rename(args);
        break;
      case 'cp':
        await copy(args);
        break;
      case 'mv':
        await move(args);
        break;
      case 'rm':
        await deleteFile(args);
        break;
      case 'hash':
        await calculateHash(args);
        break;
      case 'os':
        osInfo(args);
        break;
      default:
        console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
        break;
    }
    rl.pause();
  });
};

question();

rl.on('pause', () => question());

rl.on('data', onInput);
rl.on('SIGINT', function () {
  console.log(`Thank you for using File Manager, ${userName}!`);
  process.exit(0);
});
