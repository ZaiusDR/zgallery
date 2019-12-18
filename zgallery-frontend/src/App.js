import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    }
  };

  componentDidMount() {
    fetch('http://zgallery-backend:3000/api/v1/albums')
      .then(results => {
        return results.json()
      }).then(data => {
        let albums = data.results.map(album => {
          return(
            <div key={album}>
              <p>album</p>
            </div>
          )
        });
        this.setState({ albums: albums})
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Albums-container">
            {this.state.albums}
          </div>
          <p>holi</p>
        </header>
      </div>
    );
  }
}

export default App;
