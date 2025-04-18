import { renderHome } from './pages/home.mjs';
import { renderCharts } from './pages/charts.mjs';
import { renderNews } from './pages/news.mjs';
import { renderWatchlist } from './pages/watchlist.mjs';
import { renderOrders } from './pages/orders.mjs';

const routes = {
  '/': renderHome,
  '/charts': renderCharts,
  '/news': renderNews,
  '/watchlist': renderWatchlist,
  '/orders': renderOrders,
};

const navigate = (path) => {
  history.pushState({}, '', path);
  routes[path]();
};

window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  routes[path]?.();
});

document.body.addEventListener('click', (e) => {
  if (e.target.matches('a[data-link]')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }
});

routes[window.location.pathname]?.();
