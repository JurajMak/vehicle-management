import { TextInput, Paper, Title, Container, Button, Grid, Image, ActionIcon, Box } from '@mantine/core';
import React from 'react';
import { observer } from 'mobx-react';
import { createForm } from './Form';
import placeholderImg from '../../assets/images/placeholder.png';
import FileButton from '../../components/FileButton';

export const Create = observer(({ form }: any) => {
  const [file, setFile] = React.useState<File | null>(null);

  const convert = file && URL.createObjectURL(file);

  const imgPreview = convert ?? placeholderImg;

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
    if (!form.errors()) {
      setFile(null);
    }
  };

  return (
    <Container size="xs" my={20}>
      <Title ta="center" c="primary">
        Add New Vehicle Brand
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
                <ActionIcon onClick={() => removePreview()} radius="xl" pos="absolute" variant="subtle" right={0}>
                  X
                </ActionIcon>
                <Image src={imgPreview} alt="image" />
              </Paper>
              <Box mt="xl">
                <FileButton variant="filled" text="Upload Image" onChange={(e: any) => handlePreview(e)} />
              </Box>
            </Grid.Col>

            <Grid.Col offset={8}>
              <Button variant="outline" type="submit" mt="xl">
                Submit
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
});

export const CreateForm = () => <Create form={createForm} />;
