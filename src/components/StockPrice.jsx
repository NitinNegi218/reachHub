import React, { useState } from 'react';
import axios from 'axios';

function StockPrice() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Trim the symbol input to remove any leading or trailing white spaces
    const trimmedSymbol = symbol.trim();

    // Check if the trimmed symbol is empty
    if (!trimmedSymbol) {
      setError('Please enter a company symbol.');
      return;
    }

    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${trimmedSymbol}&token=cn7fj49r01qgjtj4j4kgcn7fj49r01qgjtj4j4l0`);

      // Check if the response data is empty
      if (!response.data) {
        setError('No data found for the entered symbol.');
        return;
      }

      setStockData(response.data);
    } catch (error) {
      setError('Invalid symbol. Please enter a valid company symbol.');
    }
  };

  return (
    <div>
      <h1>Stock Price App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={symbol} onChange={handleChange} placeholder="Enter company symbol" />
        <button type="submit">Get Price</button>
      </form>
      {error && <p>{error}</p>}
      {stockData && (
        <div>
          <h2>Current Price: {stockData.c}</h2>
          {/* Add additional features for historical data and comparisons here */}
        </div>
      )}
    </div>
  );
}

export default StockPrice;
