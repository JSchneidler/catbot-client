import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Label } from '@material-ui/icons';

import './style.scss';

// TODO: Preserve aspect ratio of 1:1
// TODO: Center and resize labels inside buttons

const Directional = props => {
  let rotation;
  switch (props.direction) {
    case 'left':
      rotation = 180;
      break;
    case 'right':
      rotation = 0;
      break;
    case 'down':
      rotation = 90;
      break;
    default:
      rotation = 270;
      break;
  }

  const style = {
    background: props.active ? '#333' : '#888',
    border: '1px solid black',
    borderRadius: '50%',
    display: 'flex',
    paddingBottom: '33%',
    transform: `rotate(${rotation}deg)`,
    width: '33%',
  };

  return <div
    className="directional"
    style={style}
    onMouseDown={() => props.onMouseDown(props.direction)}
    onMouseUp={() => props.onMouseUp(props.direction)}
  >
    <Label />
  </div>
};

const FLEX_CENTER = { display: 'flex', justifyContent: 'center' };
const FLEX_SPACE_BETWEEN = { display: 'flex', justifyContent: 'space-between' };

export default class DPad extends Component {
  constructor(props) {
    super(props);

    this.state = { height: 0 };

    this.dpad_ref = React.createRef();
  }

  componentDidMount() {
    const height = this.dpad_ref.current.offsetWidth;

    console.log(height);

    this.setState({ height });
  }

  generateDirectional(direction) {
    const active = this.props.state.indexOf(direction) !== -1;

    return <Directional 
      active={active}
      direction={direction}
      onMouseDown={direction => this.props.onClick(direction, true)}
      onMouseUp={direction => this.props.onClick(direction, false)}
    />;
  }

  render () {
    return (
      <div ref={this.dpad_ref}
        style={{ width: '100%', height: this.state.height }}
        onMouseDown={e => e.preventDefault()}
      >
        <div style={FLEX_CENTER}>{this.generateDirectional('up')}</div>
        <div style={FLEX_SPACE_BETWEEN}>
          {this.generateDirectional('left')}
          {this.generateDirectional('right')}
        </div>
        <div style={FLEX_CENTER}>{this.generateDirectional('down')}</div>
      </div>
    );
  }
};