import { useNavigate } from "react-router-dom";
// @mui
import { Link, Typography } from "@mui/material";

// sections
import LoginForm from "../sections/Forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Sign in
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

      <LoginForm />
    </>
  );
};

export default Login;
