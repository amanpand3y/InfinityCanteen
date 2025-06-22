import { useParams } from "react-router-dom";
import { collegeMap } from "@/data/CollegeMap";
import { useSearchRestaurants } from "@/api/RestaurantApi";
import Spinner from "@/components/ui/spinner";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";

const SearchPage = () => {
    const {collegeCity} = useParams();
    const {results,isLoading} = useSearchRestaurants(collegeCity);

    if(isLoading){
        <span><Spinner/></span>
    }
    if(!results?.data || !collegeCity){
        return <span> No Results Found</span>
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="dishes-list"> Insert Dishes Here</div>
            <div id="main-content" className="fkex flex-col gap-5">
                <SearchResultInfo total= {results.pagination.total} collegeCity={collegeCity}/>
                {results.data.map((restaurant)=>(
                    <SearchResultCard restaurant={restaurant}/>
                ))}
            </div>
        </div>
        
    )
}

export default SearchPage;