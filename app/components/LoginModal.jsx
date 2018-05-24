import React, { Component } from 'react';
import Modal from 'react-modal';

import api from 'services/api';

Modal.setAppElement('#app');

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  login() {
    const username = this.usernameRef.current.value;
    const password = this.passwordRef.current.value;

    api.login(username, password).then(() => this.props.closeModal());
  }

  render() {
    return <Modal {...this.props}>
      <h2>Login Modal</h2>
      <input ref={this.usernameRef}></input>
      <input ref={this.passwordRef}></input>
      <button onClick={() => this.login()}>Login</button>
    </Modal>;
  }
}

export default LoginModal;