import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  it('should match snapshot', () => {
    const TestComponent = () => <div>test</div>;
    const { asFragment } = render(
      <ErrorMessage>
        <TestComponent />
      </ErrorMessage>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
