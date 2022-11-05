export const splitMultilineText = (text: string) => {
  return text
    .trim()
    .split('\n')
    .map(e => e.trim())
    .filter(Boolean);
};
