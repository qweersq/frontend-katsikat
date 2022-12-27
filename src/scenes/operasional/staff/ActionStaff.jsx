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

const ActionStaff = ({ staffDataId, fetchStaffData }) => {
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

    // state dialog openEditSF editStaff
    let [statusOpenDialogEditSF, setStatusOpenDialogEditSF] = useState(false);


    //get data by id from api
    const getStaffDataById = async () => {
        const response = await fetch("http://localhost:3000/staff/" + staffDataId)
        const data = await response.json()
        console.log(data)
        setNameStaffValue(data.name)
        setPhoneStaff(data.phone)
        setAddressStaff(data.address)
        setGenderStaff(data.gender)

        handleDialogEditSF();
    }

    //post Data to API
    const fetchApiUpdateStaff = async () => {
        const url = "http://localhost:3000/update/staff/" + staffDataId;
        const data = {
            name: nameStaffValue,
            phone: phoneStaff,
            address: addressStaff,
            gender: genderStaff
        }
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchStaffData()
        handleDialogEditSF();
    }

    // fetch data API
    const deleteStaffData = async () => {
        const url = `http://localhost:3000/staff/${staffDataId}`
        console.log(url)
        await axios.delete(url)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        fetchStaffData()
    }

    //handle dialogEdit Open
    const handleDialogEditSF = () => {
        setStatusOpenDialogEditSF(!statusOpenDialogEditSF)
        fetchStaffData()
    };

    useEffect(() => {
    }, [])

    return (
        <Box>
            <Button onClick={getStaffDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Button onClick={deleteStaffData} sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }}> <DeleteIcon /> </Button>
            <Dialog open={statusOpenDialogEditSF} onClose={handleDialogEditSF}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Staff

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
                    <Button onClick={handleDialogEditSF} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateStaff} autoFocus sx={{
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

export default ActionStaff