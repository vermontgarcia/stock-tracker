import '../styles/main.css';
import '../styles/large.css';
import '../styles/news.css';
import heroNewsSmall from '../images/hero-news-small.webp';
import heroNewsMedium from '../images/hero-news-medium.webp';
import heroNewsLarge from '../images/hero-news-large.webp';
import FinnHubAPIClient from '../api/FinnHubAPIClient.mjs';
import { setupHeader } from '../components/header.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import { setupFooter } from '../components/footer.mjs';
import { capitalize, setPageMetadata } from '../utils/utils.mjs';
import { setupHeroImg } from '../components/heroImg.mjs';
import { beforeEnd, news } from '../utils/consts.mjs';
import { newsCardTemplate } from '../utils/templates.mjs';

const finnHubAPIClient = new FinnHubAPIClient();

export const renderNews = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main></main>
    <footer></footer>
  `;
  setPageMetadata(news);
  setupHeader(document.querySelector('header'));
  setupFooter(document.querySelector('footer'));
  setupHeroImg(document.querySelector('main'), {
    small: heroNewsSmall,
    medium: heroNewsMedium,
    large: heroNewsLarge,
    title: capitalize(news),
  });
  getNews('crypto');
};

const getNews = async (category = 'crypto') => {
  const news = await finnHubAPIClient.searchNewsByCategory(category);
  console.log(news);
  const newsContainer = `<div class="cards-container">${news
    .filter((item) => item.summary !== '')
    .map(newsCardTemplate)
    .join('')}</div>`;
  document.querySelector('main')?.insertAdjacentHTML(beforeEnd, newsContainer);
};
