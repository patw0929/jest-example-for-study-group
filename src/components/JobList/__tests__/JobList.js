import React from 'react';
import { mount } from 'enzyme';

describe('<JobList />', function () {
  let JobList;

  beforeEach(() => {
    jest.resetModules();
    JobList = require('../JobList').default;

    this.params = {};

    this.makeSubject = () => {
      const { jobs } = this.params;

      return mount(<JobList jobs={jobs} />);
    };
  });

  describe('when it has no any data', () => {
    beforeEach(() => {
      this.params.jobs = [];

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(this.subject.html()).toMatchSnapshot();
    });
  });

  describe('when it has some jobs data', () => {
    beforeEach(() => {
      this.params.jobs = [{
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

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(this.subject.html()).toMatchSnapshot();
    });

    it('should display `(unknown)`', () => {
      expect(this.subject.find('h1').length).toEqual(3);
    });
  });
});
