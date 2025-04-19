import '../styles/main.css';
import '../styles/home.css';
import '../styles/large.css';
import heroNewsSmall from '../images/hero-news-small.webp';
import heroNewsMedium from '../images/hero-news-medium.webp';
import heroNewsLarge from '../images/hero-news-large.webp';
import { setupHeader } from '../components/header.mjs';
import { setupFooter } from '../components/footer.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import { capitalize, getLocalStorage } from '../utils/utils.mjs';
import { setupHeroMainImg } from '../components/heroImg.mjs';
import {
  beforeEnd,
  charts,
  lastSearch,
  news,
  orders,
  watchlist,
} from '../utils/consts.mjs';
import { newsCardTemplate } from '../utils/templates.mjs';
import {
  initAlphaChart,
  loadAlphaHistoricalCandles,
} from '../components/realTimeChart.mjs';

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

export const renderHome = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main>
      <div class="home-container" >
        <div id="news-home" class="news-home"></div>
        <div id="orders-home" class="orders-home"></div>
        <div id="charts-home" class="charts-home"><div id="alpha-chart"></div></div>
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
  initAlphaChart('alpha-chart');
  loadAlphaHistoricalCandles('AAPL', '1min');
};
