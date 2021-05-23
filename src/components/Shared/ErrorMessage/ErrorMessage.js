import React from 'react';
import PropTypes from 'prop-types';

import s from './ErrorMessage.scss';

const ErrorMessage = ({ children }) => (
  <div className={s.error} role='alert'>{children}</div>
);

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorMessage;
