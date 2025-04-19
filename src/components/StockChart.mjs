import { liveStockChart } from '../utils/consts.mjs';
import { getLocalStorage } from '../utils/utils.mjs';

export default class StockChart extends HTMLElement {
  constructor(data) {
    super();
    this.attachShadow({ mode: 'open' });

    this.canvas = document.createElement('canvas');

    this.tooltip = document.createElement('div');
    this.tooltip.style.position = 'absolute';
    this.tooltip.style.background = '#333';
    this.tooltip.style.color = '#fff';
    this.tooltip.style.padding = '4px 8px';
    this.tooltip.style.borderRadius = '4px';
    this.tooltip.style.fontSize = '12px';
    this.tooltip.style.pointerEvents = 'none';
    this.tooltip.style.transform = 'translate(-50%, -100%)';
    this.tooltip.style.display = 'none';

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';

    wrapper.appendChild(this.canvas);
    wrapper.appendChild(this.tooltip);

    this.shadowRoot.appendChild(wrapper);

    this.canvas.addEventListener('mousemove', this.handleHover.bind(this));
    this.canvas.addEventListener('mouseleave', () => {
      this.tooltip.style.display = 'none';
    });

    this._data = getLocalStorage(liveStockChart) || [];
    this.maxPoints = 300;

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });
    this.resizeObserver.observe(wrapper);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  set data(values) {
    this._data = values.slice(-this.maxPoints);
    this.drawChart();
  }

  addPoint(value) {
    this._data.push(value);
    if (this._data.length > this.maxPoints) {
      this._data.shift();
    }
    this.drawChart();
  }

  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.drawChart();
  }

  handleHover(event) {
    if (this._data.length === 0) return;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const padding = 50;
    const width = this.canvas.width - 2 * padding;
    const stepX = width / (this.maxPoints - 1);

    let index = Math.round((mouseX - padding) / stepX);
    index = Math.max(0, Math.min(this._data.length - 1, index));

    const price = this._data[index];
    const time = new Date().toLocaleTimeString();

    const x = padding + index * stepX;
    const maxPrice = Math.max(...this._data) + 100;
    const minPrice = Math.min(...this._data) - 100;
    const height = this.canvas.height - 2 * padding;
    const y =
      this.canvas.height -
      padding -
      ((price - minPrice) / (maxPrice - minPrice)) * height;

    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
    this.tooltip.style.display = 'block';
    this.tooltip.innerHTML = `
      <strong>$${price.toFixed(2)}</strong><br />
      <small>${time}</small>
    `;
  }

  drawChart() {
    const ctx = this.canvas.getContext('2d');
    const data = this._data;
    if (
      data.length === 0 ||
      this.canvas.width === 0 ||
      this.canvas.height === 0
    )
      return;

    const padding = 50;
    const width = this.canvas.width - 2 * padding;
    const height = this.canvas.height - 2 * padding;

    const maxPrice = Math.max(...data);
    const minPrice = Math.min(...data);
    const stepX = width / (this.maxPoints - 1);

    const getY = (price) =>
      this.canvas.height -
      padding -
      ((price - minPrice) / (maxPrice - minPrice)) * height;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, this.canvas.height - padding);
    ctx.lineTo(this.canvas.width - padding, this.canvas.height - padding);
    ctx.strokeStyle = '#aaa';
    ctx.stroke();

    // Chart line
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    data.forEach((price, index) => {
      const x = padding + index * stepX;
      const y = getY(price);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Points
    ctx.fillStyle = 'blue';
    data.forEach((price, index) => {
      const x = padding + index * stepX;
      const y = getY(price);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
}

customElements.define('stock-chart', StockChart);
