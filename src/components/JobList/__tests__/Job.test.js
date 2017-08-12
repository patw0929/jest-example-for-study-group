import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import styles from '../Job.scss';

describe('<Job />', function () {
  let Job;

  beforeEach(() => {
    jest.resetModules();
    Job = require('../Job').default;

    this.params = {};

    this.makeSubject = () => {
      const { job } = this.params;

      return shallow(<Job job={job} />);
    };
  });

  describe('when it has complete data', () => {
    beforeEach(() => {
      this.params.job = {
        name: 'Frontend Developer',
        company: {
          brand: 'Partner Studio',
        },
        skill_tags: [{
          id: 1,
          name: 'JavaScript',
        }, {
          id: 2,
          name: 'CSS',
        }],
      };

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(toJson(this.subject)).toMatchSnapshot();
    });

    it('should display `Partner Studio`', () => {
      expect(this.subject.find('h2').text()).toEqual('Partner Studio');
    });
  });

  describe('when it lack of tag data', () => {
    beforeEach(() => {
      this.params.job = {
        name: 'Frontend Developer',
        company: {
          brand: 'Partner Studio',
        },
        skill_tags: [],
      };

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(toJson(this.subject)).toMatchSnapshot();
    });

    it('should not display any skill tag', () => {
      expect(this.subject.find(`.${styles['skill-tag']}`).length).toEqual(0);
    });
  });
});
