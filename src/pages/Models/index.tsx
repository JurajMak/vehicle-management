import React from 'react';
import { ModelType, modelStore } from '../../store/ModelStore';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import VehicleCard from '../../components/Cards/VehicleCard';
import { Box, Container, Grid } from '@mantine/core';
import { FixMeLater } from '../../types';

const ModelsList = observer(() => {
  const { id }: FixMeLater = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    modelStore.getModels(id);
  }, []);

  const handleNavigateEdit = (item: ModelType) => {
    navigate(`/model/${item.id}`, { state: item });
  };

  return (
    <Box size="xl">
      <Container size="xl">
        <Grid gutter="xl">
          {modelStore.models?.map(item => {
            return (
              <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 4 }} key={item.id}>
                <VehicleCard
                  id={item.id}
                  name={item.name}
                  abrv={item.abrv}
                  image={item.image}
                  editBtnText="Edit Model"
                  navigateToEdit={() => handleNavigateEdit({ ...item })}
                  deleteVehicle={() => modelStore.deleteModel(item.id)}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
});

export default ModelsList;
