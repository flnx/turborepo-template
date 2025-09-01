import { Icon } from '@iconify/react';
import { useState } from 'react';

import { useCompleteHabit, useDeleteHabit } from '@/queries/habitQueries';
import { Button } from '@heroui/button';
import { Checkbox } from '@heroui/checkbox';
import { Chip } from '@heroui/chip';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/modal';
import { cn } from '@heroui/theme';

import { FormError } from '../form-error';

import type { Habit } from '@repo/schemas/types/habit';

export const HabitsList = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="flex flex-col gap-1">
      {habits.map((habit) => (
        <Habit habit={habit} key={habit.id} />
      ))}
    </div>
  );
};

const Habit = ({ habit }: { habit: Habit }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { mutate, isPending, error } = useCompleteHabit();

  const handleComplete = async (isSelected: boolean) => {
    setIsSelected(isSelected);

    if (isSelected) {
    }

    // mutate({ id: habit.id, date: new Date().toISOString() });
  };

  return (
    <div className="hover:bg-default-50/15 flex w-full rounded-md p-2">
      <Checkbox
        aria-label={habit.title}
        isSelected={isSelected}
        radius="sm"
        // onValueChange={setIsSelected}
        onValueChange={(isSelected) => handleComplete(isSelected)}
        color="success"
      />
      <div className="ml-2 flex w-full items-center justify-between gap-1">
        <span
          className={cn('transition-colors-opacity', {
            'opacity-45': isSelected,
          })}
        >
          {habit.title}
        </span>
        {/* <small className="text-default-500 text-tiny">{habit?.description}</small> */}
        <div className="mr-4 flex w-52 items-center justify-between gap-8">
          <small className="text-default-500 text-tiny">10 days streak</small>

          {isSelected ? (
            <Chip color="success" className="text-tiny">
              Completed
            </Chip>
          ) : (
            <Chip color="default" className="text-tiny">
              In Progress
            </Chip>
          )}
        </div>
      </div>
      <Dropdown classNames={{ content: 'min-w-[120px]' }} placement="bottom-end">
        <DropdownTrigger>
          <Button
            isIconOnly
            className="ml-auto rounded-full"
            size="sm"
            variant="light"
          >
            <Icon height={16} icon="solar:menu-dots-bold" width={16} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          itemClasses={{
            title: 'text-tiny',
          }}
          variant="flat"
        >
          <DropdownItem key="view-details">Edit</DropdownItem>
          <DropdownItem key="export-data" onPress={() => setIsModalOpen(true)}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeleteModal
        habit={habit}
        isOpen={isModalOpen}
        onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}
      />
    </div>
  );
};

const DeleteModal = ({
  habit,
  isOpen,
  onOpenChange,
}: {
  habit: Habit;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const { mutate, isPending, error } = useDeleteHabit();

  const handleDelete = async () => {
    mutate(habit.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };
  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add New Habit</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this habit?</p>
            </ModalBody>
            <ModalFooter>
              <div className="w-full">
                <div className="flex justify-end gap-2">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isPending}
                    onPress={handleDelete}
                  >
                    Delete Habit
                  </Button>
                </div>
                <FormError error={error?.message} className="mt-6" />
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
