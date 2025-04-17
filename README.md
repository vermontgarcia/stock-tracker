# 📈 Stock Tracker (MVP)

A mobile-responsive, real-time stock and forex tracking web application built with **HTML5**, **CSS**, and **Vanilla JavaScript**. This MVP includes essential trading tools like a customizable **watchlist**, **real-time chart**, **dashboard overview**, and **order placement** using Alpaca’s paper trading API.

---

## 🚀 Features

- 📊 **Real-Time Charts** using [Finnhub WebSocket API](https://finnhub.io/)
- 📋 **Watchlist** to track your favorite stocks or forex pairs
- 📉 **Dashboard Overview** with live market stats (price, change %, volume, etc.)
- 💰 **Order Placement** (Buy/Sell) with [Alpaca Paper Trading API](https://alpaca.markets/)
- 📱 **Mobile-First Design** – optimized for phones, tablets, and desktops

---

## 🛠 Tech Stack

- **HTML5**, **CSS3**, **JavaScript (Vanilla JS)**
- **APIs:**
  - [Alpaca API](https://alpaca.markets/) – for simulated trade execution
  - [Finnhub API](https://finnhub.io/) – real-time stock and forex data (WebSocket)
  - [Alpha Vantage API](https://www.alphavantage.co/) – for technical indicators and historical data

---

## 📦 Getting Started

### 1. 🔑 API Keys Required

Create free accounts on the following platforms and generate API keys:

| API | Key Name | Notes |
|-----|----------|-------|
| Alpaca | `APCA-API-KEY-ID` & `APCA-API-SECRET-KEY` | Use Paper Trading mode |
| Finnhub | `FINNHUB_API_KEY` | Needed for WebSocket |
| Alpha Vantage | `ALPHA_VANTAGE_API_KEY` | Used for chart indicators |

Create a `config.js` file in the root directory to store your keys:

```js
// config.js (DO NOT COMMIT THIS FILE)
const CONFIG = {
  ALPACA_KEY: 'your-alpaca-key',
  ALPACA_SECRET: 'your-alpaca-secret',
  FINNHUB_KEY: 'your-finnhub-key',
  ALPHA_KEY: 'your-alpha-vantage-key',
};
