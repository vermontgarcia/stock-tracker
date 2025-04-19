import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../utils/consts.env.mjs';
import { convertToJson } from '../utils/utils.mjs';

console.log('API_KEY', FINNHUB_API_KEY);
console.log('API_KEY', FINNHUB_BASE_URL);

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
}
