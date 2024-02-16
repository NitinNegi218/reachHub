import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StockComparison() {
  const [symbol1, setSymbol1] = useState('');
  const [symbol2, setSymbol2] = useState('');
  const [stockData1, setStockData1] = useState([]);
  const [stockData2, setStockData2] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleChangeSymbol1 = (event) => {
    setSymbol1(event.target.value);
  };

  const handleChangeSymbol2 = (event) => {
    setSymbol2(event.target.value);
  };

  const handleSubmit = () => {
    if (symbol1 && symbol2) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    const fetchData = async (symbol, setStockData) => {
      try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cn7fj49r01qgjtj4j4kgcn7fj49r01qgjtj4j4l0`);
        updateStockData(response.data, setStockData);
      } catch (error) {
        setError('Error fetching stock price.');
      }
    };

    const updateStockData = (newData, setStockData) => {
      setStockData(prevData => {
        const currentTime = new Date().toLocaleTimeString();
        const newEntry = { ...newData, time: currentTime };
        const newDataQueue = [...prevData, newEntry];
        return newDataQueue.length > 10 ? newDataQueue.slice(1) : newDataQueue;
      });
    };

    if (isFetching) {
      fetchData(symbol1, setStockData1);
      fetchData(symbol2, setStockData2);

      const intervalId = setInterval(() => {
        fetchData(symbol1, setStockData1);
        fetchData(symbol2, setStockData2);
      }, 5000); 

      return () => {
        clearInterval(intervalId); 
      };
    }
  }, [symbol1, symbol2, isFetching]);

  return (
    <div>
      <h2>Stock Comparison</h2>
      <div>
        <label htmlFor="symbol1">Enter Symbol 1: </label>
        <input type="text" id="symbol1" value={symbol1} onChange={handleChangeSymbol1} />
      </div>
      <div>
        <label htmlFor="symbol2">Enter Symbol 2: </label>
        <input type="text" id="symbol2" value={symbol2} onChange={handleChangeSymbol2} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p>{error}</p>}
      {isFetching && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3>Stock Price Table for {symbol1}</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price($)</th>
                </tr>
              </thead>
              <tbody>
                {stockData1.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.time}</td>
                    <td>{entry.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Stock Price Table for {symbol2}</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price($)</th>
                </tr>
              </thead>
              <tbody>
                {stockData2.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.time}</td>
                    <td>{entry.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockComparison;
