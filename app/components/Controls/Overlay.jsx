import React from 'react';

const style = {
  background: 'rgba(0, 0, 0, 0.75)',
  height: '100%',
  width: '100%',
  position: 'absolute',
  zIndex: 1,
};

const Overlay = props => <div style={style} onClick={() => props.onClick()}>
  {props.children}
</div>;

export default Overlay;