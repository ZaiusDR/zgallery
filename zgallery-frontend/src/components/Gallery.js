import React, {Component} from 'react';
import Album from './Album';
import Carousel from './Carousel';
import {configuration} from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';

import '../css/Gallery.css';
import '../css/spinners.css';

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {ThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import is from 'is_js';

let theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
theme = responsiveFontSizes(theme);

const screenChangeEvents = [
  'fullscreenchange',
  'MSFullscreenChange',
  'mozfullscreenchange',
  'webkitfullscreenchange',
];

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
  }

  componentDidMount() {
    screenChangeEvents.forEach((eventName) => {
      document.addEventListener(eventName, this.handleOnFullScreenChanged);
    });
    this.fetchAlbums();
    this.randomizeThumbs();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
    screenChangeEvents.forEach((eventName) => {
      document.removeEventListener(eventName, this.handleOnFullScreenChanged);
    });
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
      .then(data => {
        this.setState({carouselAlbumName: albumName, isCarouselOpen: true, carouselPicturesList: data});
        if (is.mobile()) {
          this.imageGallery.current.fullScreen();
        }
      })
      .catch(error => console.log(error));
  };

  handleOnCarouselClickClose = () => {
    if (is.mobile()) {
      this.imageGallery.current.exitFullScreen();
    }
    this.setState({isCarouselOpen: false})
  };

  handleOnFullScreenChanged = () => {
    this.state.isFullScreen ?
      this.setState({isCarouselOpen: false, isFullScreen: false})
    :
      this.setState({isFullScreen: true})
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div className="Gallery">
            <header className="Gallery-header">
                <img className="Gallery-header-logo Gallery-header-item" src={'logo192.png'} alt={''} />
                <h1 className="Gallery-header-text Gallery-header-item">ZGallery</h1>
            </header>
            <Grid container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="stretch"
            >
              {!this.state.isLoading ?
                this.state.albums.map(album =>
                  <Grid item key={album.albumName} xs={12} md={6}>
                    <Album key={album.albumName}
                           album={album}
                           handleOnClickAlbum={this.handleOnClickAlbum}
                    />
                  </Grid>
                  )
                :
                <div className="loader"/>
              }
            </Grid>
          </div>
          {this.state.isCarouselOpen ?
            <Carousel
              carouselPicturesList={this.state.carouselPicturesList}
              carouselAlbumName={this.state.carouselAlbumName}
              refImageGallery={this.imageGallery}
              isFullScreen={this.state.isFullScreen}
              onCarouselClickClose={this.handleOnCarouselClickClose}
            />
          : null}
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Gallery;
