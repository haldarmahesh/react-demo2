import { Grid } from "@material-ui/core";
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
      spacing={2}
    >
      {component}
    </Grid>
  );
};

export default ConversionResult;
