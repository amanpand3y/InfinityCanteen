import Stripe from "stripe";
import { Request,Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant.model";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

// as string is for assigning type as env not defined at runtime and type script will give error

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

const createCheckoutSession = async (req: Request,res: Response)=> {
    try {
        const checkoutReqData : CheckoutReqData = req.body

        const restaurant = await Restaurant.findById(checkoutReqData.restaurantId);
        if(!restaurant){
            throw new Error("Restaurant not Found")
        }

        const lineItems = createLineItems(checkoutReqData,restaurant.menuItems);

        const session = await createSession(lineItems,"TEST_ORDER_ID",restaurant.deliveryPrice,checkoutReqData.restaurantId);

        if(!session.url){
            return res.status(500).json({message: "Error creating stripe session"});
        }
        res.json({url : session.url});
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        } 
        else {
            console.error("Unknown error", error);
            res.status(500).json({ message: "Unknown error occurred" });
        }
        
    }
}

const createLineItems = (checkoutReqData:CheckoutReqData,menuItems:MenuItemType[])=> {
    //. first we got each cart items corresponding menu Item from menuItems so that we can get price
    // then we created line item for each cart Item
    // then just return that line item array 

    const lineItems= checkoutReqData.cartItems.map((cartItem)=>{
        const menuItemId = cartItem.menuItemId;

        const menuItem = menuItems.find((menuItem)=>menuItem._id.toString() === menuItemId);

        if(!menuItem) throw new Error(`Menu Item not found: ${menuItemId}`);

        const line_item: Stripe.Checkout.SessionCreateParams.LineItem ={
            price_data: {
                currency: "inr",
                unit_amount: menuItem.price*100,
                product_data: {
                    name: menuItem.name,
                }
            },
            quantity: parseInt(cartItem.quantity)
        }

        return line_item;
    })

    return lineItems;
}

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice*100,
            currency: "inr",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};

export default {createCheckoutSession};