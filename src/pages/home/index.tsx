import React from 'react';
import { observer } from 'mobx-react';
import { MakeStore } from '../../store/MakeStore';
import VehicleCard from '../../components/Card/VehicleCard';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Flex, Grid } from '@mantine/core';

const Home = observer(() => {
  const navigate = useNavigate();
  React.useEffect(() => {
    MakeStore.getMake();
  }, []);

  return (
    <Box size="xl">
      <Grid gutter="xl">
        {MakeStore?.makeData.map(make => {
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
