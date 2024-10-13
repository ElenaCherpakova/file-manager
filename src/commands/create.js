import fs from 'node:fs/promises';
import path from 'path';
export const createEmptyFile = async (newFileName) => {
  try {
    const fileToCreate = path.resolve(process.cwd(), newFileName);
    await fs.writeFile(fileToCreate, '', { flag: 'wx' });
    console.log(`File '${newFileName}' was created successfully.`);
  } catch (error) {
    error.code === 'EEXIST'
      ? console.error(`Operation failed: File '${newFileName}' already exists.`)
      : console.error(`Operation failed: ${error.message}`);
  }
};
