import type { Restaurant } from "@/types";
import { collegeMap } from "@/data/CollegeMap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {collegeMap[restaurant.collegeCity]}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.dishes.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restaurant.dishes.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;