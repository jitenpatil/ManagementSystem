import axios from "axios";
// import { UserContext } from "../context/userContext";
// import { useContext } from "react";

function useApiService() {
  // const { userData } = useContext(UserContext) as any;

  const config = {
    headers: {
      // "Content-Type": "multipart/form-data",
      "x-api-key": "s28X4ojglR9yk06xQtLNd4UQlHfsUY8g39ILcaYk"
    }
  };

  const login = async (req: any) => {
    return await axios.post(
      `https://yni14izx17.execute-api.ap-south-1.amazonaws.com/v1/user/login`,
      req,
      config
    );
  };

  const signup = async (req: any) => {
    return await axios.post(
      `https://yni14izx17.execute-api.ap-south-1.amazonaws.com/v1/user/sign-up`,
      req,
      config
    );
  };

  const resetpassword = async (req: any) => {
    return await axios.post(
      `https://yni14izx17.execute-api.ap-south-1.amazonaws.com/v1/user/reset-password`,
      req,
      config
    );
  };

  const sendotp = async (req: any) => {
    return await axios.post(
      `https://yni14izx17.execute-api.ap-south-1.amazonaws.com/v1/user/send-otp`,
      req,
      config
    );
  };

  const verifyotp = async (req: any) => {
    return await axios.post(
      `https://yni14izx17.execute-api.ap-south-1.amazonaws.com/v1/user/verify-otp`,
      req,
      config
    );
  };

  return {
    login,
    signup,
    resetpassword,
    sendotp,
    verifyotp
  };
}

export default useApiService;
