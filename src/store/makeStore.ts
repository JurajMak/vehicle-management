import { observable, runInAction, makeObservable } from 'mobx';
import { Vehicle } from '../services/vehicle';
import { MakeType } from '../types/database';
class VehicleMakeStore {
  makeData: MakeType[] = [];
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
}

export const MakeStore = new VehicleMakeStore();
