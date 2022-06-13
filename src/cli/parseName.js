export const parseUserName = () => {
  const args = process.argv.slice(2);
  const flag = '--username=';
  let username = '';
  try {
    args.forEach((arg) => {
      if (arg.includes(flag)) {
        console.log(`Welcome to the File Manager, ${arg.replace(flag, '')}!`, '\n');
        username = arg.replace(flag, '');
      } else {
        throw new Error('Please, enter your name.');
      }
    });
  } catch (error) {
    console.error('\x1b[31m', error);
  }
  return username;
};
