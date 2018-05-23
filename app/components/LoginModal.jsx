import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const LoginModal = props =>
<Modal
  {...props}
>
  <h2>Login Modal</h2>
</Modal>;

export default LoginModal;