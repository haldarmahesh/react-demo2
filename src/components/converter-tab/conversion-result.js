import { Grid } from "@material-ui/core";
import React from "react";

const ConversionResult = ({ result }) => {
  if (result === null) {
    return null;
  }

  let component = null;
  if (result && result.state === "loading") {
    component = (
      <Grid key="loader" item>
        <h1>Loading..</h1>
      </Grid>
    );
  } else {
    component = (
      <>
        <Grid key="amount" item>
          <h1>
            {result.amount} {result.from} = {result.result} {result.to}
          </h1>
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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {component}
    </Grid>
  );
};

export default ConversionResult;
