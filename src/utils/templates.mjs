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

export const newsCardTemplate = ({
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
    <p class="category">${category.toUpperCase()}</p>
    <p class="datetime">${new Date(datetime * 1000)}</p>
    <p class="headline"><strong>${headline}</strong></p>
    <p class="source">
      <a href="${url}" target="_blank"> ${source.toUpperCase()} </a>
      <img src="${image}" alt="${source} logo image" width="15" height="12" loading="lazy" />
    </p>
    <p class="summary">${summary.substring(0, 300)}...</p>
    <dialog>${summary}</dialog>
  </div>
`;
