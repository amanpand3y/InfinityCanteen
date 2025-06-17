import {useAuth0} from "@auth0/auth0-react"
import {Navigate,Outlet} from "react-router-dom"
import Spinner from "@/components/ui/spinner";

const ProtectedRoute = () => {
    const {isAuthenticated,isLoading} = useAuth0();

    if (isLoading) return <Spinner />;

    return isAuthenticated? (<Outlet/>):(<Navigate to="/" replace/>)
};

export default ProtectedRoute;