import { getAuthToken } from '@/utils/getAuth';

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseUrl = import.meta.env.VITE_API_URL || '';

if (!baseUrl) {
  console.warn('VITE_API_URL is not set');
}

async function requester<T>(
  endpoint: string,
  method: HttpMethod,
  data?: Record<string, unknown>,
  options?: RequestInit,
): Promise<T> {
  try {
    const session = await getAuthToken();
    if (!session) throw new Error('No token found');

    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      method,
      headers: {
        ...(method !== 'GET' && { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${session.token}`,
        ...options?.headers,
        ...(data && method !== 'GET' && { body: JSON.stringify(data) }),
      },
      // body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      await handleErrorResponse(response);
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

async function handleErrorResponse(response: Response): Promise<never> {
  let errorMessage = 'Request failed';
  let errorCode: string | undefined;

  try {
    const errorData = await response.json();
    errorMessage =
      errorData?.message || errorData?.error || JSON.stringify(errorData);
    errorCode = errorData?.code;
  } catch {
    // If JSON parsing fails, use status text
    errorMessage = response.statusText || `HTTP ${response.status}`;
  }

  const error: ApiError = {
    message: errorMessage,
    status: response.status,
    code: errorCode,
  };

  throw error;
}

// Export API methods
export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => {
    return requester<T>(endpoint, 'GET', undefined, options);
  },

  post: <T>(endpoint: string, data?: any, options?: RequestInit) => {
    return requester<T>(endpoint, 'POST', data, options);
  },

  put: <T>(endpoint: string, data?: any, options?: RequestInit) => {
    return requester<T>(endpoint, 'PUT', data, options);
  },

  delete: <T>(endpoint: string, options?: RequestInit) => {
    return requester<T>(endpoint, 'DELETE', undefined, options);
  },
};

export type { ApiError };
