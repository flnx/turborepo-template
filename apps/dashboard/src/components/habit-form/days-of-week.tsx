import { Checkbox, CheckboxGroup } from '@heroui/checkbox';
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';

export const repeatInterval = [
  { key: 'week', label: 'Week' },
  { key: 'day', label: 'Day' },
];

export const DaysOfWeek = () => {
  return (
    <div className="space-y-8">
      <CheckboxGroup
        color="secondary"
        label="Repeat on"
        orientation="horizontal"
        radius="sm"
        name="daysOfWeek"
      >
        <Checkbox value="1">Monday</Checkbox>
        <Checkbox value="2">Tuesday</Checkbox>
        <Checkbox value="3">Wednesday</Checkbox>
        <Checkbox value="4">Thursday</Checkbox>
        <Checkbox value="5">Friday</Checkbox>
        <Checkbox value="6">Saturday</Checkbox>
        <Checkbox value="7">Sunday</Checkbox>
      </CheckboxGroup>

      <div className="flex items-center gap-1">
        <NumberInput label="Repeat every" labelPlacement="outside-left" />
        <Select className="max-w-xs">
          {repeatInterval.map((repeatIntervalItem) => (
            <SelectItem key={repeatIntervalItem.key}>
              {repeatIntervalItem.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
