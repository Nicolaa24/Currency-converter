import React from "react";

const ConvertationItem = ({
  onAmountChange,
  onCurrencyChange,
  currencies,
  amount,
  currency,
}) => {
  return (
    <div className="group ">
      <div className=" p-4">
        <input
          type="text"
          value={amount}
          onChange={(ev) => onAmountChange(ev.target.value)}
        />
        <select
          value={currency}
          onChange={(ev) => onCurrencyChange(ev.target.value)}
        >
          {currencies.map((currency) => (
            <option key={Math.random()} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ConvertationItem;
