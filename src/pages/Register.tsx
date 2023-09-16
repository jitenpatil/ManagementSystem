import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import { Typography, Container, Link } from "@mui/material";

import Logo from "../components/Logo";
// hooks
import useResponsive from "../hooks/useResponsive";
import RegisterForm from "../sections/Forms/RegisterForm";

// ----------------------------------------------------------------------

export default function Register() {
  const navigate = useNavigate();
  const mdUp = useResponsive("up", "md", "");
  // ----------------------------------------------------------------------

  const StyledRoot = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }));

  const StyledSection = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default
  }));

  const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    // minHeight: "60vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0)
  }));

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Sign up
      </Typography>

      <Typography variant="body2" sx={{ mb: 5 }}>
        Already have an account? {""}
        <Link
          component="button"
          variant="subtitle2"
          onClick={() => navigate("/login")}
        >
          Login
        </Link>
      </Typography>

      <RegisterForm />
    </>
  );
}
