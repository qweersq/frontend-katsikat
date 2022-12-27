import { Button, Dialog, useTheme, TextField, MenuItem, InputAdornment } from "@mui/material"
import { Box } from "@mui/system";
import { tokens } from "../../../theme";
import React, { useEffect, useState } from "react"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dateFormat from 'dateformat';



const ActionShippingCost = ({ shippingCostDataId, fetchShippingCostData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [nameShippingCost, setNameShippingCost] = useState("");
    let [staffIdShipping, setStaffIdShipping] = useState("");
    let [milleageShipping, setMilleageShipping] = useState("");
    let [typeShipping, setTypeShipping] = useState("");
    let [dateShipping, setDateShipping] = useState(dayjs());

    // state dialog openEditSP editShippingCost
    let [statusOpenDialogEditSP, setStatusOpenDialogEditSP] = useState(false);

    //state to save data from api
    const [staffList, setStaffList] = useState([]);

    //fetch data from api
    const fetchApiStaff = async () => {
        const url = "http://localhost:3000/staff/list";
        const response = await axios.get(url);
        setStaffList(response.data);
    }

    const type = [
        {
            label: "Pick-up",
            value: "pick-up"
        },
        {
            label: "Delivery",
            value: "delivery"
        }
    ]


    //get data by id from api
    const getShippingCostDataById = async () => {
        const response = await fetch("http://localhost:3000/shipping-cost/" + shippingCostDataId)
        const data = await response.json()
        console.log(data)
        fetchApiStaff()
        setStaffIdShipping(data.staff_id)
        setNameShippingCost(data.name)
        setMilleageShipping(data.milleage)
        setTypeShipping(data.type)
        setDateShipping(dateFormat(data.date, "yyyy-mm-dd"))
        console.log(data.staff_id)
        console.log(nameShippingCost)
        console.log(milleageShipping)
        console.log(typeShipping)
        console.log(dateShipping)
        handleDialogEditSP();
    }

    //post Data to API
    const fetchApiUpdateShippingCost = async () => {
        const url = "http://localhost:3000/update/shipping-cost/" + shippingCostDataId;
        const data = {
            staff_id: staffIdShipping,
            milleage: milleageShipping,
            type: typeShipping,
            date: dateShipping
        }
        console.log(data)
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchShippingCostData()
        handleDialogEditSP();
    }

    // fetch data API
    const deleteShippingCostData = async () => {
        const url = `http://localhost:3000/shipping-cost/${shippingCostDataId}`
        console.log(url)
        await axios.delete(url)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        fetchShippingCostData()
    }

    //handle dialogEdit Open
    const handleDialogEditSP = () => {
        setStatusOpenDialogEditSP(!statusOpenDialogEditSP)
        fetchShippingCostData()
    };


    useEffect(() => {
    }, [])

    return (
        <Box>
            <Button onClick={getShippingCostDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Button onClick={deleteShippingCostData} sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }}> <DeleteIcon /> </Button>
            <Dialog open={statusOpenDialogEditSP} onClose={handleDialogEditSP}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Shipping
                </DialogTitle>

                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Shipping Type"
                        defaultValue={typeShipping}
                        value={typeShipping === undefined ? "" : typeShipping}
                        sx={{
                            mt: "30px",
                            width: "100%",
                            color: colors.blueAccent[100],
                        }}
                        onChange={(e) => setTypeShipping(e.target.value)}
                    >
                        {type.map((option) => (
                            option.value === typeShipping ? (<MenuItem value={option.value} key={option.value} selected> {option.label} </MenuItem>) : (<MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>)
                        ))}
                    </TextField>

                    <Box sx={{ mt: "30px", display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Staff"
                            defaultValue={staffIdShipping}
                            value={staffIdShipping === undefined ? "" : staffIdShipping}
                            sx={{
                                width: "55%", mr: "10px",
                                color: colors.blueAccent[100],
                            }}
                            onChange={(e) => setStaffIdShipping(e.target.value)}
                        >
                            {staffList.map((option) => (
                                option.id === staffIdShipping ? (<MenuItem value={option.id} key={option.id} selected> {option.value} </MenuItem>) : (<MenuItem value={option.id} key={option.id}>{option.value}</MenuItem>)
                            ))}
                        </TextField>
                        <TextField
                            label="Milleage"
                            id="outlined-start-adornment"
                            sx={{ mr: "10px" }}
                            defaultValue={milleageShipping}
                            value={milleageShipping === undefined ? "" : milleageShipping}
                            onChange={(e) => setMilleageShipping(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">km</InputAdornment>,
                            }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="DD/MM/YYYY"
                                value={dateShipping}
                                onChange={setDateShipping}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogEditSP} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateShippingCost} autoFocus sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ActionShippingCost