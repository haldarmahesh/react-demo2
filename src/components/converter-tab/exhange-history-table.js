import { Grid } from "@material-ui/core";
import React from "react";
import HistoricalTable from "./historical-table";
import HistoryStats from "./history-stats";
const ExchangeHistoryTable = ({ history, to }) => {
  return (
    <>
      <Grid item xs={6}>
        <HistoricalTable data={history} to={to} />
      </Grid>
      <Grid item xs={6}>
        <HistoryStats history={history} to={to} />
      </Grid>
    </>
  );
};

export default ExchangeHistoryTable;
