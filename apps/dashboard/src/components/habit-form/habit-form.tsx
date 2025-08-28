import { Icon } from '@iconify/react';

import { useCreateHabit } from '@/queries/habitQueries';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';

import { DaysOfWeek } from './days-of-week';

export const HabitForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate } = useCreateHabit();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get('title');
    const description = formData.get('description');
    const daysOfWeek = formData
      .getAll('daysOfWeek')
      .map((day) => Number(day))
      .filter((day) => typeof day === 'number' && day > 0 && day < 8);

    if (!title || typeof description !== 'string') {
      return;
    }

    const data = {
      habit: {
        title: title.toString(),
        description: description?.toString(),
      },
      habit_schedule: daysOfWeek,
    };

    console.log(data);
  };

  return (
    <div>
      <Button
        className="bg-default-50 text-[13px]"
        radius="lg"
        onPress={onOpen}
        size="md"
        endContent={<Icon icon="solar:add-circle-line-duotone" fontSize={25} />}
      >
        New Habit
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Habit
              </ModalHeader>
              <ModalBody>
                <Form
                  id="habit-form"
                  className="space-y-4"
                  onSubmit={handleOnSubmit}
                >
                  <div className="space-y-1">
                    <Input
                      label="Name"
                      placeholder="e.g., Morning Meditation"
                      variant="bordered"
                      type="text"
                      size="sm"
                      name="title"
                    />
                    <Input
                      label="Description"
                      placeholder="Describe your habit"
                      type="text"
                      variant="bordered"
                      size="sm"
                      name="description"
                    />
                  </div>
                  <DaysOfWeek />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  // onPress={onClose}
                  form="habit-form"
                >
                  Add Habit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
