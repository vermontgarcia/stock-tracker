import { stNewsCat } from './consts.mjs';

export const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const getLastUpdate = () => {
  const date = document.lastModified;
  return date.toLocaleString();
};

export const convertToJson = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const setPageMetadata = (page) => {
  const capitalized = capitalize(page);
  document.querySelector(
    'head > title'
  ).innerHTML = `${capitalized} | Stock Tracker App`;
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute('content', `https://stoktraker.netlify.app/${page}`);
  document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute(
      'content',
      `https://stoktraker.netlify.app/images/og-${page}.webp`
    );
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getNewsCategories = () => getLocalStorage(stNewsCat) || [];

export const addNewsCategory = (category) => {
  const categories = getNewsCategories();
  const existingItemIndex = categories.findIndex(
    (item) => item === category.toLowerCase()
  );

  if (existingItemIndex < 0) {
    categories.push(category.toLowerCase());
    categories.sort();
  }
  setLocalStorage(stNewsCat, categories);
};
