import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useAppSelector } from "../redux/hooks";
import useApiService from "../services/ApiService";

const DocumentCard = ({ show, documentType, details }: any) => {
  return (
    <>
      {show ? (
        <Card sx={{ minWidth: 275, mt: 3 }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {documentType}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Delivery Address :{details?.address}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Order date : {details?.creationDate}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Color Print : {details?.color}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Page Count : {details?.pageCount}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Price : {details?.price}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Transaction Status : {details?.transactionStatus}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Order Status : {details?.orderStatus}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => window.open(details?.link)}>
              Uploaded Document
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card
          sx={{
            minWidth: 275,
            mt: 3,
            textAlign: "center",
            minHeight: "40px",
            p: 4,
          }}
        >
          <Typography>No {documentType} data</Typography>
        </Card>
      )}
    </>
  );
};

const Dashboard: React.FC = () => {
  const authValues = useAppSelector((state: any) => state.auth);
  const { admindata, userdata } = useApiService();
  const [rows, setRows] = useState([]) as any;
  const [documentType, setDocumentType] = useState("Blackbook");
  const [blackbookDetails, setBlackbookDetails] = useState({}) as any;
  const [cardDetails, setCardDetails] = useState({}) as any;

  const [showCardData, setShowCardData] = useState(false);
  const [showBlackbookData, setShowBlackbookData] = useState(false);

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const response = await admindata("pending");
        if (response.data.status === "Success") {
          setRows([
            ...response.data.data.map((data: any, index: number) => {
              return {
                ...data,
                id: index,
                address: [
                  data.address,
                  data.city,
                  data.state,
                  data.pincode,
                ].join(", "),
                printingDataCreationTime: new Date(
                  data.printingDataCreationTime
                ).toLocaleDateString("en-GB"),
                orderState: data.orderState.toUpperCase(),
                transactionStatus: data.transactionStatus.toUpperCase(),
              };
            }),
          ]);
        }
      } catch (err: any) {
        console.log("error", err);
      }
    };

    const getUserData_Blackbook = async () => {
      try {
        setShowBlackbookData(false);
        const response = await userdata(
          authValues.userAuthInfo.email,
          "blackbook"
        );
        if (response.data.status === "Success") {
          let blackbookDetails = response.data.data;

          let documentInfo = {
            address: [
              blackbookDetails.address,
              blackbookDetails.city,
              blackbookDetails.state,
              blackbookDetails.pincode,
            ].join(", "),
            creationDate: blackbookDetails.printingDataCreationTime,
            color: blackbookDetails.color,
            pageCount: blackbookDetails.pages,
            price: blackbookDetails.price,
            transactionStatus: blackbookDetails.transactionStatus.toUpperCase(),
            orderStatus: blackbookDetails.orderState.toUpperCase(),
            link: blackbookDetails.s3Link,
          } as any;

          setBlackbookDetails({ ...documentInfo });
          setShowBlackbookData(true);
        }
      } catch (err: any) {
        console.log("error", err);
      }
    };

    const getUserData_Card = async () => {
      try {
        setShowCardData(false);
        const response = await userdata(authValues.userAuthInfo.email, "card");
        if (response.data.status === "Success") {
          let cardDetails = response.data.data;

          let documentInfo = {
            address: [
              cardDetails.address,
              cardDetails.city,
              cardDetails.state,
              cardDetails.pincode,
            ].join(", "),
            creationDate: cardDetails.printingDataCreationTime,
            color: cardDetails.color,
            pageCount: cardDetails.pages,
            price: cardDetails.price,
            transactionStatus: cardDetails.transactionStatus.toUpperCase(),
            orderStatus: cardDetails.orderState.toUpperCase(),
            link: blackbookDetails.s3Link,
          } as any;
          setCardDetails({ ...documentInfo });
          setShowCardData(true);
        }
      } catch (err: any) {
        console.log("error", err);
      }
    };

    if (authValues.userAuthInfo.isAdmin) getAdminData();
    if (!authValues.userAuthInfo.isAdmin) {
      getUserData_Blackbook();
      getUserData_Card();
    }
  }, []);

  const handleChange = (e: any) => {
    setDocumentType(e.target.value);
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "Sr. no", width: 60 },
    {
      field: "customerName",
      headerName: "Customer name",
      width: 150,
      // editable: true,
    },
    {
      field: "collegeName",
      headerName: "College name",
      width: 150,
      // editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      // editable: true,
    },
    {
      field: "phone",
      headerName: "Phone number",
      width: 160,
      // editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 110,
      // editable: true,
    },
    {
      field: "color",
      headerName: "Color",
      width: 70,
      // editable: true,
    },
    {
      field: "pages",
      headerName: "Page count",
      width: 100,
      // editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      sortable: false,
      width: 260,
    },
    {
      field: "printingDataCreationTime",
      headerName: "Created At",
      width: 110,
    },
    {
      field: "orderState",
      headerName: "Order status",
      width: 110,
    },

    {
      field: "transactionStatus",
      headerName: "Transaction Status",
      width: 150,
    },
  ];

  return (
    <>
      <Container>
        <Typography sx={{ mb: 3, fontWeight: "bold" }} variant="h5">
          Uploaded Documents
        </Typography>
        {!authValues.userAuthInfo.isAdmin && (
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Document Type
              </InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={documentType}
                label="Document Type"
                onChange={handleChange}
              >
                <MenuItem value={"Blackbook"}>Blackbook</MenuItem>
                <MenuItem value={"Card"}>Card</MenuItem>
              </Select>
            </FormControl>
            {documentType === "Blackbook" ? (
              <DocumentCard
                show={showBlackbookData}
                documentType="Blackbook"
                details={blackbookDetails}
              />
            ) : (
              <DocumentCard
                show={showCardData}
                documentType="Card"
                details={cardDetails}
              />
            )}
          </Box>
        )}
        {authValues.userAuthInfo.isAdmin && (
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
