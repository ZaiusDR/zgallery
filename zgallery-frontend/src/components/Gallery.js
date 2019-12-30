import React, {Component} from 'react';
import Album from './Album';
import Carousel from './Carousel';
import {configuration} from '../settings';

import '../css/Gallery.css';
import '../css/spinners.css';


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isCarouselOpen: false,
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
      if (this.state.isCarouselOpen) {
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
        {carouselAlbumName: albumName, isCarouselOpen: true, carouselPicturesList: data})
      )
      .catch(error => console.log(error));
    this.imageGallery.current.fullScreen();
    this.setState({isFullScreen: true})
  };

  handleOnCarouselClickClose = () => {
    this.setState({isCarouselOpen: false});
    this.imageGallery.current.exitFullScreen();
    this.setState({isFullScreen: false});
    console.log('close button pressed');
  };

  render() {
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
          <Carousel
            isCarouselOpen={this.state.isCarouselOpen}
            carouselPicturesList={this.state.carouselPicturesList}
            carouselAlbumName={this.state.carouselAlbumName}
            isFullScreen={this.state.isFullScreen}
            refImageGallery={this.imageGallery}
            onCarouselClickClose={this.handleOnCarouselClickClose}
          />
      </div>
    );
  }
}

export default Gallery;
