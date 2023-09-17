import "./styles.css";
import { createBrowserRouter, Routes, Route, BrowserRouter as Router, Navigate, useNavigate } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { useState, useEffect, useContext } from 'react';
//layouts
import CommonLayout from "./layouts/CommonLayout";
import AuthLayout from "./layouts/AuthLayout";
//pages
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./pages/UploadDocument";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import PendingVerification from "./pages/PendingVerification";

import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./context/userContext"


export default function App() {

  

  return <>
    <UserContextProvider>
      <Router>
        <Reload />
      </Router>
    </UserContextProvider>
  </>;

}

const Reload = () => {
  const [sessionData, setSessionData] = useState() as any;
  const { userData, setUserDetails } = useContext(UserContext) as any;
  const navigate = useNavigate();

  useEffect(()=>{
    if(window.location.pathname==="/"){
      navigate("/login");
    }
  },[])

  useEffect(() => {
    const sessionStorageData: any = sessionStorage.getItem('token');
    setSessionData(JSON.parse(sessionStorageData));
  }, []);

  useEffect(() => {
    if (sessionData) {
      //debugger
      setUserDetails({
        email: sessionData?.email,
        phoneNumber: sessionData?.phoneNumber
      })
    }
  }, [sessionData]);


  return (
    <div>
      <Routes>
        {
          userData.userDetails.email && userData.userDetails.phoneNumber ?
            <Route path="" element={<CommonLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload-document" element={<UploadDocument />} />
            </Route>
            :
            <Route path="/*" element={<ProtectedRoute />} />
        }
        <Route path="" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/pending-verification" element={<PendingVerification />} />
        </Route>
      </Routes>
    </div>
  );

}
