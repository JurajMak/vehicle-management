import { supabase } from '../../Supabase';
import { MakeType } from '../../../store/MakeStore';
import { FixMeLater } from '../../../types';

interface UploadFileType {
  file: File;
  storageName: string;
}
interface GetParams {
  pageIndex: number;
  searchQuery: string;
}
interface GetResponse {
  data: MakeType[];
  pageCount: number;
}
const PAGE_SIZE = 5;
export class Make {
  static makeEndpoint = 'vehicle_make';

  static get = async ({ pageIndex, searchQuery }: GetParams): Promise<GetResponse> => {
    const range = pageIndex ? pageIndex - 1 : 0;
    const offset = range * PAGE_SIZE;
    let query = supabase.from(this.makeEndpoint).select('*', { count: 'exact' });

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,abrv.ilike.%${searchQuery}%,country.ilike.%${searchQuery}%`);
    }

    if (offset) {
      query = query.range(offset, offset + PAGE_SIZE - 1);
    }

    const { data, error, count } = await query.limit(5);

    if (error) {
      throw new Error(error.message);
    }

    const PAGE_COUNT = count !== null ? Math.ceil(count / PAGE_SIZE) : 0;
    return {
      data: data ?? [],
      pageCount: PAGE_COUNT,
    };
  };

  static getSingle = async (id: string): Promise<MakeType> => {
    let query = supabase.from(this.makeEndpoint).select('*').eq('id', id).single();
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  static create = async (values: FixMeLater): Promise<void> => {
    const { error } = await supabase.from(this.makeEndpoint).insert(values).eq('id', values.id);
    if (error) {
      throw new Error(error.message);
    }
  };
  static edit = async (values: FixMeLater): Promise<void> => {
    const { error } = await supabase.from(this.makeEndpoint).update(values).eq('id', values.id);
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
