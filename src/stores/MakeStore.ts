import { observable, runInAction, makeObservable, action, reaction } from 'mobx';
import { Vehicle } from '../services/Vehicle';
import { IMake, IGetResponse } from '../types';
import { act } from 'react-dom/test-utils';

export class VehicleMakeStore {
  make: IMake[] = [];
  singleMake: IMake | null = null;
  singleMakeId: string = '';
  isLoading: boolean = false;
  pageIndex: number = 1;
  pageCount: number = 1;
  searchQuery: string = '';
  sort: string = '';
  cache: Map<string, IGetResponse<IMake[]>> = new Map();
  constructor() {
    makeObservable(this, {
      make: observable,
      singleMake: observable,
      singleMakeId: observable,
      isLoading: observable,
      pageIndex: observable,
      pageCount: observable,
      searchQuery: observable,
      sort: observable,
      setMake: action,
      setLoading: action,
      setPageIndex: action,
      setPageCount: action,
      setSingleMake: action,
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
        this.getMake();
      },
    );
  }

  setMake = (apiData: IMake[]) => {
    this.make = apiData;
  };
  setLoading(condition: boolean) {
    this.isLoading = condition;
  }
  setPageIndex(page: number) {
    this.pageIndex = page;
  }
  setPageCount(count: number) {
    this.pageCount = count;
  }
  setSingleMake(apiData: IMake, id: string) {
    this.singleMake = apiData;
    this.singleMakeId = id;
  }
  setSearchQuery(search: string) {
    this.searchQuery = search;
  }

  setSort(sort: string) {
    this.sort = sort;
  }

  async getMake() {
    this.setLoading(true);
    const cacheKey = `Make_${this.pageIndex}_${this.searchQuery}_${this.sort}`;
    if (this.cache.has(cacheKey)) {
      const cacheData = this.cache.get(cacheKey);
      if (cacheData) {
        runInAction(() => {
          this.setMake(cacheData.data);
          this.setPageCount(cacheData.pageCount);
          this.setLoading(false);
        });
      }
    } else {
      const apiData = await Vehicle.Make.get({
        pageIndex: this.pageIndex,
        searchQuery: this.searchQuery,
        sort: this.sort,
      });
      runInAction(() => {
        this.setMake(apiData.data);
        this.setPageCount(apiData.pageCount);
        this.setLoading(false);
        this.cache.set(cacheKey, apiData);
      });
    }
  }

  async getSingleMake(id: string) {
    if (this.singleMakeId !== id) {
      this.setLoading(true);
      const apiData = await Vehicle.Make.getSingle(id);
      runInAction(() => {
        this.setSingleMake(apiData, id);
        this.setLoading(false);
      });
    }
  }

  async deleteMake(id: string) {
    await Vehicle.Make.delete(id);
    runInAction(() => {
      this.make = this.make.filter(item => item.id !== id);
    });
  }
}

export const makeStore = new VehicleMakeStore();
