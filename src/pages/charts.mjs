import '../styles/main.css';
import '../styles/charts.css';
import '../styles/large.css';
import heroNewsSmall from '../images/hero-news-small.webp';
import heroNewsMedium from '../images/hero-news-medium.webp';
import heroNewsLarge from '../images/hero-news-large.webp';
import StockChart from '../components/StockChart.mjs';
import { setupHeader } from '../components/header.mjs';
import { setupFooter } from '../components/footer.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import {
  capitalize,
  getLocalStorage,
  setLocalStorage,
  setPageMetadata,
} from '../utils/utils.mjs';
import {
  afterBegin,
  afterEnd,
  BINANCE_BTCUSDT,
  charts,
  chartSimbol,
  liveStockChart,
} from '../utils/consts.mjs';
import { setupHeroImg } from '../components/heroImg.mjs';
import { FINNHUB_API_KEY, FINNHUB_WS_URL } from '../utils/consts.env.mjs';
import { ChartSearchBar } from '../components/ChartSearchBar.mjs';

const addDataPoint = (point) => {
  const dataSet = getLocalStorage(liveStockChart) || [];
  dataSet.push(point);
  setLocalStorage(liveStockChart, dataSet);
};

const setupStockChart = () => {
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

export const renderCharts = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main><stock-chart></stock-chart></main>
    <footer></footer>
  `;
  setPageMetadata(charts);
  setupHeader(document.querySelector('header'));
  setupFooter(document.querySelector('footer'));
  setupNavigation(document.querySelector('nav'), charts);

  setupHeroImg(document.querySelector('main'), {
    small: heroNewsSmall,
    medium: heroNewsMedium,
    large: heroNewsLarge,
    title: capitalize(charts),
  });

  const searchBar = new ChartSearchBar(
    document.querySelector('.hero'),
    afterEnd
  );

  searchBar.init();

  setupStockChart();
};
