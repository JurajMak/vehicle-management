import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import React from 'react';

interface OwnProps {
  opened: boolean;
  close: () => void;
  deleteVehicle?: () => void;
  renderWarning: () => JSX.Element;
}

const ConfirmModal: React.FC<OwnProps> = ({ opened, close, deleteVehicle, renderWarning }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Are you sure you want to delete vehicle?`}
      size="lg"
      styles={{
        title: {
          fontWeight: 700,
          fontSize: 20,
        },
      }}
    >
      <Stack>
        {renderWarning()}
        <Group justify="right" mt="lg">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button variant="filled" color="red.8" onClick={deleteVehicle}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmModal;
