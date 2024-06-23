import React, { useState } from 'react';
import './icons/default/style.scss';
import './icons/flags/style.scss';
import './icons/symbols/style.scss';

const FiatCurrencyList = () => {
  // Define initial state using useState
  const [listItems] = useState([
    { fiatCurrencyCode: 'GBP', fiatCurrencyName: 'Pound Sterling', flagIcon: 'GBP', fiatSymbolIcon: 'icon fiat-currency-symbols-GBP' },
    { fiatCurrencyCode: 'USD', fiatCurrencyName: 'US Dollar', flagIcon: 'USD', fiatSymbolIcon: 'icon fiat-currency-symbols-USD' },
    { fiatCurrencyCode: 'CNY', fiatCurrencyName: 'Yuan', flagIcon: 'CNY', fiatSymbolIcon: 'icon fiat-currency-symbols-CNY' },
    { fiatCurrencyCode: 'EUR', fiatCurrencyName: 'EUR', flagIcon: 'EUR', fiatSymbolIcon: 'icon fiat-currency-symbols-EUR' },
    { fiatCurrencyCode: 'RUB', fiatCurrencyName: 'Rubel', flagIcon: 'RUB', fiatSymbolIcon: 'icon fiat-currency-symbols-RUB' },
    { fiatCurrencyCode: 'JPY', fiatCurrencyName: 'Yen', flagIcon: 'JPY', fiatSymbolIcon: 'icon fiat-currency-symbols-JPY' },
    { fiatCurrencyCode: 'ZAR', fiatCurrencyName: 'Rand', flagIcon: 'ZAR', fiatSymbolIcon: 'icon fiat-currency-symbols-ZAR' }
  ]);

  // Optional: Initialize translator or any other side effects can be managed here

  // Function to find a specific fiat currency item
  const getFiatCurrencyItem = (fiatCurrencyCode) => {
    return listItems.find((item) => item.fiatCurrencyCode === fiatCurrencyCode);
  };

  return (
    <div>
      {/* Rendering the list */}
      {listItems.map((item, index) => (
        <div key={index}>
          <p>Fiat Currency Code: {item.fiatCurrencyCode}</p>
          <p>Fiat Currency Name: {item.fiatCurrencyName}</p>
          <p>Flag Icon: {item.flagIcon}</p>
          <p>Fiat Symbol Icon: {item.fiatSymbolIcon}</p>
        </div>
      ))}
    </div>
  );
};

export default FiatCurrencyList;
