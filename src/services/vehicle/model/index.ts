import { supabase } from '../../supabase';
import { ModelType } from '../../../types/database';

export class Model {
  static modelEndpoint = 'vehicle_model';

  static get = async (id: string): Promise<ModelType[]> => {
    let query = supabase.from(this.modelEndpoint).select('*').eq('make_id', id);
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
  static getSingle = async (id: string): Promise<ModelType> => {
    let query = supabase.from(this.modelEndpoint).select('*').eq('id', id).single();
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };
}
