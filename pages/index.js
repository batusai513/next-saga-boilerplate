import React from 'react';
import withReduxSaga from '../components/withReduxSaga';
import MainLayout from '../components/mainLayout';
import Repo from '../components/repo';

function Home() {
  return (
    <MainLayout>
      <Repo />
    </MainLayout>
  );
}

export default withReduxSaga(Home, { type: 'GET_REPO_SERVER' });
