import React from 'react';
import { shallow } from 'enzyme';

describe('<Job />', function () {
  let Job;

  beforeEach(() => {
    jest.resetModules();
    Job = require('../Job').default;

    this.params = {};

    this.makeSubject = () => {
      const { title, company } = this.params;

      return shallow(<Job title={title} company={company} />);
    };
  });

  describe('when it has complete data', () => {
    beforeEach(() => {
      this.params.title = 'Frontend Developer';
      this.params.company = 'Partner Studio';

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(this.subject.html()).toMatchSnapshot();
    });

    it('should display `Partner Studio`', () => {
      expect(this.subject.find('h2').text()).toEqual('Partner Studio');
    });
  });

  describe('when it lack of company data', () => {
    beforeEach(() => {
      this.params.title = 'Frontend Developer';

      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(this.subject.html()).toMatchSnapshot();
    });

    it('should display `(unknown)`', () => {
      expect(this.subject.find('h2').text()).toEqual('(unknown)');
    });
  });
});
