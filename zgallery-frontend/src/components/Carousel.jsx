import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import {configuration} from '../settings';
import Dialog from '@material-ui/core/Dialog';


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
      <Dialog open fullScreen={true}>
        <ImageGallery
          ref={this.props.refImageGallery}
          items={images}
          infinite={true}
          showPlayButton={false}
          showIndex={true}
          showFullscreenButton={false}
          renderCustomControls={this._renderCustomControls}
        />
      </Dialog>
    )
  }
}

export default Carousel