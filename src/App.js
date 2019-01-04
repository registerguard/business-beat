import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabletop from 'tabletop';

/*
https://medium.com/@ryan.mcnierney/using-react-google-sheets-as-your-cms-294c02561d59

https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1
 */


class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: '1kOHYujR27_k1KTtXmpgNvvhdPohyQ_RefjN1tCrqONA',
      callback: googleData => {
        console.log('google sheet data --->', googleData)
      },
      simpleSheet: true
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React + Google Sheets demo</h1>
        </header>
      </div>
    );
  }
}

export default App;
