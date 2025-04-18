export const setupNavigation = (element, page = 'home') => {
  const setNavigation = () => {
    element.innerHTML = `
      <a href="index.html" ${page === 'home' ? 'class="active"' : ''}>Home</a>
      <a href="discover.html">Discover</a>
      <a href="directory.html">Directory</a>
      <a href="join.html">Join</a>
    `;
  };
  setNavigation();
};
