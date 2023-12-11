import React, { lazy, Suspense } from 'react';
import { observer } from 'mobx-react';
import { makeStore } from '../../stores/MakeStore';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Container, Grid, Group, LoadingOverlay, Pagination } from '@mantine/core';
import VehicleCard from '../../components/Cards/VehicleCard';
import SearchBar from '../../components/SearchBar';
import { Edit, X } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { IMake } from '../../types';
import CustomSelect from '../../components/Select';
import { SELECT_MAKE_DATA } from '../../utils/Constants';
import { sortHandler } from '../../utils/FilteringHandlers';

const ConfirmModal = lazy(() => import('../../components/Modals/ConfirmModal'));

const Home: React.FC = observer(() => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = React.useState<string>('');

  React.useEffect(() => {
    makeStore.getMake();
  }, []);

  const handleNavigateEdit = (item: IMake) => {
    navigate(`brand/${item.id}`, { state: item });
  };

  const getDeleteId = (item: string) => {
    open();
    setDeleteId(item);
  };
  const handleDelete = (id: string) => {
    makeStore.deleteMake(id);
    close();
  };

  const searchHandler = (query: string) => {
    if (query.length > 0) {
      makeStore.setPageIndex(1);
      makeStore.setSearchQuery(query ?? '');
    } else {
      makeStore.setSearchQuery('');
    }
  };

  const handleRenderBtns: (item: IMake) => JSX.Element = item => {
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

  const selectData = React.useMemo(() => {
    return SELECT_MAKE_DATA.map(item => item);
  }, [SELECT_MAKE_DATA]);

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
            <CustomSelect
              data={selectData}
              initialValue={makeStore.sort}
              onChange={value => sortHandler({ query: value, store: makeStore })}
            />
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
