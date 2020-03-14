import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import DeviceOrientation, {Orientation} from 'react-screen-orientation';
import {configuration} from '../settings';

import is from "is_js";

import "react-image-gallery/styles/css/image-gallery.css";

import '../css/Carousel.css';

class Carousel extends Component {
  _renderCustomControls = () => {
    return <button type="button" className="close image-gallery-icon" onClick={this.props.onCarouselClickClose}>&times; </button>
  };

  render() {
    const images = this.props.carouselPicturesList.map(picture => {
      return {
        original: `${configuration.mediaServer}${this.props.carouselAlbumName}/resized/${picture}`,
        thumbnail: `${configuration.mediaServer}${this.props.carouselAlbumName}/thumbs/${picture}`,
        imageSet: [
          {
            srcSet: `${configuration.mediaServer}${this.props.carouselAlbumName}/thumbs/${picture}`,
            media : '(max-width: 700px)',
          },
          {
            srcSet: `${configuration.mediaServer}${this.props.carouselAlbumName}/resized/${picture}`,
            media : '(min-width: 700px)',
          }
        ],
        thumbnailClass: 'Carousel-thumbnail',
        originalClass: 'Carousel-image'
      }});

    return (
      <div className="Carousel-container">
        { is.safari() ?
          <DeviceOrientation className="device-orientation" lockOrientation={'landscape'}>
            <Orientation orientation='portrait' alwaysRender={false}>
              <div className="Rotate-Message">
                <img src={'rotate_device.gif'} alt={'Please, rotate your device'}/>
                <p>Please, rotate your device.</p>
              </div>
            </Orientation>
            <Orientation orientation='landscape' alwaysRender={false}>
              <ImageGallery
                ref={this.props.refImageGallery}
                items={images}
                infinite={true}
                showPlayButton={false}
                showIndex={true}
                showFullscreenButton={false}
                renderCustomControls={this._renderCustomControls}
              />
            </Orientation>
          </DeviceOrientation>
          :
          <DeviceOrientation lockOrientation={'landscape'}>
            <Orientation orientation='landscape' alwaysRender={true}>
              <ImageGallery
                ref={this.props.refImageGallery}
                items={images}
                infinite={true}
                showPlayButton={false}
                showIndex={true}
                showFullscreenButton={false}
                renderCustomControls={this._renderCustomControls}
              />
            </Orientation>
          </DeviceOrientation>
        }
      </div>
    )
  }
}

export default Carousel