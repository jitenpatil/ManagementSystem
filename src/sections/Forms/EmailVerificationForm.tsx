import * as Yup from "yup";
import {
  Link as RouterLink,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { useState, useEffect, useContext } from "react";
// material
import { Stack, TextField, Alert, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import useApiService from "../../services/ApiService";

import { useAppSelector } from "../../redux/hooks";
// ----------------------------------------------------------------------

export default function EmailVerificationForm() {
  const navigate = useNavigate();
  const { verifyotp, sendotp } = useApiService();
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState(undefined) as any;
  const [severityMessage, setSeverityMessage] = useState("");

  const authValues = useAppSelector((state: any) => state.auth);

  const { flow, setOpenSnackbar, setSnackbarMessage } =
    useOutletContext() as any;

  const [isOtpSending, setIsOtpSending] = useState(false);

  const EmailVerificationSchema = Yup.object().shape({
    otp: Yup.string().required("Please enter OTP"),
    // phoneNumber: Yup.string()
    //   .matches(/^[0-9]+$/, "Must be only digits")
    //   .min(10, "Must be exactly 10 digits")
    //   .max(10, "Must be exactly 10 digits")
    //   .required("Please enter phone number added during account creation")
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
      // phoneNumber: ""
    },
    validationSchema: EmailVerificationSchema,

    onSubmit: async (values: any) => {
      setShowAlert(false);
      try {
        let request = {
          email: authValues.userAuthInfo.email,
          phone: authValues.userAuthInfo.phoneNumber,
          otp: values.otp,
        };
        const response = await verifyotp(request);
        if (response.data.status === "Success") {
          setOpenSnackbar(true);
          setSnackbarMessage(response.data.message);
          if (flow === "FORGET_PASSWORD") {
            navigate("/reset-password", { replace: true });
          } else if (flow === "ACCOUNT_CREATION") {
            navigate("/login", { replace: true });
          } else {
            navigate("/login", { replace: true });
          }
        }
      } catch (err: any) {
        // console.log("error", error);
        setShowAlert(true);
        setSeverity("error");
        setSeverityMessage(err.response.data.message);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleSendOtp = async () => {
    setIsOtpSending(true);
    setShowAlert(false);
    try {
      if (
        authValues.userAuthInfo.email &&
        authValues.userAuthInfo.phoneNumber
      ) {
        let request = {
          email: authValues.userAuthInfo.email,
          phone: authValues.userAuthInfo.phoneNumber,
        };
        const response = await sendotp(request);
        if (response.data.status === "Success") {
          //Snackbar
          setOpenSnackbar(true);
          setSnackbarMessage("Otp sent successfully!");
        }
      }
    } catch (err: any) {
      // console.log("error", error);
      setShowAlert(true);
      setSeverity("error");
      setSeverityMessage(err.response.data.message);
    } finally {
      setIsOtpSending(false);
    }
  };

  // useEffect(() => {
  //   //handleSendOtp();
  // }, [authValues.userAuthInfo.email, authValues.userAuthInfo.phoneNumber]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 3, display: showAlert ? "block" : "none" }}>
          <Alert severity={severity}>{severityMessage}</Alert>
        </Stack>
        <Stack spacing={3} sx={{ my: 2 }}>
          {/* {flow === "PENDING_VERIFICATION" ? (
            <TextField
              fullWidth
              autoComplete="phoneNumber"
              type="text"
              label="Phone Number"
              {...getFieldProps("phoneNumber")}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          ) : null} */}
          <TextField
            fullWidth
            autoComplete="otp"
            type="text"
            label="Enter OTP"
            {...getFieldProps("otp")}
            error={Boolean(touched.otp && errors.otp)}
            helperText={touched.otp && errors.otp}
          />
        </Stack>
        <Stack spacing={3} sx={{ my: 2 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Continue
          </LoadingButton>
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="button"
          variant="outlined"
          loading={isOtpSending}
          onClick={() => {
            handleSendOtp();
          }}
        >
          Resend OTP
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
