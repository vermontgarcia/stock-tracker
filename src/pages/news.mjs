import heroNewsSmall from '../images/hero-news-small.webp';
import heroNewsMedium from '../images/hero-news-medium.webp';
import heroNewsLarge from '../images/hero-news-large.webp';
import '../styles/main.css';
import '../styles/large.css';
import FinnHubAPIClient from '../api/FinnHubAPIClient.mjs';
import { setupHeader } from '../components/header.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import { setupFooter } from '../components/footer.mjs';
import { capitalize, setPageMetadata } from '../utils/utils.mjs';
import { setupHeroImg } from '../components/heroImg.mjs';
import { beforeEnd, news } from '../utils/consts.mjs';
import { newsCardTemplat } from '../utils/templates.mjs';
import { newsData } from '../utils/tempData.mjs';

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
  setupNavigation(document.querySelector('nav'), news);
  setupHeroImg(document.querySelector('main'), {
    small: heroNewsSmall,
    medium: heroNewsMedium,
    large: heroNewsLarge,
    title: capitalize(news),
  });

  document
    .querySelector('main')
    ?.insertAdjacentHTML(beforeEnd, newsCardTemplat(newsData()[0]));
};

const getNews = async (category = 'crypto') => {
  const news = await finnHubAPIClient.searchNewsByCategory(category);
  console.log(news);
};

// getNews('crypto');
