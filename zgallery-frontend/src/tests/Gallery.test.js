import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import waitUntil from 'async-wait-until';
import fetchMock from 'fetch-mock';

import Gallery from '../components/Gallery';
import Album from "../components/Album";

import {configuration} from '../settings';

configure({ adapter: new Adapter() });

const backendUrl = `http://${configuration.serverUrl}/api/v1/albums`;

describe('<Gallery /> Tests', () => {

  const expectedResponse = [
    {
      albumName: 'album0',
      thumbs: ['thumb01.jpg', 'thumb02.jpg'],
    },
    {
      albumName: 'album2',
      thumbs: ['thumb03.jpg', 'thumb04.jpg'],
    },
  ];

  afterEach(() => fetchMock.reset());

  test('should show a spinner while waiting', () => {
    fetchMock.mock(backendUrl, expectedResponse );

    const wrapper = shallow(<Gallery />);

    expect(wrapper.find('div.loader').length).toBe(1);
  });

  test('renders Albums when API response received', async (done) => {
    fetchMock.mock(backendUrl, expectedResponse );

    const wrapper = shallow(<Gallery />);

    await waitUntil(() => wrapper.state('albums') !== null);

    expect(wrapper.find(Album).length).toBe(2);
    expect(wrapper.find('div.loader').length).toBe(0);
    done();
  });
});