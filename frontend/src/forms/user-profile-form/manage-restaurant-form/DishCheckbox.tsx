import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  dish: string;
  field: ControllerRenderProps<FieldValues, "dishes">;
};

const DishCheckbox = ({ dish, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(dish)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, dish]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== dish)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{dish}</FormLabel>
    </FormItem>
  );
};

export default DishCheckbox;