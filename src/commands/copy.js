import fs from 'node:fs';
import path from 'path';

export const copy = async (pathToFile, pathToNewDir) => {
  const srcFile = path.resolve(process.cwd(), pathToFile).trim();
  const destDir = path.resolve(process.cwd(), pathToNewDir).trim();
  const destFile = path.resolve(destDir, path.basename(srcFile)).trim();

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

    readStream.pipe(writeStream);

    readStream.on('error', (error) => {
      console.error('Error reading the file:', error.message);
    });

    writeStream.on('error', (error) => {
      console.error('Error writing to the file:', error.message);
    });

    writeStream.on('finish', () => {
      console.log(
        `File '${path.basename(
          srcFile
        )}' was copied to '${destDir}' successfully.`
      );
    });
  } catch (error) {
    error.code === 'ENOENT'
      ? console.error('FS operation failed: Source file does not exist')
      : console.error(`Error: ${error.message}`);
    console.error('Operation failed');
  }
};
