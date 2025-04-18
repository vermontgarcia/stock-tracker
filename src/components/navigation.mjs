const enableResponsiveMenu = () => {
  const handleMenu = () => {
    const menu = document.getElementById('menu');
    const icon = document.getElementById('menu-icon');
    if (menu.classList.contains('menu-open')) {
      menu.classList.remove('menu-open');
      icon.innerHTML = 'menu';
    } else {
      menu.classList.add('menu-open');
      icon.innerHTML = 'close';
    }
  };
  document.getElementById('menu-btn').addEventListener('click', handleMenu);
};

export const setupNavigation = (element, page = 'home') => {
  const setNavigation = () => {
    element.innerHTML = `
      <a href="/" ${page === 'home' ? 'class="active"' : ''}>Home</a>
      <a href="charts.html">Charts</a>
      <a href="news.html">News</a>
      <a href="watchlist.html">Watchlist</a>
      <a href="Orders.html">Orders</a>
    `;
  };
  setNavigation();
  enableResponsiveMenu();
};
