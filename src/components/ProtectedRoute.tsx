import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext"

const ProtectedRoute = ({ children }: any) => {

    const [sessionData, setSessionData] = useState() as any;
    const { userData, setUserDetails } = useContext(UserContext) as any;
    const location = useLocation();

    useEffect(() => {
        const sessionStorageData: any = sessionStorage.getItem('token');
        setSessionData(JSON.parse(sessionStorageData));
    }, []);

    useEffect(() => {
        if (sessionData) {
            //debugger
            setUserDetails({
                email: sessionData.email,
                phoneNumber: sessionData.phoneNumber,
                customerName: sessionData.customerName
            })
        }
    }, [sessionData]);

    if (!userData.userDetails.email && !userData.userDetails.phoneNumber) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

export default ProtectedRoute;
