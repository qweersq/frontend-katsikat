import { Button, Dialog, useTheme, TextField, MenuItem } from "@mui/material"
import { Box } from "@mui/system";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


const CustomerFormAdd = ({ statusOpenDialogCus, handleDialogCS }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [nameCustomer, setNameCustomer] = useState("");
    let [addressCustomer, setAddressCustomer] = useState("");
    let [phoneCustomer, setPhoneCustomer] = useState("");
    let [genderCustomer, setGenderCustomer] = useState("");

    const gender = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        }
    ]

    const fetchApiCreateCustomer = async () => {
        const url = "http://localhost:3000/create/customer";
        const data = {
            name: nameCustomer,
            address: addressCustomer,
            phone: phoneCustomer,
            gender: genderCustomer,
        }
        await axios.post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        handleDialogCS();
    }

    return (
        <Box>
            <Dialog open={statusOpenDialogCus} onClose={handleDialogCS}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Customer</DialogTitle>
                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Name Customer"
                        type="name"
                        variant="standard"
                        fullWidth
                        defaultValue=""
                        onChange={(e) => setNameCustomer(e.target.value)}
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
                        onChange={(e) => setAddressCustomer(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        onChange={(e) => setPhoneCustomer(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="gender"
                        type="text"
                        variant="standard"
                        select
                        label="Gender"
                        defaultValue="Male"
                        fullWidth
                        onChange={(e) => setGenderCustomer(e.target.value)}
                        sx={{
                            mt: "20px",
                        }}
                    >
                        {gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogCS} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiCreateCustomer} autoFocus sx={{
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

export default CustomerFormAdd