import * as Yup from "yup";
import {
  Link as RouterLink,
  useNavigate,
  useOutletContext
} from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { useState, useEffect, useContext } from "react";
// material
import { Stack, TextField, Alert, Snackbar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
// import useLoginService from '../../../services/apiServices/useLoginService';
import Iconify from "../../components/Iconify";
import useApiService from "../../services/ApiService";
import { UserContext } from "../../context/userContext";
// import { UserContext } from "src/context/userContext";
// import dummyUsers from "src/_mock/dummyUsersData";
// import { Encrypt, decryptData } from '../../../encryptionDecryption';
// ----------------------------------------------------------------------

export default function PendingVerificationForm() {
  const navigate = useNavigate();
  const { verifyotp, sendotp } = useApiService();
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState(undefined) as any;
  const [severityMessage, setSeverityMessage] = useState("");

  const {
    flow,
    setOpenSnackbar,
    setSnackbarMessage
  } = useOutletContext() as any;

  const { userData, setUserDetails } = useContext(UserContext) as any;

  const PendingVerificationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Please enter phone number added during account creation")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: ""
    },
    validationSchema: PendingVerificationSchema,

    onSubmit: async (values: any) => {
      setUserDetails({
        // email: values.email,
        ...userData.userDetails,
        phoneNumber: values.phoneNumber
      });
      navigate("/verify");
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

  useEffect(() => {
    if (userData.userDetails.email) {
      formik.setFieldValue("email", userData.userDetails.email);
    }
  }, [userData.userDetails.email]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 3, display: showAlert ? "block" : "none" }}>
          <Alert severity={severity}>{severityMessage}</Alert>
        </Stack>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="emailId"
            type="text"
            label="Email ID"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            disabled
          />
          <TextField
            fullWidth
            autoComplete="phoneNumber"
            type="text"
            label="Phone Number"
            {...getFieldProps("phoneNumber")}
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
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
          // loading={isOtpSending}
          onClick={() => {
            navigate("/login");
          }}
        >
          Back
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
