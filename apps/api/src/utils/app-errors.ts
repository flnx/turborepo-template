//
import { PostgrestError } from '@supabase/supabase-js';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

// Transform Supabase errors into AppErrors
export function createDatabaseError(error: PostgrestError, status: number): AppError {
  switch (error.code) {
    case '23505': // unique_violation
      return new AppError(error.message, 409, error.code);
    case '23503': // foreign_key_violation
      return new AppError(error.message, 400, error.code);
    case '42501': // insufficient_privilege
      return new UnauthorizedError(error.message);
    case 'PGRST116': // Not Found
      return new NotFoundError(error.message);
    default:
      const isClientError = status && status >= 400 && status < 500;
      return new AppError(error.message, isClientError ? status : 500, error.code);
  }
}
