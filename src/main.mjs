import './styles/main.css';
import { setupHeader } from './components/header.mjs';
import { setupFooter } from './components/footer.mjs';
import { setupNavigation } from './components/navigation.mjs';

document.querySelector('#app').innerHTML = `
  <header></header>
  <main></main>
  <footer></footer>
`;

setupHeader(document.querySelector('header'));
setupFooter(document.querySelector('footer'));
setupNavigation(document.querySelector('nav'));
