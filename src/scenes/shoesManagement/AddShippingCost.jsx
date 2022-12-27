import { Button, Dialog, useTheme, TextField, MenuItem, InputAdornment } from "@mui/material"
import { Box } from "@mui/system";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers";


const AddShippingCost = ({ statusOpenDialogSP, handleDialogSP }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //state to save data from form
    let [chooseStaffId, setChooseStaffId] = useState("");
    let [chooseMilleageValue, setChooseMilleageValue] = useState("");
    let [chooseType, setChooseType] = useState("");
    let [chooseDate, setChooseDate] = useState(dayjs());

    //state to save data from api
    const [staffList, setStaffList] = useState([]);

    //fetch data from api
    const fetchApiStaff = async () => {
        const url = "http://localhost:3000/staff/list";
        const response = await axios.get(url);
        setStaffList(response.data);
    }

    //post data to api
    const postApiCreateShippingCost = async () => {
        const url = "http://localhost:3000/create/shipping-cost";
        const data = {
            staff_id: chooseStaffId,
            milleage: chooseMilleageValue,
            type: chooseType,
            date: chooseDate,
        }
        await axios.post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        handleDialogSP();
    }


    useEffect(() => {
        fetchApiStaff();
    }, [])


    const shippingType = [
        {
            label: "Pickup",
            value: "pick-up"
        },
        {
            label: "Delivery",
            value: "delivery"
        }
    ]


    return (
        <Box>
            <Dialog open={statusOpenDialogSP} onClose={handleDialogSP}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Shipping</DialogTitle>
                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Shipping Type"
                        defaultValue=""
                        sx={{
                            mt: "30px",
                            width: "100%",
                            color: colors.blueAccent[100],
                        }}
                        onChange={(e) => setChooseType(e.target.value)}
                    >
                        {shippingType.map((option) => (
                            <MenuItem value={option.value} key={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ mt: "30px", display: "flex", justifyContent:"space-between" }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Staff"
                            defaultValue=""
                            sx={{
                                width: "55%", mr: "10px",
                                color: colors.blueAccent[100],
                            }}
                            onChange={(e) => setChooseStaffId(e.target.value)}
                        >
                            {staffList.map((option) => (
                                <MenuItem value={option.id} key={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Milleage"
                            id="outlined-start-adornment"
                            sx={{ mr: "10px" }}
                            onChange={(e) => setChooseMilleageValue(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">km</InputAdornment>,
                            }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="DD/MM/YYYY"
                                value={chooseDate}
                                onChange={setChooseDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogSP} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={postApiCreateShippingCost} autoFocus sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AddShippingCost