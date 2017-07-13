import React from 'react';
import P from 'prop-types';
import Header from './header';

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

MainLayout.propTypes = {
  children: P.node.isRequired,
};
