export type User = {
    _id: string;
    email: string;
    name: string;
    hostel: string;
    roomno: string;
    phone: string;
    college: string;
}
export type MenuItem={
    _id:string;
    name:string;
    price:string;
}

export type Restaurant = {
    _id:string;
    user:string;
    restaurantName:string;
    collegeCity:string;
    phone:string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    dishes: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
}

export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination:{
        total:number,
        page:number,
        pages:number
    }
}
