import { Box, Typography, useTheme, Button, MenuItem } from "@mui/material";
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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const ShoesManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [shoesTransaction, setShoesTransaction] = useState([])
  const [dashboardData, setDashboardData] = useState([])
  const [TreatmentForm, setTreatmentForm] = useState([])
  const [staffForm, setStaffForm] = useState([])
  const [shoesForm, setShoesForm] = useState([])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
  const fetchTreatmentForm = async () => {
    const response = await fetch("http://localhost:3000/treatments/form")
    const data = await response.json()
    console.log(data)
    setTreatmentForm(data)
  }
  const fetchShoesForm = async () => {
    const response = await fetch("http://localhost:3000/shoes/form")
    const data = await response.json()
    console.log(data)
    setShoesForm(data)
  }
  const fetchStaffForm = async () => {
    const response = await fetch("http://localhost:3000/staff/form")
    const data = await response.json()
    console.log(data)
    setStaffForm(data)
  }


  useEffect(() => {
    fetchData()
    fetchDashboardData()
    fetchTreatmentForm()
    fetchShoesForm()
    fetchStaffForm()
  }, [])


  const statusTreat = [
    {
      value: 'Received',
      label: 'Received',
    },
    {
      value: 'Pickup',
      label: 'Pickup',
    },
    {
      value: 'Process',
      label: 'Process',
    },
    {
      value: 'Delivery',
      label: 'Delivery',
    },
    {
      value: 'Ready',
      label: 'Ready',
    },
    {
      value: 'Done',
      label: 'Done',
    },
  ];

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
        <Button variant="outlined" onClick={handleClickOpen} sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.blueAccent[100],
          '&:hover': {
            backgroundColor: colors.blueAccent[700],
            color: colors.primary[100],
          },
        }}>
          Add Transaction
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{
            backgroundColor: colors.blueAccent[700],
          }}>Add Transaction</DialogTitle>
          <DialogContent sx={{
            backgroundColor: colors.blueAccent[900],
          }}>
             <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Status"
              defaultValue="Received"
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
            >
              {statusTreat.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
           
            <TextField
              id="outlined-select-currency"
              select
              label="Treatment"
              defaultValue="OutsideClean"
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
            >
              {TreatmentForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-select-currency"
              select
              label="Shoes Type"
              defaultValue="Casual"
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
            >
              {shoesForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-select-currency"
              select
              label="Pickup Staff"
              defaultValue="Staff"
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
            >
              {staffForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Delivery Staff"
              defaultValue="Staff"
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
            >
              {staffForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Cleaner Staff"
              defaultValue="Staff"
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
            >
              {staffForm.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              autoFocus
              margin="dense"
              id="pickup_date"
              label="Pickup Date"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="due_date"
              label="Due Date"
              type="email"
              fullWidth
              variant="standard"
              sx={{
                mb: "30px",
              }}
            />

          </DialogContent>
          <DialogActions sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.primary[200],
          }}>
            <Button onClick={handleClose} sx={{
              backgroundColor: colors.blueAccent[800],
              color: colors.primary[100],
            }}>Cancel</Button>
            <Button onClick={handleClose} sx={{
              backgroundColor: colors.blueAccent[800],
              color: colors.primary[100],
            }}>Subscribe</Button>
          </DialogActions>
        </Dialog>

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
