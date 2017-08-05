import React, { Component } from 'react';
import Job from './Job';

export default class JobList extends Component {
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
    }]
  }

  render() {
    return (
      <div>
        {this.jobs.map(job => {
          return <Job key={job.id} title={job.title} company={job.company} />;
        })}
      </div>
    );
  }
}
