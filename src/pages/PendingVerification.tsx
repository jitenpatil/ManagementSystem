
// @mui
import { Link, Typography } from "@mui/material";

// sections
import PendingVerificationForm from "../sections/Forms/PendingVerificationForm";


const PendingVerification = () => {

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pending Verification
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
        Please enter below details to complete verification.
      </Typography>

      <PendingVerificationForm />
    </>
  );
};

export default PendingVerification;
