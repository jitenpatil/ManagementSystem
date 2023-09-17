import * as Yup from "yup";
import { useState, useEffect, useContext } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useOutletContext
} from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
// import useLoginService from '../../../services/apiServices/useLoginService';
import Iconify from "../../components/Iconify";
import { UserContext } from "../../context/userContext";
import useApiService from "../../services/ApiService";

// import dummyUsers from "src/_mock/dummyUsersData";
// import { Encrypt, decryptData } from '../../../encryptionDecryption';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [severity, setSeverity] = useState(undefined) as any;
  const [severityMessage, setSeverityMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { setFlow } = useOutletContext() as any;
  const { login } = useApiService();

  const { setUserDetails } = useContext(UserContext) as any;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,

    onSubmit: async () => {
      try {
        let request = {
          email: formik.values.email,
          password: formik.values.password
        };
        const response = await login(request);
        console.log(response);
        if (response.data.status === "Success") {
          // debugger;
          setUserDetails({
            email: response.data?.email,
            phoneNumber: response.data?.phone
          });
          sessionStorage.setItem("token", JSON.stringify({
            email: response.data?.email,
            phoneNumber: response.data?.phone
          }));
          navigate("/upload-document", { replace: true });
        }
      } catch (err:any) {
        // console.log("error", err.response);
        setShowAlert(true);
        setSeverity("error");
        setSeverityMessage(err.response.data.message);

        if (err.response.data.message === "Account not verified") {
          setUserDetails({
            email: formik.values.email
          });
        }
      }
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handlePendingVerification = () => {
    navigate("/pending-verification");
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 3, display: showAlert ? "block" : "none" }}>
          <Alert severity={severity}>
            {severityMessage}
            {severityMessage.includes("Account not verified") ? (
              <Button
                variant="text"
                sx={{ height: "10px" }}
                onClick={handlePendingVerification}
              >
                VERIFY
              </Button>
            ) : null}
          </Alert>
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="emailId"
            type="text"
            label="Email ID"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          {/* <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          /> */}

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/forget-password"
            underline="hover"
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
