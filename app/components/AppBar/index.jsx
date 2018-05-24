import React, { Component } from 'react';
import { AppBar as MatAppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import LoginModal from 'components/LoginModal';
import api from 'services/api';

class AppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalOpen: false,
      loggedIn: api.isLoggedIn(),
    };

    api.on('status', loggedIn => this.setState({ loggedIn }));
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
        closeModal={() => this.closeLoginModal()}
      />
      <MatAppBar position="static" style={{ background: '#333' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="title" color="inherit">CatBot</Typography>
        {!this.state.loggedIn ?
          <Button color="inherit" onClick={() => this.openLoginModal()}>Login</Button> :
          <span>
            <Button color="inherit" onClick={() => api.logout()}>Sign Out</Button>
            <IconButton><AccountCircle style={{ color: 'white' }} /></IconButton>
          </span>
        }
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