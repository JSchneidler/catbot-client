import React, { Component } from 'react';
import { AppBar as MatAppBar, Button, Toolbar, Typography } from '@material-ui/core';

import LoginModal from 'components/LoginModal';

import { Bot } from 'services';

class AppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalOpen: false,
    };
  }

  openLoginModal() {
    this.setState({ loginModalOpen: true });
  }

  closeLoginModal() {
    this.setState({ loginModalOpen: false });
  }

  render() {
    return <div>
      <LoginModal
        isOpen={this.state.loginModalOpen}
        onRequestClose={() => this.closeLoginModal()}
      />
      <MatAppBar position="static" style={{ background: '#333' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="title" color="inherit">CatBot</Typography>
          <Button color="inherit" onClick={() => this.openLoginModal()}>Login</Button>
      </Toolbar>
      </MatAppBar>
    </div>;
  }
}

function getBotStatus(status) {
  let color;

  switch (status) {
    case 0:
      color = 'yellow';
      status = 'Connecting';
      break;
    case 1:
      color = 'green';
      status = 'Connected';
      break;
    default:
      color = 'red';
      status = 'Not Connected';
  }

  return <h3 style={{ color }}>{status}</h3>;
}

export default AppBar;