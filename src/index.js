import { stdin, stdout } from 'node:process';
import os from 'os';
import { parseArgs } from './cli/args.js';
import { read } from './commands/read.js';
import { createEmptyFile } from './commands/create.js';
import { renameFile } from './commands/rename.js';
import { copy } from './commands/copy.js';
import { move } from './commands/move.js';
import { remove } from './commands/remove.js';
import { goUp } from './commands/up.js';
import { changeDirectory } from './commands/change-directory.js';
import { listDirectory } from './commands/list-directory.js';

import { getEOL } from './system/eol.js';
import { getCPUs } from './system/cpus.js';
import { homeDir } from './system/homedir.js';
import { sysUserName } from './system/sys-username.js';
import { arcCPU } from './system/architecture.js';

import { hashFile } from './file-operations/hash.js';
import { compress } from './file-operations/compress.js';
import { decompress } from './file-operations/decompress.js';
import { colors } from './utils/colors.js';

process.chdir(os.userInfo().homedir);

let username = parseArgs();

const currentPath = () => {
  console.log(`${colors.reset}You are currently in ${process.cwd()}`);
};

const handleExit = () => {
  console.log(
    `${colors.green}Thank you for using File Manager, ${username}, goodbye!${colors.reset}`
  );
  process.exit();
};

const handleCommand = async (command, args) => {
  switch (command) {
    case 'up':
      await goUp();
      break;
    case 'cd':
      if (args.length === 1) {
        await changeDirectory(args[0]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: cd requires a single argument.${colors.reset}`
        );
      }
      break;
    case 'ls':
      await listDirectory();
      break;
    case 'cat':
      if (args.length === 1) {
        await read(args[0]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: cat requires a single argument.${colors.reset}`
        );
      }
      break;
    case 'add':
      if (args.length === 1) {
        await createEmptyFile(args[0]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: add requires a single argument.${colors.reset}`
        );
      }
      break;
    case 'rn':
      if (args.length === 2) {
        await renameFile(args[0], args[1]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: rename requires two arguments. e.g rn oldFileName newFileName${colors.reset}`
        );
      }
      break;
    case 'cp':
      if (args.length === 2) {
        await copy(args[0], args[1]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: copy requires two arguments. e.g cp sourceFolder destinationFolder${colors.reset}`
        );
      }
      break;
    case 'mv':
      if (args.length === 2) {
        await move(args[0], args[1]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: move requires two arguments. e.g mv sourceFolder destinationFolder${colors.reset}`
        );
      }
      break;
    case 'rm':
      if (args.length === 1) {
        await remove(args[0]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: remove requires one argument. e.g rm fileName${colors.reset}`
        );
      }
      break;
    case 'hash':
      if (args.length === 1) {
        await hashFile(args[0]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: hash requires 1 argument. e.g hash sourceFile${colors.reset}`
        );
      }
      break;
    case 'compress':
      if (args.length === 2) {
        await compress(args[0], args[1]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: compress requires two arguments. e.g compress sourceFolder destinationFolder${colors.reset}`
        );
      }
      break;
    case 'decompress':
      if (args.length === 2) {
        await decompress(args[0], args[1]);
      } else {
        console.error(
          `${colors.yellow}Invalid input: decompress requires two arguments. e.g decompress sourceFolder destinationFolder${colors.reset}`
        );
      }
      break;
    case 'os':
      if (args.length === 1) {
        switch (args[0]) {
          case '--EOL':
            getEOL();
            break;
          case '--cpus':
            getCPUs();
            break;
          case '--homedir':
            homeDir();
            break;
          case '--username':
            sysUserName();
            break;
          case '--architecture':
            arcCPU();
            break;
          default:
            console.error(
              `${colors.yellow}Invalid input: os requires a single argument.${colors.reset}`
            );
        }
      } else {
        console.error(
          `${colors.yellow}Invalid input: os requires a single argument.${colors.reset}`
        );
      }
      break;
    case '.exit':
      handleExit();
      break;
    default:
      console.error(`${colors.yellow}Invalid command${colors.reset}`);
  }
  currentPath();
};

const listenToInput = () => {
  stdin.on('data', async (data) => {
    const input = data.toString().trim();
    const [command, ...args] = input.split(' ');
    if (command) {
      await handleCommand(command, args);
    }
    stdout.write('> ');
  });
  process.on('SIGINT', handleExit);
};
currentPath();
stdout.write('> ');
listenToInput();
