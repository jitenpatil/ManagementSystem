import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/Logo";

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

// ----------------------------------------------------------------------

const AuthLayout = () => {
  const mdUp = useResponsive("up", "md", "");
  const navigate = useNavigate();

  const [flow, setFlow] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  return (
    <>
      <StyledRoot>
        {/* <Logo
          // sx={{
          //   position: "fixed",
          //   top: { xs: 16, sm: 24, md: 40 },
          //   left: { xs: 16, sm: 24, md: 40 }
          // }}
          /> */}

        {mdUp && (
          <StyledSection>
            <Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ px: 5, mb: 4, textAlign: "center" }}
                >
                  Hi, Welcome to
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}
                >
                  <Logo imageWidth="100px" />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ px: 5, mt: 1, textAlign: "center", fontWeight: "bold" }}
                >
                  Vinayak Prints
                </Typography>
              </Box>
            </Box>
            {/* <img
                src="/assets/illustrations/illustration_login.png"
                alt="login"
              /> */}
            {/* <Logo /> */}
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Outlet
              context={{ flow, setFlow, setSnackbarMessage, setOpenSnackbar }}
            />
            {/* <LoginForm /> */}
          </StyledContent>
        </Container>
      </StyledRoot>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          // sx={{ backgroundColor: "rgb(56, 142, 60)", color: "black" }}
        >
          {/* Otp sent successfully! */}
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthLayout;
