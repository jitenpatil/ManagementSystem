import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useAppSelector } from "../redux/hooks";
import useApiService from "../services/ApiService";

const Dashboard: React.FC = () => {
  const authValues = useAppSelector((state: any) => state.auth);
  const { admindata } = useApiService();
  const [rows, setRows] = useState([]) as any;
  const [documentType, setDocumentType] = useState("blackbook");

  useEffect(() => {
    const getAdminData = async () => {
      try {
        const response = await admindata();
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
    if (authValues.userAuthInfo.isAdmin) getAdminData();
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
      headerName: "Status",
      width: 110,
    },
  ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  return (
    <>
      <Container>
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
        {!authValues.userAuthInfo.isAdmin && (
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Document Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={documentType}
                label="Document Type"
                onChange={handleChange}
              >
                <MenuItem value={"blackbook"}>Blackbook</MenuItem>
                <MenuItem value={"card"}>Card</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
