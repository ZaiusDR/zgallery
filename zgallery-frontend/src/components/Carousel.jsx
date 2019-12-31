import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import DeviceOrientation, {Orientation} from 'react-screen-orientation';
import {configuration} from '../settings';

import "react-image-gallery/styles/css/image-gallery.css";

import '../css/Carousel.css';

class Carousel extends Component {
  _renderCustomControls = () => {
    return <button type="button" className="close image-gallery-icon" onClick={this.props.onCarouselClickClose}>&times; </button>
  };

  render() {
    const images = this.props.isCarouselOpen ? this.props.carouselPicturesList.map(picture => {
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
        thumbnailClass: 'Carousel-thumbnail'
      }}) : [];

    return (
      <div className={this.props.isCarouselOpen ? "Carousel-container Carousel-visible" : "Carousel-container"}>
        <ImageGallery
          ref={this.props.refImageGallery}
          items={images}
          infinite={true}
          showPlayButton={false}
          showIndex={true}
          showFullscreenButton={false}
          renderCustomControls={this._renderCustomControls}
        />
        {this.props.isFullScreen ?
          <DeviceOrientation lockOrientation={'landscape'}>
            <Orientation orientation='landscape' alwaysRender={true}>
            </Orientation>
          </DeviceOrientation>
          :
          null
        }
      </div>
    )
  }
}

export default Carousel