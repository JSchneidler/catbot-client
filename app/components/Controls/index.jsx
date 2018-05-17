import React, { Component } from 'react';
import { Grid } from 'material-ui';
import Slider from 'react-rangeslider';
import { clone, pull } from 'lodash';

import DPad from './DPad';
import Bot from 'services/Bot';

import 'react-rangeslider/lib/index.css';

const DIRECTIONS = {
  LEFT: 'LEFT',
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
}

const KEYS = {
  37: DIRECTIONS.LEFT, // Left arrow
  65: DIRECTIONS.LEFT, // a

  38: DIRECTIONS.UP, // Up arrow
  87: DIRECTIONS.UP, // w

  39: DIRECTIONS.RIGHT, // Up arrow
  68: DIRECTIONS.RIGHT, // d

  40: DIRECTIONS.DOWN, // Down arrow
  83: DIRECTIONS.DOWN, // s
};

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 50,
      direction: 0,
      keysDown: [],
    };
  }

  handleSpeedChange() {
    console.log(this.state.speed);
  }

  handleKeyDown(keyCode) {
    if (this.state.keysDown.indexOf(keyCode) !== -1) return;

    const keysDown = clone(this.state.keysDown);
    keysDown.push(keyCode);

    this.updateBot(keysDown);

    this.setState({ keysDown });
  }

  handleKeyUp(keyCode) {
    const keysDown = clone(this.state.keysDown);
    pull(keysDown, keyCode);

    this.updateBot(keysDown);

    this.setState({ keysDown });
  }

  updateBot(keysDown) {
    console.log(keysDown);
    // TODO: Use keys down to determine new speed and direction.
    // TODO: Send this speed and direction to the robot.
  }

  render() {
    return (
      <Grid container spacing={0} tabIndex={0} onKeyDown={event => this.handleKeyDown(event.keyCode)} onKeyUp={event => this.handleKeyUp(event.keyCode)}>
        <Grid item xs={9}>
          <DPad
            left={true}
            up={true}
            right={true}
            down={true}
          />
        </Grid>
        <Grid item xs={3}>
          <Slider
            orientation="vertical"
            value={this.state.speed}
            onChange={value => this.setState({ speed: value })}
            onChangeComplete={() => this.handleSpeedChange()}
          />
        </Grid>
      </Grid>
    );
  }
};