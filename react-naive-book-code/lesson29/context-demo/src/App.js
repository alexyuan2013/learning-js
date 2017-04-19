import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render() {
    return (
      <div>
        <h2 style={{ color: this.context.themeColor }}>This is header</h2>
        <Title />
      </div>
    );
  }
}

class Main extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render() {
    return (
      <div>
        <h2 style={{ color: this.context.themeColor }}>This is main</h2>
        <Content />
      </div>
    );
  }
}

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render() {
    return (
        <h1 style={{ color: this.context.themeColor }}>React.js 小书</h1>
    );
  }
}

class Content extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  render() {
    return (
      <div>
        <h2 style={{ color: this.context.themeColor }}>React.js 小书内容</h2>
      </div>
    );
  }
}


class App extends Component {
  static childContextTypes = {
    themeColor: PropTypes.string
  }

  constructor () {
    super();
    this.state = {
      themeColor: 'red'
    }
  }

  getChildContext () {
    return { themeColor: this.state.themeColor }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
