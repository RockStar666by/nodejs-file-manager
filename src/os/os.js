import os from 'os';

export const osInfo = async (args) => {
  if (args.length === 2) {
    try {
      switch (args[1]) {
        case '--EOL':
          console.log('\x1b[32m%s\x1b[0m', os.EOL);
          break;
        case '--cpus':
          console.log('\x1b[32m%s\x1b[0m', os.cpus());
          break;
        case '--homedir':
          console.log('\x1b[32m%s\x1b[0m', os.homedir());
          break;
        case '--username':
          console.log('\x1b[32m%s\x1b[0m', os.userInfo().username);
          break;
        case '--architecture':
          console.log('\x1b[32m%s\x1b[0m', os.arch());
          break;
        default:
          console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
          break;
      }
    } catch (error) {
      console.log('\x1b[31m%s\x1b[0m', error);
    }
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Invalid input');
  }
};
