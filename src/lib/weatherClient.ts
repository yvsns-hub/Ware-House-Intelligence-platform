import { WeatherData } from '../types';

/**
 * Reusable Weather Client
 * Reads configuration from .env and fetches real-time/forecast meteorological data.
 * Used by the decision engine to assess shipment delay risks and cold-chain temperature thresholds.
 */
export class WeatherClient {
  private openWeatherApiKey: string;
  private openMeteoUrl: string;

  constructor() {
    this.openWeatherApiKey = process.env.OPENWEATHER_API_KEY || '';
    this.openMeteoUrl =
      process.env.OPEN_METEO_URL ||
      process.env.Open_Meteo ||
      'https://api.open-meteo.com/v1/forecast';
  }

  /**
   * Fetch current weather conditions for warehouse coordinates
   * Default: Warehouse Hub Lat 40.7128, Lon -74.0060 (or configurable)
   */
  public async getWarehouseWeather(lat: number = 40.7128, lon: number = -74.006): Promise<WeatherData> {
    // 1. Try OpenWeather if API key is present
    if (this.openWeatherApiKey && this.openWeatherApiKey.trim().length > 0) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.openWeatherApiKey}&units=metric`;
        const res = await fetch(url, { next: { revalidate: 300 } });
        if (res.ok) {
          const data = await res.json();
          const condition = data.weather?.[0]?.main || 'Clear';
          const temp = data.main?.temp ?? 20;
          const wind = data.wind?.speed ?? 5;
          const rain = data.rain?.['1h'] ?? 0;
          const humidity = data.main?.humidity ?? 45;

          return {
            temperature: Math.round(temp * 10) / 10,
            windSpeed: Math.round(wind * 10) / 10,
            precipitation: rain,
            condition,
            humidity,
            isAdverse: condition === 'Thunderstorm' || condition === 'Snow' || wind > 25 || rain > 10,
            source: 'OpenWeather',
            timestamp: new Date().toISOString(),
          };
        }
      } catch (err) {
        console.warn('OpenWeather request failed, attempting Open-Meteo fallback:', err);
      }
    }

    // 2. Try Open-Meteo (No API key required)
    try {
      const url = `${this.openMeteoUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (res.ok) {
        const data = await res.json();
        const current = data.current || {};
        const temp = current.temperature_2m ?? 18.5;
        const wind = current.wind_speed_10m ?? 8.2;
        const precip = current.precipitation ?? 0;
        const humidity = current.relative_humidity_2m ?? 52;
        const weatherCode = current.weather_code ?? 0;

        const condition = this.mapWeatherCodeToCondition(weatherCode);

        return {
          temperature: temp,
          windSpeed: wind,
          precipitation: precip,
          condition,
          humidity,
          isAdverse: weatherCode > 60 || wind > 30 || precip > 5,
          source: 'Open-Meteo',
          timestamp: new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn('Open-Meteo request failed, using structured fallback:', err);
    }

    // 3. Fallback mock data
    return {
      temperature: 19.4,
      windSpeed: 11.2,
      precipitation: 0.0,
      condition: 'Partly Cloudy',
      humidity: 48,
      isAdverse: false,
      source: 'Fallback',
      timestamp: new Date().toISOString(),
    };
  }

  private mapWeatherCodeToCondition(code: number): string {
    if (code === 0) return 'Clear Sky';
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rain / Drizzle';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Heavy Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Clear';
  }
}

export const weatherClient = new WeatherClient();
