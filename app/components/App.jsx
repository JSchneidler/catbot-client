import React, { Component } from 'react';

import AppBar from 'components/AppBar';
import CatBot from 'components/CatBot';

export default class App extends Component {
  render() {
    return <div>
      <AppBar />
      <CatBot />
    </div>;
  }
};