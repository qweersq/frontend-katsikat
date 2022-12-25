import { Box, Typography, useTheme, Button, MenuItem, InputAdornment } from "@mui/material";
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
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { EastTwoTone } from "@mui/icons-material";


const ShoesManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let [shoesTransaction, setShoesTransaction] = useState([])
  let [dashboardData, setDashboardData] = useState([])
  let [TreatmentForm, setTreatmentForm] = useState([])
  let [staffForm, setStaffForm] = useState([])
  let [shoesForm, setShoesForm] = useState([])
  let [pickupList, setPickupList] = useState([])
  let [deliveryList, setDeliveryList] = useState([])
  let [nameCustomer, setNameCustomer] = useState([])
  let [CustomerNew, setCustomerNew] = useState(true);
  let [pickupNew, setPickupNew] = useState(true);
  let [deliveryNew, setDeliveryNew] = useState(true);
  let [customer_id, setCustomer_id] = useState();
  let [name, setName] = useState();
  let [address, setAddress] = useState();
  let [phone, setPhone] = useState();
  let [gender, setGender] = useState();
  let [status, setStatus] = useState();
  let [treatment, setTreatment] = useState();
  let [shoes, setShoes] = useState();
  let [pickupStaff, setPickupStaff] = useState();
  let [pickupStaffId, setPickupStaffId] = useState();
  let [pickupMilleage, setPickupMilleage] = useState();
  let [deliveryStaff, setDeliveryStaff] = useState();
  let [deliveryStaffId, setDeliveryStaffId] = useState();
  let [deliveryMilleage, setDeliveryMilleage] = useState();
  let [cleaner_id, setCleaner_id] = useState();
  let [pickupDate, setPickupDate] = useState(dayjs());
  let [deliveryDate, setDeliveryDate] = useState(dayjs());

  const [resCustomer, setResCustomer] = useState([])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePickupDate = (event) => {
    setPickupDate(event);
  };
  const handleDeliveryDate = (event) => {
    setDeliveryDate(event);
  };

  const handleCustomerNew = (event) => {
    setCustomerNew(!CustomerNew);
  };

  const handlePickupNew = (event) => {
    setPickupNew(!pickupNew);
  };

  const handleDeliveryNew = (event) => {
    setDeliveryNew(!deliveryNew);
  };

  const handleIdCustomer = (event) => {
    setCustomer_id(event.target.value);
  };

  const handlePickupID = (event) => {
    setPickupStaffId(event.target.value);
    console.log(pickupStaffId)
  };

  const handleDeliveryID = (event) => {
    setDeliveryStaffId(event.target.value);
    console.log(deliveryStaffId)
  };

  const postTransaction = async () => {
    let c_id;
    if (CustomerNew) {
      const urlCus = 'http://localhost:3000/create/customer';
      const dataCust = {
        name: name,
        address: address,
        phone: phone,
        gender: gender
      }
      await axios.post(urlCus, dataCust)
        .then((res) => {
          console.log(res)
          res.data.map((item) => {
            c_id = item.id
          }
          )
        }
        )
        .catch((err) => {
          console.log(err)
        }
        )
    }else {
      c_id = customer_id
    }

    if (pickupNew) {
      const urlPickup = 'http://localhost:3000/create/shipping-cost';
      const dataPickup = {
        staff_id: pickupStaff,
        milleage: pickupMilleage,
        type: "pick-up",
        date: pickupDate
      }
      await axios.post(urlPickup, dataPickup)
        .then((res) => {
          console.log(res)
          res.data.map((item) => {
            pickupStaffId = item.id
          }
          )
        }
        )
        .catch((err) => {
          console.log(err)
        }
        )
    }

    if (deliveryNew) {
      const urlDelivery = 'http://localhost:3000/create/shipping-cost';
      const dataDelivery = {
        staff_id: deliveryStaff,
        milleage: deliveryMilleage,
        type: "delivery",
        date: deliveryDate
      }
      await axios.post(urlDelivery, dataDelivery)
        .then((res) => {
          console.log(res)
          res.data.map((item) => {
            deliveryStaffId = item.id
          }
          )
        }
        )
        .catch((err) => {
          console.log(err)
        }
        )
    }
    const url = 'http://localhost:3000/create/shoes-transaction';

    console.log("c_id " + c_id)
    console.log("pickup_id " + pickupStaffId)
    console.log("delivery_id " + deliveryStaffId)

    const data = {
      customer_id: c_id,
      shoes_id: shoes,
      staff_id: cleaner_id,
      treatment_id: treatment,
      pickup_staff: pickupStaffId,
      delivery_staff: deliveryStaffId,
      status: status,
      pickup_date: pickupDate,
      due_date: deliveryDate,
    }
    await axios.post(url, data)
      .then((res) => {
        console.log(res)
      }
      )
      .catch((err) => {
        console.log(err)
      }
      )
    console.log("testt")
    console.log(data)
    
    fetchDashboardData()
    fetchData()
    setOpen(false);

  }
  const fetchDashboardData = async () => {
    const response = await fetch("http://localhost:3000/data/shoes-transaction")
    const data = await response.json()
    setDashboardData(data)
  }
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/order/shoes-transaction")
    const data = await response.json()
    setShoesTransaction(data)
  }
 
  const fetchTreatmentForm = async () => {
    const response = await fetch("http://localhost:3000/treatments/form")
    const data = await response.json()
    setTreatmentForm(data)
  }
  const fetchShoesForm = async () => {
    const response = await fetch("http://localhost:3000/shoes/form")
    const data = await response.json()
    setShoesForm(data)
  }
  const fetchStaffForm = async () => {
    const response = await fetch("http://localhost:3000/staff/form")
    const data = await response.json()
    setStaffForm(data)
  }
  const fetchNameCustomer = async () => {
    const response = await fetch("http://localhost:3000/customer/name")
    const data = await response.json()
    setNameCustomer(data)
  }
  const fetchPickup = async () => {
    const response = await fetch("http://localhost:3000/shipping-cost/form/pickup")
    const data = await response.json()
    setPickupList(data)
  }
  const fetchDelivery = async () => {
    const response = await fetch("http://localhost:3000/shipping-cost/form/delivery")
    const data = await response.json()
    setDeliveryList(data)
  }



  useEffect(() => {

    fetchData()
    fetchDashboardData()
    fetchTreatmentForm()
    fetchShoesForm()
    fetchStaffForm()
    fetchNameCustomer()
    fetchPickup()
    fetchDelivery()
    postTransaction()
  }, [])


  const statusTreat = [
    {
      value: 'received',
      label: 'Received',
    },
    {
      value: 'pick-up',
      label: 'Pickup',
    },
    {
      value: 'process',
      label: 'Process',
    },
    {
      value: 'delivery',
      label: 'Delivery',
    },
    {
      value: 'ready',
      label: 'Ready',
    },
    {
      value: 'done',
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
                justifyContent: 'space-between',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <Button onClick={handleCustomerNew} sx={{
                backgroundColor: colors.blueAccent[600],
                color: colors.blueAccent[100],
              }}>{(CustomerNew === true ? 'Old Customer' : 'New Customer')}</Button>
            </Box>
            <Typography variant="h5" sx={{ mt: "15px", fontWeight: "Bold", display: "flex", justifyContent: 'center', }}>
              {(CustomerNew ? 'For New Customer Transaction' : 'For Old Customer Transaction')}
            </Typography>
            <Box id="newCustomer" sx={{
              display: CustomerNew ? "inline" : "none",
            }}>
              <TextField
                autoFocus
                id="name"
                label="Name Customer"
                type="name"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone"
                type="email"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="gender"
                label="Gender"
                type="email"
                fullWidth
                variant="standard"
                defaultValue=""
                onChange={(e) => setGender(e.target.value)}
              />
            </Box>
            <Box id="oldCustomer" sx={{
              display: CustomerNew ? "none" : "inline",
            }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Name Customer"
                defaultValue=""
                sx={{
                  mt: "30px", width: "100%",
                  color: colors.blueAccent[100],
                }}
                onChange={handleIdCustomer}
              >
                {nameCustomer.map((option) => (
                  <MenuItem value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <TextField
              id="outlined-select-currency"
              select
              label="Status"
              defaultValue=""
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusTreat.map((option) => (
                <MenuItem value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>


            <TextField
              id="outlined-select-currency"
              select
              label="Treatment"
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
              onChange={(e) => setTreatment(e.target.value)}
            >
              {TreatmentForm.map((option) => (
                <MenuItem value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-select-currency"
              select
              label="Shoes Type"
              defaultValue=""
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
              onChange={(e) => setShoes(e.target.value)}
            >
              {shoesForm.map((option) => (
                <MenuItem value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
                justifyContent: 'space-between',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <Button onClick={handlePickupNew} sx={{
                backgroundColor: colors.blueAccent[600],
                color: colors.blueAccent[100],
              }}>{(pickupNew ? 'Already Added Pickup' : 'Add New Pickup')}</Button>
            </Box>
            <Typography variant="h5" sx={{ mt: "15px", fontWeight: "Bold", display: "flex", justifyContent: 'center', }}>
              {(pickupNew ? 'Add New Pickup' : 'Already Added Pickup')}
            </Typography>

            <Box id="newPickup" sx={{
              display: pickupNew ? "none" : "inline",
            }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Pickup Staff"
                defaultValue=""
                sx={{
                  mt: "30px", width: "100%",
                  color: colors.blueAccent[100],
                }}
                onChange={(e) => handlePickupID(e)}
              >
                {pickupList.map((option) => (
                  <MenuItem value={option.id}>
                    {option.name} - {option.milleage} km - {dateFormat(option.date, "dddd, dd mmm yyyy, h:MM TT")}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: pickupNew ? 'flex' : 'none', justifyContent: "space-between", alignItems: 'center', mt: "30px" }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Pickup Staff"
                defaultValue=""
                sx={{
                  width: "30%",
                  color: colors.blueAccent[100],
                }}
                onChange={(e) => setPickupStaff(e.target.value)}
              >
                {staffForm.map((option) => (
                  <MenuItem value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Milleage"
                id="outlined-start-adornment"
                sx={{ width: '25ch' }}
                onChange={(e) => setPickupMilleage(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">km</InputAdornment>,
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Pickup Date"
                  inputFormat="DD/MM/YYYY"
                  value={pickupDate}
                  onChange={handlePickupDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
                justifyContent: 'space-between',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <Button onClick={handleDeliveryNew} sx={{
                backgroundColor: colors.blueAccent[600],
                color: colors.blueAccent[100],
              }}>{(deliveryNew ? 'Already Added Delivery' : 'Add New Delivery')}</Button>
            </Box>
            <Typography variant="h5" sx={{ mt: "15px", fontWeight: "Bold", display: "flex", justifyContent: 'center', }}>
              {(deliveryNew ? 'Add New Delivery' : 'Already Added Delivery')}
            </Typography>
            <Box id="newDelivery" sx={{
              display: deliveryNew ? "none" : "inline",
            }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Delivery Staff"
                defaultValue=""
                sx={{
                  mt: "30px", width: "100%",
                  color: colors.blueAccent[100],
                }}
                onChange={(e) => handleDeliveryID(e)}
              >
                {deliveryList.map((option) => (
                  <MenuItem value={option.id}>
                    {option.name} - {option.milleage} km - {dateFormat(option.date, "dddd, dd mmm yyyy, h:MM TT")}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ display: deliveryNew ? 'flex' : 'none', justifyContent: "space-between", alignItems: 'center', mt: "30px" }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Delivery Staff"
                defaultValue=""
                sx={{
                  width: "30%",
                  color: colors.blueAccent[100],
                }}
                onChange={(e) => setDeliveryStaff(e.target.value)}
              >
                {staffForm.map((option) => (
                  <MenuItem value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Milleage"
                id="outlined-start-adornment"
                sx={{ width: '25ch' }}
                onChange={(e) => setDeliveryMilleage(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">km</InputAdornment>,
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Delivery Date"
                  inputFormat="DD/MM/YYYY"
                  value={deliveryDate}
                  onChange={handleDeliveryDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              id="outlined-select-currency"
              select
              label="Cleaner Staff"
              defaultValue=""
              sx={{
                mt: "30px", width: "100%",
                color: colors.blueAccent[100],
              }}
              onChange={(e) => setCleaner_id(e.target.value)}
            >
              {staffForm.map((option) => (
                <MenuItem value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', mt: "30px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Pickup Date"
                  inputFormat="DD/MM/YYYY"
                  value={pickupDate}
                  onChange={handlePickupDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Delivery Date"
                  inputFormat="DD/MM/YYYY"
                  value={deliveryDate}
                  onChange={handleDeliveryDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box> */}
          </DialogContent>
          <DialogActions sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.primary[200],
          }}>
            <Button onClick={handleClose} sx={{
              backgroundColor: colors.blueAccent[800],
              color: colors.primary[100],
            }}>Cancel</Button>
            <Button onClick={postTransaction} sx={{
              backgroundColor: colors.blueAccent[800],
              color: colors.primary[100],
            }}>Submit</Button>
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
