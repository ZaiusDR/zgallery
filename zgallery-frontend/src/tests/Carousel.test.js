import fetchMock from 'fetch-mock';
import {configure, shallow} from 'enzyme';
import React from 'react';
import Carousel from '../components/Carousel';
import {configuration} from '../settings';
import Adapter from 'enzyme-adapter-react-16';
import ImageGallery from 'react-image-gallery'

configure({ adapter: new Adapter() });

describe('<Carousel /> Tests', () => {
  test('should show an ImageGallery on carousel open', () => {
    fetchMock.mock(configuration.mediaServer, {});

    const wrapper = shallow(<Carousel carouselPicturesList={['picture01.jpg', 'picture02.jpg']} isCarouselOpen={true} />);

    expect(wrapper.find(ImageGallery).length).toBe(1);
  });
});