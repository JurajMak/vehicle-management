import { Button, Card, Image, Stack, Text } from '@mantine/core';
import { useLocation, useParams } from 'react-router-dom';

interface OwnProps {
  name?: string;
  abrv?: string;
  id?: string;
  image?: string;
  editBtnText?: string;
  handleNavigation?: () => void;
  navigateToEdit?: () => void;
}
const VehicleCard: React.FC<OwnProps> = ({ name, abrv, image, editBtnText, handleNavigation, navigateToEdit }) => {
  const { id } = useParams();

  return (
    <Card withBorder radius="md" p={20}>
      <Stack gap={0}>
        <Image src={image ?? ''} placeholder={name} mah={250} />
        <div>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            {name}
          </Text>
          <Text mt="xs" mb="md">
            {abrv}
          </Text>
        </div>
      </Stack>
      <Stack>
        {!id && <Button onClick={handleNavigation}>View Models</Button>}

        <Button onClick={navigateToEdit}>{editBtnText}</Button>
      </Stack>
    </Card>
  );
};

export default VehicleCard;
