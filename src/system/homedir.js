import os from 'os';
export const homeDir = () => {
  const homeDirectory = os.homedir();
  console.log(`Your home directory is: ${homeDirectory}`);
};
