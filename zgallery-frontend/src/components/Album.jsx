import React, {Component} from "react";

import Button from '@material-ui/core/Button';

import "../css/Album.css";
import Thumbnail from "./Thumbnail";

class Album extends Component {
  render() {
    return(
      <React.Fragment>
        <div className="Album-container">
          <Button className="Album-name"
             onClick={() => this.props.handleOnClickAlbum(this.props.album.albumName)}>
            {this.props.album.albumName}
          </Button>
          {this.props.album.thumbs.map(thumbnail =>
            <Thumbnail key={thumbnail}
                       albumName={this.props.album.albumName}
                       activeThumb={this.props.album.activeThumb}
                       thumbnail={thumbnail}
                       handleOnClickAlbum={this.props.handleOnClickAlbum}
            />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default Album;