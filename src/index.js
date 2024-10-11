import { stdin } from 'node:process';

let username = '';
const parseArgs = () => {
  const args = process.argv.slice(2);
  // find userName
  const userNameArg = args.find((arg) => arg.startsWith('--username='));
  if (userNameArg) {
    // grab username
    username = userNameArg.split('=')[1];
    console.log(`Welcome to the File Manager, ${username}!`);
  } else {
    console.log('Username not provided');
  }
};

const handleExit = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};
const listenToExistEvent = () => {
  stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input === '.exit') {
      handleExit();
    }
  });
  //CTRL + C - SIGINT 
  process.on('SIGINT', handleExit);
};

parseArgs();
listenToExistEvent();
