// ... existing code ...
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string, cause?: unknown) {
    super(message, { cause });
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export async function handleErrorResponse(response: Response): Promise<never> {
  let errorMessage = 'Request failed';
  let errorCode: string | undefined;
  let errorCause: unknown;

  try {
    const errorData = await response.json();
    errorMessage =
      errorData?.message || errorData?.error || JSON.stringify(errorData);
    errorCode = errorData?.code;
    errorCause = errorData;
  } catch {
    errorMessage = response.statusText || `HTTP ${response.status}`;
  }

  throw new ApiError(errorMessage, response.status, errorCode, errorCause);
}
