import React from 'react';
import { render } from '@testing-library/react';
import DetailsPage from './DetailsPage';

describe('<DetailsPage />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <DetailsPage
        summary='<div>summary</div>'
        name='test name'
        imageUrl='http://test.com/image.jpg'
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
