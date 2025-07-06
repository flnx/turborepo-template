type AppMetadata = {
  provider: string;
  providers: string[];
};

type UserMetadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
};

type AuthMethodReference = {
  method: string;
  timestamp: number;
};

export type SupabaseAuthSession = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  role: string;
  aal: string;
  amr: AuthMethodReference[];
  session_id: string;
  is_anonymous: boolean;
};

export type SupabaseJWTPayload = {
  id: string;
  email: string;
  email_verified: boolean;
  full_name: string;
};
