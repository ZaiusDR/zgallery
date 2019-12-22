import React, {Component} from "react";
import { configuration } from "../settings";
import "../css/Album.css";

class Album extends Component {
  render() {
    return(
      <div>
        <div>
          <img className="Album-image"
               src={`${configuration.mediaServer}${this.props.name}/thumbs/${this.props.thumbs[0]}`}
               alt={this.props.name}
          />
        </div>
        <div>
          <p className="Album-name">{this.props.name}</p>
        </div>
      </div>
    )
  }
}

export default Album;