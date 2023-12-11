import { TextInput, Paper, Title, Container, Button, Grid, Image, Box, CloseButton, Text } from '@mantine/core';
import React from 'react';
import { observer } from 'mobx-react';
import { createForm } from './Form';
import placeholderImg from '../../assets/images/placeholder.png';
import FileButton from '../../components/FileButton';
import { useParams } from 'react-router-dom';
import { FixMeLater } from '../../types';
import FormError from '../../components/FormError';
import { makeStore } from '../../stores/MakeStore';
import { successCreation } from '../../components/Notifications';

export const Create: React.FC<FixMeLater> = observer(({ form }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const { id }: FixMeLater = useParams();
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

    if (!form.hasError) {
      setFile(null);
      successCreation('model');
    }
  };

  React.useEffect(() => {
    makeStore.getSingleMake(id);
  }, [makeStore.singleMake?.id]);

  return (
    <>
      <Container size="xs" my={20}>
        <Title ta="center" c="primary">
          Add New {makeStore.singleMake?.name} Model
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Grid gutter="xl">
              <Grid.Col>
                <TextInput {...form.$('name').bind()} />
                {form.errors().name && <FormError error={form.$('name').error} />}
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
                <Text fw={500} size="sm" py={5}>
                  Add image
                </Text>
                {form.errors().image && <FormError error={form.$('image').error} />}
                <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                  <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />
                  <Image src={imgPreview} alt="image" />
                </Paper>
              </Grid.Col>
              <Grid.Col offset={{ base: 0, xs: 8, sm: 8 }}>
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
    </>
  );
});

export const CreateModel = () => <Create form={createForm} />;
