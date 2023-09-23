import { useNavigate } from "react-router-dom";
// @mui
import { Link, Typography } from "@mui/material";

// sections
import EmailVerificationForm from "../sections/Forms/EmailVerificationForm";
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const EmailVerification = () => {

  const authValues = useAppSelector((state: any) => state.auth);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Verify
      </Typography>

      {/* <Typography variant="body2" sx={{ mb: 3 }}>
        Don’t have an account? {""}
        <Link
          component="button"
          variant="subtitle2"
          onClick={() => navigate("/register")}
        >
          Get started
        </Link>
      </Typography> */}

      <Typography variant="body2" gutterBottom>
        To continue, complete this verification step. We've sent an OTP to the
        email {authValues.userAuthInfo.email}. Please enter it below to complete
        verification.
      </Typography>

      <EmailVerificationForm />
    </>
  );
};

export default EmailVerification;
