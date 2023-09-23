import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../redux/hooks';

const ProtectedRoute = ({ children }: any) => {

    const authValues = useAppSelector((state: any) => state.auth);
    const location = useLocation();

    if (!authValues.userAuthInfo.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

export default ProtectedRoute;
