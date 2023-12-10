import React, { Suspense, lazy } from 'react';
import { ModelType, modelStore } from '../../store/ModelStore';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import VehicleCard from '../../components/Cards/VehicleCard';
import { ActionIcon, Container, Grid, Group, LoadingOverlay, Pagination, Text } from '@mantine/core';
import { Edit, LucideIcon, X } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import SearchBar from '../../components/SearchBar';
import { User, Cog, Fuel, CalendarDays } from 'lucide-react';

const ConfirmModal = lazy(() => import('../../components/Modals/ConfirmModal'));

const ModelsList: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = React.useState<string>('');

  React.useEffect(() => {
    if (id) {
      modelStore.getModels(id);
    }
  }, []);

  const handleNavigateEdit = (item: ModelType) => {
    navigate(`/model/${item.id}`, { state: item });
  };
  const getDeleteId = (id: string) => {
    open();
    setDeleteId(id);
  };

  const handleDelete = (id: string) => {
    modelStore.deleteModel(id);
    close();
  };

  const searchHandler = (query: string) => {
    if (query.length > 0) {
      modelStore.setPageIndex(1);
      modelStore.setSearchQuery(query ?? '');
    } else {
      modelStore.setSearchQuery('');
    }
  };

  const handleRenderBtns: (item: ModelType) => JSX.Element = item => {
    return (
      <Group gap={30} justify="right">
        <Group>
          <ActionIcon variant="transparent" onClick={() => handleNavigateEdit({ ...item })}>
            <Edit />
          </ActionIcon>
          <ActionIcon variant="transparent" c="red" onClick={() => getDeleteId(item.id)}>
            <X />
          </ActionIcon>
        </Group>
      </Group>
    );
  };

  const handleModelSpec: (item: ModelType) => JSX.Element[] = item => {
    interface OwnProps {
      label: string | number;
      icon: LucideIcon;
    }
    const data: OwnProps[] = [
      { label: item.year, icon: CalendarDays },
      { label: item.body_type, icon: User },
      { label: item.transmission, icon: Cog },
      { label: item.engine, icon: Fuel },
    ];

    return data.map((feature: OwnProps, index: number) => (
      <Group key={index} gap={4}>
        <feature.icon size="1.05rem" />
        <Text size="xs" tt="capitalize">
          {feature.label}
        </Text>
      </Group>
    ));
  };

  return (
    <>
      {modelStore.isLoading ? (
        <LoadingOverlay
          visible={modelStore.isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'xl', blur: 2 }}
          loaderProps={{ type: 'dots', size: 150 }}
        />
      ) : (
        <Container size="xl" mx="auto">
          <Group justify="center" my="lg">
            <SearchBar onChange={searchHandler} initialValue={modelStore.searchQuery} />
          </Group>
          <Grid gutter="xl" align="center">
            {modelStore.models.map(item => {
              return (
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                  <VehicleCard
                    item={item}
                    renderBtns={handleRenderBtns(item)}
                    renderModelSpec={handleModelSpec(item)}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
          <Pagination
            total={modelStore.pageCount}
            value={modelStore.pageIndex}
            onChange={value => modelStore.setPageIndex(value)}
          />

          {opened && (
            <Suspense fallback={opened}>
              <ConfirmModal opened={opened} close={close} deleteVehicle={() => handleDelete(deleteId)} />
            </Suspense>
          )}
        </Container>
      )}
    </>
  );
});

export default ModelsList;
