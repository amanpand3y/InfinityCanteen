import {Request,Response} from "express";
import Restaurant from "../models/restaurant.model";

const searchRestaurant = async (req:Request,res:Response) => {
    try{
        const collegeCity = req.params.collegeCity;
        
        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedDishes = (req.query.selectedDishes as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        let query:any = {};

        query["collegeCity"] = new RegExp(collegeCity,"i");
        const collegeCityCheck = await Restaurant.countDocuments(query);

        if(collegeCityCheck === 0){ 
            res.status(404).json(
                {
                    data:[],
                    pagination: {
                        total:0,
                        page: 1,
                        pages: 1,
                    }
                }
            );
            return;
        }

        if(selectedDishes){
            const dishesArray = selectedDishes.split(",").map((dish)=> new RegExp(dish,"i"));
            query["dishes"]={$all:dishesArray};
        }

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");

            query["$or"] = [
                { restaurantName: searchRegex },
                { "menuItems.name": searchRegex }
            ];
        }

        const pageSize =10;
        const skip = (page-1) * pageSize;

        const restaurants = await Restaurant.find(query).sort({[sortOption]:1}).skip(skip).limit(pageSize).lean();

        const total = await Restaurant.countDocuments(query);

        const finalResponse = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total/pageSize),
            }
        }

        res.json(finalResponse);

    } catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong in search Restaurant"});
    }

};


const getRestaurant = async(req:Request,res:Response) => {
    try {
        const restaurantId = req.params.restaurantId;

        const restaurant = await Restaurant.findById(restaurantId);

        if(!restaurant){
            return res.status(404).json({message:"restaurant not found"});
        }

        res.json(restaurant);       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong while getting Restaurant"})
        
    }
}

export default {searchRestaurant,getRestaurant};