import facebookLogo from '../images/facebook.svg';
import twitterLogo from '../images/twitter.svg';
import instagramLogo from '../images/instagram.svg';
import { getLastUpdate, getYear } from '../utils/utils.mjs';

const updateFooterData = () => {
  document.getElementById('current-year').innerHTML = getYear();
  document.getElementById(
    'last-modified'
  ).innerHTML = `Last Modification: ${getLastUpdate()}`;
};

export const setupFooter = (element) => {
  const setFooter = () => {
    element.innerHTML = `
      <div>
        <p><strong></strong></p>
        <p>University Av</p>
        <p>Provo, Utah</p>
        <p>info@StockTracker.io</p>
        <p>(000)999-9999</p>
      </div>
      <div class="social-media">
        <a href="https://facebook.com" target="_blank">
          <img
            src="${facebookLogo}"
            alt="facebook-icon"
            width="32"
            height="32"
          />
        </a>
        <a href="https://twitter.com" target="_blank">
          <img
            src="${twitterLogo}"
            alt="twitter-icon"
            width="32"
            height="32"
          />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img
            src="${instagramLogo}"
            alt="instagram-icon"
            width="32"
            height="32"
          />
        </a>
      </div>
      <div>
        <p>WDD330 Class Project</p>
        <p>Vermont Garcia</p>
        <p class="copyright">
          © <span id="current-year"></span> Stock Tracker App
        </p>
        <p id="last-modified"></p>
      </div>
    `;
  };
  setFooter();
  updateFooterData();
};
