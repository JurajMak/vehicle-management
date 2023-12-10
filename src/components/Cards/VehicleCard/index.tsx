import { Card, Divider, Group, Image, Stack, Text } from '@mantine/core';
import { User, Gauge, Cog, Fuel } from 'lucide-react';

import { ReactNode } from 'react';
import { MakeType } from '../../../store/MakeStore';
import { ModelType } from '../../../store/ModelStore';
type VehicleType = MakeType | (ModelType & { country?: string });
interface OwnProps {
  item: VehicleType;
  renderBtns?: ReactNode;
  renderModelSpec?: ReactNode;
}

const VehicleCard: React.FC<OwnProps> = ({ item, renderBtns, renderModelSpec }) => {
  return (
    <Card withBorder radius="md">
      <Card.Section>
        <Image src={item.image ?? 'https://i.imgur.com/ZL52Q2D.png'} alt="image" h={200} w="100%" fit="scale-down" />

        <Divider />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500} size="lg" mb="xs">
            {item.name}
          </Text>
          <Text fw={500} size="sm" c="dimmed">
            {item.abrv}
          </Text>
          <Text fz="sm" c="dimmed">
            {item.country && `Made in ${item.country}`}
          </Text>
        </div>
      </Group>

      <Card.Section mt="md" p="md">
        {renderModelSpec && (
          <Text fz="sm" fw={500} c="dimmed" mb="xs" tt="uppercase" style={{ lineHeight: 1 }}>
            Basic configuration
          </Text>
        )}

        <Group gap={8} mb={-8}>
          {renderModelSpec}
        </Group>
      </Card.Section>

      <Card.Section p="md">{renderBtns}</Card.Section>
    </Card>
  );
};

export default VehicleCard;
