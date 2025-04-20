import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../utils/consts.env.mjs';
import { convertToJson } from '../utils/utils.mjs';
export default class FinnHubAPIClient {
  constructor() {
    this.baseUrl = FINNHUB_BASE_URL;
    this.apiKey = FINNHUB_API_KEY;
  }

  async searchNewsByCategory(category) {
    try {
      const response = await fetch(
        `${this.baseUrl}news?category=${category}&token=${this.apiKey}`
      );
      const data = await convertToJson(response);
      return data;
    } catch (error) {
      return [];
    }
  }

  async searchNewsByCompany(symbol, from, to) {
    try {
      const response = await fetch(
        `${this.baseUrl}company-news?symbol=${symbol}&from=${from}&to=${to}&token=${this.apiKey}`
      );
      const data = await convertToJson(response);
      return data;
    } catch (error) {
      return [];
    }
  }

  async searchSymbolByQuery(query) {
    try {
      const response = await fetch(
        `${this.baseUrl}search?q=${query}&token=${this.apiKey}`
      );
      const data = await convertToJson(response);
      return data;
    } catch (error) {
      return [];
    }
  }
}
