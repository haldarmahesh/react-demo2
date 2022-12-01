import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import ConversionForm from "./conversion-form";
import ConversionResult from "./conversion-result";
import { getSymbols } from "../../services/exchange.service";
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
  console.log("PARE", fromCurrencyCode, toCurrencyCode);
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
    </Container>
  );
};

export default ConverterTabComponent;
