import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';

import { Link } from "react-router";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" href="/"/>
          </a>
          <div className="myLinks">
            <Link to="faq" className="faqbutton">Faq</Link>
            <Link to="contact" className="contactbutton">Contact</Link>
          </div>
        </header>
        {this.props.children}
        <footer className="App-header footer">
          <span className="bitlat2018">© Bitlat 2018</span>
          <a href="/" className="contactus">
            <span>CONTACT US</span>
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
