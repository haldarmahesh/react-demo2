import { CircularProgress, Container, Grid } from "@material-ui/core";
import React from "react";

const LoaderComponent = () => {
  return (
    <Container>
      <Grid spacing={5} container justifyContent="center" alignItems="center">
        <Grid item xs={2}>
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoaderComponent;
