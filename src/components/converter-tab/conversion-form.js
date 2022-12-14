import React, { useEffect } from "react";
import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Header from "./header";
import { convertCurrency } from "../../services/exchange.service";
import { storageService } from "../../services/storage.service";
const ConversionForm = ({
  symbolList,
  setAmount,
  setFromCurrencyCode,
  setToCurrencyCode,
  amount,
  fromCurrencyCode,
  toCurrencyCode,
  setConversionResult,
  initResult,
  setInitResult,
}) => {
  async function convertHandler(initResult) {
    setConversionResult((res) => ({ ...res, state: "loading" }));

    const res = await convertCurrency({
      from: fromCurrencyCode || (initResult && initResult.from),
      to: toCurrencyCode || (initResult && initResult.to),
      amount: amount || (initResult && initResult.amount),
    });
    const conversionResult = {
      result: res.result,
      rate: res.info.rate,
      ...res.query,
      createdAt: new Date().toLocaleString(),
    };
    storageService.setItem(
      conversionResult.createdAt,
      JSON.stringify(conversionResult)
    );

    setConversionResult((res) => ({
      ...conversionResult,
      state: null,
    }));
  }
  useEffect(() => {
    (async () => {
      if (initResult.amount && initResult.from && initResult.to) {
        setConversionResult((res) => ({ ...res, state: "loading" }));
        const res = await convertCurrency({
          from: fromCurrencyCode || (initResult && initResult.from),
          to: toCurrencyCode || (initResult && initResult.to),
          amount: amount || (initResult && initResult.amount),
        });
        const conversionResult = {
          result: res.result,
          rate: res.info.rate,
          ...res.query,
          createdAt: new Date().toLocaleString(),
        };
        setConversionResult((res) => ({
          ...conversionResult,
          state: null,
        }));
      }
    })();
  }, [initResult]);
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
          onClick={() => convertHandler()}
        >
          Convert
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConversionForm;
