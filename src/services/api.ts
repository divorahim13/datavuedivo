import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});

export const dashboardService = {
  /**
   * Fetches country data for the acquisitions bar chart.
   * Maps real country data to our dashboard structure.
   */
  async getCountryAcquisitions() {
    try {
      const response = await api.get('/all?fields=name,cca2,population');
      // For demonstration, we'll pick top 5 countries by population as a proxy for 'acquisitions'
      return response.data
        .sort((a: any, b: any) => b.population - a.population)
        .slice(0, 5)
        .map((c: any) => ({
          name: c.name.common,
          count: Math.floor(c.population / 100000), // Randomize count based on population for realistic look
          code: c.cca2,
        }));
    } catch (error) {
      console.error('Error fetching country data:', error);
      throw new Error('Failed to fetch country acquisitions data');
    }
  }
};

export default api;
