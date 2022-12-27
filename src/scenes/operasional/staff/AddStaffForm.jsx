import { Button, Dialog, useTheme, TextField, MenuItem } from "@mui/material"
import { Box } from "@mui/system";
import { tokens } from "../../../theme";
import React, { useEffect, useState } from "react"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


const StaffFormAdd = ({ statusOpenDialogSF, handleDialogSF }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [nameStaffValue, setNameStaffValue] = useState("");
    let [phoneStaff, setPhoneStaff] = useState("");
    let [addressStaff, setAddressStaff] = useState("");
    let [genderStaff, setGenderStaff] = useState("");

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

    const fetchApiCreateStaff = async () => {
        const url = "http://localhost:3000/create/staff";
        const data = {
            name: nameStaffValue,
            phone: phoneStaff,
            address: addressStaff,
            gender: genderStaff
        }
        await axios.post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        handleDialogSF();
    }

    return (
        <Box>
            <Dialog open={statusOpenDialogSF} onClose={handleDialogSF}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Staff</DialogTitle>
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
                        defaultValue={nameStaffValue}
                        onChange={(e) => setNameStaffValue(e.target.value)}
                        sx={{
                            mt: "20px",
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue={phoneStaff}
                        onChange={(e) => setPhoneStaff(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={addressStaff}
                        onChange={(e) => setAddressStaff(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="gender"
                        type="text"
                        variant="standard"
                        select
                        label="Gender"
                        defaultValue={genderStaff}
                        fullWidth
                        onChange={(e) => setGenderStaff(e.target.value)}
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
                    <Button onClick={handleDialogSF} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiCreateStaff} autoFocus sx={{
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

export default StaffFormAdd