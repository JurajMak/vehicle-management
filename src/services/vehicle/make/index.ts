import { supabase } from '../../supabase';
import type { MakeType } from '../../../types/database';

export class Make {
  static makeEndpoint = 'vehicle_make';

  static get = async (): Promise<MakeType[]> => {
    let query = supabase.from(this.makeEndpoint).select('*');
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
}
