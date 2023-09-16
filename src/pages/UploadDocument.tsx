import { useRef, useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Container,
  MenuItem,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const UploadDocument: React.FC = () => {
  const fileRef = useRef(null) as any;
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [showFileUploadContainer, setShowFileUploadContainer] = useState(false);

  const validationSchema = yup.object({
    customerName: yup.string().required("Naam likh de chodu"),
    address: yup.string().required("Order kiske pass bheju gandu"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    pincode: yup.number().required("Pincode is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup
      .number()
      .min(10, "Phone Number should be of 10 digits")
      .required("Phone Number is required")
    // file: yup.object().required("File is required")
  });

  const formik = useFormik({
    initialValues: {
      customerName: "",
      type: "blackbook",
      color: "color",
      pages: 0,
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      data: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log("Values", values);
      //check file
      if (!values.data) {
        setFileError("Please select document to be uploaded");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://yni14izx17.execute-api.ap-south-1.amazonaws.com/v1/storedata/user",
          {
            ...values,
            color: values.color === "color" ? true : false
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-api-key": "s28X4ojglR9yk06xQtLNd4UQlHfsUY8g39ILcaYk"
            }
          }
        );
        console.log("Data:", data);
      } catch (e) {
        console.log(e);
      }
    }
  }) as any;

  const handleClick = () => {
    fileRef.current.click();
  };

  const removeFile = () => {
    setFileName("");
    setShowFileUploadContainer(false);
    fileRef.current = null;
    formik.setFieldValue("data", "");
    formik.setFieldValue("pages", 0);
  };

  const handleFileChange = (event: any) => {
    setFileError("");
    console.log(event.currentTarget.files[0]);
    const fileName = event.currentTarget.files[0].name;
    const fileExtension = fileName.split(".").pop();
    const allowedExtension = ["pdf"] as any;
    if (allowedExtension.includes(fileExtension)) {
      formik.setFieldValue("data", event.currentTarget.files[0]);
      setShowFileUploadContainer(true);
      setFileName(fileName);
    } else {
      setFileError(
        `${fileExtension} not allowed. Please upload document in PDF format`
      );
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                Personal Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="customerName"
                name="customerName"
                label="Customer Name"
                variant="outlined"
                fullWidth
                value={formik.values.customerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.customerName &&
                  Boolean(formik.errors.customerName)
                }
                helperText={
                  formik.touched.customerName && formik.errors.customerName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="phone"
                label="Phone Number"
                variant="outlined"
                name="phone"
                fullWidth
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                Document Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="type"
                label="Document Type"
                variant="outlined"
                select
                fullWidth
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                <MenuItem value="blackbook">Blackbook</MenuItem>
                <MenuItem value="card">Card</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="color"
                label="Print Type"
                variant="outlined"
                select
                fullWidth
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              >
                <MenuItem value={"color"}>Color</MenuItem>
                <MenuItem value={"black"}>Black</MenuItem>
              </TextField>
            </Grid>
            {!showFileUploadContainer && (
              <>
                <Grid item xs={12} sm={6} md={6}>
                  <Button variant="outlined" onClick={handleClick} fullWidth>
                    Browse Document
                  </Button>
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={(e: any) => handleFileChange(e)}
                    style={{ display: "none" }}
                  />
                  {fileError ? (
                    <p
                      style={{
                        color: "#d32f2f",
                        fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        textAlign: "left",
                        marginTop: "3px",
                        marginRight: "14px",
                        marginBottom: 0,
                        marginLeft: "14px"
                      }}
                    >
                      {fileError}
                    </p>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="primary">
                    *Please upload PDF document
                  </Typography>
                </Grid>
              </>
            )}
            {showFileUploadContainer && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "1px dashed grey",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    mt: "10px"
                  }}
                >
                  <Typography variant="subtitle1">{fileName}</Typography>
                  <Button onClick={removeFile}>
                    <DeleteIcon />
                  </Button>
                </Box>
                <Box>
                  <Typography variant="subtitle1">
                    Total pages: {formik.values.pages}
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                Delivery Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                label="Address (Area and street)"
                variant="outlined"
                multiline
                rows={4}
                name="address"
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="landmark"
                label="Landmark"
                variant="outlined"
                name="landmark"
                fullWidth
                value={formik.values.landmark}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.landmark && Boolean(formik.errors.landmark)
                }
                helperText={formik.touched.landmark && formik.errors.landmark}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="city"
                label="City/District/Town"
                variant="outlined"
                name="city"
                fullWidth
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                id="state"
                label="State"
                variant="outlined"
                name="state"
                fullWidth
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              {" "}
              <TextField
                id="pincode"
                label="Pincode"
                variant="outlined"
                name="pincode"
                fullWidth
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default UploadDocument;
