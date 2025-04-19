import '../styles/main.css';
import '../styles/large.css';
import { setupHeader } from '../components/header.mjs';
import { setupFooter } from '../components/footer.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import FinnHubAPIClient from '../api/FinnHubAPIClient.mjs';

export const renderHome = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main>
      <h1>Home</h1>
    </main>
    <footer></footer>
  `;
  setupHeader(document.querySelector('header'));
  setupFooter(document.querySelector('footer'));
  setupNavigation(document.querySelector('nav'));
};

const finnHubAPIClient = new FinnHubAPIClient();

const getNews = async (category = 'crypto') => {
  const news = await finnHubAPIClient.searchNewsByCategory(category);
  console.log(news);
};

// getNews('crypto');
