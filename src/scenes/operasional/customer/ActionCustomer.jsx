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

const ActionCustomer = ({ customerDataId, fetchCustomerData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [nameCustomer, setNameCustomer] = useState("");
    let [addressCustomer, setAddressCustomer] = useState("");
    let [phoneCustomer, setPhoneCustomer] = useState("");
    let [genderCustomer, setGenderCustomer] = useState("");

    //state to save data from api by id
    let [dataCustomerById, setDataCustomerById] = useState([])

    // state dialog openEditCS editCustomer
    let [statusOpenDialogEditCus, setStatusOpenDialogEditCus] = useState(false);


    const gender = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Famale",
            value: "famale"
        }
    ]


    //get data by id from api
    const getCustomerDataById = async () => {
        const response = await fetch("http://localhost:3000/customer/" + customerDataId)
        const data = await response.json()
        console.log(data)
        setDataCustomerById(data)
        setNameCustomer(data.name)
        setAddressCustomer(data.address)
        setPhoneCustomer(data.phone)
        setGenderCustomer(data.gender)
        console.log(nameCustomer)
        console.log(addressCustomer)
        console.log(phoneCustomer)
        console.log(genderCustomer)
        handleDialogEditCS();
    }

    //post Data to API
    const fetchApiUpdateCustomer = async () => {
        const url = "http://localhost:3000/update/customer/" + customerDataId;
        const data = {
            name: nameCustomer,
            phone: phoneCustomer,
            address: addressCustomer,
            gender: genderCustomer,
        }
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchCustomerData()
        handleDialogEditCS();
    }

    // fetch data API
    const deleteCustomerData = async () => {
        const url = `http://localhost:3000/customer/${customerDataId}`
        console.log(url)
        await axios.delete(url)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        fetchCustomerData()
    }

    //handle dialogEdit Open
    const handleDialogEditCS = () => {
        setStatusOpenDialogEditCus(!statusOpenDialogEditCus)
        fetchCustomerData()
    };


    useEffect(() => {
    }, [])

    return (
        <Box>
            <Button onClick={getCustomerDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Button onClick={deleteCustomerData} sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }}> <DeleteIcon /> </Button>
            <Dialog open={statusOpenDialogEditCus} onClose={handleDialogEditCS}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Customer
                </DialogTitle>

                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Customer Name"
                        type="name"
                        variant="standard"
                        fullWidth
                        defaultValue={nameCustomer}
                        value={nameCustomer === undefined ? "" : nameCustomer}
                        onChange={(e) => setNameCustomer(e.target.value)}
                        sx={{ 
                            mt: "20px",
                         }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={addressCustomer}
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
                        defaultValue={phoneCustomer}
                        onChange={(e) => setPhoneCustomer(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="gender"
                        type="text"
                        variant="standard"
                        select
                        label="Gender"
                        defaultValue={genderCustomer}
                        value={genderCustomer === undefined ? "" : genderCustomer}
                        fullWidth
                        onChange={(e) => setGenderCustomer(e.target.value)}
                        sx={{
                            mt: "20px",
                        }}
                    >
                        {gender.map((option) => (
                            genderCustomer === option.value ? (<MenuItem key={option.value} value={option.value} selected> {option.label} </MenuItem>) : (<MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>)
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogEditCS} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateCustomer} autoFocus sx={{
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

export default ActionCustomer