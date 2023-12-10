import { observable, runInAction, makeObservable, action, reaction } from 'mobx';

import { Vehicle } from '../services/Vehicle';

export interface ModelType {
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

export class VehicleModelStore {
  models: ModelType[] = [];
  make_id: string = '';
  singleModel: ModelType | null = null;
  singleModelId: string = '';
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageCount: number = 1;
  searchQuery: string = '';
  cache = new Map();
  constructor() {
    makeObservable(this, {
      models: observable,
      singleModel: observable,
      make_id: observable,
      singleModelId: observable,
      pageIndex: observable,
      pageCount: observable,
      searchQuery: observable,
      isLoading: observable,
      setModels: action,
      setLoading: action,
      setSingleModel: action,
      deleteModel: action,
      setPageIndex: action,
      setPageCount: action,
      setSearchQuery: action,
    });
    reaction(
      () => ({
        searchQuery: this.searchQuery,
        pageIndex: this.pageIndex,
      }),
      () => {
        this.getModels(this.make_id);
      },
    );
  }

  setModels(apiData: ModelType[], id: string) {
    this.models = apiData;
    this.make_id = id;
    console.log(this.isLoading, 'loading');
  }
  setLoading(condition: boolean) {
    this.isLoading = condition;
  }
  setPageIndex(page: number) {
    this.pageIndex = page;
  }
  setPageCount(count: number) {
    this.pageCount = count;
  }
  setSearchQuery(search: string) {
    this.searchQuery = search;
  }
  setSingleModel(apiData: ModelType, id: string) {
    this.singleModel = apiData;
    this.singleModelId = id;
  }

  async getModels(id: string) {
    this.setLoading(true);
    const cacheKey = `Model_${this.pageIndex}_${this.searchQuery}_${id}`;
    if (this.cache.has(cacheKey)) {
      const cacheData = this.cache.get(cacheKey);
      runInAction(() => {
        this.setModels(cacheData.data, id);
        this.setPageCount(cacheData.pageCount);
        this.setLoading(false);
      });
    } else {
      const apiData = await Vehicle.Model.get({ pageIndex: this.pageIndex, searchQuery: this.searchQuery, id });
      runInAction(() => {
        this.setModels(apiData.data, id);
        this.setPageCount(apiData.pageCount);
        this.setLoading(false);
        this.cache.set(cacheKey, apiData);
      });
    }
  }

  async getSingleModel(id: string) {
    if (this.singleModelId !== id) {
      this.setLoading(true);
      const apiData = await Vehicle.Model.getSingle(id);
      runInAction(() => {
        this.setSingleModel(apiData, id);
        this.setLoading(false);
      });
    }
  }
  async deleteModel(id: string) {
    await Vehicle.Model.delete(id);
    runInAction(() => {
      this.models = this.models.filter(item => item.id !== id);
    });
  }
}

export const modelStore = new VehicleModelStore();
