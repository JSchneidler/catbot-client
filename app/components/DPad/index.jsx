import React from 'react';

import Directional from './Directional';

// TODO: Fix flexbox problem

const DPad = props => {
  function generateDirectional(direction) {
    const active = props.state.indexOf(direction) !== -1;
    const arrowFillColor = active ? 'black' : null;
    const circleFillColor = active ? 'white' : null;
    const circleOutlineColor = active ? 'black' : null;

    let rotation;
    switch (direction) {
      case 'left':
        rotation = 270;
        break;
      case 'right':
        rotation = 90;
        break;
      case 'down':
        rotation = 180;
        break;
      default:
        rotation = 0;
    }

    return <Directional
      onMouseDown={() => props.onMouseDown(direction)}
      onMouseUp={() => props.onMouseUp(direction)}
      arrowFillColor={arrowFillColor}
      circleFillColor={circleFillColor}
      circleOutlineColor={circleOutlineColor}
      style={{ width: '33.3%', verticalAlign: 'top', transform: `rotate(${rotation}deg)` }}
    />;
  }

  return <div>
    <div>{generateDirectional('up')}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {generateDirectional('left')}
      {generateDirectional('right')}
    </div>
    <div>{generateDirectional('down')}</div>
  </div>;
};

export default DPad;