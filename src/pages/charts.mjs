import '../styles/main.css';
import '../styles/large.css';
import { setupHeader } from '../components/header.mjs';
import { setupFooter } from '../components/footer.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import { setPageMetadata } from '../utils/utils.mjs';
import { charts } from '../utils/consts.mjs';

export const renderCharts = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main>
      <h1>Charts</h1>
    </main>
    <footer></footer>
  `;
  setPageMetadata(charts);
  setupHeader(document.querySelector('header'));
  setupFooter(document.querySelector('footer'));
  setupNavigation(document.querySelector('nav'), charts);
};
