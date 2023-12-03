import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mantine/core';
import VehicleCard from '../../components/Cards/VehicleCard';
import React from 'react';
import { MakeType } from '../../store/MakeStore';
import { ModelType } from '../../store/ModelStore';

interface OwnProps {
  store: MakeType[] | ModelType[];
}

const VehicleList: React.FC<OwnProps> = ({ store }) => {
  const navigate = useNavigate();

  return (
    <Box size="xl">
      <Grid gutter="xl">
        {store?.map(item => {
          return (
            <Grid.Col span={3}>
              <VehicleCard
                id={item.id}
                key={item.id}
                name={item.name}
                abrv={item.abrv}
                image={item.image}
                handleNavigation={() => navigate(`${item.id}`)}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};

export default VehicleList;
