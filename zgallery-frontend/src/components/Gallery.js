import React, {Component} from 'react';
import Album from './Album';
import {configuration} from '../settings';

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
                  onClick={this.handleOnClickClose}>&times;</span>
            <img className="Album-image"
                 src={`${configuration.mediaServer}${this.state.carouselAlbumName}/resized/${this.state.carouselPicturesList[0]}`}
                 alt={this.state.carouselAlbumName}/>
          </div>
          :
          <span/>
        }
      </div>
    );
  }
}

export default Gallery;
