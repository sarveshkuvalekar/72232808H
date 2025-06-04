import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

export const getStocks = async () => {
  const res = await axios.get(`${BASE_URL}/stocks`);
  return res.data.stocks;
};

export const getStockPrices = async (ticker, minutes) => {
  const url = minutes
    ? `${BASE_URL}/stocks/${ticker}?minutes=${minutes}`
    : `${BASE_URL}/stocks/${ticker}`;
  const res = await axios.get(url);
  return res.data;
};
