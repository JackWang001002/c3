export const getReadableErrorMsg = (message: string) => {
  const defaultEror = 'Something went wrong.';
  if (!message) {
    return defaultEror;
  }
  let m = message.match(/reason string "(.*?)"/);
  if (m) {
    return m[0].slice(15, -1);
  }
  m = message.match(/(?<info>.*?) (in call exceptions|\(argument=)/);
  if (m) {
    console.log('=====m', m);
    return m.groups?.info;
  }
  if (message.length < 60) {
    return message;
  }
  return defaultEror;
};
