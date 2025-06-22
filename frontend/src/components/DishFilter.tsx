import { dishList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (dishes: string[]) => void;
  selectedDishes: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const DishFilter = ({
  onChange,
  selectedDishes,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleDishesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedDish = event.target.value;
    const isChecked = event.target.checked;

    const newDishesList = isChecked
      ? [...selectedDishes, clickedDish]
      : selectedDishes.filter((dish) => dish !== clickedDish);

    onChange(newDishesList);
  };

  const handleDishesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Dish</div>
        <div
          onClick={handleDishesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {dishList
          .slice(0, isExpanded ? dishList.length : 7)
          .map((dish) => {
            const isSelected = selectedDishes.includes(dish);
            return (
              <div className="flex">
                <input
                  id={`dish_${dish}`}
                  type="checkbox"
                  className="hidden"
                  value={dish}
                  checked={isSelected}
                  onChange={handleDishesChange}
                />
                <Label
                  htmlFor={`dish_${dish}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {dish}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default DishFilter;