import { stdout } from 'node:process';
import fs from 'node:fs';
import path from 'path';
import { colors } from '../utils/colors.js';

export const read = async (content) => {
  try {
    const fileToRead = path.resolve(process.cwd(), content);
    await fs.promises.access(fileToRead, fs.constants.F_OK | fs.constants.R_OK);
    const fileStream = fs.createReadStream(fileToRead, {
      encoding: 'utf8',
    });
    fileStream.pipe(stdout);
    fileStream.on('error', (error) => {
      if (error.code === 'ENOENT') {
        console.error('File does not exist or cannot be read');
        return;
      } else {
        console.error('Operation failed:', error.message);
      }
    });
    fileStream.on('end', () => {
      console.log(
        `${colors.green}\nThe process of reading the file is completed.${colors.reset}`
      );
    });
  } catch (error) {
    error.code === 'ENOENT'
      ? console.error('File does not exist or cannot be read')
      : console.error(`Error: ${error.message}`);
    console.error('Operation failed');
  }
};
