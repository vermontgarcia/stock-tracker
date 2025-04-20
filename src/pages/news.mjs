import '../styles/main.css';
import '../styles/news.css';
import '../styles/large.css';
import heroNewsSmall from '../images/hero-news-small.webp';
import heroNewsMedium from '../images/hero-news-medium.webp';
import heroNewsLarge from '../images/hero-news-large.webp';
import { setupHeader } from '../components/header.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import { setupFooter } from '../components/footer.mjs';
import {
  capitalize,
  getLocalStorage,
  setPageMetadata,
} from '../utils/utils.mjs';
import { setupHeroImg } from '../components/heroImg.mjs';
import { afterEnd, beforeEnd, lastSearch, news } from '../utils/consts.mjs';
import { newsCardTemplate } from '../utils/templates.mjs';
import { NewsSearchBar } from '../components/NewsSearchBar.mjs';

const restoreLastSearch = () => {
  const news = getLocalStorage(lastSearch) || [];
  const newsContainer = `<div id="cards-container" class="cards-container">${news
    .filter((item) => item.summary !== '')
    .map(newsCardTemplate)
    .join('')}</div>`;
  document.querySelector('main')?.insertAdjacentHTML(beforeEnd, newsContainer);

  const cards = document.querySelectorAll('.card.news');

  cards.forEach((card) => {
    const dialog = card.querySelector('dialog');
    const closeBtn = dialog.querySelector('button');

    card.addEventListener('click', (e) => {
      if (e.target.closest('dialog') || e.target.tagName === 'BUTTON') return;
      dialog.showModal();
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dialog.close();
    });
  });
};

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
  const searchBar = new NewsSearchBar(
    document.querySelector('.hero'),
    afterEnd
  );
  searchBar.init();
  restoreLastSearch();
};
