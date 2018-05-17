import React from 'react';
import { Grid } from 'material-ui';
import { Label } from '@material-ui/icons';

import './style.scss';

// TODO: Preserve aspect ratio of 1:1
// TODO: Center and resize labels inside buttons

const Directional = props => {
  const style = {
    background: '#888',
    border: '1px solid black',
    borderRadius: '50%',
    display: 'flex',
    paddingBottom: '33%',
    transform: `rotate(${props.rotation || 0}deg)`,
    width: '33%',
  };

  return <div className="directional" style={style}><Label iconStyle={{ width: '75%' }} /></div>
};

const FLEX_CENTER = { display: 'flex', justifyContent: 'center' };
const FLEX_SPACE_BETWEEN = { display: 'flex', justifyContent: 'space-between' };

export default props => {
  return <div style={{ width: '100%', paddingBottom: '100%' }}>
    <div style={FLEX_CENTER}><Directional rotation={270} active={true} /></div>
    <div style={FLEX_SPACE_BETWEEN}>
      <Directional rotation={180} active={true} />
      <Directional active={true} />
    </div>
    <div style={FLEX_CENTER}><Directional rotation={90} active={true} /></div>
  </div>;
};