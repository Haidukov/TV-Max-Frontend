/* eslint-disable import/prefer-default-export */

/*
* Is used to memoize parametrized redux selectors
* @param {function} selector - redux selector to memoize
* @returns {function} memoized selector
*/
export const wrapSelector = selector => {
  const selectorMap = {};
  return (...args) => {
    const key = args.join(',');
    let cachedSelector = selectorMap[key];
    if (!cachedSelector) {
      cachedSelector = selector(...args);
      selectorMap[key] = cachedSelector;
    }
    return cachedSelector;
  };
};
