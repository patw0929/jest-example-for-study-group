import React from 'react';
import PropTypes from 'prop-types';

const Job = ({ title, company }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{company}</h2>
    </div>
  );
}

Job.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string,
};

Job.defaultProps = {
  company: '(unknown)',
};

Job.displayName = 'Job';

export default Job;
