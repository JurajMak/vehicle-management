import React from 'react';
import { modelStore } from '../../store/ModelStore';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import VehicleCard from '../../components/Cards/VehicleCard';

const ModelsList = observer(() => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    modelStore.getModels(id);
  }, [id]);

  return (
    <div>
      {modelStore?.modelsData.map(model => {
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
