import React from "react";

const Header = ({ currency, date }) => {
  return (
    <header className="text-base bg-teal-600 flex justify-between  items-center w-screen drop-shadow-xl mb-11 py-4 text-2xl ">
      <div className="flex flex-col items-center">
        <span className="p-2 text-white">Today is {date}</span>
      </div>

      {Object.keys(currency).map((item) => (
        <p className="px-4 text-white " key={Math.random()}>
          {item}: {currency[item].toFixed(4)}
        </p>
      ))}
    </header>
  );
};

export default Header;
