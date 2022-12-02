import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import LoaderComponent from "../loader";

const ConversionResult = ({ result }) => {
  if (result === null) {
    return null;
  }

  let component = null;
  if (result && result.state === "loading") {
    component = (
      <Grid key="loader" item>
        <LoaderComponent />
      </Grid>
    );
  } else {
    component = (
      <>
        <Grid key="amount" item>
          <Typography display="inline" variant="h2">
            {result.amount} {result.from} ={" "}
          </Typography>
          <Typography color="secondary" display="inline" variant="h2">
            {result.result} {result.to}
          </Typography>
        </Grid>
        <Grid key="from" item>
          1 {result.from} = {result.rate} {result.to}
        </Grid>
        <Grid key="to" item>
          1 {result.to} = {1 / result.rate} {result.from}
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {component}
      </Grid>
      <br />
      <Divider />
    </>
  );
};

export default ConversionResult;
