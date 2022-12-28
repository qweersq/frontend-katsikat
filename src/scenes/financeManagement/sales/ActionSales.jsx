import { Button, Dialog, useTheme, TextField, MenuItem } from "@mui/material"
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

const ActionSales = ({ salesDataId, fetchSalesData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [nameCustomer, setNameCustomer] = useState("");
    let [treatmentType, setTreatmentType] = useState("");
    let [paymentTypeSales, setPaymentTypeSales] = useState("");
    let [priceSales, setPriceSales] = useState("");
    let [dateSales, setDateSales] = useState(dayjs());

    //state to save data from api by id
    let [dataSalesById, setDataSalesById] = useState([])

    // state dialog openEditSL editSales
    let [statusOpenDialogEditSL, setStatusOpenDialogEditSL] = useState(false);

    const paymentType = [
        {
            value: 'not-paid',
            label: 'Not-Paid',
        },
        {
            value: 'cash',
            label: 'Cash',
        },
        {
            value: 'e-wallet',
            label: 'E-Wallet',
        },
        {
            value: 'transfer',
            label: 'Transfer',
        },
    ];



    //get data by id from api
    const getSalesDataById = async () => {
        const response = await fetch("http://localhost:3000/finance/sales/shoes-transaction/" + salesDataId)
        const data = await response.json()
        console.log(data)
        setNameCustomer(data.name)
        setTreatmentType(data.treatment)
        setPaymentTypeSales(data.payment)
        setPriceSales(data.price)
        setDateSales(data.due_date)
        handleDialogEditSL();
    }

    //post Data to API
    const fetchApiUpdateSales = async () => {
        const url = "http://localhost:3000/finance/sales/shoes-transaction/" + salesDataId;
        const data = {
            payment: paymentTypeSales,
        }
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchSalesData()
        handleDialogEditSL();
    }

    //handle dialogEdit Open
    const handleDialogEditSL = () => {
        setStatusOpenDialogEditSL(!statusOpenDialogEditSL)
        fetchSalesData()
    };


    useEffect(() => {
    }, [])

    return (
        <Box>
            <Button onClick={getSalesDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Dialog open={statusOpenDialogEditSL} onClose={handleDialogEditSL}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Sales

                </DialogTitle>


                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Name"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        defaultValue={nameCustomer}
                        onChange={(e) => setNameCustomer(e.target.value)}
                        sx={{
                            mt: "20px",
                        }}
                    />
                    <TextField
                        autoFocus
                        id="treatmentType"
                        label="Treatment Type"
                        type="text"
                        variant="standard"
                        fullWidth
                        disabled
                        defaultValue={treatmentType}
                        onChange={(e) => setTreatmentType(e.target.value)}
                        sx={{
                            mt: "20px",
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        disabled
                        variant="standard"
                        defaultValue={priceSales}
                        onChange={(e) => setPriceSales(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="payment"
                        type="text"
                        variant="standard"
                        select
                        label="Payment"
                        defaultValue={paymentTypeSales}
                        fullWidth
                        onChange={(e) => setPaymentTypeSales(e.target.value)}
                        sx={{
                            mt: "20px",
                        }}
                    >
                        {paymentType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box  sx={{
                            mt: "20px"
                        }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Due Date"
                                inputFormat="DD/MM/YYYY"
                                value={dateSales}
                                disabled
                                onChange={setDateSales}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogEditSL} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateSales} autoFocus sx={{
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

export default ActionSales