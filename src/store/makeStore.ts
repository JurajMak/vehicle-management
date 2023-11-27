import { observable, runInAction, makeObservable } from 'mobx';
import { VehicleMakeType } from '../types/database';
import VehicleMakeService from '../services/vehicleMakeService';

class VehicleMakeStore {
  makeData: VehicleMakeType[] = [];
  makeDataService: VehicleMakeService;
  constructor() {
    this.makeDataService = new VehicleMakeService();
    makeObservable(this, {
      makeData: observable,
    });
  }

  setMakeData = (apiData: VehicleMakeType[]) => {
    this.makeData = apiData;
  };
  getVehicleMake = async () => {
    try {
      const apiData = await this.makeDataService.getMake();

      runInAction(() => {
        this.setMakeData(apiData);
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const MakeStore = new VehicleMakeStore();
