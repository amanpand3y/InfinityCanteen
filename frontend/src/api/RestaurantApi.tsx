import type { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
export const useSearchRestaurants = (collegeCity?:string) => {
    const createSearchRequest = async(): Promise<RestaurantSearchResponse>=>{
        const response= await fetch(`${API_BASE_URL}/api/restaurant/search/${collegeCity}`);
        if(!response.ok){
            throw new Error("Failed to get Restaurant");
        }

        return response.json();
    }

    const { data: results, isLoading } = useQuery({
        queryKey: ['searchRestaurants'],
        queryFn:  createSearchRequest,
        enabled: !!collegeCity
    });

    return {
        results,
        isLoading
    }

}