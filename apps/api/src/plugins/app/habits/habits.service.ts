import { createService } from '../../../utils/createService';

export const getUserHabits = createService(async ({ supabase, user }) => {
  const data = await supabase.from('habits').select('*').eq('user_id', user.id);

  return data;
});
