import React from 'react';
import Grid from 'material-ui/Grid';

import Stream from 'components/Stream';

/* TODO: Implement React Grid Layout https://github.com/STRML/react-grid-layout/
Problems:
Variable height - https://github.com/STRML/react-grid-layout/issues/2
Margins, grid constraints
*/

export default props =>
<Grid container spacing={0}>
  <Grid item xs={12} md={8}><Stream /></Grid>
  <Grid item xs={12} md={4}><p>CatBot</p></Grid>
</Grid>;