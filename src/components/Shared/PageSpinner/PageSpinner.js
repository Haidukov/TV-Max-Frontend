import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import s from './PageSpinner.scss';

const PageSpinner = () => (
  <div className={s.spinner} role='status'>
    <ClipLoader color='black' loading size={100} />
  </div>
);

export default PageSpinner;
