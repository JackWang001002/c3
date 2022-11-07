let id = 0;
/**
 *
 * @returns {string} a global unique id
 */
export const guid = () => {
  return `guid-${++id}`;
};
