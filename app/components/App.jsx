import React, { Component } from 'react';

import AppBar from 'components/AppBar';
import CatBot from 'components/CatBot';

class App extends Component {
  render() {
    return <div>
      <AppBar />
      <div style={{ margin: '0 10px', marginTop: '10px' }}>
        <CatBot />
      </div>
    </div>;
  }
};

export default App;