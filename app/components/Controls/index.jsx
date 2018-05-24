import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Slider from 'react-rangeslider';
import { clone, pull, uniq } from 'lodash';

import Overlay from './Overlay';
import DPad from 'components/DPad';
import TakeControl from './TakeControl';
import ReleaseControl from './ReleaseControl';
import { bot } from 'services';
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

const DEFAULT_SPEED = 100;


class Controls extends Component {
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

    const speed = (velocityX === 0 && velocityY === 0) ? 0 : this.state.speed;
    // Convert [x, y] vector to angle, preserving quadrant.
    const direction = Math.atan2(velocityX, velocityY)*(180/Math.PI);

    bot.update({ speed, direction });
  }

  render() {
    const style = {
      controlsContainer: {
        textAlign: 'center',
        position: 'relative',
      },
      controls: {
        //boxSizing: 'border-box',
        outline: 'none',
        padding: '10px'
      },
      overlay: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      },
      overlayContent: {
        alignSelf: 'center',
        color: 'white',
      },
      releaseControl: {
        marginBottom: '10px',
      }
    };

    /*
    if (this.state.focused) {
      style.controls.borderColor = '#4CAF50';
      style.controls.borderStyle = 'solid';
      style.controls.borderWidth = '0px 0px 2px 2px';
    }
    */

    return <div style={style.controlsContainer}>
      {!this.state.focused &&
        <Overlay onClick={() => this.controlRef.current.focus()}>
          <div style={style.overlay}><Typography variant="headline" style={style.overlayContent}>Click inside box to take control</Typography></div>
        </Overlay>
      }
      <div
        tabIndex={0}
        ref={this.controlRef}
        style={style.controls}
        onKeyDown={event => this.handleKeyDown(event.keyCode)}
        onKeyUp={event => this.handleKeyUp(event.keyCode)}
        onFocus={event => this.setState({ focused: true })}
        onBlur={event => this.setState({ focused: false })}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} style={style.releaseControl}><ReleaseControl onClick={() => this.controlRef.current.blur()} disabled={!this.state.focused} /></Grid>
          <Grid item xs={9}>
            <DPad
              state={convertControlsToDPadState(this.state.activeControls)}
              onMouseDown={direction => this.handleDPadClick(direction, true)}
              onMouseUp={direction => this.handleDPadClick(direction, false)}
            />
          </Grid>
          <Grid item xs={3}>
            <Slider
              orientation="vertical"
              value={this.state.speed}
              onChange={value => this.setState({ speed: value })}
              onChangeComplete={() => this.updateBot()}
            />
            <h4 onClick={() => this.setSpeed(DEFAULT_SPEED)}>{ this.state.speed }</h4>
          </Grid>
        </Grid>
      </div>
    </div>;
  }
}

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

export default Controls;