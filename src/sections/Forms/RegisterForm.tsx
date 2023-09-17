import * as Yup from "yup";
import { useState, useContext } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate, useOutletContext } from "react-router-dom";

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
import { UserContext } from "../../context/userContext";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const { signup } = useApiService();
  const { userData, setUserDetails } = useContext(UserContext) as any;
  const [severity, setSeverity] = useState(undefined) as any;
  const [severityMessage, setSeverityMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setFlow } = useOutletContext() as any;
  const RegisterSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
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
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values: any) => {
      try {
        let request = {
          phone: values.phoneNumber,
          email: values.email,
          password: values.password
        };
        const response = await signup(request);
        if (response.data.status === "Success") {
          setFlow("ACCOUNT_CREATION");
          setUserDetails({
            ...userData.userDetails,
            email: values.email,
            phoneNumber: values.phoneNumber
          });
          navigate("/verify", { replace: true });
        }
      } catch (err:any) {
        // console.log("error", error);
        setShowAlert(true);
        setSeverity("error");
        setSeverityMessage(err.response.data.message);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 3, display: showAlert ? "block" : "none" }}>
          <Alert severity={severity}>{severityMessage}</Alert>
        </Stack>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              type="text"
              label="Phone Number"
              {...getFieldProps("phoneNumber")}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Stack>

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

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
