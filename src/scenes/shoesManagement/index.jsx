import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import DirectionsBike from "@mui/icons-material/DirectionsBike";
import DoneAll from "@mui/icons-material/DoneAll";
import LocalShipping from "@mui/icons-material/LocalShipping";
import AvTimer from "@mui/icons-material/AvTimer";
import StatBox from "../../components/StatBox";
import React, { useEffect, useState } from "react"
import dateFormat from 'dateformat';
import ActionTransaction from "./ActionTransaction";
import AddTransactionForm from "./AddTransactionForm";

const ShoesManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //save data from api
  let [shoesTransaction, setShoesTransaction] = useState([])
  let [dashboardData, setDashboardData] = useState([])

  //state to open dialog
  let [statusDialogTR, setStatusDialogTR] = useState(false)

  //HANDLE
  // AddTransaction open dialog
  const handleClickOpenDialogTR = () => {
    setStatusDialogTR(!statusDialogTR);
    console.log("Index " + statusDialogTR)
  };


  // FETCH DATA API 
  const fetchDashboardData = async () => {
    const response = await fetch("http://localhost:3000/data/shoes-transaction")
    const data = await response.json()
    setDashboardData(data)
  }
  const fetchDataShoesTransactionList = async () => {
    const response = await fetch("http://localhost:3000/order/shoes-transaction")
    const data = await response.json()
    setShoesTransaction(data)
  }

  useEffect(() => {
    fetchDataShoesTransactionList()
    fetchDashboardData()
  }, [])


  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
    },
    {
      field: "treatment",
      headerName: "Treatment",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "address",
      headerName: "Address",
    },
    {
      field: "type",
      headerName: "Shoes Type",
    },
    {
      field: "pickup_staff",
      headerName: "Pick-Up Staff",
    },
    {
      field: "delivery_staff",
      headerName: "Delivery Staff",
    },
    {
      field: "cleaner",
      headerName: "Cleaner",
    },
    {
      field: "pickup_date",
      headerName: "Pick Up date",
      renderCell: (params) => {
        return dateFormat(params.value, "dddd, dd mmm yyyy, h:MM TT")
      }
    },
    {
      field: "due_date",
      headerName: "Due Date",
      renderCell: (params) => {
        return dateFormat(params.value, "dddd, dd mmm yyyy, h:MM TT")
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <ActionTransaction idTrans={params.row.id} fetchDataShoesTransactionList={fetchDataShoesTransactionList} fetchDashboardData={fetchDashboardData} />
        )
      }
    },
  ];

  return (
    <Box m="20px">
      <Header title="Shoes Management" subtitle="Katsikat Shoes Transaction " />
      <AddTransactionForm statusDialogTR={statusDialogTR} handleClickOpenDialogTR={handleClickOpenDialogTR} fetchDashboardData={fetchDashboardData} fetchDataShoesTransactionList={fetchDataShoesTransactionList}/>
      <Box
        display="grid"
        gridTemplateColumns="repeat(15, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {dashboardData.map((data) =>
            <StatBox
              title={data.received}
              subtitle="Order Received"
              progress="0.75"
              increase="+14%"
              icon={
                <ShoppingBasket
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}

        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {dashboardData.map((data) =>

            <StatBox
              title={data.pick_up}
              subtitle="Pick-up Order"
              progress="0.80"
              increase="+43%"
              icon={
                <DirectionsBike
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}

        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          {dashboardData.map((data) =>
            <StatBox
              title={data.process}
              subtitle="On Proggress"
              progress="0.50"
              increase="+21%"
              icon={
                <AvTimer
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}


        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          {dashboardData.map((data) =>
            <StatBox
              title={data.ready}
              subtitle="Ready to Delivery"
              progress="0.30"
              increase="+5%"
              icon={
                <LocalShipping
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}


        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          {dashboardData.map((data) =>
            <StatBox
              title={data.done}
              subtitle="Done"
              progress="0.80"
              increase="+43%"
              icon={
                <DoneAll
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}

        </Box>
      </Box>
      <Box m="40px 0 0 0" display="flex" justifyContent="space-between">
        <Typography variant="h3" sx={{ mt: "5px", fontWeight: "Bold" }}>
          Transaction List
        </Typography>

        <Button variant="outlined" onClick={handleClickOpenDialogTR} sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.blueAccent[100],
          '&:hover': {
            backgroundColor: colors.blueAccent[700],
            color: colors.primary[100],
          },
        }}>
          Add Transaction
        </Button>
      </Box>
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid autoHeight rows={shoesTransaction} columns={columns} />
      </Box>
    </Box>
  );
};

export default ShoesManagement;
