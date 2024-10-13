import path from 'path';
import fs from 'node:fs/promises';
import { colors } from '../utils/colors.js';

export const remove = async (pathToFile) => {
  const fileToRemove = path.resolve(process.cwd(), pathToFile).trim();
  try {
    await fs.access(fileToRemove);
    await fs.unlink(fileToRemove);
    console.log(
      `${colors.green}File '${path.basename(fileToRemove)}' was removed successfully.${colors.reset}`
    );
  } catch (error) {
    error.code === 'ENOENT'
      ? console.error('File does not exist or cannot be read')
      : console.error(`Error: ${error.message}`);
    console.error('Operation failed');
  }
};
