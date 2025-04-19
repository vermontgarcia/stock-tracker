import FinnHubAPIClient from '../api/FinnHubAPIClient.mjs';
import { FINNHUB_API_KEY, FINNHUB_WS_URL } from '../utils/consts.env.mjs';
import { liveStockChart, chartOptions } from '../utils/consts.mjs';
import { getLocalStorage, setLocalStorage } from '../utils/utils.mjs';
import StockChart from './StockChart.mjs';

export class ChartSearchBar {
  constructor(element, position) {
    this.element = element;
    this.position = position;
  }

  renderSearchBar() {
    this.element.insertAdjacentHTML(
      this.position,
      `
        <div class="search-box-container">
        <input type="text" id="searchInput" placeholder="type or select...">
        <div id="dropdown" class="dropdown"></div>
        <div class="icons-group" >
          <i id="search-icon" class="material-icons">search</i>
          <i id="add-icon" class="material-icons">add</i>
          <i id="clear-icon" class="material-icons">close</i>
        </div>
      `
    );
  }

  init() {
    this.renderSearchBar();
    this.searchInput = document.getElementById('searchInput');
    this.dropdown = document.getElementById('dropdown');
    this.searchIcon = document.getElementById('search-icon');
    this.addIcon = document.getElementById('add-icon');
    this.clearIcon = document.getElementById('clear-icon');

    // Show dropdown on focus
    this.searchInput?.addEventListener('focus', () =>
      this.renderDropdown(this.searchInput.value)
    );

    // Filter dropdown on input
    this.searchInput?.addEventListener('input', () =>
      this.renderDropdown(this.searchInput.value)
    );

    // Hide dropdown on outside click
    window.addEventListener('click', (e) => {
      if (!e.target.closest('#searchInput') && !e.target.closest('.dropdown')) {
        dropdown.style.display = 'none';
      }
    });

    this.searchIcon?.addEventListener('click', this.handleSearch.bind(this));
    this.addIcon?.addEventListener('click', this.saveOption.bind(this));
    this.clearIcon?.addEventListener('click', this.clearInput.bind(this));
  }

  getSavedOptions() {
    return getLocalStorage(chartOptions) || [];
  }

  renderDropdown(filter = '') {
    const options = this.getSavedOptions();
    this.dropdown.innerHTML = '';

    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      dropdown.style.display = 'none';
      return;
    }

    filtered.forEach((opt, index) => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';

      const label = document.createElement('span');
      label.textContent = opt;
      label.onclick = () => {
        this.searchInput.value = opt;
        this.dropdown.style.display = 'none';
      };

      const deleteBtn = document.createElement('i');
      deleteBtn.textContent = 'delete';
      deleteBtn.className = 'delete-btn material-icons';
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        this.deleteOption(opt);
      };

      item.appendChild(label);
      item.appendChild(deleteBtn);
      this.dropdown.appendChild(item);
    });

    this.dropdown.style.display = 'block';
  }

  setSavedOptions(options) {
    setLocalStorage(chartOptions, options);
  }

  async handleSearch() {
    const symbol = this.searchInput.value.trim();

    console.log(symbol);

    setLocalStorage(liveStockChart, []);

    const addDataPoint = (point) => {
      const dataSet = getLocalStorage(liveStockChart) || [];
      dataSet.push(point).slice(-600);
      setLocalStorage(liveStockChart, dataSet);
    };

    const setupStockChart = () => {
      const dataset = getLocalStorage(liveStockChart) || [];
      const stockChart = new StockChart();
      stockChart.data = dataset;

      const chart = document.querySelector('stock-chart');
      const socket = new WebSocket(
        `${FINNHUB_WS_URL}?token=${FINNHUB_API_KEY}`
      );
      const symbol = getLocalStorage(chartSimbol) || BINANCE_BTCUSDT;

      socket.addEventListener('open', (event) => {
        socket.send(JSON.stringify({ type: 'subscribe', symbol }));
      });

      socket.addEventListener('message', (event) => {
        try {
          const point = JSON.parse(event.data).data[0].p;
          addDataPoint(point);
          chart.addPoint(point);
        } catch (error) {
          console.error(error);
        }
      });
    };
    stockChart.data = [];
    setupStockChart();
  }

  saveOption() {
    const newOption = this.searchInput.value.trim();
    if (!newOption) return;

    const options = this.getSavedOptions();
    if (!options.includes(newOption)) {
      options.push(newOption);
      this.setSavedOptions(options);
    }
    this.renderDropdown(this.searchInput.value);
  }

  clearInput() {
    this.searchInput.value = '';
    this.dropdown.style.display = 'none';
  }

  deleteOption(optionToDelete) {
    let options = this.getSavedOptions();
    options = options.filter((opt) => opt !== optionToDelete);
    this.setSavedOptions(options);
    this.renderDropdown(this.searchInput.value);
  }
}
