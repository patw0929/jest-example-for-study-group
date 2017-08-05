import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import storeFake from '../../../utils/testUtils';
import Job from '../Job';
import JobContainer from '../JobContainer';

describe('container <Job />', () => {
  let subject;
  let Component;
  let JobComponent;

  beforeEach(() => {
    const store = storeFake({
      youratorJobs: {
        list: {
          isFetching: false,
          didInvalidate: false,
          items: [1, 2],
        },
        byId: {
          1: {
            items: {
              id: 1,
              name: 'Frontend Developer',
              company: {
                brand: 'Faceb00k',
              },
              skill_tags: [],
            },
          },
          2: {
            items: {
              id: 2,
              name: 'Frontend Engineer',
              company: {
                brand: '4irBnb',
              },
              skill_tags: [{
                id: 1,
                name: 'Sketch',
              }, {
                id: 2,
                name: 'React.js',
              }],
            },
          },
        },
      }
    });

    subject = mount(
      <Provider store={store}>
        <JobContainer id="1" />
      </Provider>
    );

    Component = subject.find(JobContainer);
    JobComponent = Component.find(Job);
  });

  it('should be same as snapshot', () => {
    expect(JobComponent.html()).toMatchSnapshot();
  });
});
