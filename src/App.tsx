import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
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

const router = createBrowserRouter([
  {
    path: "",
    element: <CommonLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "upload-document",
        element: <UploadDocument />
      }
    ]
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "forget-password",
        element: <ForgetPassword />
      },
      {
        path: "verify",
        element: <EmailVerification />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      },
      {
        path: "pending-verification",
        element: <PendingVerification />
      }
    ]
  }
]);

export default function App() {
  return (
    <div>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  );
}
