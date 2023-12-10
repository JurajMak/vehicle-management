import React, { lazy, Suspense } from 'react';
import { observer } from 'mobx-react';
import { MakeType, makeStore } from '../../store/MakeStore';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Container, Grid, Group, LoadingOverlay, Pagination } from '@mantine/core';
import VehicleCard from '../../components/Cards/VehicleCard';
import SearchBar from '../../components/SearchBar';
import { Edit, X } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';

const ConfirmModal = lazy(() => import('../../components/Modals/ConfirmModal'));

const Home: React.FC = observer(() => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = React.useState<string>('');

  React.useEffect(() => {
    makeStore.getMake();
  }, []);

  const handleNavigateEdit = (item: MakeType) => {
    navigate(`brand/${item.id}`, { state: item });
  };

  const searchHandler = (query: string) => {
    if (query.length > 0) {
      makeStore.setPageIndex(1);
      makeStore.setSearchQuery(query ?? '');
    } else {
      makeStore.setSearchQuery('');
    }
  };

  const getDeleteId = (id: string) => {
    open();
    setDeleteId(id);
  };
  const handleDelete = (id: string) => {
    makeStore.deleteMake(id);
    close();
  };

  const handleRenderBtns = (item: MakeType) => {
    return (
      <Group gap={30} justify="space-between">
        <Button onClick={() => navigate(`models/${item.id}`)}>View Models</Button>
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

  return (
    <>
      {makeStore.isLoading ? (
        <LoadingOverlay
          visible={makeStore.isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'xl', blur: 2 }}
          loaderProps={{ type: 'dots', size: 150 }}
        />
      ) : (
        <Container size="xl" mx="auto">
          <Group justify="center" my="lg">
            <SearchBar onChange={searchHandler} initialValue={makeStore.searchQuery} />
          </Group>
          <Grid gutter="xl" align="center">
            {makeStore.make.map(item => {
              return (
                <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                  <VehicleCard item={item} renderBtns={handleRenderBtns(item)} />
                </Grid.Col>
              );
            })}
          </Grid>

          <Pagination
            total={makeStore.pageCount}
            value={makeStore.pageIndex}
            onChange={value => makeStore.setPageIndex(value)}
          />
        </Container>
      )}
      {opened && (
        <Suspense fallback={opened}>
          <ConfirmModal opened={opened} close={close} deleteVehicle={() => handleDelete(deleteId)} />
        </Suspense>
      )}
    </>
  );
});

export default Home;
