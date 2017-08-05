/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback,import/no-dynamic-require */

jest.mock('../JobList');

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import storeFake from '../../../utils/testUtils';
import JobList from '../JobList';
import JobListContainer from '../JobListContainer';

describe('container <JobList />', () => {
  let subject;
  let Component;
  let JobListComponent;

  beforeEach(() => {
    const store = storeFake({});

    subject = mount(
      <Provider store={store}>
        <JobListContainer />
      </Provider>
    );

    Component = subject.find(JobListContainer);
    JobListComponent = Component.find(JobList);
  });

  it('should be called exactly once', () => {
    expect(JobList.mock.calls.length).toBe(1);
  });

  it('should render', () => {
    expect(Component.length).toBeTruthy();
    expect(JobListComponent.length).toBeTruthy();
  });

  it('should execute the dispatch function after calling the loadIfNeeded function', () => {
    JobListComponent.props().loadIfNeeded();
    expect(subject.instance().store.dispatch).toBeCalled();
  });
});
