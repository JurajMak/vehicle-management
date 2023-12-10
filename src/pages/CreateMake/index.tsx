import { TextInput, Paper, Title, Container, Button, Grid, Image, Box, CloseButton, Text } from '@mantine/core';
import React from 'react';
import { observer } from 'mobx-react';
import { createForm } from './Form';
import placeholderImg from '../../assets/images/placeholder.png';
import FileButton from '../../components/FileButton';
import { FixMeLater } from '../../types';
import FormError from '../../components/FormError';
import { successCreation } from '../../components/Notifications';

export const Create: React.FC<FixMeLater> = observer(({ form }) => {
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
    if (!form.hasError) {
      setFile(null);
      successCreation('brand');
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
              {form.errors().name && <FormError error={form.$('name').error} />}
            </Grid.Col>

            <Grid.Col>
              <TextInput {...form.$('abrv').bind()} />
              {form.errors().abrv && <FormError error={form.$('abrv').error} />}
            </Grid.Col>
            <Grid.Col>
              <TextInput {...form.$('country').bind()} />
              {form.errors().country && <FormError error={form.$('country').error} />}
            </Grid.Col>

            <Grid.Col>
              <Text fw={500} size="sm" py={5}>
                Add image
              </Text>
              {form.errors().image && <FormError error={form.$('image').error} />}
              <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />
                <Image src={imgPreview} alt="image" h={300} w="100%" fit="contain" />
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

export const CreateMake = () => <Create form={createForm} />;
