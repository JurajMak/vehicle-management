import { observable, runInAction, makeObservable } from 'mobx';

import { Vehicle } from '../services/Vehicle';

export interface ModelType {
  id: string;
  created_at: Date;
  name: string;
  abrv: string;
  make_id: string;
  image: string;
}

class VehicleModelStore {
  models: ModelType[] = [];
  modelId: string = '';
  singleModel: ModelType | null = null;
  singleModelId: string = '';
  isLoading: boolean = true;
  constructor() {
    makeObservable(this, {
      models: observable,
      singleModel: observable,
      modelId: observable,
      singleModelId: observable,
    });
  }

  setModel(apiData: ModelType[], id: string) {
    this.models = apiData;
    this.modelId = id;
  }
  setLoading(condition: boolean) {
    this.isLoading = condition;
  }

  async getModels(id: string) {
    if (this.modelId !== id) {
      const apiData = await Vehicle.Model.get(id);
      runInAction(() => {
        this.setModel(apiData, id);
      });
    }
  }
  setSingleModel(apiData: ModelType, id: string) {
    this.singleModel = apiData;
    this.singleModelId = id;
  }

  async getSingleModel(id: string) {
    if (this.singleModelId !== id) {
      const apiData = await Vehicle.Model.getSingle(id);
      runInAction(() => {
        this.setSingleModel(apiData, id);
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
