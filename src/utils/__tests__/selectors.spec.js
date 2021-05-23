import { wrapSelector } from '../selectors';

describe('wrapSelector', () => {
  it('should call selector with correct params', () => {
    const innerSelector = jest.fn();
    const selector = jest.fn(() => innerSelector);
    const selectorFactory = wrapSelector(selector)(2);
    selectorFactory();
    expect(selector).toHaveBeenCalledWith(2);
  });

  it('should memoize passed selector', () => {
    const selector = jest.fn(() => () => { });

    const selectorFactory = wrapSelector(selector);

    const wrappedSelector1 = selectorFactory(2);
    const wrappedSelector2 = selectorFactory(2);
    const wrappedSelector3 = selectorFactory(3);

    expect(wrappedSelector1).toBe(wrappedSelector2);
    expect(wrappedSelector1).not.toBe(wrappedSelector3);
  });
});
