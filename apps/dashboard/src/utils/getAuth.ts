import { supabase } from '@/utils/supabaseClient';

export async function getAuthToken() {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) return null;

  return {
    id: data.session.user.id!,
    email: data.session.user.email!,
    token: data.session.access_token!,
    role: data.session.user.role!,
    name: data.session.user.user_metadata.full_name!,
  };
}
