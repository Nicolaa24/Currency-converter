import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ConvertationItem from "./components/Convertation/ConvertationItem";

const App = () => {
  const [firstInput, setFirstInput] = useState(1);
  const [secondInput, setSecondInput] = useState(0);
  const [defaultCurrency, setDefaultCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState([]);
  const [date, setDate] = useState();

  const getСurrency = async () => {
    try {
      const res = await axios.get(
        "https://api.exchangerate.host/latest?base=UAH&symbols=UAH,EUR,USD"
      );
      setRates(res.data.rates);
      setDate(res.data.date);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getСurrency();
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleFirstAmountChange(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleFirstAmountChange(firstAmount) {
    setSecondInput(
      format((firstAmount * rates[toCurrency]) / rates[defaultCurrency])
    );
    setFirstInput(firstAmount);
  }

  function handleFirstCurrencyChange(currency1) {
    setSecondInput(format((firstInput * rates[toCurrency]) / rates[currency1]));
    setDefaultCurrency(currency1);
  }

  function handleSecondAmountChange(secondAmount) {
    setFirstInput(
      format((secondAmount * rates[defaultCurrency]) / rates[toCurrency])
    );
    setSecondInput(secondAmount);
  }

  function handleSecondCurrencyChange(currency2) {
    setFirstInput(
      format((secondInput * rates[defaultCurrency]) / rates[currency2])
    );
    setToCurrency(currency2);
  }
  return (
    <div>
      <Header currency={rates} date={date} />
      <div className="w-[400px] flex flex-col bg-teal-600 m-auto p-5 rounded-xl">
        <ConvertationItem
          onAmountChange={handleFirstAmountChange}
          onCurrencyChange={handleFirstCurrencyChange}
          currencies={Object.keys(rates)}
          amount={firstInput}
          currency={defaultCurrency}
        />
        <ConvertationItem
          onAmountChange={handleSecondAmountChange}
          onCurrencyChange={handleSecondCurrencyChange}
          currencies={Object.keys(rates)}
          amount={secondInput}
          currency={toCurrency}
        />
      </div>
    </div>
  );
};

export default App;
