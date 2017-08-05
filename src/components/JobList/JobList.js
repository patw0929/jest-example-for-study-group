import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Job from './JobContainer';
import styles from './JobList.scss';

export default class JobList extends Component {
  static propTypes = {
    jobIds: PropTypes.arrayOf(PropTypes.number),
    loadIfNeeded: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadIfNeeded();
  }

  render() {
    const { jobIds } = this.props;

    if (jobIds.length === 0) {
      return <div>No data</div>;
    }

    return (
      <div className={styles.wrapper}>
        {jobIds.map(jobId => {
          return <Job key={jobId} id={jobId} />;
        })}
      </div>
    );
  }
}
