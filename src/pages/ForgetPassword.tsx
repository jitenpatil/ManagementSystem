import { useNavigate } from "react-router-dom";
// @mui
import { Link, Typography } from "@mui/material";

// sections
import ForgetPasswordForm from "../sections/Forms/ForgetPasswordForm";

const ForgetPassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>

      <Typography variant="body2" sx={{ mb: 3 }}>
        Don’t have an account? {""}
        <Link
          component="button"
          variant="subtitle2"
          onClick={() => navigate("/register")}
        >
          Get started
        </Link>
      </Typography>

      <Typography variant="body2" gutterBottom>
        Please enter the email address and Phone Number associated with your
        account and We will email you a otp to reset your password.
      </Typography>

      <ForgetPasswordForm />
    </>
  );
};

export default ForgetPassword;
