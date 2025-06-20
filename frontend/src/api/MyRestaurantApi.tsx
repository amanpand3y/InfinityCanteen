import type { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const {getAccessTokenSilently}= useAuth0();
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
    
        })

        if(!response.ok){
            throw new Error("Failed to get Restaurant");
        }

        return response.json();
    }

    const {data:restaurant,isLoading} = useQuery({
        queryKey:["fetchMyRestaurant"],
        queryFn:getMyRestaurantRequest});

    return {restaurant,isLoading};
} 



export const useCreateMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createMyRestaurantRequest = async(restaurantFormData:FormData):Promise<Restaurant>=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if(!response.ok){
            throw new Error("Failed to create Restaurant");
        }

        return response.json();
    }

    const { mutate: createRestaurant,isPending:isLoading,isSuccess,error} = useMutation({mutationFn:createMyRestaurantRequest});

    if(isSuccess){
        toast.success("Restuarant created!");
    }

    if(error){
        toast.error("Unable to update Restaurant")
    }

    return {createRestaurant,isLoading};
}


export const useUpdateRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const updateRestaurantRequest = async(restaurantFormData:FormData):Promise<Restaurant>=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if(!response.ok){
            throw new Error("Failed to update Restaurant");
        }

        return response.json();
    }

    const { mutate: updateRestaurant,isPending:isLoading,isSuccess,error} = useMutation({mutationFn:updateRestaurantRequest});

    if(isSuccess){
        toast.success("Restuarant updated!");
    }

    if(error){
        toast.error("Unable to update Restaurant")
    }

    return {updateRestaurant,isLoading};
}