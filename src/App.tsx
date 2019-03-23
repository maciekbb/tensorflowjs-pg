import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClassifiableImage from './ClassifiableImage';
import Webcam from './Webcam';



class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <ClassifiableImage src="https://i.imgur.com/JlUvsxa.jpg"/> */}
        <Webcam />
      </div>
    );
  }
}

export default App;
