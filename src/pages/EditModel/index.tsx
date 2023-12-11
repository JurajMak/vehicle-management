import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  Box,
  Button,
  CloseButton,
  Container,
  Grid,
  Image,
  LoadingOverlay,
  Paper,
  TextInput,
  Title,
} from '@mantine/core';
import FileButton from '../../components/FileButton';
import { editForm } from './Form';
import { makeStore } from '../../stores/MakeStore';
import { modelStore } from '../../stores/ModelStore';
import { FixMeLater } from '../../types';
import { successEdit } from '../../components/Notifications';
import FormError from '../../components/FormError';

const Edit: React.FC<FixMeLater> = observer(({ form }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const convert = file && URL.createObjectURL(file);
  const { id }: FixMeLater = useParams();

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
    successEdit(`${makeStore.singleMake?.name}`, 'model');
  };

  const handleState = () => {
    modelStore.getSingleModel(id);
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

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={handleSubmit}>
              <Grid gutter="xl">
                <Grid.Col>
                  <TextInput {...form.$('name').bind()} />
                  {form.errors().abrv && <FormError error={form.$('name').error} />}
                </Grid.Col>

                <Grid.Col>
                  <TextInput {...form.$('abrv').bind()} />
                  {form.errors().abrv && <FormError error={form.$('abrv').error} />}
                </Grid.Col>
                <Grid.Col>
                  <TextInput {...form.$('year').bind()} />
                  {form.errors().abrv && <FormError error={form.$('year').error} />}
                </Grid.Col>

                <Grid.Col>
                  <TextInput {...form.$('engine').bind()} />
                  {form.errors().abrv && <FormError error={form.$('engine').error} />}
                </Grid.Col>
                <Grid.Col>
                  <TextInput {...form.$('body_type').bind()} />
                  {form.errors().abrv && <FormError error={form.$('body_type').error} />}
                </Grid.Col>

                <Grid.Col>
                  <TextInput {...form.$('transmission').bind()} />
                  {form.errors().abrv && <FormError error={form.$('transmission').error} />}
                </Grid.Col>

                <Grid.Col>
                  <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                    <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />
                    <Image src={convert ?? modelStore.singleModel?.image} alt="image" />
                  </Paper>
                </Grid.Col>
                <Grid.Col offset={{ base: 0, xs: 8, sm: 8 }}>
                  <Box>
                    <FileButton variant="outline" text="Upload Image" onChange={e => handlePreview(e)} />
                  </Box>
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
