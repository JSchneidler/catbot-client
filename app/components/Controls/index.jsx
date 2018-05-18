import React, { Component } from 'react';
import { Grid } from 'material-ui';
import Slider from 'react-rangeslider';
import { clone, pull, uniq } from 'lodash';

import DPad from 'components/DPad';
import TakeControl from './TakeControl';
import ReleaseControl from './ReleaseControl';
import Bot from 'services/Bot';
import CONTROLS from './controls';

import 'react-rangeslider/lib/index.css';

// TODO: Fix issue with focus/blur

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

export default class Controls extends Component {
  constructor(props) {
    super(props);

    this.controlRef = React.createRef();

    this.state = {
      focused: false,
      speed: 50,
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

  handleKeyDown(keyCode) {
    if (keysDown.indexOf(keyCode) !== -1) return;

    keysDown.push(keyCode);

    if (KEYS[keyCode]) this.addControl(KEYS[keyCode]);
  }

  handleKeyUp(keyCode) {
    console.log('keyUp: ' + keyCode);
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
    console.log(`Bot Parameters: Speed: ${this.state.speed} Controls: ${this.state.activeControls}`);
    // TODO: Use activeControls to determine new speed and direction.
    // TODO: Send this speed and direction to the robot.
  }

  render() {
    const style = {
      border: `1px solid ${this.state.focused ? 'green' : 'black'}`
    }

    return (
      <div
        onKeyDown={event => this.handleKeyDown(event.keyCode)}
        onKeyUp={event => this.handleKeyUp(event.keyCode)}
        onFocus={event => { console.log('focused'); this.setState({ focused: true }); }}
        onBlur={event => { console.log('blurred'); this.setState({ focused: false }); }}
        ref={this.controlRef}
      >
        <Grid
          container
          spacing={0}
          tabIndex={0}
          style={style}
        >
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            {this.state.focused ? <ReleaseControl onClick={() => this.controlRef.current.blur()} /> : <TakeControl onClick={() => this.controlRef.current.focus()} />}
          </Grid>
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
              onChange={value => this.setState({ speed: value })}
              onChangeComplete={() => this.updateBot()}
            />
          </Grid>
        </Grid>
      </div>
    );
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