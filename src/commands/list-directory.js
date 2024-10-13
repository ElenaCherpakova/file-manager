import fs from 'node:fs/promises';

export const listDirectory = async () => {
    try {
      const currentDir = process.cwd();
      const files = await fs.readdir(currentDir, { withFileTypes: true });
      if (!files.length) return;
      const tableData = files.map((file) => {
        return {
          Name: file.name,
          Type: file.isDirectory() ? 'directory' : 'file',
        };
      });
      tableData.sort((a, b) => {
        if (a.Type === b.Type) {
          return a.Name.localeCompare(b.Name);
        } else {
          return a.Type === 'directory' ? -1 : 1;
        }
      });
      console.table(tableData);
    } catch (error) {
      console.error('Operation failed:', error.message);
    }
  };