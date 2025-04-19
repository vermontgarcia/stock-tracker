import '../styles/main.css';
import '../styles/home.css';
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
} from '../utils/utils.mjs';
import { setupHeroMainImg } from '../components/heroImg.mjs';
import {
  beforeEnd,
  BINANCE_BTCUSDT,
  charts,
  chartSimbol,
  lastSearch,
  liveStockChart,
  news,
  orders,
  watchlist,
} from '../utils/consts.mjs';
import { newsCardTemplate } from '../utils/templates.mjs';
import { FINNHUB_API_KEY, FINNHUB_WS_URL } from '../utils/consts.env.mjs';

const restoreLastSearch = () => {
  const news = getLocalStorage(lastSearch) || [];
  const newsContainer = `<div id="cards-container" class="cards-container">${news
    .filter((item) => item.summary !== '')
    .splice(0, 2)
    .map(newsCardTemplate)
    .join('')}</div>`;
  document
    .querySelector('#news-home')
    ?.insertAdjacentHTML(beforeEnd, newsContainer);
};

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

export const renderHome = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main>
      <div class="home-container" >
        <div id="news-home" class="news-home"></div>
        <div id="orders-home" class="orders-home"></div>
        <div id="charts-home" class="charts-home"><stock-chart></stock-chart></div>
        <div id="watchlist-home" class="watchlist-home"></div>
      </div>
    </main>
    <footer></footer>
  `;
  setupHeader(document.querySelector('header'));
  setupFooter(document.querySelector('footer'));
  setupNavigation(document.querySelector('nav'));

  setupHeroMainImg(document.querySelector('#news-home'), {
    small: heroNewsSmall,
    medium: heroNewsMedium,
    large: heroNewsLarge,
    title: capitalize(news),
  });
  setupHeroMainImg(document.querySelector('#charts-home'), {
    small: heroNewsSmall,
    medium: heroNewsMedium,
    large: heroNewsLarge,
    title: capitalize(charts),
  });
  setupHeroMainImg(document.querySelector('#watchlist-home'), {
    small: heroNewsSmall,
    medium: heroNewsMedium,
    large: heroNewsLarge,
    title: capitalize(watchlist),
  });
  setupHeroMainImg(document.querySelector('#orders-home'), {
    small: heroNewsSmall,
    medium: heroNewsMedium,
    large: heroNewsLarge,
    title: capitalize(orders),
  });

  restoreLastSearch();
  setupStockChart();
};
