import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { finished } from 'stream/promises';

export const decompress = async (pathToFile, pathToDes) => {
  const srcFile = path.resolve(process.cwd(), pathToFile);
  const destDir = path.resolve(process.cwd(), pathToDes);
  const destFile = path
    .resolve(destDir, path.basename(srcFile).replace('.br', ''))
    .trim();
  try {
    await fs.promises.access(srcFile);
    const destStats = await fs.promises.stat(destDir).catch((error) => {
      if (error.code === 'ENOENT') {
        console.error('Destination folder does not exist');
        throw error;
      }
      throw error;
    });

    if (!destStats.isDirectory()) {
      console.error('Destination path is not a directory');
      return;
    }
    const readStream = fs.createReadStream(srcFile);
    const writeStream = fs.createWriteStream(destFile);
    const brotli = zlib.createBrotliDecompress();
    readStream.pipe(brotli).pipe(writeStream);

    readStream.on('error', (error) => {
      console.error(`Error reading file: ${error.message}`);
    });

    writeStream.on('error', (error) => {
      console.error(`Error writing file: ${error.message}`);
    });

    await finished(writeStream);
    await finished(readStream);
    console.log('Done decompressing');
  } catch (error) {
    error.code === 'ENOENT'
      ? console.error('FS operation failed: Source file does not exist')
      : console.error(`Error: ${error.message}`);
  }
};
