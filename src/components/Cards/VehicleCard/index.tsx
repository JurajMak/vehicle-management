import { Card, Divider, Group, Image, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { IMake, IModel } from '../../../types';

type VehicleType = IMake | (IModel & { country?: string });
interface OwnProps {
  item: VehicleType;
  renderBtns?: ReactNode;
  renderModelSpec?: ReactNode;
}

const VehicleCard: React.FC<OwnProps> = ({ item, renderBtns, renderModelSpec }) => {
  return (
    <Card withBorder radius="md">
      <Card.Section>
        <Image
          src={item.image}
          fallbackSrc="https://i.imgur.com/ZL52Q2D.png"
          alt="image"
          h={200}
          w="100%"
          fit="contain"
        />

        <Divider />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500} size="lg" mb={2}>
            {item.name}
          </Text>
          <Text fw={500} size="sm" mb={2}>
            {item.abrv}
          </Text>
          {item.country && (
            <Group gap={4}>
              <Text size="sm" fw={500}>
                Origin:
              </Text>
              <Text size="md" fw={500}>
                {item.country}
              </Text>
            </Group>
          )}
        </div>
      </Group>

      <Card.Section mt="xs" p="md">
        {renderModelSpec && (
          <Text fz="sm" fw={500} c="gray.7" mb="sm" tt="uppercase" style={{ lineHeight: 1 }}>
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
