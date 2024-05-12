import { Navigate, Outlet, Route, Routes as Router } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import GoogleOAuthSuccessRedirect from "./pages/GoogleOAuthSuccessRedirect"
import FacebookOAuthSuccessRedirect from "./pages/FacebookOAuthSuccessRedirect"
import { useAuthStore } from "./store"

type Props = {}

const PrivateRoutes = () => {
    const authenticated = useAuthStore(state => state.authenticated)

    console.log('authenticated', authenticated)
    if (!authenticated) return <Navigate to="/login" replace />
    return <Outlet />
}

const Routes = (props: Props) => {
    return (
        <Router>
            <Route path="/google-oauth-success-redirect" element={<GoogleOAuthSuccessRedirect />} >
                <Route path=":accessToken" element={<GoogleOAuthSuccessRedirect />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/facebook" element={<FacebookOAuthSuccessRedirect />} />
            <Route element={<PrivateRoutes />} >
                <Route path="/" element={<Home />} />
            </Route>
        </Router>
    )
}

export default Routes