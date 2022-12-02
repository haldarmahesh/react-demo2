import { FormControlLabel, Grid, Radio, RadioGroup } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getTimeSeries } from "../../services/exchange.service";
import LoaderComponent from "../loader";
import DaysDropDown from "./days-dropdown";
import ExchangeHistoryChart from "./exchange-history-chart";
import ExchangeHistoryTable from "./exhange-history-table";
function getFormattedDate(date) {
  return date.toISOString().split("T")[0];
}
function ExchangeHistory({ result, historyKey, duration, setDuration }) {
  const [history, setHistory] = useState(null);
  const [loader, setLoader] = useState(false);
  const [displayType, setDisplayType] = useState("table");
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
        const res = Object.keys(series.rates)
          .reverse()
          .reduce((acc, curr) => {
            acc[curr] = series.rates[curr];
            return acc;
          }, {});
        setHistory(res);
        setLoader(false);
      })();
    }
  }, [historyKey, duration]);
  console.log("HISS", history);
  if (!result) {
    return null;
  }

  return (
    <Grid container spacing={3} direction="rows">
      <Grid item xs={12}>
        <h2>Exchange History</h2>
      </Grid>
      <Grid item xs={5}>
        <DaysDropDown duration={duration} setDuration={setDuration} />
      </Grid>
      <Grid item>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
          onChange={(event) => {
            console.log("RADIO", event.target.value);
            setDisplayType(event.target.value);
          }}
        >
          <FormControlLabel
            control={<Radio color="primary" value={"table"} />}
            label="Table"
            checked={displayType === "table"}
          />
          <FormControlLabel
            checked={displayType === "chart"}
            control={<Radio value="chart" color="primary" />}
            label="Chart"
          />
        </RadioGroup>
      </Grid>
      <Grid item container spacing={6}>
        {loader ? (
          <LoaderComponent />
        ) : (
          <>
            {displayType === "table" ? (
              <ExchangeHistoryTable history={history} to={result.to} />
            ) : (
              <ExchangeHistoryChart to={result.to} history={history} />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default ExchangeHistory;
