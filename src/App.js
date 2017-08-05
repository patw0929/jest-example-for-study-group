import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.scss';
import JobList from './components/JobList/JobListContainer';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles['App-header']}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
          <h2>前端找工作</h2>
        </div>
        <JobList />
      </div>
    );
  }
}

export default App;
