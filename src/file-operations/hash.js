import crypto from 'crypto';
import fs from 'node:fs';
import path from 'path';
import { colors } from '../utils/colors.js';

export const hashFile = async (pathToFile) => {
  const srcFile = path.resolve(process.cwd(), pathToFile);
  const hash = crypto.createHash('sha256');
  const fileStream = fs.createReadStream(srcFile);
  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });
  fileStream.on('end', () => {
    console.log(`${colors.blue}Hash: ${hash.digest('hex')}${colors.reset}`);
  });
};
