import '../styles/main.css';
import '../styles/large.css';
import { setupHeader } from '../components/header.mjs';
import { setupFooter } from '../components/footer.mjs';
import { setupNavigation } from '../components/navigation.mjs';
import { setPageMetadata } from '../utils/utils.mjs';
import { orders } from '../utils/consts.mjs';

export const renderOrders = () => {
  document.querySelector('#app').innerHTML = `
    <header></header>
    <main></main>
    <footer></footer>
  `;
  setPageMetadata(orders);
  setupHeader(document.querySelector('header'));
  setupFooter(document.querySelector('footer'));
  setupNavigation(document.querySelector('nav'), orders);
};
