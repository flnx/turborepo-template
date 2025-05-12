import { Checkbox, CheckboxGroup } from '@heroui/checkbox';
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';

export const animals = [
  { key: 'week', label: 'Week' },
  { key: 'day', label: 'Day' },
];

export const RepeatInterval = () => {
  return (
    <div className="space-y-8">
      <CheckboxGroup
        color="secondary"
        defaultValue={['buenos-aires', 'san-francisco']}
        label="Repeat on"
        orientation="horizontal"
        radius="sm"
      >
        <Checkbox value="Monday">Monday</Checkbox>
        <Checkbox value="Tuesday">Tuesday</Checkbox>
        <Checkbox value="Wednesday">Wednesday</Checkbox>
        <Checkbox value="Thursday">Thursday</Checkbox>
        <Checkbox value="Friday">Friday</Checkbox>
        <Checkbox value="Saturday">Saturday</Checkbox>
        <Checkbox value="Sunday">Sunday</Checkbox>
      </CheckboxGroup>

      <div className="flex items-center gap-1">
        <NumberInput
          label="Repeat every"
          labelPlacement="outside-left"
          placeholder="Enter a number"
        />
        <Select className="max-w-xs">
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
