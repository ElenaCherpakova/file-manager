import os from 'os';
import { colors } from '../utils/colors.js';
export const homeDir = () => {
  const homeDirectory = os.homedir();
  console.log(
    `${colors.blue}Your home directory is: ${homeDirectory}${colors.reset}`
  );
};
