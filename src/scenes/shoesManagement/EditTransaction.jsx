import { Box, useTheme, Button, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react"
import dateFormat from 'dateformat';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Slide from '@mui/material/Slide';
import axios from 'axios';
import CustomerFormAdd from "./CustomerFormAdd";
import AddShippingCost from "./AddShippingCost";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditTransaction = ({ idTrans, openEditTR, handleCloseEditTR, fetchDataShoesTransactionList, fetchDashboardData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //Data from form to save
    let [chooseCustomerId, setChooseCustomerId] = useState("");
    let [chooseStatusValue, setChooseStatusValue] = useState("");
    let [chooseTreatmentId, setChooseTreatmentId] = useState("");
    let [chooseShoesId, setChooseShoesId] = useState("");
    let [chooseStaffId, setChooseStaffId] = useState("");
    let [choosePickupId, setChoosePickupId] = useState("");
    let [chooseDeliveryId, setChooseDeliveryId] = useState("");
    let [choosePickupDate, setChoosePickupDate] = useState(dayjs());
    let [chooseDeliveryDate, setChooseDeliveryDate] = useState(dayjs());

    //Data from api
    let [nameCustomerList, setNameCustomerList] = useState([]);
    let [shoesList, setShoesList] = useState([]);
    let [treatmentList, setTreatmentList] = useState([]);
    let [shippingCostListPickup, setShippingCostListPickup] = useState([]);
    let [shippingCostListDelivery, setShippingCostListDelivery] = useState([]);
    let [staffList, setStaffList] = useState([]);



    //state to save detail transaction by id
    let [shoesTransactionId, setShoesTransactionId] = useState([])

    //state to open dialog
    let [statusOpenDialogCus, setStatusOpenDialogCus] = useState(false);
    let [statusOpenDialogSP, setStatusOpenDialogSP] = useState(false);

    const statusList = [
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

    //HANDLE DIALOG 
    const handleDialogCS = () => {
        setStatusOpenDialogCus(!statusOpenDialogCus)
        fetchNameCustomerList()
    };
    const handleDialogSP = () => {
        setStatusOpenDialogSP(!statusOpenDialogSP)
        fetchShippingCostListPickup()
        fetchShippingCostListDelivery()
    };

    // fetch data API
    const getShoesTransactionById = async () => {
        const response = await fetch("http://localhost:3000/shoes-transaction/" + idTrans)
        const data = await response.json()
        setShoesTransactionId(data)
        console.log(shoesTransactionId)
    }

    //handle update data to backend
    const handleUpdateShoesTransaction = async () => {
        const url = "http://localhost:3000/update/shoes-transaction/" + idTrans
        const data = {
            customer_id: chooseCustomerId,
            shoes_id: chooseShoesId,
            staff_id: chooseStaffId,
            treatment_id: chooseTreatmentId,
            pickup_staff: choosePickupId,
            delivery_staff: chooseDeliveryId,
            status: chooseStatusValue,
            pickup_date: choosePickupDate,
            due_date: chooseDeliveryDate,
        }
        console.log(data)
        await axios.put(url, data)
            .then((res) => {
                console.log(res)
            }
            )
            .catch((err) => {
                console.log(err)
            })

        fetchDashboardData()
        fetchDataShoesTransactionList()
        handleCloseEditTR()
    }

    //FETCH DATA FROM BACKEND
    const fetchNameCustomerList = async () => {
        const response = await fetch("http://localhost:3000/customer/name")
        const data = await response.json()
        setNameCustomerList(data)
        handleDefaultValueShoesTransaction()
    }
    const fetchTreatmentList = async () => {
        const response = await fetch("http://localhost:3000/treatments/list")
        const data = await response.json()
        setTreatmentList(data)
    }
    const fetchShoesList = async () => {
        const response = await fetch("http://localhost:3000/shoes/list")
        const data = await response.json()
        setShoesList(data)
    }
    const fetchShippingCostListPickup = async () => {
        const response = await fetch("http://localhost:3000/shipping-cost/list/pickup")
        const data = await response.json()
        setShippingCostListPickup(data)
        console.log(shippingCostListPickup)
    }
    const fetchShippingCostListDelivery = async () => {
        const response = await fetch("http://localhost:3000/shipping-cost/list/delivery")
        const data = await response.json()
        setShippingCostListDelivery(data)
    }
    const fetchStaffList = async () => {
        const response = await fetch("http://localhost:3000/staff/list")
        const data = await response.json()
        setStaffList(data)
    }

    //handle default value
    const handleDefaultValueShoesTransaction = () => {
        setChooseCustomerId(shoesTransactionId.customer_id)
        setChooseStatusValue(shoesTransactionId.status)
        setChooseTreatmentId(shoesTransactionId.treatment_id)
        setChooseShoesId(shoesTransactionId.shoes_id)
        setChooseStaffId(shoesTransactionId.staff_id)
        setChoosePickupId(shoesTransactionId.pickup_staff)
        setChooseDeliveryId(shoesTransactionId.delivery_staff)
        setChoosePickupDate(dateFormat(shoesTransactionId.pickup_date, "yyyy-mm-dd"))
        setChooseDeliveryDate(dateFormat(shoesTransactionId.due_date, "yyyy-mm-dd"))
    }

    useEffect(() => {
        console.log("Edit Transaction ni boss")
        getShoesTransactionById()
        fetchNameCustomerList()
        fetchTreatmentList()
        fetchShoesList()
        fetchShippingCostListPickup()
        fetchShippingCostListDelivery()
        fetchStaffList()
    }, [openEditTR])

    return (
        <Box>
            <CustomerFormAdd statusOpenDialogCus={statusOpenDialogCus} handleDialogCS={handleDialogCS} />
            <AddShippingCost statusOpenDialogSP={statusOpenDialogSP} handleDialogSP={handleDialogSP} />
            <Dialog
                open={openEditTR}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEditTR}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Edit Transaction {idTrans}</DialogTitle>

                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            mt: "30px",
                        }}
                    >
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Customer Name"
                            defaultValue={shoesTransactionId.customer_id}
                            value={chooseCustomerId === undefined ? shoesTransactionId.customer_id : chooseCustomerId}
                            sx={{
                                width: "60%",
                                color: colors.blueAccent[100],
                            }}
                            onChange={(e) => setChooseCustomerId(e.target.value)}
                        >
                            {nameCustomerList.map((option) => (
                                shoesTransactionId.customer_id === option.id ? (<MenuItem value={option.id} key={option.id} selected> {option.name} </MenuItem>) : (<MenuItem value={option.id} key={option.id}> {option.name} </MenuItem>)
                            ))}
                        </TextField>



                        <Button onClick={handleDialogCS} sx={{
                            backgroundColor: colors.blueAccent[600],
                            color: colors.blueAccent[100],
                            width: "35%",

                        }}>Add New Customer</Button>

                    </Box>

                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Status"
                        defaultValue={shoesTransactionId.status}
                        value={chooseStatusValue === undefined ? shoesTransactionId.status : chooseStatusValue}
                        sx={{
                            mt: "30px", width: "100%",
                            color: colors.blueAccent[100],
                        }}
                        onChange={(e) => setChooseStatusValue(e.target.value)}
                    >
                        {statusList.map((option) => (
                            shoesTransactionId.status === option.value ? (<MenuItem value={option.value} key={option.value} selected> {option.label} </MenuItem>) : (<MenuItem value={option.value} key={option.value}> {option.label} </MenuItem>)
                        ))}
                    </TextField>


                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Treatment"
                        defaultValue={shoesTransactionId.treatment_id}
                        value={chooseTreatmentId === undefined ? shoesTransactionId.treatment_id : chooseTreatmentId}
                        sx={{
                            mt: "30px", width: "100%",
                            color: colors.blueAccent[100],
                        }}
                        onChange={(e) => setChooseTreatmentId(e.target.value)}
                    >
                        {treatmentList.map((option) => (
                            shoesTransactionId.treatment_id === option.id ? (<MenuItem value={option.id} key={option.value} selected> {option.label} </MenuItem>) : (<MenuItem value={option.id} key={option.value}> {option.label} </MenuItem>)
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Shoes Type"
                        defaultValue={shoesTransactionId.shoes_id}
                        value={chooseShoesId === undefined ? shoesTransactionId.shoes_id : chooseShoesId}
                        sx={{
                            mt: "30px", width: "100%",
                            color: colors.blueAccent[100],
                        }}
                        onChange={(e) => setChooseShoesId(e.target.value)}
                    >
                        {shoesList.map((option) => (
                            shoesTransactionId.shoes_id === option.id ? (<MenuItem value={option.id} key={option.value} selected> {option.label} </MenuItem>) : (<MenuItem value={option.id} key={option.value}> {option.label} </MenuItem>)
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Cleaner Staff"
                        defaultValue={shoesTransactionId.staff_id}
                        value={chooseStaffId === undefined ? shoesTransactionId.staff_id : chooseStaffId}
                        sx={{
                            mt: "30px", width: "100%",
                            color: colors.blueAccent[100],
                        }}
                        onChange={(e) => setChooseStaffId(e.target.value)}
                    >
                        {staffList.map((option) => (
                            shoesTransactionId.staff_id === option.id ? (<MenuItem value={option.id} key={option.id} selected> {option.label} </MenuItem>) : (<MenuItem value={option.id} key={option.id}> {option.label} </MenuItem>)
                        ))}
                    </TextField>

                    {/* PICKUP STAFF + ADD NEW SHIPPING */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: '30px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Pickup Staff"
                            defaultValue={shoesTransactionId.pickup_staff}
                            value={choosePickupId === undefined ? shoesTransactionId.pickup_staff : choosePickupId}
                            sx={{
                                width: "60%",
                                color: colors.blueAccent[100],
                            }}
                            onChange={(e) => setChoosePickupId(e.target.value)}
                        >
                            {shippingCostListPickup.map((option) => (
                                shoesTransactionId.pickup_staff === option.id ? (<MenuItem value={option.id} key={option.name} selected> {option.name} - {option.milleage} km - {dateFormat(option.date, "dddd, dd mmm yyyy, h:MM TT")} </MenuItem>) : (<MenuItem value={option.id} key={option.name}> {option.name} - {option.milleage} km - {dateFormat(option.date, "dddd, dd mmm yyyy, h:MM TT")} </MenuItem>)
                            ))}
                        </TextField>
                        <Button onClick={handleDialogSP} sx={{
                            backgroundColor: colors.blueAccent[600],
                            color: colors.blueAccent[100],
                            width: "35%",
                        }}>Add Shipping</Button>

                    </Box>


                    {/* DELIVERY STAFF + ADD NEW SHIPPING */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: '30px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Delivery Staff"
                            defaultValue={shoesTransactionId.delivery_staff}
                            value={chooseDeliveryId === undefined ? shoesTransactionId.delivery_staff : chooseDeliveryId}
                            sx={{
                                width: "60%",
                                color: colors.blueAccent[100],
                            }}
                            onChange={(e) => setChooseDeliveryId(e.target.value)}
                        >
                            {shippingCostListDelivery.map((option) => (
                                shoesTransactionId.delivery_staff === option.id ? (<MenuItem value={option.id} key={option.name} selected> {option.name} - {option.milleage} km - {dateFormat(option.date, "dddd, dd mmm yyyy, h:MM TT")} </MenuItem>) : (<MenuItem value={option.id} key={option.name}> {option.name} - {option.milleage} km - {dateFormat(option.date, "dddd, dd mmm yyyy, h:MM TT")} </MenuItem>)
                            ))}
                        </TextField>
                        <Button onClick={handleDialogSP} sx={{
                            backgroundColor: colors.blueAccent[600],
                            color: colors.blueAccent[100],
                            width: "35%",
                        }}>Add Shipping</Button>
                    </Box>



                    <Box sx={{
                        display: 'flex', justifyContent: 'space-between', mt: '30px'
                    }}>
                        <Box sx={{ mr: "10px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Pickup Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={shoesTransactionId.pickup_date}
                                    onChange={setChoosePickupDate}
                                    renderInput={(params) => <TextField {...params} />}

                                />
                            </LocalizationProvider>
                        </Box>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Due Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={shoesTransactionId.due_date}
                                    onChange={setChooseDeliveryDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>

                    </Box>

                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.primary[200],
                }}>
                    <Button onClick={handleCloseEditTR} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={handleUpdateShoesTransaction} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
export default EditTransaction