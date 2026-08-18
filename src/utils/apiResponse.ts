import { NextResponse } from 'next/server';
import { ApiResponse } from '../types';

/**
 * Standard HTTP JSON Response Helpers
 */

export function successResponse<T>(
  data: T,
  message?: string,
  meta?: { total?: number; page?: number; limit?: number; totalPages?: number },
  status: number = 200
) {
  const body: ApiResponse<T> = {
    success: true,
    data,
    message,
    meta,
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(
  error: string,
  status: number = 400,
  details?: any
) {
  const body: ApiResponse = {
    success: false,
    error,
    message: details ? (typeof details === 'string' ? details : JSON.stringify(details)) : undefined,
  };
  return NextResponse.json(body, { status });
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
) {
  const totalPages = Math.ceil(total / limit);
  return successResponse(data, message, {
    total,
    page,
    limit,
    totalPages,
  });
}
