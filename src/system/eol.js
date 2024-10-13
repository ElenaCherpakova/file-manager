import { EOL } from 'os';
import { colors } from '../utils/colors.js';

export const getEOL = () => {
  const eol = JSON.stringify(EOL);
  console.log(
    `${colors.blue}Default End-Of-Line (EOL) symbol for your system is: ${eol}${colors.reset}`
  );
};
