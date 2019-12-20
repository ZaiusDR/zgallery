import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: null,
    }
  };

  componentDidMount() {
    fetch('/api/v1/albums')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({ albums: data})
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Albums-container">
            {this.state.albums !== null ?
              this.state.albums.map(album => {
                return(
                  <div key={album}>
                    <p className={album}>{album}</p>
                  </div>
                )
              })
              :
              <span className="spinner" />
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
