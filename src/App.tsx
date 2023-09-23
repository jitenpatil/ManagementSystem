import "./styles.css";
import { createBrowserRouter, Routes, Route, BrowserRouter as Router, Navigate, useNavigate } from "react-router-dom";
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

export default function App() {



  return <>
      <Router>
        <Routes>
          <Route path="" element={<CommonLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/upload-document" element={<ProtectedRoute><UploadDocument /></ProtectedRoute>} />
          </Route>
          <Route path="" element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/verify" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/pending-verification" element={<PendingVerification />} />
          </Route>
        </Routes>
      </Router>
  </>;

}
