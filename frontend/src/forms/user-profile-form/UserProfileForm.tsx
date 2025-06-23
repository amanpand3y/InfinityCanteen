import { useForm } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { useEffect } from "react";

const formSchema =z.object({
    email: z.string().optional(),
    name: z.string().min(1,"Name is required"),
    hostel: z.string().min(1,"Hostel is required"),
    roomno: z.string()
    .min(1, "Room No. is required")
    .refine(val => !isNaN(Number(val)), {
        message: "Room No. must be a number",
    }),

    phone: z.string()
    .min(10, "Phone Number must be 10 digits")
    .max(10, "Phone Number must be 10 digits")
    .refine(val => /^\d{10}$/.test(val), {
        message: "Phone Number must be exactly 10 digits and numeric",
    }),
    college: z.string().min(1,"College Name is required"),

});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User,
    onSave: (userProfileData: UserFormData)=>void;
    isLoading: boolean,
    title?: string,
    buttonText?: string
}

const UserProfileForm = ({currentUser,onSave,isLoading,title="User Profile",buttonText ="Submit"}:Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(()=>{
        form.reset(currentUser)
    },[currentUser,form])
    
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <FormDescription>
                        View and chhange your profile Information here.
                    </FormDescription>
                </div>
                <FormField control={form.control} name="email" render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} disabled className="bg-white"/>
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="name" render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="phone" render={({field})=>(
                    <FormItem className="flex-1">
                        <FormLabel>Phone No.</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="college" render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>College Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="hostel" render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>Hostel</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="roomno" render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>Room No.</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                </div>
                {isLoading? (<LoadingButton/>) : (<Button type="submit" className="bg-orange-500">{buttonText}</Button>)}

            </form>            
        </Form>
    )
};

export default UserProfileForm;