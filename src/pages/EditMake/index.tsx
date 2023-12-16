import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button, CloseButton, Container, Grid, Group, Image, LoadingOverlay, Paper, Title } from '@mantine/core';
import FileButton from '../../components/FileButton';
import { editForm } from './Form';
import { makeStore } from '../../stores/MakeStore';
import { FixMeLater } from '../../types';
import CustomInput from '../../components/CustomInput';
import { successEdit } from '../../components/Notifications';

const Edit: React.FC<FixMeLater> = observer(({ form }) => {
  const [file, setFile] = React.useState<File | null>(null);

  const convert = file && URL.createObjectURL(file);

  const { id } = useParams<{ id: string }>();

  const handlePreview: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files) {
      return;
    }
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    form.$('image').set(selectedFile);
  };

  const removePreview = () => {
    form.$('image').set('');
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.submit();
  };

  const handleState = () => {
    if (id) {
      makeStore.getSingleMake(id);
    }

    if (makeStore.singleMake) {
      form.$('name').set(`${makeStore.singleMake.name}`);
      form.$('abrv').set(`${makeStore.singleMake.abrv}`);
      form.$('country').set(`${makeStore.singleMake.country}`);
      form.$('image').set(`${makeStore.singleMake.image}`);
    }
  };

  React.useEffect(() => {
    handleState();
  }, [makeStore.singleMakeId]);

  return (
    <>
      {makeStore.isLoading ? (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'xl', blur: 2 }}
          loaderProps={{ type: 'dots', size: 150 }}
        />
      ) : (
        <Container size="xs" my={20}>
          <Title ta="center" c="primary">
            Edit Brand
          </Title>

          <Paper withBorder shadow="md" p="lg" mt={30} radius="md">
            <form onSubmit={handleSubmit}>
              <Grid gutter="xl">
                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$('name').bind() }}
                    formError={form.errors().name}
                    errorText={form.$('name').error}
                  />
                </Grid.Col>

                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$('abrv').bind() }}
                    formError={form.errors().name}
                    errorText={form.$('abrv').error}
                  />
                </Grid.Col>

                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$('country').bind() }}
                    formError={form.errors().name}
                    errorText={form.$('country').error}
                  />
                </Grid.Col>

                <Grid.Col>
                  <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                    {file && (
                      <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />
                    )}

                    <Image src={convert ?? makeStore.singleMake?.image} alt="image" mah={300} fit="contain" />
                  </Paper>
                </Grid.Col>
                <Grid.Col>
                  <Group justify="right" mr={5}>
                    <FileButton variant="outline" text="Upload Image" onChange={e => handlePreview(e)} />
                  </Group>
                </Grid.Col>

                <Grid.Col>
                  <Button variant="filled" type="submit" mt="xl">
                    Submit
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
});

export const EditMake = () => <Edit form={editForm} />;
