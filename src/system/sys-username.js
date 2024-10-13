import os from 'os';

export const sysUserName = () => {
  const userName = os.userInfo().username;
  console.log(`Your username is: ${userName}`);
};
