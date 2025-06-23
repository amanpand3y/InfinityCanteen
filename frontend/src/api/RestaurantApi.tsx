import type { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { SearchState } from "@/pages/SearchPage";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
export const useSearchRestaurants = (
  searchState: SearchState,
  collegeCity?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedDishes", searchState.selectedDishes.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${collegeCity}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery({
    queryKey:["searchRestaurants", searchState], 
    queryFn: createSearchRequest, 
    enabled: !!collegeCity,
  });


  return {
    results,
    isLoading,
  };
};

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery({
    queryKey:["fetchRestaurant",restaurantId],
    queryFn:getRestaurantByIdRequest,
    enabled: !!restaurantId,
  });

  return { restaurant, isLoading };
};