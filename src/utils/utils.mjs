import { stNewsCat } from './consts.mjs';

export const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const getLastUpdate = () => {
  const date = document.lastModified;
  return date.toLocaleString();
};

export const convertToJson = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const setPageMetadata = (page) => {
  const capitalized = capitalize(page);
  document.querySelector(
    'head > title'
  ).innerHTML = `${capitalized} | Stock Tracker App`;
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute('content', `https://stoktraker.netlify.app/${page}`);
  document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute(
      'content',
      `https://stoktraker.netlify.app/images/og-${page}.webp`
    );
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getNewsCategories = () => getLocalStorage(stNewsCat) || [];

export const addNewsCategory = (category) => {
  const categories = getNewsCategories();
  const existingItemIndex = categories.findIndex(
    (item) => item === category.toLowerCase()
  );

  if (existingItemIndex < 0) {
    categories.push(category.toLowerCase());
    categories.sort();
  }
  setLocalStorage(stNewsCat, categories);
};

export const setupStockChart = () => {
  const dataset = getLocalStorage(liveStockChart) || [];
  const stockChart = new StockChart();
  stockChart.data = dataset;

  const chart = document.querySelector('stock-chart');
  const socket = new WebSocket(`${FINNHUB_WS_URL}?token=${FINNHUB_API_KEY}`);
  const symbol = getLocalStorage(chartSimbol) || BINANCE_BTCUSDT;
  socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({ type: 'subscribe', symbol }));
  });

  socket.addEventListener('message', (event) => {
    const point = JSON.parse(event.data).data[0].p;
    addDataPoint(point);
    chart.addPoint(point);
  });
};

export const addDataLocalStorage = (data, key) => {
  const dataSet = getLocalStorage(key) || [];
  dataSet.push(data);
  setLocalStorage(key, dataSet);
};
