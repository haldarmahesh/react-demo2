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
