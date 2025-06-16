import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest ={
    auth0Id: string,
    email: string,
};

const useCreateMyUser = () => {
    const{getAccessTokenSilently}=useAuth0();

    const createMyUserRequest = async (user:CreateUserRequest) => {
        const accessToken =await getAccessTokenSilently();
        const response =await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body: JSON.stringify(user),
        });

        if(!response.ok){
            throw new Error("Failed to create user");
        };
    };

    const {
        mutateAsync: createUser,
        isPending: isLoading,
        isError,
        isSuccess,
    } = useMutation({ mutationFn:createMyUserRequest});

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
}

type FormData = {
    name: string,
    hostel: string,
    roomno: string,
    phone: string,
}
const useUpdateMyUser = () => {
    const{getAccessTokenSilently}=useAuth0();

    const updateMyUserRequest = async (formData:FormData)=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`,{
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error("Failed to update user");
        }

    };

    const {
        mutateAsync: updateUser,
        isPending: isLoading,
        isError,
        isSuccess,
        error,
        reset,
    } = useMutation({ mutationFn:updateMyUserRequest});

    return {
        updateUser,
        isLoading,
    }


     
}

export {useCreateMyUser,useUpdateMyUser};