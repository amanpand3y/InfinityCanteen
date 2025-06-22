import { collegeMap } from "@/data/CollegeMap";
import { Link } from "react-router-dom";

type Props = {
    total:number;
    collegeCity:string;
}

const SearchResultInfo = ({total,collegeCity}: Props)=> {
    return (
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} Restaurants Found in  {collegeMap[collegeCity]}
                <Link to="/" className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Change College</Link>
            </span>
            insert sort dropdown here

        </div>
    )
}

export default SearchResultInfo;