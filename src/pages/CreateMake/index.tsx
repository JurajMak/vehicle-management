import { Paper, Title, Container, Button, Grid, Image, Box, CloseButton, Text, Group } from '@mantine/core';
import React from 'react';
import { observer } from 'mobx-react';
import { createForm } from './Form';
import placeholderImg from '../../assets/images/placeholder.png';
import FileButton from '../../components/FileButton';
import { FixMeLater } from '../../types';
import CustomInput from '../../components/CustomInput';

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
    }
  };

  return (
    <Container size="xs" my={20}>
      <Title ta="center" c="primary" order={2}>
        Add New Vehicle Brand
      </Title>

      <Paper withBorder shadow="md" p="lg" mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Grid gutter="lg">
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
              <Text fw={500} size="sm" py={5}>
                Add image
              </Text>
              {form.errors().image && <Text c="red.8">{form.$('image').error}</Text>}
              <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                {file && <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />}

                <Image src={imgPreview} alt="image" w="100%" mah={300} fit="contain" />
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
  );
});

export const CreateMake = () => <Create form={createForm} />;
