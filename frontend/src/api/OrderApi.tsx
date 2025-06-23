import {useAuth0} from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutReqData = {
    cartItems: {
        menuItemId: string,
        name: string,
        quantity: string,
    }[],
    deliveryDetails: {
        email: string,
        name: string,
        hostel: string,
        college: string,
        roomno: string,
        phone: string,        
    };
    restaurantId: string,
}

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (checkoutReqData: CheckoutReqData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutReqData),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isPending:isLoading,
    error,
    reset,
  } = useMutation({mutationFn:createCheckoutSessionRequest});

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};