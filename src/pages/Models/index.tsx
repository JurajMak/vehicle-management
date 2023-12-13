import React, { Suspense, lazy } from 'react';
import { modelStore } from '../../stores/ModelStore';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import VehicleCard from '../../components/Cards/VehicleCard';
import { Button, Container, Grid, Group, LoadingOverlay, Pagination, Stack, Text, Title } from '@mantine/core';
import { LucideIcon } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import SearchBar from '../../components/SearchBar';
import { User, Cog, Fuel, CalendarDays } from 'lucide-react';
import { IModel } from '../../types';
import { SELECT_MODEL_DATA } from '../../utils/Constants';
import { sortHandler } from '../../utils/FilteringHandlers';
import CustomSelect from '../../components/Select';
import { makeStore } from '../../stores/MakeStore';
import { successDeletion } from '../../components/Notifications';

const ConfirmModal = lazy(() => import('../../components/Modals/ConfirmModal'));

const ModelsList: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = React.useState<string>('');

  const handleNavigateEdit = (item: IModel) => {
    navigate(`/model/${item.id}`, { state: item });
  };

  const getDeleteId = (id: string) => {
    open();
    setDeleteId(id);
  };

  const handleDelete = (id: string) => {
    modelStore.deleteModel(id);
    successDeletion('model');
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

  const handleRenderBtns: (item: IModel) => JSX.Element = item => {
    return (
      <Group gap={30} justify="space-between">
        <Button onClick={() => handleNavigateEdit({ ...item })}>Edit Model</Button>
        <Button variant="outline" color="red.8" onClick={() => getDeleteId(item.id)}>
          Delete Model
        </Button>
      </Group>
    );
  };

  const handleModelSpec: (item: IModel) => JSX.Element[] = item => {
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

  const renderWarning: () => JSX.Element = () => {
    return (
      <Text size="md">
        This action cannot be undone. This will permanently delete selected
        <Text fw={500} span c="red.8" ml={5} inherit>
          Model !
        </Text>
      </Text>
    );
  };

  const selectData = React.useMemo(() => {
    return SELECT_MODEL_DATA.map(item => item);
  }, [SELECT_MODEL_DATA]);

  React.useEffect(() => {
    if (id) {
      modelStore.getModels(id);
      makeStore.getSingleMake(id);
    }
  }, []);

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
        <Container size="xxl" mx="auto">
          <Stack justify="center">
            <Title mx="auto" order={2}>
              {makeStore.singleMake?.name} Models
            </Title>
            <Group justify="center" my="xl">
              <SearchBar onChange={searchHandler} initialValue={modelStore.searchQuery} />
              <CustomSelect
                data={selectData}
                initialValue={modelStore.sort}
                onChange={value => sortHandler({ query: value, store: modelStore })}
              />
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
              mt="xl"
              total={modelStore.pageCount}
              value={modelStore.pageIndex}
              onChange={value => modelStore.setPageIndex(value)}
            />

            {opened && (
              <Suspense fallback={opened}>
                <ConfirmModal
                  renderWarning={renderWarning}
                  opened={opened}
                  close={close}
                  deleteVehicle={() => handleDelete(deleteId)}
                />
              </Suspense>
            )}
          </Stack>
        </Container>
      )}
    </>
  );
});

export default ModelsList;
