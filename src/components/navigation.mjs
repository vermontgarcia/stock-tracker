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
      <a href="/charts" ${page === 'charts' ? 'class="active"' : ''}>Charts</a>
      <a href="/news" ${page === 'news' ? 'class="active"' : ''}>News</a>
      <a href="/watchlist" ${
        page === 'watchlist' ? 'class="active"' : ''
      }>Watchlist</a>
      <a href="/orders" ${page === 'orders' ? 'class="active"' : ''}>Orders</a>
    `;
  };
  setNavigation();
  enableResponsiveMenu();
};
