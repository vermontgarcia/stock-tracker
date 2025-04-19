export const setupHeader = (element) => {
  const setHeader = () => {
    element.innerHTML = `
      <div>
        <div class="logo-container">
          <a href="/">
            <img
              class="logo"
              src="/images/logo.svg"
              alt="Stock Tracker App Logo"
              width="64"
              height="64"
            />
          </a>
          <div class="logo-name-container">
            <p>WDD330</p>
            <p>Stock Tracker App</p>
          </div>
        </div>
        <div class="menu-btn">
          <a id="menu-btn" role="button" class="menu-icon">
            <i id="menu-icon" class="material-icons">menu</i>
          </a>
        </div>
      </div>
      <nav class="menu" id="menu">
      </nav>
    `;
  };
  setHeader();
};
