import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.scss';
import JobList from './components/JobList/JobList';

class App extends Component {
  constructor(props) {
    super(props);

    this.jobs = [{
      id: 3,
      title: 'Frontend Developer',
      company: 'Faceb00k',
    }, {
      id: 2,
      title: 'Backend Developer',
      company: 'Goog1e',
    }, {
      id: 1,
      title: 'UI Designer',
      company: '4irBnB',
    }];
  }

  render() {
    return (
      <div className={styles.App}>
        <div className={styles['App-header']}>
          <img src={logo} className={styles['App-logo']} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <JobList jobs={this.jobs} />
      </div>
    );
  }
}

export default App;
