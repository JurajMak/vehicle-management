import React, { lazy, Suspense } from 'react';
import { observer } from 'mobx-react';
import { makeStore } from '../../stores/MakeStore';
import { useNavigate } from 'react-router-dom';
import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Pagination,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import VehicleCard from '../../components/Cards/VehicleCard';
import SearchBar from '../../components/SearchBar';
import { Edit, X } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import { IMake } from '../../types';
import CustomSelect from '../../components/Select';
import { SELECT_MAKE_DATA } from '../../utils/Constants';
import { sortHandler } from '../../utils/FilteringHandlers';
import { successDeletion } from '../../components/Notifications';

const ConfirmModal = lazy(() => import('../../components/Modals/ConfirmModal'));

const Home: React.FC = observer(() => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteId, setDeleteId] = React.useState<string>('');

  const handleNavigateEdit = (item: IMake) => {
    navigate(`brand/${item.id}`, { state: item });
  };

  const getDeleteId = (item: string) => {
    open();
    setDeleteId(item);
  };
  const handleDelete = (id: string) => {
    makeStore.deleteMake(id);
    successDeletion('brand');
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
          <Tooltip label="Edit Brand" withArrow arrowSize={10}>
            <ActionIcon variant="transparent" onClick={() => handleNavigateEdit({ ...item })}>
              <Edit />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete Brand " withArrow arrowSize={10} color="red.8">
            <ActionIcon variant="transparent" c="red.8" onClick={() => getDeleteId(item.id)}>
              <X />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    );
  };
  const renderWarning: () => JSX.Element = () => {
    return (
      <Text size="md">
        This action cannot be undone. This will permanently delete selected
        <Text fw={500} span c="red.8" mx={5} inherit>
          Vehicle and all associated Models !
        </Text>
      </Text>
    );
  };

  const selectData = React.useMemo(() => {
    return SELECT_MAKE_DATA.map(item => item);
  }, [SELECT_MAKE_DATA]);

  React.useEffect(() => {
    makeStore.getMake();
  }, []);

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
        <Container size="xxl" mx="auto">
          <Stack justify="center">
            <Title mx="auto" order={2}>
              Vehicle Brands
            </Title>
            <Group justify="center" my="lg">
              <SearchBar onChange={searchHandler} initialValue={makeStore.searchQuery} />
              <CustomSelect
                data={selectData}
                initialValue={makeStore.sort}
                onChange={value => sortHandler({ query: value, store: makeStore })}
              />
            </Group>
            <Grid gutter="xl">
              {makeStore.make.map(item => {
                return (
                  <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                    <VehicleCard item={item} renderBtns={handleRenderBtns(item)} />
                  </Grid.Col>
                );
              })}
            </Grid>
            <Pagination
              mt="xl"
              mx="auto"
              total={makeStore.pageCount}
              value={makeStore.pageIndex}
              onChange={value => makeStore.setPageIndex(value)}
            />
          </Stack>
        </Container>
      )}
      {opened && (
        <Suspense fallback={opened}>
          <ConfirmModal
            opened={opened}
            renderWarning={renderWarning}
            close={close}
            deleteVehicle={() => handleDelete(deleteId)}
          />
        </Suspense>
      )}
    </>
  );
});

export default Home;
