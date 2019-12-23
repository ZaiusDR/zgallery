import React, {Component} from "react";
import { configuration } from "../settings";
import "../css/Thumbnail.css";

class Thumbnail extends Component {
  state = {
    loaded: false,
  };

  handleOnLoaded = () => {
    this.setState({loaded: true});
  };

  render() {
    return(
      <div className="Thumbnail-container">
        <div className="layer-1">
          <span className={this.state.loaded ? "loader-horizontal hidden" : "loader-horizontal visible"}/>
        </div>
        <div className="layer-2">
          <img className={this.state.loaded ? "Thumbnail-image visible" : "Thumbnail-image hidden"}
               onLoad={this.handleOnLoaded}
               src={`${configuration.mediaServer}${this.props.albumName}/thumbs/${this.props.thumbnail}`}
               alt={this.props.albumName}
          />
        </div>
      </div>
    )
  }
}

export default Thumbnail;