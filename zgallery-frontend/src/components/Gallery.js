import React, {Component} from 'react';
import Album from './Album';
import {configuration} from '../settings';

import '../css/Gallery.css';
import '../css/spinner.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      albums: [],
    }
  };

  componentDidMount() {
    this.fetchAlbums()
  }

  fetchAlbums() {
    fetch(`http://${configuration.serverUrl}/api/v1/albums`)
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({ isLoading: false, albums: data })
      }).catch(error => {
       console.log(error);
    });
  }

  render() {
    return (
      <div className="Gallery">
        <header className="Gallery-header">ZGallery</header>
          <div className="Albums-container">
            {!this.state.isLoading ?
              this.state.albums.map(album =>
                <Album key={album.albumName}
                       name={album.albumName}
                       thumbs={album.thumbs}
                />)
              :
              <div className="loader">Loading...</div>
            }
          </div>
      </div>
    );
  }
}

export default Gallery;
