import React, { Component } from 'react';
import { Dialog, Button, Typography } from '@material-ui/core';

import TextField from './TextField';
import api from 'services/api';

const style = {
  button: {
    background: '#4CAF50',
    color: 'white',
    marginTop: '15px',
  },
  header: {
    color: 'white',
    textAlign: 'center',
  },
  modal: {
    background: '#333',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  textField: {
    border: '1px solid white',
    borderRadius: '5%',
    marginTop: '15px',
  },
};

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  login() {
    api.login(this.state.username, this.state.password).then(() => this.props.closeModal());
  }

  render() {
    const { open, closeModal } = this.props;

    return <Dialog
      open={open}
      onClose={() => closeModal()}
    >
      <div style={style.modal}>
        <Typography style={style.header} variant="headline">Log In</Typography>
        <TextField onChange={event => this.setState({ username: event.target.value })} value={this.state.username} placeholder="Username" />
        <TextField onChange={event => this.setState({ password: event.target.value })} value={this.state.password} placeholder="Password" type="password" />
        <Button style={style.button} onClick={() => this.login()}>Sign In</Button>
      </div>
    </Dialog>;
  }
}

export default LoginModal;