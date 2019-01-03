import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
https://medium.com/@ryan.mcnierney/using-react-google-sheets-as-your-cms-294c02561d59

https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1
 */


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
