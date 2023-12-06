import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Box, Button, CloseButton, Container, Grid, Image, Paper, TextInput, Title } from '@mantine/core';
import FileButton from '../../components/FileButton';
import { editForm } from './Form';
import { makeStore } from '../../store/MakeStore';
import { modelStore } from '../../store/ModelStore';
import { FixMeLater } from '../../types';

const Edit = observer(({ form }: FixMeLater) => {
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
  };

  const handleState = () => {
    modelStore.getSingleModel(id);
    if (modelStore.singleModel) {
      form.$('name').set(`${modelStore.singleModel.name}`);
      form.$('abrv').set(`${modelStore.singleModel.abrv}`);
      makeStore.getSingleMake(modelStore.singleModel.make_id);
    }
  };

  React.useEffect(() => {
    handleState();
  }, [modelStore.singleModel?.make_id]);

  return (
    <Container size="xs" my={20}>
      <Title ta="center" c="primary">
        Edit {makeStore.singleMake?.name} {modelStore.singleModel?.name}
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Grid gutter="xl">
            <Grid.Col>
              <TextInput {...form.$('name').bind()} />
            </Grid.Col>

            <Grid.Col>
              <TextInput {...form.$('abrv').bind()} />
            </Grid.Col>

            <Grid.Col>
              <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />
                <Image src={modelStore.singleModel?.image ?? convert} alt="image" />
              </Paper>
            </Grid.Col>
            <Grid.Col offset={8}>
              <Box>
                <FileButton variant="outline" text="Upload Image" onChange={(e: FixMeLater) => handlePreview(e)} />
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
  );
});

export const EditModel = () => <Edit form={editForm} />;
