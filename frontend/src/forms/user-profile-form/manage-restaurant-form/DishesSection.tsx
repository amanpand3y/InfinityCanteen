import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import DishCheckbox from "./DishCheckbox";
import { useFormContext } from "react-hook-form";
import { dishList } from "@/config/restaurant-options-config";


const DishesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Dishes</h2>
        <FormDescription>
          Select the Dishes that your Restaurant serves
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="dishes"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {dishList.map((dishItem) => (
                <DishCheckbox key={dishItem} dish={dishItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DishesSection;
