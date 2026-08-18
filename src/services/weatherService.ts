import { weatherClient } from '../lib/weatherClient';
import { WeatherData } from '../types';

export class WeatherService {
  /**
   * Get operational weather report for warehouse fulfillment and logistics
   */
  public async getCurrentWeather(lat?: number, lon?: number): Promise<{
    weather: WeatherData;
    impactAnalysis: {
      inboundRisk: 'LOW' | 'MEDIUM' | 'HIGH';
      coldStorageAlert: boolean;
      recommendation: string;
    };
  }> {
    const weather = await weatherClient.getWarehouseWeather(lat, lon);

    let inboundRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let recommendation = 'Logistics and delivery routes running on normal schedule.';

    if (weather.isAdverse || weather.windSpeed > 25) {
      inboundRisk = 'HIGH';
      recommendation = 'Storm or high winds detected. Reroute outbound couriers and secure outdoor bulk staging zones.';
    } else if (weather.windSpeed > 15 || weather.precipitation > 2) {
      inboundRisk = 'MEDIUM';
      recommendation = 'Precipitation expected to cause minor delays. Pre-stage priority express shipments.';
    }

    const coldStorageAlert = weather.temperature > 32;

    return {
      weather,
      impactAnalysis: {
        inboundRisk,
        coldStorageAlert,
        recommendation,
      },
    };
  }
}

export const weatherService = new WeatherService();
