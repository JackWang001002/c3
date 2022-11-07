let id = 0;
/**
 *
 * @returns {number} a global unique id
 */
export const guid = () => {
  return ++id;
};
