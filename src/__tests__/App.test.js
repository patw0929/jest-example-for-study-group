import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('<App />', function () {
  let App;

  beforeEach(() => {
    jest.resetAllMocks();
    App = require('../App').default;

    this.makeSubject = () => {
      return shallow(
        <App />
      );
    };
  });

  describe('render App', () => {
    beforeEach(() => {
      this.subject = this.makeSubject();
    });

    it('should be same as snapshot', () => {
      expect(toJson(this.subject)).toMatchSnapshot();
    });
  })
});
