import path from 'path';
export const goUp = async () => {
  try {
    const currentPath = process.cwd();
    const parentPath = path.resolve(currentPath, '..');
    const rootPath =
      process.platform === 'win32' ? path.parse(currentPath).root : '/';
    if (currentPath !== rootPath) {
      process.chdir(parentPath);
    } else {
      console.error('Cannot navigate above the root directory.');
    }
  } catch (error) {
    console.error('Operation failed:', error.message);
  }
};
