import { stdout } from 'node:process';
import fs from 'node:fs';

import path from 'path';
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
      console.log('\nThe process of reading file is completed.');
    });
  } catch (error) {
    error.code === 'ENOENT'
      ? console.error('File does not exist or cannot be read')
      : console.error(`Error: ${error.message}`);
    console.error('Operation failed');
  }
};
