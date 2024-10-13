import { colors } from '../utils/colors.js';

export const arcCPU = () => {
  console.log(`${colors.blue}Your system architecture is: ${process.arch}${colors.reset}`);
};
