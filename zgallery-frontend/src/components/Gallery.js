import React, {Component} from 'react';
import Album from './Album';
import {configuration} from '../settings';
import ImageGallery from 'react-image-gallery';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';

import "react-image-gallery/styles/css/image-gallery.css";

import '../css/Gallery.css';
import '../css/spinners.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      carouselOpen: false,
      isFullScreen: false,
      albums: [],
    };
    this.timerId = null;
    this.imageGallery = React.createRef();
  };

  componentDidMount() {
    this.fetchAlbums();
    this.randomizeThumbs();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  fetchAlbums() {
    fetch(`http://${configuration.serverUrl}/api/v1/albums`)
      .then(results => {
        return results.json();
      }).then(data => {
        this.setInitialState(data);
      }).catch(error => {
       console.log(error);
    });
  }

  setInitialState(data) {
    let initialState = {isLoading: false};
    initialState.albums = data.map(album => {
      return {
        albumName: album.albumName,
        thumbs: album.thumbs.slice(0, configuration.maxThumbnails),
        activeThumb: this.getRandomThumbnail(album),
      }
    });
    this.setState(initialState);
  }

  randomizeThumbs() {
    this.timerId = setInterval(() => {
      if (this.state.carouselOpen) {
        return
      }
      const updatedAlbums = this.state.albums.map(album => {
        return {
          albumName: album.albumName,
          thumbs: album.thumbs,
          activeThumb: this.getRandomThumbnail(album),
        }
      });
      this.setState({albums: updatedAlbums});
      }
      ,10000)
  }

  getRandomThumbnail(album) {
    const maxRandomNumber = album.thumbs.length < configuration.maxThumbnails ?
      album.thumbs.length : configuration.maxThumbnails;

    return album.thumbs[Math.floor(Math.random() * maxRandomNumber)]
  }

  handleOnClickAlbum = albumName => {
    fetch(`http://${configuration.serverUrl}/api/v1/albums/${albumName}`)
      .then(response => response.json())
      .then(data => this.setState(
        {carouselAlbumName: albumName, carouselOpen: true, carouselPicturesList: data})
      )
      .catch(error => console.log(error));
    this.imageGallery.current.fullScreen();
    this.setState({isFullScreen: true})
  };

  handleOnClickClose = () => {
    this.setState({carouselOpen: false});
    this.imageGallery.current.exitFullScreen();
    this.setState({isFullScreen: false});
    console.log('close button pressed');
  };

  _renderCustomControls = () => {
    return <button type="button" className="close image-gallery-icon" onClick={this.handleOnClickClose}>&times; </button>
  };

  render() {
    const images = this.state.carouselOpen ? this.state.carouselPicturesList.map(picture => {
      return {
        original: `${configuration.mediaServer}${this.state.carouselAlbumName}/resized/${picture}`,
        thumbnail: `${configuration.mediaServer}${this.state.carouselAlbumName}/thumbs/${picture}`,
        imageSet: [
          {
            srcSet: `${configuration.mediaServer}${this.state.carouselAlbumName}/thumbs/${picture}`,
            media : '(max-width: 700px)',
          },
          {
            srcSet: `${configuration.mediaServer}${this.state.carouselAlbumName}/resized/${picture}`,
            media : '(min-width: 700px)',
          }
        ],
        thumbnailClass: 'Carousel-thumbnail'
    }}) : [];

    return (
      <div className="Gallery">
        <header className="Gallery-header">ZGallery</header>
          <div className="Albums-container">
            {!this.state.isLoading ?
              this.state.albums.map(album =>
                <Album key={album.albumName}
                       album={album}
                       handleOnClickAlbum={this.handleOnClickAlbum}
                />)
              :
              <div className="loader"/>
            }
          </div>
          <div className={this.state.carouselOpen ? "Carousel-container Carousel-visible" : "Carousel-container"}>
            <ImageGallery
              ref={this.imageGallery}
              items={images}
              infinite={true}
              showPlayButton={false}
              showIndex={true}
              slideDuration={350}
              fullScreenButton={false}
              renderCustomControls={this._renderCustomControls}
            />
            {this.state.isFullScreen ?
              <DeviceOrientation lockOrientation={'landscape'}>
                <Orientation orientation='landscape' alwaysRender={true}>
                </Orientation>
              </DeviceOrientation>
              :
              null
            }
          </div>
      </div>
    );
  }
}

export default Gallery;
