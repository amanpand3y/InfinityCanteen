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

const formSchema = z.object({
    restaurantName: z.string().min(1,"Restaurant Name is required"),
    collegeCity: z.string().min(1,"College City is required"),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number",
    })
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
        price: z.coerce.number().min(1,"Price is requried"),
    })),
    phone: z.string()
        .min(10, "Phone Number must be 10 digits")
        .max(10, "Phone Number must be 10 digits")
        .refine(val => /^\d{10}$/.test(val), {
            message: "Phone Number must be exactly 10 digits and numeric",
    }),

    imageFile: z.instanceof(File, {message: "Image is required"})

})

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({onSave,isLoading}:Props)=>{
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dishes: [],
            menuItems: [{name: "",price: 0}],                        
        }
    })

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

        formData.append("imageFile",formDataJson.imageFile);

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