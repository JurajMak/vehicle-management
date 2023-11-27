import React from 'react';
import { observer } from 'mobx-react';
import { MakeStore } from '../../store/makeStore';
import { ModelStore } from '../../store/modelStore';
import VehicleMakeCard from '../../components/card/vehicle-make-card';
import VehicleModelCard from '../../components/card/vehicle-model-card';

const Home = observer(() => {
  const getData = async () => {
    await MakeStore.getVehicleMake();
    await ModelStore.getVehicleMake();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>HOME dasdasdasdasd d sadasdasd </h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        {MakeStore?.makeData.map(make => {
          return <VehicleMakeCard key={make.id} id={make.id} name={make.name} abrv={make.abrv} />;
        })}
        {ModelStore?.modelData.map(model => {
          return <VehicleModelCard key={model.id} id={model.id} name={model.name} abrv={model.abrv} />;
        })}
      </div>
    </>
  );
});

export default Home;
