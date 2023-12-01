import { Card, Group, Image, Text } from '@mantine/core';

interface OwnProps {
  name?: string;
  abrv?: string;
  id?: string;
  image?: string;
  handleNavigation?: () => void;
}
const VehicleCard: React.FC<OwnProps> = ({ name, abrv, image, handleNavigation }) => {
  return (
    <Card withBorder radius="md" p={20} miw={400}>
      <Group wrap="nowrap" gap={0}>
        <Image src={image ?? ''} placeholder={name} />
        <div>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            {name}
          </Text>
          <Text mt="xs" mb="md">
            {abrv}
          </Text>
        </div>
      </Group>
    </Card>
  );
};

export default VehicleCard;
