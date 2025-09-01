import config from '@/config/options';

import { handleErrorResponse } from '@/utils/errorHandler';
import { getAuthToken } from '@/utils/getAuth';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseUrl = config.server_url;

async function requester<T>(
  endpoint: string,
  method: HttpMethod,
  data?: Record<string, unknown>,
  options?: RequestInit,
): Promise<T> {
  try {
    const session = await getAuthToken();
    if (!session) throw new Error('No token found');

    const hasBody = data && method !== 'GET';

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      ...options,
      method,
      headers: {
        ...(hasBody && { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${session.token}`,
        ...options?.headers,
      },
      ...(data && method !== 'GET' && { body: JSON.stringify(data) }),
    });

    if (!response.ok) {
      await handleErrorResponse(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return response.json();
    }

    // Return text for non-JSON responses
    return response.text() as T;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Something went wrong. Request failed.');
  }
}

// Export API methods
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => {
    return requester<T>(endpoint, 'GET', undefined, options);
  },

  post: <T>(
    endpoint: string,
    data: Record<string, unknown>,
    options?: RequestInit,
  ) => {
    return requester<T>(endpoint, 'POST', data, options);
  },

  put: <T>(
    endpoint: string,
    data?: Record<string, unknown>,
    options?: RequestInit,
  ) => {
    return requester<T>(endpoint, 'PUT', data, options);
  },

  delete: <T>(endpoint: string, options?: RequestInit) => {
    return requester<T>(endpoint, 'DELETE', undefined, options);
  },
};
