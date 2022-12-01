import React from "react";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Header from "./header";
import { convertCurrency } from "../../services/exchange.service";
const ConversionForm = ({
  symbolList,
  setAmount,
  setFromCurrencyCode,
  setToCurrencyCode,
  amount,
  fromCurrencyCode,
  toCurrencyCode,
  setConversionResult,
}) => {
  return (
    <Grid container spacing={3}>
      <Header />
      <Grid item xs={2}>
        <TextField
          fullWidth
          type="number"
          id="standard-basic"
          label="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </Grid>
      <Grid container item xs={8}>
        <Grid item xs={5}>
          <Autocomplete
            options={symbolList}
            getOptionLabel={(option) => option}
            value={fromCurrencyCode}
            onChange={(event, newCurrencyCode) => {
              setFromCurrencyCode(newCurrencyCode);
            }}
            renderInput={(params) => (
              <TextField fullWidth {...params} label="From" />
            )}
          />
        </Grid>
        <Grid item xs={2} container direction="row" justifyContent="center">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <CompareArrowsIcon
              onClick={() => {
                console.log("BBB", fromCurrencyCode, toCurrencyCode);
                setToCurrencyCode(fromCurrencyCode);
                setFromCurrencyCode(toCurrencyCode);
              }}
            />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <Autocomplete
            value={toCurrencyCode}
            options={symbolList}
            getOptionLabel={(option) => option}
            onChange={(event, newCurrencyCode) => {
              setToCurrencyCode(newCurrencyCode);
            }}
            renderInput={(params) => (
              <TextField fullWidth {...params} label="To" />
            )}
          />
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Button
          disabled={!(amount && fromCurrencyCode && toCurrencyCode)}
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={async () => {
            setConversionResult({ state: "loading" });
            const res = await convertCurrency({
              from: fromCurrencyCode,
              to: toCurrencyCode,
              amount: amount,
            });
            setConversionResult({
              result: res.result,
              rate: res.info.rate,
              ...res.query,
            });
          }}
        >
          Convert
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConversionForm;
