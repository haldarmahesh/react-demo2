import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import ConversionForm from "./conversion-form";
import ConversionResult from "./conversion-result";
import { getSymbols } from "../../services/exchange.service";
import ExchangeHistory from "./exchange-history";
const ConverterTabComponent = ({}) => {
  const [symbols, setSymbols] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getSymbols();
      setSymbols(res);
    })();
  }, []);
  const [amount, setAmount] = useState(null);
  const [fromCurrencyCode, setFromCurrencyCode] = useState(null);
  const [toCurrencyCode, setToCurrencyCode] = useState(null);
  const [conversionResult, setConversionResult] = useState(null);
  const [duration, setDuration] = useState(7);
  return (
    <Container>
      <ConversionForm
        amount={amount}
        fromCurrencyCode={fromCurrencyCode}
        toCurrencyCode={toCurrencyCode}
        setAmount={setAmount}
        setFromCurrencyCode={setFromCurrencyCode}
        setToCurrencyCode={setToCurrencyCode}
        symbolList={symbols && Object.keys(symbols)}
        setConversionResult={setConversionResult}
      />
      <ConversionResult result={conversionResult} />
      <ExchangeHistory
        result={conversionResult}
        duration={duration}
        setDuration={setDuration}
        historyKey={`${conversionResult && conversionResult.amount}_${
          conversionResult && conversionResult.from
        }_${conversionResult && conversionResult.to}`}
      />
    </Container>
  );
};

export default ConverterTabComponent;
