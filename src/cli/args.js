import { colors } from '../utils/colors.js';

export const parseArgs = () => {
  const args = process.argv.slice(2);
  const userNameArg = args.find((arg) => arg.startsWith('--username='));
  let username = 'UserName';
  if (userNameArg) {
    username = userNameArg.split('=')[1];
  }
  console.log(`${colors.green}Welcome to the File Manager, ${username}!${colors.reset}`);
  return username;
};
