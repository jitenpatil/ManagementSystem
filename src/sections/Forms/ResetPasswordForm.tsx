import * as Yup from "yup";
import { useState, useContext } from "react";
import {
  useNavigate,
  useOutletContext
} from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component

import Iconify from "../../components/Iconify";
import useApiService from "../../services/ApiService";
import { useAppSelector } from '../../redux/hooks';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { resetpassword } = useApiService();

  const { setOpenSnackbar, setSnackbarMessage } = useOutletContext() as any;
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState(undefined) as any;
  const [severityMessage, setSeverityMessage] = useState("");

  const authValues = useAppSelector((state: any) => state.auth);

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords don't match!")
      .required("Required")
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: ResetPasswordSchema,

    onSubmit: async () => {
      setShowAlert(false);
      try {
        let request = {
          email: authValues.userAuthInfo.email,
          password: formik.values.password
        };
        const response = await resetpassword(request);
        if (response.data.status === "Success") {
          setOpenSnackbar(true);
          setSnackbarMessage("Password reset successful");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.log("error", error);
        setShowAlert(true);
        setSeverity("error");
        setSeverityMessage("System Error");
      }
    }
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  // const handleShowPassword = () => {
  //   setShowPassword((show) => !show);
  // };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 3, display: showAlert ? "block" : "none" }}>
          <Alert severity={severity}>{severityMessage}</Alert>
        </Stack>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            {...getFieldProps("confirmPassword")}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Reset
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
