import FinnHubAPIClient from '../api/FinnHubAPIClient.mjs';
import {
  beforeEnd,
  lastSearch,
  searchOptions,
  symbolsSearch,
} from '../utils/consts.mjs';
import { newsCardTemplate, searchSymbolTemplate } from '../utils/templates.mjs';
import { getLocalStorage, setLocalStorage } from '../utils/utils.mjs';

const finnHubAPIClient = new FinnHubAPIClient();

export class NewsSearchBar {
  constructor(element, position) {
    this.element = element;
    this.position = position;
    this.option = 'market';
  }

  renderSearchBar() {
    this.element.insertAdjacentHTML(
      this.position,
      `
        <form>
          <label>
            <input type="radio" name="option" value="market" checked>
            Market News
          </label>
          <label>
            <input type="radio" name="option" value="company">
            Company News
          </label>
          <label>
            <input type="radio" name="option" value="symbol">
            Symbols Search
          </label>
          <div id="dates" class="hidden">
            <label for="dob">From:
              <input type="date" id="from" name="from">
            </label>
            <label for="dob">To:
              <input type="date" id="to" name="to">
            </label>
          </div>
        </form>
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
    this.dates = document.getElementById('dates');

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

    const radios = document.querySelectorAll('input[name="option"]');
    radios.forEach((radio) => {
      radio.addEventListener('change', () => {
        this.option = document.querySelector(
          'input[name="option"]:checked'
        ).value;
        console.log('Now selected:', this.option);
        if (this.option === 'company') {
          this.dates.classList.remove('hidden');
        } else {
          this.dates.classList.add('hidden');
        }
      });
    });

    document.getElementById('from')?.addEventListener('change', (even) => {
      this.from = even.target.value;
      console.log('Selected date:', this.from);
    });
    document.getElementById('to')?.addEventListener('change', (even) => {
      this.to = even.target.value;
      console.log('Selected date:', this.to);
    });
  }

  addHadlerToNews() {
    const cards = document.querySelectorAll('.card.news');

    cards.forEach((card) => {
      const dialog = card.querySelector('dialog');
      const closeBtn = dialog.querySelector('button');

      card.addEventListener('click', (e) => {
        if (e.target.closest('dialog') || e.target.tagName === 'BUTTON') return;
        dialog.showModal();
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dialog.close();
      });
    });
  }

  getSavedOptions() {
    return getLocalStorage(searchOptions) || [];
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
    setLocalStorage(searchOptions, options);
  }

  async handleSearch() {
    if (this.option === 'market') {
      const category = this.searchInput.value.trim();
      if (category) {
        document.getElementById('cards-container')?.remove();
        try {
          const news = await finnHubAPIClient.searchNewsByCategory(category);
          setLocalStorage(lastSearch, news);
          if (news) {
            const newsContainer = `<div id="cards-container" class="cards-container">${news
              .filter((item) => item.summary !== '')
              .map(newsCardTemplate)
              .join('')}</div>`;
            document
              .querySelector('main')
              ?.insertAdjacentHTML(beforeEnd, newsContainer);
            this.addHadlerToNews();
          }
        } catch (error) {
          return;
        }
      }
    }
    if (this.option === 'company') {
      const symbol = this.searchInput.value.trim();
      if (symbol) {
        document.getElementById('cards-container')?.remove();
        try {
          const news = await finnHubAPIClient.searchNewsByCompany(
            symbol,
            this.from,
            this.to
          );
          setLocalStorage(lastSearch, news);
          if (news) {
            const newsContainer = `<div id="cards-container" class="cards-container">${news
              .filter((item) => item.summary !== '')
              .map(newsCardTemplate)
              .join('')}</div>`;
            document
              .querySelector('main')
              ?.insertAdjacentHTML(beforeEnd, newsContainer);
            this.addHadlerToNews();
          }
        } catch (error) {
          return;
        }
      }
    }
    if (this.option === 'symbol') {
      const query = this.searchInput.value.trim();
      if (query) {
        document.getElementById('cards-container')?.remove();
        try {
          const { result: symbols } =
            await finnHubAPIClient.searchSymbolByQuery(query);
          setLocalStorage(symbolsSearch, symbols);
          if (symbols) {
            const symbolsContainer = `<div id="cards-container" class="cards-container">${symbols
              .map(searchSymbolTemplate)
              .join('')}</div>`;
            document
              .querySelector('main')
              ?.insertAdjacentHTML(beforeEnd, symbolsContainer);
          }
        } catch (error) {
          return;
        }
      }
    }
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
