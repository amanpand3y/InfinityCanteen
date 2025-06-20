import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import DishesSection from "./DishesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import type { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string().min(1,"Restaurant Name is required"),
    collegeCity: z.string().min(1,"College City is required"),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number",
    })
    .int({ message: "Must be a whole number (no decimals allowed)" })
    .min(10, { message: "Bruh pay ur delivery guys (atleast 10)" })
    .lt(100, { message: "Delivery price must be less than 100 (bruhh)" }),

    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "Must be a valid number",
    })
    .min(15, { message: "Be Realistic (must be at least 15 minutes)" })
    .max(90, { message: "Delivery time must be at most 90 minutes" }),

    dishes: z.array(z.string()).nonempty({
        message: "Please select at least one Item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1,"Item Name is Required"),
        price: z.coerce.number({
            required_error: "Price is required",
            invalid_type_error: "Must be a valid number",
        })
        .int({ message: "Price must be a whole number (no decimals)" })
        .min(1, { message: "Price must be at least 1" }),
    })),
    phone: z.string()
        .min(10, "Phone Number must be 10 digits")
        .max(10, "Phone Number must be 10 digits")
        .refine(val => /^\d{10}$/.test(val), {
            message: "Phone Number must be exactly 10 digits and numeric",
    }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message: "Image is required"}).optional(),
}).refine((data)=> data.imageUrl || data.imageFile, {
    message: "Eihter image URL or image File must be provided",
    path: ["imageFile"],
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({onSave,isLoading,restaurant}:Props)=>{
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dishes: [],
            menuItems: [{name: "",price: 0}],                        
        }
    });

    useEffect(() => {
        if (!restaurant) {
        return;
        }

        const deliveryPriceFormatted = parseInt(
        restaurant.deliveryPrice.toFixed(0)
        );

        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
        ...item,
        price: parseInt(item.price),
        }));

        const updatedRestaurant = {
        ...restaurant,
        deliveryPrice: deliveryPriceFormatted,
        menuItems: menuItemsFormatted,
        };

        console.log(restaurant.imageUrl);
        
        form.reset(updatedRestaurant);
    } , [form, restaurant]);

    const onSubmit = (formDataJson:RestaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName",formDataJson.restaurantName);
        formData.append("collegeCity",formDataJson.collegeCity);
        formData.append("phone",formDataJson.phone);
        formData.append("deliveryPrice",(formDataJson.deliveryPrice).toString());
        formData.append("estimatedDeliveryTime",(formDataJson.estimatedDeliveryTime).toString());

        formDataJson.dishes.forEach((dish,index)=>{
            formData.append(`dishes[${index}]`,dish);
        });

        formDataJson.menuItems.forEach((menuItem,index)=>{
            formData.append(`menuItems[${index}][name]`,menuItem.name)
            formData.append(`menuItems[${index}][price]`,(menuItem.price).toString())
        })

        if(formDataJson.imageFile){
            formData.append("imageFile",formDataJson.imageFile);
        }

        onSave(formData);
        
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection/>
                <Separator/>
                <DishesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>
                {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}

            </form>

        </Form>
    )

};

export default ManageRestaurantForm;