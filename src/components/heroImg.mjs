import { afterBegin } from '../utils/consts.mjs';
import { heroImgTemplate, heroMainImgTemplate } from '../utils/templates.mjs';

export const setupHeroImg = (element, data) => {
  const setHero = () => {
    element.insertAdjacentHTML(afterBegin, heroImgTemplate(data));
  };
  setHero();
};

export const setupHeroMainImg = (element, data) => {
  const setHero = () => {
    element.insertAdjacentHTML(afterBegin, heroMainImgTemplate(data));
  };
  setHero();
};
