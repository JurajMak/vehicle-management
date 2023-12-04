import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Box, Button, CloseButton, Container, Grid, Image, Paper, TextInput, Title } from '@mantine/core';
import FileButton from '../../components/FileButton';
import { editForm } from './Form';
import { makeStore } from '../../store/MakeStore';

const Edit = observer(({ form }: any) => {
  const [file, setFile] = React.useState<File | null>(null);

  const convert = file && URL.createObjectURL(file);
  const { id }: any = useParams();

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
    makeStore.getSingleMake(id);
    if (makeStore.singleMake) {
      form.$('name').set(`${makeStore.singleMake.name}`);
      form.$('abrv').set(`${makeStore.singleMake.abrv}`);
      form.$('image').set(`${makeStore.singleMake.image}`);
    }
  };

  React.useEffect(() => {
    handleState();
  }, [makeStore.singleMake]);

  return (
    <Container size="xs" my={20}>
      <Title ta="center" c="primary">
        Edit {makeStore.singleMake?.name}
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
                <Image src={makeStore.singleMake?.image ?? convert} alt="image" />
              </Paper>
            </Grid.Col>
            <Grid.Col offset={8}>
              <Box>
                <FileButton variant="outline" text="Upload Image" onChange={(e: any) => handlePreview(e)} />
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

export const EditMake = () => <Edit form={editForm} />;
