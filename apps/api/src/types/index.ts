export interface SupabaseJWTPayload {
  sub: string;
  email: string;
  role: string;
  iss: string;
  exp: number;
  iat: number;
  phone?: string;
  session_id?: string;
  app_metadata?: {
    provider: string;
    providers: string[];
  };
  user_metadata?: {
    full_name?: string;
    email?: string;
    picture?: string;
    provider_id?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
