import React from 'react';
import { observer } from 'mobx-react';
import { MakeType, makeStore } from '../../store/MakeStore';

import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mantine/core';
import VehicleCard from '../../components/Cards/VehicleCard';

const Home = observer(() => {
  const navigate = useNavigate();
  React.useEffect(() => {
    makeStore.getMake();
  }, []);

  const handleNavigateEdit = (item: MakeType) => {
    navigate(`brand/${item.id}`, { state: item });
  };
  return (
    <Box size="xl">
      <Container size="xl">
        <Grid gutter="xl">
          {makeStore.make.map(item => {
            return (
              <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 4 }} key={item.id}>
                <VehicleCard
                  id={item.id}
                  name={item.name}
                  abrv={item.abrv}
                  image={item.image}
                  editBtnText="Edit Brand"
                  handleNavigation={() => navigate(`models/${item.id}`)}
                  navigateToEdit={() => handleNavigateEdit({ ...item })}
                  deleteVehicle={() => makeStore.deleteMake(item.id)}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
});

export default Home;
