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


const ShoesManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shoesTransaction, setShoesTransaction] = useState([])
  const [dashboardData, setDashboardData] = useState([])

  const fetchDashboardData = async () => {
    const response = await fetch("http://localhost:3000/data/shoes-transaction")
    const data = await response.json()
    console.log(data)
    setDashboardData(data)
  }
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/order/shoes-transaction")
    const data = await response.json()
    console.log(data)
    setShoesTransaction(data)
  }

  useEffect(() => {
    fetchData()
    fetchDashboardData()
  }, [])

  const columns = [
    { field: "id", headerName: "ID", width: 50},
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
      field: "courier",
      headerName: "Pick-Up Staff",
    },
    {
      field: "courier1",
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
    },
  ];

  return (
    <Box m="20px">
      <Header title="Shoes Management" subtitle="Katsikat Shoes Transaction " />

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

          <StatBox
            title="1"
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
            title="1"
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
            title="3"
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
      </Box>

      <Box m="40px 0 0 0" display="flex" justifyContent="space-between">
        <Typography variant="h3" sx={{ mt: "5px", fontWeight: "Bold" }}>
          Transaction List
        </Typography>
        <Button variant="contained" sx={{
          backgroundColor: colors.blueAccent[600],
          color: colors.grey[100],
          "&:hover": {
            backgroundColor: colors.blueAccent[700],
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
