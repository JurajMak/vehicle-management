import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button, CloseButton, Container, Grid, Group, Image, LoadingOverlay, Paper, Title } from '@mantine/core';
import FileButton from '../../components/FileButton';
import { editForm } from './Form';
import { makeStore } from '../../stores/MakeStore';
import { modelStore } from '../../stores/ModelStore';
import { FixMeLater } from '../../types';
import { successEdit } from '../../components/Notifications';
import CustomInput from '../../components/CustomInput';

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
    successEdit('model');
  };

  const handleState = () => {
    if (id) {
      modelStore.getSingleModel(id);
    }

    if (modelStore.singleModel) {
      form.$('name').set(`${modelStore.singleModel.name}`);
      form.$('abrv').set(`${modelStore.singleModel.abrv}`);
      form.$('year').set(`${modelStore.singleModel.year}`);
      form.$('engine').set(`${modelStore.singleModel.engine}`);
      form.$('body_type').set(`${modelStore.singleModel.body_type}`);
      form.$('transmission').set(`${modelStore.singleModel.transmission}`);
      form.$('image').set(`${modelStore.singleModel.image}`);

      makeStore.getSingleMake(modelStore.singleModel.make_id);
    }
  };

  React.useEffect(() => {
    handleState();
  }, [modelStore.singleModel?.make_id]);

  return (
    <>
      {makeStore.isLoading || modelStore.isLoading ? (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'xl', blur: 2 }}
          loaderProps={{ type: 'dots', size: 150 }}
        />
      ) : (
        <Container size="xs" my={20}>
          <Title ta="center" c="primary">
            Edit {makeStore.singleMake?.name} {modelStore.singleModel?.name}
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
                    field={{ ...form.$('year').bind() }}
                    formError={form.errors().name}
                    errorText={form.$('year').error}
                  />
                </Grid.Col>

                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$('engine').bind() }}
                    formError={form.errors().name}
                    errorText={form.$('engine').error}
                  />
                </Grid.Col>
                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$('body_type').bind() }}
                    formError={form.errors().name}
                    errorText={form.$('body_type').error}
                  />
                </Grid.Col>

                <Grid.Col>
                  <CustomInput
                    field={{ ...form.$('transmission').bind() }}
                    formError={form.errors().name}
                    errorText={form.$('transmission').error}
                  />
                </Grid.Col>

                <Grid.Col>
                  <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                    {file && (
                      <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />
                    )}

                    <Image src={convert ?? modelStore.singleModel?.image} alt="image" mah={300} fit="contain" />
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

export const EditModel = () => <Edit form={editForm} />;
