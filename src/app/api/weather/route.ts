import { NextRequest } from 'next/server';
import { weatherService } from '@/services/weatherService';
import { successResponse, errorResponse } from '@/utils/apiResponse';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const lat = searchParams.has('lat') ? Number(searchParams.get('lat')) : undefined;
    const lon = searchParams.has('lon') ? Number(searchParams.get('lon')) : undefined;

    const weatherReport = await weatherService.getCurrentWeather(lat, lon);

    return successResponse(weatherReport, 'Weather condition report generated successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch weather report', 500);
  }
}
