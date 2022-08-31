const ls = typeof window === 'undefined' ? { getItem: () => '' } : localStorage;

export const logLevels = `${ls.getItem('dbg')}`.split(',');

export const dbg = (...args: unknown[]) => {
  if (logLevels.includes('dbg')) {
    console.log(...args);
  }
};

//colorful dbg
export const cdbg = (...args: any[]) => {
  return (keyword: string, style: string) => {
    const styledKeywords = [`%c${keyword}`, style];
    dbg(...styledKeywords, ...args);
  };
};
