/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import s from './DetailsPage.scss';
import defaultImageSrc from '../../../assets/images/no-img-landscape-text.png';

const DetailsPage = ({ name, summary, imageUrl }) => (
  <main data-testid='details'>
    <h1>{name}</h1>
    <div className={s.details}>
      <img src={imageUrl} className={s.logo} alt={name} />
      <div dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
  </main>
);

DetailsPage.propTypes = {
  name: PropTypes.string,
  summary: PropTypes.string,
  imageUrl: PropTypes.string
};

DetailsPage.defaultProps = {
  name: '',
  summary: '',
  imageUrl: defaultImageSrc
};

export default DetailsPage;
