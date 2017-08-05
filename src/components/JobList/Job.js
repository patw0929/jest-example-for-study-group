import React from 'react';
import PropTypes from 'prop-types';
import styles from './Job.scss';

const Job = ({ job }) => {
  if (!job) {
    return null;
  }

  return (
    <div className={styles.job}>
      <h1>{job.name}</h1>
      <h2>{job.company && job.company.brand}</h2>

      <div className={styles['skill-tags']}>
        {job.skill_tags.length > 0 && job.skill_tags.map(tag => {
          return (
            <span key={tag.id} className={styles['skill-tag']}>
              {tag.name}
            </span>
          )
        })}
      </div>
    </div>
  );
}

Job.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      brand: PropTypes.string.isRequired,
    }),
    skill_tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

Job.displayName = 'Job';

export default Job;
