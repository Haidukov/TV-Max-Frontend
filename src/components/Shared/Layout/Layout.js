import React from 'react';
import PropTypes from 'prop-types';

import s from './Layout.scss';
import logoUrl from '../../../assets/images/tvm-header-logo.png';

const Layout = ({ children }) => (
  <div>
    <header className={s.header}>
      <img src={logoUrl} className={s.logo} alt='TV Maze Logo' />
    </header>
    <div className={s.content}>
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
