import React from 'react';
import { render } from '@testing-library/react';
import PageSpinner from './PageSpinner';

describe('<PageSpinner />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<PageSpinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});
