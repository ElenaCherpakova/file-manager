import fs from 'node:fs/promises';
import path from 'path';
export const changeDirectory = async (newPath) => {
    try {
      const currentPath = process.cwd();
      const rootPath =
        process.platform === 'win32' ? path.parse(currentPath).root : '/';
      if (newPath === '..') {
        const parentPath = path.resolve(currentPath, '..');
        if (currentPath === rootPath) {
          console.error('Cannot navigate above the root directory.');
          return;
        }
        process.chdir(parentPath);
      } else {
        const resolvedPath = path.resolve(process.cwd(), newPath);
        const stat = await fs.stat(resolvedPath);
        if (stat.isDirectory()) {
          process.chdir(resolvedPath);
        } else {
          console.error('Operation failed: Directory does not exist.');
        }
      }
    } catch (error) {
      console.error('Operation failed:', error.message);
    }
  };