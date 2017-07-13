import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../components/mainLayout';

export default function Movie({ url }) {
  return (
    <MainLayout>
      <h1>
        Movie {url.query.id}
      </h1>
    </MainLayout>
  );
}

Movie.propTypes = {
  url: PropTypes.object.isRequired,
};
