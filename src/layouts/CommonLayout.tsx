import { useState } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import { Header } from "../components/Header";
import { NavigationPanel } from "../components/NavigationPanel";
import { Snackbar, Alert } from "@mui/material";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden"
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

const CommonLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
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
      <Header onOpenNav={() => setOpen(true)} />

      <NavigationPanel openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet context={{ setSnackbarMessage, setOpenSnackbar }}/>
      </Main>
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
      </Alert>
    </Snackbar>
  </>
  );
};

export default CommonLayout;
