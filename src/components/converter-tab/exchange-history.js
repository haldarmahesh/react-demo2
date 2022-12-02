import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getTimeSeries } from "../../services/exchange.service";
import LoaderComponent from "../loader";
import DaysDropDown from "./days-dropdown";
import HistoricalTable from "./historical-table";
import HistoryStats from "./history-stats";
function getFormattedDate(date) {
  return date.toISOString().split("T")[0];
}
function ExchangeHistory({ result, historyKey, duration, setDuration }) {
  const [history, setHistory] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (!result) {
      return;
    }
    if (result.amount && result.to && result.from) {
      (async () => {
        setLoader(true);
        const currentDate = new Date();
        const startDate = getFormattedDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), -duration)
        );
        const endDate = getFormattedDate(currentDate);
        const series = await getTimeSeries({
          from: result.from,
          to: result.to,
          endDate,
          startDate,
        });
        setHistory(series.rates);
        setLoader(false);
      })();
    }
  }, [historyKey, duration]);
  if (!result) {
    return null;
  }

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <h2>Exchange History</h2>
      </Grid>
      <Grid item>
        <DaysDropDown duration={duration} setDuration={setDuration} />
      </Grid>
      <Grid item container spacing={6}>
        {loader ? (
          <LoaderComponent />
        ) : (
          <>
            <Grid item xs={6}>
              <HistoricalTable data={history} to={result.to} />
            </Grid>
            <Grid item xs={6}>
              <HistoryStats history={history} to={result.to} />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default ExchangeHistory;
