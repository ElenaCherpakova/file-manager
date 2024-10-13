import fs from 'node:fs/promises';
import path from 'path';
import { colors } from '../utils/colors.js';
export const createEmptyFile = async (newFileName) => {
  try {
    const fileToCreate = path.resolve(process.cwd(), newFileName);
    await fs.writeFile(fileToCreate, '', { flag: 'wx' });
    console.log(
      `${colors.green}File '${newFileName}' was created successfully.${colors.reset}`
    );
  } catch (error) {
    error.code === 'EEXIST'
      ? console.error(`Operation failed: File '${newFileName}' already exists.`)
      : console.error(`Operation failed: ${error.message}`);
  }
};
