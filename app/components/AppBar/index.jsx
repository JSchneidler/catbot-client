import React from 'react';
import { AppBar as MatAppBar, Toolbar, Typography } from '@material-ui/core';

const AppBar = props => 
<MatAppBar position="static">
  <Toolbar>
    <Typography variant="title" color="inherit">CatBot</Typography>
  </Toolbar>
</MatAppBar>;

export default AppBar;