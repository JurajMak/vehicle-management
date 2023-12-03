import React from 'react';
import { observer } from 'mobx-react';
import { makeStore } from '../../store/MakeStore';

import { useNavigate } from 'react-router-dom';
import { Box, Container, Flex, Grid } from '@mantine/core';
import VehicleCard from '../../components/Cards/VehicleCard';

const Home = observer(() => {
  const navigate = useNavigate();
  React.useEffect(() => {
    makeStore.getMake();
  }, []);

  return (
    <Box size="xl">
      <Grid gutter="xl">
        {makeStore?.makeData.map(make => {
          return (
            <Grid.Col span={4}>
              <VehicleCard
                key={make.id}
                id={make.id}
                name={make.name}
                abrv={make.abrv}
                image={make.image}
                handleNavigation={() => navigate(`${make.id}`)}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
});

export default Home;
