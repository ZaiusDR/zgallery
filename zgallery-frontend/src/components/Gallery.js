import React, {Component} from 'react';
import Album from './Album';
import {configuration} from '../settings';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";

import '../css/Gallery.css';
import '../css/spinners.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      carouselOpen: false,
      albums: [],
    };
    this.timerId = null;
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
    return album.thumbs[Math.floor(Math.random() * configuration.maxThumbnails)]
  }

  handleOnClickAlbum = albumName => {
    fetch(`http://${configuration.serverUrl}/api/v1/albums/${albumName}`)
      .then(response => response.json())
      .then(data => this.setState(
        {carouselAlbumName: albumName, carouselOpen: true, carouselPicturesList: data})
      )
      .catch(error => console.log(error));
  };

  handleOnClickClose = () => {
    this.setState({carouselOpen: false});
  };

  render() {
    const images = this.state.carouselOpen ? this.state.carouselPicturesList.map(picture => {
      return {
        original: `${configuration.mediaServer}${this.state.carouselAlbumName}/resized/${picture}`,
        thumbnail: `${configuration.mediaServer}${this.state.carouselAlbumName}/thumbs/${picture}`,
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
        {this.state.carouselOpen ?
          <div className={`${this.state.carouselOpen}` ? "Carousel-container Carousel-visible" : "Carousel-container"}>
            <span className="close"
                  onClick={this.handleOnClickClose}>&times;
            </span>
            <ImageGallery
              items={images}
              infinite={true}
              showPlayButton={false}
              showIndex={true}
              slideDuration={350}
            />
          </div>
          :
          <span/>
        }
      </div>
    );
  }
}

export default Gallery;
