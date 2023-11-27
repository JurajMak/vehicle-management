import { supabase } from './supabase';
import { SUPABASE_KEYS } from './supabase-keys';

export default class VehicleMakeService {
  getMake = async () => {
    let query = supabase.from(SUPABASE_KEYS.MAKE).select('*');
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
}
