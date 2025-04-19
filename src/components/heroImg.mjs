import { afterBegin } from '../utils/consts.mjs';
import { heroImgTemplate } from '../utils/templates.mjs';

export const setupHeroImg = (element, data) => {
  const setHero = () => {
    element.insertAdjacentHTML(afterBegin, heroImgTemplate(data));
  };
  setHero();
};
