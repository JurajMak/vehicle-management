import { supabase } from '../../Supabase';
import { MakeType } from '../../../store/MakeStore';

interface UploadFileType {
  file: File;
  storageName: string;
}

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

  static getSingle = async (id: string): Promise<MakeType> => {
    let query = supabase.from(this.makeEndpoint).select('*').eq('id', id).single();
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  static create = async (values: any): Promise<void> => {
    const { error } = await supabase.from(this.makeEndpoint).insert(values).eq('id', values.id);
    if (error) {
      throw new Error(error.message);
    }
  };
  static edit = async (values: any): Promise<void> => {
    const { error } = await supabase.from(this.makeEndpoint).update(values);
    if (error) {
      throw new Error(error.message);
    }
  };
  static delete = async (id: string): Promise<void> => {
    const { error } = await supabase.from(this.makeEndpoint).delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  };

  static getFileURL = async (key: string, storage: string = 'uploads'): Promise<string> => {
    const { data } = supabase.storage.from(storage).getPublicUrl(key);
    return data?.publicUrl;
  };

  static uploadFile = async ({ file, storageName }: UploadFileType): Promise<string> => {
    const fileName = file.name.split('.');
    const fileExt = fileName.pop();

    const filePath = `${fileName.join('')}-${new Date().getTime()}.${fileExt}`;
    const filePathWithoutSpaces = filePath.replace(/\s/g, '');

    const { error } = await supabase.storage.from(storageName).upload(filePathWithoutSpaces, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

    if (error) throw error;

    return this.getFileURL(filePathWithoutSpaces, storageName);
  };
}
