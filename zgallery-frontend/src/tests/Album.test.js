import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Album from "../components/Album";

import Thumbnail from "../components/Thumbnail";

configure({ adapter: new Adapter() });

describe('<Album /> Tests', () => {

  const fakeAlbum =
    {
      albumName: 'album0',
      thumbs: ['thumb01.jpg', 'thumb02.jpg'],
    };

  test('should render Thumbnails', () => {
    const wrapper = shallow(<Album album={fakeAlbum}/>);

    expect(wrapper.find(Thumbnail).length).toBe(2);
  });
});