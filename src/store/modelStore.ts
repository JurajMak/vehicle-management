import { observable, runInAction, makeObservable } from 'mobx';
import { VehicleModelType } from '../types/database';
import VehicleModelService from '../services/vehicleModelService';

class VehicleModelStore {
  modelData: VehicleModelType[] = [];
  modelDataService: VehicleModelService;
  constructor() {
    this.modelDataService = new VehicleModelService();
    makeObservable(this, {
      modelData: observable,
    });
  }

  setModelData = (apiData: VehicleModelType[]) => {
    this.modelData = apiData;
  };

  getVehicleMake = async () => {
    try {
      const apiData = await this.modelDataService.getModel();
      runInAction(() => {
        this.setModelData(apiData);
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const ModelStore = new VehicleModelStore();
