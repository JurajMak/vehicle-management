import { observable, runInAction, makeObservable } from 'mobx';
import { ModelType } from '../types/database';
import { Vehicle } from '../services/vehicle';

class VehicleModelStore {
  modelsData: ModelType[] = [];
  modelsId: string = '';
  singleModelData: ModelType | null = null;
  singleModelId: string = '';
  constructor() {
    makeObservable(this, {
      modelsData: observable,
      singleModelData: observable,
      modelsId: observable,
    });
  }

  setModelsData(apiData: ModelType[], id: string) {
    this.modelsData = apiData;
    this.modelsId = id;
  }

  async getModels(id: string) {
    try {
      const apiData = await Vehicle.Model.get(id);
      runInAction(() => {
        this.setModelsData(apiData, id);
      });
    } catch (error) {
      console.error(error);
    }
  }
  setSingleModelData(apiData: ModelType, id: string) {
    this.singleModelData = apiData;
    this.singleModelId = id;
    console.log(apiData, 'api');
  }

  async getSingleModel(id: string) {
    const apiData = await Vehicle.Model.getSingle(id);
    runInAction(() => {
      this.setSingleModelData(apiData, id);
    });
  }
}

export const ModelStore = new VehicleModelStore();
