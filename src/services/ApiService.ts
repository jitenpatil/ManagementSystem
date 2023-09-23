import axios from "axios";
// import { UserContext } from "../context/userContext";
// import { useContext } from "react";

function useApiService() {
  // const { userData } = useContext(UserContext) as any;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const config = {
    headers: {
      // "Content-Type": "multipart/form-data",
      "x-api-key": apiKey,
    },
  };

  //Upload API headers
  const uploadConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": apiKey,
    },
  };

  const login = async (req: any) => {
    return await axios.post(`${apiBaseUrl}/user/login`, req, config);
  };

  const signup = async (req: any) => {
    return await axios.post(`${apiBaseUrl}/user/sign-up`, req, config);
  };

  const resetpassword = async (req: any) => {
    return await axios.post(`${apiBaseUrl}/user/reset-password`, req, config);
  };

  const sendotp = async (req: any) => {
    return await axios.post(`${apiBaseUrl}/user/send-otp`, req, config);
  };

  const verifyotp = async (req: any) => {
    return await axios.post(`${apiBaseUrl}/user/verify-otp`, req, config);
  };

  const storefile = async (req: any) => {
    return await axios.post(
      `${apiBaseUrl}/print/store-file`,
      req,
      uploadConfig
    );
  };

  const admindata = async () => {
    return await axios.get(
      `${apiBaseUrl}/admin/data?orderState=pending`,
      config
    );
  };

  return {
    login,
    signup,
    resetpassword,
    sendotp,
    verifyotp,
    storefile,
    admindata,
  };
}

export default useApiService;
