import React, { useEffect, useState } from 'react';
import { getStocks, getStockPrices } from '../services/api';
import { Card, CardContent, Typography } from '@mui/material';
import { calculateCorrelationMatrix } from '../utils/stats';

const CorrelationHeatmap = ({ minutes = 50 }) => {
  const [matrix, setMatrix] = useState([]);
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stocks = await getStocks();
      const tickersList = Object.values(stocks).slice(0, 5); // Limit for demo
      setTickers(tickersList);

      const priceData = await Promise.all(tickersList.map(t =>
        getStockPrices(t, minutes)
      ));

      const cleanPrices = priceData.map(p =>
        p.map(item => item.price)
      );

      const corrMatrix = calculateCorrelationMatrix(cleanPrices);
      setMatrix(corrMatrix);
    };
    fetchData();
  }, [minutes]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Correlation Heatmap</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tickers.length + 1}, 1fr)` }}>
          <div></div>
          {tickers.map(t => <strong key={t}>{t}</strong>)}
          {matrix.map((row, i) => (
            <>
              <strong>{tickers[i]}</strong>
              {row.map((val, j) => (
                <div key={`${i}-${j}`} style={{
                  backgroundColor: `rgba(0, 0, 255, ${Math.abs(val)})`,
                  color: 'white',
                  padding: '4px'
                }}>
                  {val.toFixed(2)}
                </div>
              ))}
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
