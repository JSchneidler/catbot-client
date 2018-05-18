import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Slider from 'react-rangeslider';
import { clone, pull, uniq } from 'lodash';

import DPad from 'components/DPad';
import TakeControl from './TakeControl';
import ReleaseControl from './ReleaseControl';
import Bot from 'services/Bot';
import CONTROLS from './controls';

import 'react-rangeslider/lib/index.css';

const KEYS = {
  37: CONTROLS.LEFT, // Left arrow
  65: CONTROLS.LEFT, // a

  38: CONTROLS.FORWARD, // Up arrow
  87: CONTROLS.FORWARD, // w

  39: CONTROLS.RIGHT, // Up arrow
  68: CONTROLS.RIGHT, // d

  40: CONTROLS.REVERSE, // Down arrow
  83: CONTROLS.REVERSE, // s
};

const keysDown = [];

const DEFAULT_SPEED = 50;

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.controlRef = React.createRef();

    this.state = {
      focused: false,
      speed: DEFAULT_SPEED,
      direction: 0,
      activeControls: [],
    };
  }

  addControl(control) {
    const activeControls = clone(this.state.activeControls);

    activeControls.push(control);
    
    this.setState({ activeControls }, this.updateBot);
  }

  removeControl(control) {
    const activeControls = clone(this.state.activeControls);

    activeControls.splice(activeControls.indexOf(control), 1);

    this.setState({ activeControls }, this.updateBot);
  }

  setSpeed(speed) {
    this.setState({ speed }, this.updateBot);
  }

  handleKeyDown(keyCode) {
    if (keysDown.indexOf(keyCode) !== -1) return;

    keysDown.push(keyCode);

    if (KEYS[keyCode]) this.addControl(KEYS[keyCode]);
  }

  handleKeyUp(keyCode) {
    pull(keysDown, keyCode);

    if (KEYS[keyCode]) this.removeControl(KEYS[keyCode]);
  }

  handleDPadClick(direction, mouseDown) {
    let control;

    switch(direction) {
      case 'left':
        control = CONTROLS.LEFT;
        break;
      case 'up':
        control = CONTROLS.FORWARD;
        break;
      case 'right':
        control = CONTROLS.RIGHT;
        break;
      case 'down':
        control = CONTROLS.REVERSE;
        break;
    }

    mouseDown ? this.addControl(control) : this.removeControl(control);
  }

  updateBot() {
    const activeControls = uniq(this.state.activeControls);
    let velocityX = 0, velocityY = 0;

    activeControls.forEach(control => {
      switch(control) {
        case CONTROLS.LEFT:
          return velocityX -= 1;
        case CONTROLS.RIGHT:
          return velocityX += 1;

        case CONTROLS.FORWARD:
          return velocityY += 1;
        case CONTROLS.REVERSE:
          return velocityY -= 1;
      }
    });

    console.log([velocityX, velocityY], this.state.speed);
    Bot.update({
      speed: this.state.speed,
      direction: [velocityX, velocityY],
    });
  }

  render() {
    const style = {
      border: `5px solid ${this.state.focused ? 'green' : '#999'}`,
      textAlign: 'center',
    };

    return <div style={style}>
      {this.state.focused ?
        <ReleaseControl onClick={() => this.controlRef.current.blur()} /> :
        <TakeControl onClick={() => this.controlRef.current.focus()} />
      }
      <div
        tabIndex={0}
        ref={this.controlRef}
        style={{ outline: 'none' }}
        onKeyDown={event => this.handleKeyDown(event.keyCode)}
        onKeyUp={event => this.handleKeyUp(event.keyCode)}
        onFocus={event => this.setState({ focused: true })}
        onBlur={event => this.setState({ focused: false })}
      >
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <DPad
              state={convertControlsToDPadState(this.state.activeControls)}
              onClick={(direction, mouseDown) => this.handleDPadClick(direction, mouseDown)}
            />
          </Grid>
          <Grid item xs={3}>
            <Slider
              orientation="vertical"
              value={this.state.speed}
              onChange={value => this.setSpeed(value)}
              onChangeComplete={() => this.updateBot()}
            />
            <h4 onClick={() => this.setSpeed(DEFAULT_SPEED)}>{ this.state.speed }</h4>
          </Grid>
        </Grid>
      </div>
    </div>;
  }
};

function convertControlsToDPadState(activeControls) {
  return uniq(activeControls).map(control => {
    switch (control) {
      case CONTROLS.LEFT:
        return 'left';
      case CONTROLS.FORWARD:
        return 'up';
      case CONTROLS.RIGHT:
        return 'right';
      case CONTROLS.REVERSE:
        return 'down';
    }
  });
}