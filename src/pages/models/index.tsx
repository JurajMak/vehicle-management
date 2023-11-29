import React from 'react';
import VehicleCard from '../../components/card/vehicle-card';
import { ModelStore } from '../../store/modelStore';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

const ModelsList = observer(() => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    ModelStore.getModels(id);
  }, []);

  return (
    <div>
      {ModelStore?.modelsData.map(model => {
        return (
          <VehicleCard
            key={model.id}
            id={model.id}
            name={model.name}
            abrv={model.abrv}
            handleNavigation={() => navigate(`/edit/${model.id}`)}
          />
        );
      })}
    </div>
  );
});

export default ModelsList;
