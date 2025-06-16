import Layout from "./layouts/layout.tsx"
import { Navigate, Route,Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";

const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout showHero={true}><HomePage/></Layout>}/>
            <Route path="/auth-callback" element ={<AuthCallbackPage/>}/>
            <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes