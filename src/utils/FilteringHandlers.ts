import { VehicleMakeStore } from '../stores/MakeStore';
import { VehicleModelStore } from '../stores/ModelStore';

interface ISearchHandler {
  query?: string | null;
  store: VehicleMakeStore | VehicleModelStore;
}

export const searchHandler = ({ query, store }: ISearchHandler) => {
  if (query) {
    if (query.length > 0) {
      store.setPageIndex(1);
      store.setSearchQuery(query ?? '');
    } else {
      return store.setSearchQuery('');
    }
  }
};

export const sortHandler = ({ query, store }: ISearchHandler) => {
  if (query) {
    store.setSort(query);
  } else {
    store.setSort('');
  }
};
