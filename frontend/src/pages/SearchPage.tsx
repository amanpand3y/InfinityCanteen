import { useParams } from "react-router-dom";
import { collegeMap } from "@/data/CollegeMap";

const SearchPage = () => {
    const {collegeCity} = useParams();


    return (
        <span>User searched for {collegeCity ? collegeMap[collegeCity as keyof typeof collegeMap] : "Unknown college"}</span>
    )
}

export default SearchPage;