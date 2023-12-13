import { Paper, Title, Container, Button, Grid, Image, Box, CloseButton, Text } from '@mantine/core';
import React from 'react';
import { observer } from 'mobx-react';
import { createForm } from './Form';
import placeholderImg from '../../assets/images/placeholder.png';
import FileButton from '../../components/FileButton';
import { useParams } from 'react-router-dom';
import { FixMeLater } from '../../types';
import { makeStore } from '../../stores/MakeStore';
import CustomInput from '../../components/CustomInput';

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
    }
  };

  React.useEffect(() => {
    makeStore.getSingleMake(id);
  }, [makeStore.singleMake?.id]);

  return (
    <>
      <Container size="xs" my={20}>
        <Title ta="center" c="primary" order={2}>
          Add New {makeStore.singleMake?.name} Model
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
                <Text fw={500} size="sm" py={5}>
                  Add image
                </Text>

                {form.errors().image && <Text c="red.8">{form.$('image').error}</Text>}
                <Paper withBorder mah="20rem" maw="50rem" pos="relative">
                  {file && (
                    <CloseButton pos="absolute" variant="transparent" right={0} onClick={() => removePreview()} />
                  )}

                  <Image src={imgPreview} alt="image" w="100%" mah={300} fit="contain" />
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
