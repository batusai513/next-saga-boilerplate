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

export default withReduxSaga(Home, {
  server: { type: 'GET_REPO_SERVER' },
  client: { type: 'GET_REPO' },
});
