import { EOL } from 'os';

export const getEOL = () => {
  const eol = JSON.stringify(EOL)
  console.log(`Default End-Of-Line (EOL) symbol for your system is: ${eol}`);
};
