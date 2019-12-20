import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import waitUntil from 'async-wait-until';
import fetchMock from 'fetch-mock';

import App from './App';

configure({ adapter: new Adapter() });

describe('<App /> Tests', () => {

  afterEach(() => fetchMock.reset());

  test('should show a spinner while waiting', () => {
    fetchMock.mock('/api/v1/albums', ['album0', 'album2'] );

    const wrapper = shallow(<App />);

    expect(wrapper.find("span.spinner").length).toBe(1);
  });

  test('renders albums as text', async (done) => {
    fetchMock.mock('/api/v1/albums', ['album0', 'album2'] );

    const wrapper = shallow(<App />);

    await waitUntil(() => wrapper.state('albums') !== null);

    expect(wrapper.find('p.album0').length).toBe(1);
    expect(wrapper.find('p.album2').length).toBe(1);
    expect(wrapper.find('span.spinner').length).toBe(0);
    done();
  });
});