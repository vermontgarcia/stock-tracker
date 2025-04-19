import '../styles/main.css';
import '../styles/charts.css';
import '../styles/large.css';
import heroNewsSmall from '../images/hero-news-small.webp';
import heroNewsMedium from '../images/hero-news-medium.webp';
import heroNewsLarge from '../images/hero-news-large.webp';
import { setupHeader } from '../components/header.mjs';
import { setupFooter } from '../components/footer.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import { capitalize, setPageMetadata } from '../utils/utils.mjs';
import { afterEnd, BINANCE_BTCUSDT, charts } from '../utils/consts.mjs';
import { setupHeroImg } from '../components/heroImg.mjs';
import { ChartSearchBar } from '../components/ChartSearchBar.mjs';
import {
  initAlphaChart,
  loadAlphaHistoricalCandles,
} from '../components/realTimeChart.mjs';
import {
  connectWebSocket,
  initFinnHubChart,
} from '../components/realTimeWSChart.mjs';

export const renderCharts = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main>
      <div id="charts">
        <div id="alpha-chart"></div>
        <div id="finnhub-chart"></div>
      </div>
    </main>
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
  initAlphaChart('alpha-chart');
  loadAlphaHistoricalCandles('AAPL', '1min');
  initFinnHubChart('finnhub-chart');
  connectWebSocket(BINANCE_BTCUSDT, 60);
};
