import os from 'os';
import { colors } from '../utils/colors.js';

export const sysUserName = () => {
  const userName = os.userInfo().username;
  console.log(`${colors.blue}Your username is: ${userName}${colors.reset}`);
};
