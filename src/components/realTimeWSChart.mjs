import { createChart, CandlestickSeries } from 'lightweight-charts';
import { FINNHUB_API_KEY, FINNHUB_WS_URL } from '../utils/consts.env.mjs';
import { addDataLocalStorage } from '../utils/utils.mjs';

let chart, candleSeries;
const lastCandle = {};

export const initFinnHubChart = (containerId = 'chart') => {
  const container = document.getElementById(containerId);
  const { width, height } = container.getBoundingClientRect();
  chart = createChart(container, {
    width,
    height,
    layout: {
      backgroundColor: '#1e1e1e',
      textColor: '#ffffff',
    },
    timeScale: { timeVisible: true, secondsVisible: false },
  });

  const resizeObserver = new ResizeObserver(() => {
    const { width, height } = container.getBoundingClientRect();
    chart.resize(width, height || 300);
  });

  resizeObserver.observe(container);

  candleSeries = chart.addSeries(CandlestickSeries, {
    upColor: '#26a69a',
    downColor: '#ef5350',
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
    borderVisible: false,
  });
};

export const connectWebSocket = (symbol = 'BINANCE:BTCUSDT', interval = 60) => {
  const socket = new WebSocket(`${FINNHUB_WS_URL}/?token=${FINNHUB_API_KEY}`);

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ type: 'subscribe', symbol }));
  });

  socket.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type !== 'trade') return;

    addDataLocalStorage(msg, `finn-ws-${symbol}`);

    msg.data.forEach((trade) => {
      const timestamp = Math.floor(trade.t / 1000);
      const bucket = timestamp - (timestamp % interval);

      if (!lastCandle[bucket]) {
        lastCandle[bucket] = {
          time: bucket,
          open: trade.p,
          high: trade.p,
          low: trade.p,
          close: trade.p,
        };
      } else {
        const c = lastCandle[bucket];
        c.high = Math.max(c.high, trade.p);
        c.low = Math.min(c.low, trade.p);
        c.close = trade.p;
      }

      candleSeries.update(lastCandle[bucket]);
    });
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket closed');
  });
};
