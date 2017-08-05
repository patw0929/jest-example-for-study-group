import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Job from './JobContainer';
import styles from './JobList.scss';

export default class JobList extends Component {
  static propTypes = {
    jobIds: PropTypes.arrayOf(PropTypes.number),
    loadIfNeeded: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
  };

  componentWillMount() {
    this.props.loadIfNeeded();
  }

  render() {
    const { jobIds, isFetching } = this.props;

    if (isFetching) {
      return <div className={styles.fetching}>Loading...</div>;
    }

    if (jobIds.length === 0) {
      return <div className={styles.empty}>No data</div>;
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
