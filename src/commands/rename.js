import fs from 'node:fs/promises';
import path from 'node:path';
import { colors } from '../utils/colors.js';

export const renameFile = async (oldFileName, newFileName) => {
  const oldNameFilePath = path.resolve(process.cwd(), oldFileName);
  const newNameFilePath = path.resolve(process.cwd(), newFileName);
  try {
    await fs.access(oldNameFilePath);
    try {
      await fs.access(newNameFilePath);
      console.error(`File ${newNameFilePath} already exists`);
      return;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    await fs.rename(oldFileName, newFileName);
    const oldName = path.basename(oldFileName);
    const newName = path.basename(newFileName);
    console.log(
      `${colors.green}File ${oldName} was renamed to ${newName}${colors.reset}`
    );
  } catch (error) {
    error.code === 'ENOENT'
      ? console.error('FS operation failed: Source file does not exist')
      : console.error('Error:', error.message);
  }
};
