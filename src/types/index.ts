export type FixMeLater = any;

export interface IGetResponse<T> {
  data: T;
  pageCount: number;
}

export interface IGetParams {
  pageIndex: number;
  searchQuery: string;
  sort: string;
  id?: string;
}

export interface IUploadFile {
  file: File;
  storageName: string;
}

export interface IMake {
  id: string;
  created_at: Date;
  name: string;
  image: string;
  abrv: string;
  country: string;
}

export interface IModel {
  id: string;
  created_at: Date;
  name: string;
  abrv: string;
  make_id: string;
  image: string;
  body_type: string;
  year: number;
  transmission: string;
  engine: string;
}

export interface ISelectItem {
  label: string;
  value: string;
}
