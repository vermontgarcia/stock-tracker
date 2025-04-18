import '../styles/main.css';
import '../styles/large.css';
import { setupHeader } from '../components/header.mjs';
import { setupFooter } from '../components/footer.mjs';
import { setupNavigation } from '../components/navigation.mjs';

export const renderNews = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main>
      <h1>News</h1>
    </main>
    <footer></footer>
  `;

  setupHeader(document.querySelector('header'));
  setupFooter(document.querySelector('footer'));
  setupNavigation(document.querySelector('nav'), 'news');
};
