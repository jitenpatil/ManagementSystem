import { useNavigate } from "react-router-dom";
// @mui
import { Link, Typography } from "@mui/material";

// sections
import ResetPasswordForm from "../sections/Forms/ResetPasswordForm";

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="body2" gutterBottom>
        Please enter new password.
      </Typography>
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
