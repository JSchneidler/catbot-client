import React from 'react';
import { Input, withStyles } from '@material-ui/core';

const styles = {
  underline: {
    '&:after': {
      borderBottomColor: 'green',
    },
  },
  input: {
    color: 'white',
  },
};

const TextField = props => <Input {...props} classes={props.classes} />;

export default withStyles(styles)(TextField);