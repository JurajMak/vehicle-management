import { observable, runInAction, makeObservable, action } from 'mobx';
import { Vehicle } from '../services/Vehicle';

export interface MakeType {
  id: string;
  created_at: Date;
  name: string;
  image: string;
  abrv: string;
}

class VehicleMakeStore {
  make: MakeType[] = [];
  singleMake: MakeType | null = null;
  singleMakeId: string = '';
  constructor() {
    makeObservable(this, {
      make: observable,
      singleMake: observable,
      singleMakeId: observable,
      setMakeData: action,
    });
  }

  setMakeData = (apiData: MakeType[]) => {
    this.make = apiData;
  };

  async getMake() {
    if (this.make.length === 0) {
      const apiData = await Vehicle.Make.get();
      runInAction(() => {
        this.setMakeData(apiData);
      });
    }
  }
  setSingleMake(apiData: MakeType, id: string) {
    this.singleMake = apiData;
    this.singleMakeId = id;
  }

  async getSingleMake(id: string) {
    if (this.singleMakeId !== id) {
      const apiData = await Vehicle.Make.getSingle(id);
      runInAction(() => {
        this.setSingleMake(apiData, id);
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
