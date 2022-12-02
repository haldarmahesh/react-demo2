import React from "react";
import { Container, Grid } from "@material-ui/core";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function ExchangeHistoryChart({ history, to }) {
  console.log("H", history);
  const options = {
    title: {
      text: "My chart",
    },
    xAxis: {
      categories: history && Object.keys(history).map((item) => item),
    },
    series: [
      {
        data: Object.values(history).map((item) => item[to]),
      },
    ],
  };
  return (
    <Container>
      <Grid container margin={5}>
        <Grid item xs={12}>
          <h1>Chart</h1>
        </Grid>
        <Grid item xs={6}>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <br />
          <br />
          <br />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExchangeHistoryChart;
