import React, { Component } from 'react';
import { Dialog, Button } from '@material-ui/core';

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
    margin: 0,
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
        <h2 style={style.header}>Log In</h2>
        <TextField onChange={event => this.setState({ username: event.target.value })} value={this.state.username} />
        <TextField onChange={event => this.setState({ password: event.target.value })} value={this.state.password} />
        <Button style={style.button} onClick={() => this.login()}>Sign In</Button>
      </div>
    </Dialog>;
  }
}

export default LoginModal;