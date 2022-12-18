import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import DirectionsBike from "@mui/icons-material/DirectionsBike";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import History from "@mui/icons-material/History";
import DoneAll from "@mui/icons-material/DoneAll";
import LocalShipping from "@mui/icons-material/LocalShipping";
import AvTimer from "@mui/icons-material/AvTimer";
import NotificationImportant from "@mui/icons-material/NotificationImportant";
import StatBox from "../../components/StatBox";
import { mockDataTeam } from "../../data/mockData";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react"



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shoesTransaction, setShoesTransaction] = useState([])

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/shoes-transaction")
    const data = await response.json()
    setShoesTransaction(data)
  }

  useEffect(() => {
    fetchData()
    console.log(shoesTransaction)
  }, [])

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "customer_name",
      headerName: "Customer Name",
      flex: 1,
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
      flex: 1,
    },
    {
      field: "shoes_type",
      headerName: "Due Date",
      flex: 1,
    },
    {
      field: "pickup_date",
      headerName: "Pick Up date",
      flex: 1,
    },
    {
      field: "due_date",
      headerName: "Due Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
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
          <StatBox
            title="10"
            subtitle="Order Received"
            progress="0.75"
            increase="+14%"
            icon={
              <ShoppingBasket
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="8"
            subtitle="On Proggress"
            progress="0.50"
            increase="+21%"
            icon={
              <AvTimer
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Ready to Delivery"
            progress="0.30"
            increase="+5%"
            icon={
              <LocalShipping
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1"
            subtitle="Done"
            progress="0.80"
            increase="+43%"
            icon={
              <DoneAll
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="5"
            subtitle="New Customers"
            progress="0.80"
            increase="+43%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3"
            subtitle="Repeat Order"
            progress="0.80"
            increase="+43%"
            icon={
              <History
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3"
            subtitle="Pick-up Order"
            progress="0.80"
            increase="+43%"
            icon={
              <DirectionsBike
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="Must be Done"
            progress="0.80"
            increase="+43%"
            icon={
              <NotificationImportant
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>


      </Box>
      <Box
        m="40px 0 0 0"
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
        <Typography variant="h2" fontWeight={700} color={colors.grey[100]}>
          Orders List
        </Typography>
        <DataGrid rows={shoesTransaction} columns={columns} />
      </Box>
    </Box>
  );
};

export default Dashboard;
