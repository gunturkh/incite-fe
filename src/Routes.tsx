import { Navigate, Outlet, Route, Routes as Router } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import GoogleOAuthSuccessRedirect from "./pages/GoogleOAuthSuccessRedirect"
import FacebookOAuthSuccessRedirect from "./pages/FacebookOAuthSuccessRedirect"
import { useAuthStore } from "./store"
import Register from "./pages/Register"
import EmailVerification from "./pages/EmailVerification"
import ErrorPage from "./pages/Error"
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword"
import ChangePassword from "./pages/ChangePassword"

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
                <Route path=":accessToken/:from" element={<GoogleOAuthSuccessRedirect />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-verification" element={<EmailVerification />} >
                <Route path=":token" element={<EmailVerification />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password/:token" element={<ChangePassword />} />
            <Route path="/auth/facebook" element={<FacebookOAuthSuccessRedirect />} />
            <Route path="/error/:message" element={<ErrorPage />} />
            <Route element={<PrivateRoutes />} >
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Router>
    )
}

export default Routes