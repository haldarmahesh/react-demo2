export async function getSymbols() {
  const result = await fetch("https://api.exchangerate.host/symbols").then(
    (res) => res.json()
  );
  return result.symbols;
}

export async function convertCurrency({ from, to, amount }) {
  const result = await fetch(
    `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
  ).then((res) => res.json());

  return result;
}

export async function getTimeSeries({ from, to, startDate, endDate }) {
  const result = await fetch(
    `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${from}&symbols=${to}`
  ).then((res) => res.json());
  return result;
}
