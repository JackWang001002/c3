import { BrowserContext } from 'playwright';

export const printPageUrls = (ctx: BrowserContext) => {
  console.log('\n---pages begin----');
  ctx.pages().forEach(e => console.log('pageurl', e.url()));
  ctx.backgroundPages().forEach(e => console.log('background page url', e.url()));
  console.log('---pages end----\n');
};
