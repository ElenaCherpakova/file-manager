export const parseArgs = () => {
  const args = process.argv.slice(2);
  const userNameArg = args.find((arg) => arg.startsWith('--username='));
  let username = 'UserName';
  if (userNameArg) {
    username = userNameArg.split('=')[1];
  }
  console.log(`Welcome to the File Manager, ${username}!`);
  return username;
};
