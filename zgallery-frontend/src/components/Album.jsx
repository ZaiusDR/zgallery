import React, {Component} from "react";

import "../css/Album.css";
import Thumbnail from "./Thumbnail";

class Album extends Component {
  render() {
    return(
      <div>
        <div className="Album-container">
          {this.props.album.thumbs.map(thumbnail =>
            <Thumbnail key={thumbnail}
                       albumName={this.props.album.albumName}
                       thumbnail={thumbnail}
            />
          )}
        </div>
        <div>
          <p className="Album-name">{this.props.album.albumName}</p>
        </div>
      </div>
    )
  }
}

export default Album;