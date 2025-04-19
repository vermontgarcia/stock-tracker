import { ALPHA_API_KEY, ALPHA_BASE_URL } from '../utils/consts.env.mjs';
import { createChart, CandlestickSeries } from 'lightweight-charts';

let chart, candleSeries;

export const initAlphaChart = (containerId = 'chart') => {
  const container = document.getElementById(containerId);
  const { width, height } = container.getBoundingClientRect();
  chart = createChart(container, {
    width: width,
    height: height,
    layout: {
      backgroundColor: '#1e1e1e',
      textColor: '#ffffff',
    },
    grid: {
      vertLines: { color: '#333' },
      horzLines: { color: '#333' },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
  });

  const resizeObserver = new ResizeObserver(() => {
    const { width, height } = container.getBoundingClientRect();
    chart.resize(width, height || 300);
  });

  resizeObserver.observe(container);

  candleSeries = chart.addSeries(CandlestickSeries, {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  });
};

export const loadAlphaHistoricalCandles = async (
  symbol = 'AAPL',
  interval = '1min'
) => {
  const url = `${ALPHA_BASE_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=compact&apikey=${ALPHA_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const timeSeriesKey = `Time Series (${interval})`;
    const rawData = data[timeSeriesKey];

    if (!rawData) {
      console.error('No candle data found:', data);
      return;
    }

    const formattedData = Object.entries(rawData).map(([timeStr, values]) => ({
      time: Math.floor(new Date(timeStr).getTime() / 1000),
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
    }));

    candleSeries.setData(formattedData.reverse());
  } catch (err) {
    console.error('Error fetching Alpha Vantage data:', err);
  }
};
