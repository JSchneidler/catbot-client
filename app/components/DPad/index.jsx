import React, { Component } from 'react';

import Directional from './Directional';

import './style.scss';

// TODO: Fix flexbox problem
// TODO: Reimplement mouseUp/mouseDown

export default class DPad extends Component {
  generateDirectional(direction) {
    const active = this.props.state.indexOf(direction) !== -1;
    const arrowFillColor = active ? 'red' : null;

    return <Directional
      onMouseDown={() => this.props.onMouseDown(direction)}
      onMouseUp={() => this.props.onMouseUp(direction)}
      arrowFillColor={arrowFillColor}
      style={{ width: '33.3%', verticalAlign: 'top' }}
    />;
  }

  render () {
    return <div>
      <div>{this.generateDirectional('up')}</div>
      <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
        {this.generateDirectional('left')}
        {this.generateDirectional('right')}
      </div>
      <div>{this.generateDirectional('down')}</div>
    </div>;
  }
};