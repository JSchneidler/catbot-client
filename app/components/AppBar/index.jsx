import React, { Component } from 'react';
import { AppBar as MatAppBar, Toolbar, Typography } from '@material-ui/core';

import Bot from 'services/Bot';

class AppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      botStatus: 0,
    };

    Bot.on('status', status => this.setState({ botStatus: status }));
  }

  render() {
    return <MatAppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">CatBot</Typography>
        {getBotStatus(this.state.botStatus)}
      </Toolbar>
    </MatAppBar>;
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