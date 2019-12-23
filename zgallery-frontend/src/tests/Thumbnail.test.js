import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';

import Thumbnail from "../components/Thumbnail";

configure({ adapter: new Adapter() });

describe('<Thumbnails /> Tests', () => {
  test('should render a spinner while loading image', () => {
    const wrapper = shallow(<Thumbnail />);

    expect(wrapper.find('img.Thumbnail-image.hidden').length).toBe(1);
    expect(wrapper.find('img.Thumbnail-image.visible').length).toBe(0);
    expect(wrapper.find('span.loader-horizontal.hidden').length).toBe(0);
    expect(wrapper.find('span.loader-horizontal.visible').length).toBe(1);
  });

  test('should render the image when loaded', async (done) => {
    const wrapper = mount(<Thumbnail />);

    wrapper.find('img.Thumbnail-image').simulate('load');

    expect(wrapper.find('img.Thumbnail-image.visible').length).toBe(1);
    expect(wrapper.find('img.Thumbnail-image.hidden').length).toBe(0);
    expect(wrapper.find('span.loader-horizontal.hidden').length).toBe(1);
    expect(wrapper.find('span.loader-horizontal.visible').length).toBe(0);

    wrapper.unmount();
    done();
  });

  test('should hide the image when active thumbnail is different', async (done) => {
    const wrapper = mount(<Thumbnail thumbnail={'fake_thumbnail'} activeThumb={'another_fake_thumbnail'}/>);

    wrapper.find('img.Thumbnail-image').simulate('load');

    expect(wrapper.find('img.Thumbnail-image.visible').length).toBe(0);
    expect(wrapper.find('img.Thumbnail-image.hidden').length).toBe(1);
    expect(wrapper.find('span.loader-horizontal.hidden').length).toBe(1);
    expect(wrapper.find('span.loader-horizontal.visible').length).toBe(0);

    wrapper.unmount();
    done();
  });

  test('should show the image when active thumbnail is same', async (done) => {
    const wrapper = mount(<Thumbnail thumbnail={'fake_thumbnail'} activeThumb={'fake_thumbnail'}/>);

    wrapper.find('img.Thumbnail-image').simulate('load');

    expect(wrapper.find('img.Thumbnail-image.visible').length).toBe(1);
    expect(wrapper.find('img.Thumbnail-image.hidden').length).toBe(0);
    expect(wrapper.find('span.loader-horizontal.hidden').length).toBe(1);
    expect(wrapper.find('span.loader-horizontal.visible').length).toBe(0);

    wrapper.unmount();
    done();
  })
});