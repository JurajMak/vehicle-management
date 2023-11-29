import React from 'react';
import { observer } from 'mobx-react';
import { MakeStore } from '../../store/makeStore';
import VehicleCard from '../../components/card/vehicle-card';
import { useNavigate } from 'react-router-dom';
import { MakeType } from '../../types/database';

const Home = observer(() => {
  const navigate = useNavigate();
  React.useEffect(() => {
    MakeStore.getMake();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        {MakeStore?.makeData.map((make: MakeType) => {
          return (
            <VehicleCard
              key={make.id}
              id={make.id}
              name={make.name}
              abrv={make.abrv}
              handleNavigation={() => navigate(`${make.id}`)}
            />
          );
        })}
      </div>
    </>
  );
});

export default Home;
