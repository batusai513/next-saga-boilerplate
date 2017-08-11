import React, { Component } from 'react';
import P from 'prop-types';
import Head from '../components/head';

class Repo extends Component {
  componentDidMount() {
    const { repo, getRepo } = this.props;
    if (repo.id === undefined) {
      getRepo();
    }
  }
  render() {
    const { repo } = this.props;
    return (
      <div>
        <Head title="Home" />
        <div className="hero">
          <h1 className="title">
            Welcome to {repo.name}!
          </h1>
          <p className="description">
            To get started, edit <code>pages/index.js</code> and save to reload.
          </p>
          <pre>
            {JSON.stringify(repo, null, 2)}
          </pre>
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    );
  }
}

Repo.propTypes = {
  repo: P.object.isRequired,
  getRepo: P.func.isRequired,
};

export default Repo;
