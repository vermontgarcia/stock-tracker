export const heroImgTemplate = ({ large, medium, small, title }) => `
  <div class="hero">
    <picture>
      <source media="(min-width: 1000px)" srcset="${large}" />
      <source media="(min-width: 500px)" srcset="${medium}" />
      <img src="${small}" alt="Hero image header" width="500" height="313" />
    </picture>
    <h1>${title}</h1>
  </div>
`;

export const newsCardTemplat = ({
  id,
  category,
  datetime,
  image,
  source,
  headline,
  url,
  summary,
}) => `
  <div id="${id}-${category}" class="card news">
    <img src="${image}" alt="${source} logo image" />
    <p class="datetime">${datetime}</p>
    <p class="category">${category}</p>
    <p class="headline">${headline}</p>
    <p class="source">
      <a href="${url}" target="_blank"> ${source} </a>
    </p>
    <p class="summary">${summary}</p>
  </div>
`;
