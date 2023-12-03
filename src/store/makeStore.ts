import { observable, runInAction, makeObservable } from 'mobx';
import { Vehicle } from '../services/Vehicle';

export interface MakeType {
  id: string;
  created_at: Date;
  name: string;
  image: string;
  abrv: string;
}

class VehicleMakeStore {
  makeData: MakeType[] = [];
  singleMakeData: MakeType | null = null;
  singleMakeId: string = '';
  constructor() {
    makeObservable(this, {
      makeData: observable,
    });
  }

  setMakeData = (apiData: MakeType[]) => {
    this.makeData = apiData;
  };

  getMake = async () => {
    try {
      const apiData = await Vehicle.Make.get();

      runInAction(() => {
        this.setMakeData(apiData);
      });
    } catch (error) {
      console.error(error);
    }
  };
  setSignleMakeData(apiData: MakeType, id: string) {
    this.singleMakeData = apiData;
    this.singleMakeId = id;
  }

  async getSingleMake(id: string) {
    const apiData = await Vehicle.Make.getSingle(id);
    runInAction(() => {
      this.setSignleMakeData(apiData, id);
    });
  }
}

export const makeStore = new VehicleMakeStore();
