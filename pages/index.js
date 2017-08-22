import React from 'react';
import withReduxSaga from '../withReduxSaga';
import MainLayout from '../components/mainLayout';
import Repo from '../components/repo';
import configureStore from '../store';

function Home(props) {
  return (
    <MainLayout>
      <Repo {...props} />
    </MainLayout>
  );
}

function mapStateToProps(state) {
  var repoId = state.repo.id,
    repo = state.entities.repos[repoId] || {};
  return {
    repo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRepo() {
      return dispatch({ type: 'GET_REPO' });
    },
  };
}

export default withReduxSaga(configureStore, mapStateToProps, mapDispatchToProps)(Home, { type: 'GET_REPO' });
