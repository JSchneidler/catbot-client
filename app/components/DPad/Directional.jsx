import React from 'react';

const Directional = props =>
<svg id="directional" viewBox="0 0 30 30" style={props.style}>
  <g onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp}>
    <g id="circle">
      <path id="fill" fill={props.circleFillColor || "#D1D3D4"} d="M15,29.5C7,29.5,0.5,23,0.5,15S7,0.5,15,0.5S29.5,7,29.5,15S23,29.5,15,29.5z"/>
      <path id="outline" fill={props.circleOutlineColor || "#414042"} d="M15,1c7.7,0,14,6.3,14,14s-6.3,14-14,14S1,22.7,1,15S7.3,1,15,1 M15,0C6.7,0,0,6.7,0,15
        s6.7,15,15,15s15-6.7,15-15S23.3,0,15,0L15,0z"/>
    </g>
    <polygon id="arrow" fill={props.arrowFillColor || "#414042"} points="6.3,20 15,5 23.7,20 	"/>
  </g>
</svg>;

export default Directional;