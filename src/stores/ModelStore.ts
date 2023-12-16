import { observable, runInAction, makeObservable, action, reaction } from 'mobx';
import { IGetResponse, IModel } from '../types';
import { Vehicle } from '../services/Vehicle';

export class VehicleModelStore {
  models: IModel[] = [];
  make_id: string = '';
  singleModel: IModel | null = null;
  singleModelId: string = '';
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageCount: number = 1;
  searchQuery: string = '';
  sort: string = '';
  cache: Map<string, IGetResponse<IModel[]>> = new Map();
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
      sort: observable,
      setModels: action,
      setLoading: action,
      setSingleModel: action,
      deleteModel: action,
      setPageIndex: action,
      setPageCount: action,
      setSearchQuery: action,
      setSort: action,
    });
    reaction(
      () => ({
        searchQuery: this.searchQuery,
        pageIndex: this.pageIndex,
        sort: this.sort,
      }),
      () => {
        this.getModels(this.make_id);
      },
    );
  }

  setModels(apiData: IModel[], id: string) {
    this.models = apiData;
    this.make_id = id;
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
  setSingleModel(apiData: IModel, id: string) {
    this.singleModel = apiData;
    this.singleModelId = id;
  }
  setSort(sort: string) {
    this.sort = sort;
  }

  async getModels(id: string) {
    this.setLoading(true);
    const cacheKey = `Model_${this.pageIndex}_${this.searchQuery}_${id}_${this.sort}`;
    if (this.cache.has(cacheKey)) {
      const cacheData = this.cache.get(cacheKey);
      if (cacheData) {
        runInAction(() => {
          this.setModels(cacheData.data, id);
          this.setPageCount(cacheData.pageCount);
          this.setLoading(false);
        });
      }
    } else {
      const apiData = await Vehicle.Model.get({
        pageIndex: this.pageIndex,
        searchQuery: this.searchQuery,
        id,
        sort: this.sort,
      });
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
      this.cache.clear();
      this.setPageIndex(1);
    });
  }
}

export const modelStore = new VehicleModelStore();
