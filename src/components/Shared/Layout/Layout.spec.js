import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

describe('<Layout />', () => {
  it('should match snapshot', () => {
    const TestComponent = () => <div>test</div>;

    const { asFragment } = render(
      <Layout>
        <TestComponent />
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
