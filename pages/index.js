import React from 'react';
import withReduxSaga from '../withReduxSaga';
import MainLayout from '../components/mainLayout';
import Repo from '../components/repo';
import configureStore from '../store';

function Home() {
  return (
    <MainLayout>
      <Repo />
    </MainLayout>
  );
}

export default withReduxSaga(configureStore)(Home, { type: 'GET_REPO' });
