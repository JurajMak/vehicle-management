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
  autocompleteData: MakeType[] = [];
  constructor() {
    makeObservable(this, {
      makeData: observable,
    });
  }

  setMakeData = (apiData: MakeType[]) => {
    this.makeData = apiData;
  };
  setAutocompleteData = (apiData: MakeType[]) => {
    this.autocompleteData = apiData;
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

export const makeStore = new VehicleMakeStore();
