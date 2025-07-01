import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';

import { RepeatInterval } from './repeat-interval';

export const HabitForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button color="primary" onPress={onOpen} size="md">
        Add Habit
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Habit
              </ModalHeader>
              <ModalBody className="space-y-4">
                <div className="space-y-1">
                  <Input
                    label="Name"
                    placeholder="e.g., Morning Meditation"
                    variant="bordered"
                    type="text"
                    size="sm"
                  />
                  <Input
                    label="Description"
                    placeholder="Describe your habit"
                    type="text"
                    variant="bordered"
                    size="sm"
                  />
                </div>

                <RepeatInterval />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
