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

const ActionTreatment = ({ treatmentDataId, fetchTreatmentData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [typeTreatmentValue, setTypeTreatmentValue] = useState("");
    let [priceTreatment, setPriceTreatment] = useState("");
    let [descriptionTreatment, setDescriptionTreatment] = useState("");
    let [commisionTreatment, setCommisionTreatment] = useState("");

    //state to save data from api by id
    let [dataTreatmentById, setDataTreatmentById] = useState([])

    // state dialog openEditTR editTreatment
    let [statusOpenDialogEditTR, setStatusOpenDialogEditTR] = useState(false);


    //get data by id from api
    const getTreatmentDataById = async () => {
        const response = await fetch("http://localhost:3000/treatment/" + treatmentDataId)
        const data = await response.json()
        console.log(data)
        setTypeTreatmentValue(data.type)
        setPriceTreatment(data.price)
        setDescriptionTreatment(data.description)
        setCommisionTreatment(data.commision)
        handleDialogEditTR();
    }

    //post Data to API
    const fetchApiUpdateTreatment = async () => {
        const url = "http://localhost:3000/update/treatment/" + treatmentDataId;
        const data = {
            type: typeTreatmentValue,
            price: priceTreatment,
            description: descriptionTreatment,
            commision: commisionTreatment,
        }
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchTreatmentData()
        handleDialogEditTR();
    }

    // fetch data API
    const deleteTreatmentData = async () => {
        const url = `http://localhost:3000/treatment/${treatmentDataId}`
        console.log(url)
        await axios.delete(url)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        fetchTreatmentData()
    }

    //handle dialogEdit Open
    const handleDialogEditTR = () => {
        setStatusOpenDialogEditTR(!statusOpenDialogEditTR)
        fetchTreatmentData()
    };


    useEffect(() => {
    }, [])

    return (
        <Box>
            <Button onClick={getTreatmentDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Button onClick={deleteTreatmentData} sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }}> <DeleteIcon /> </Button>
            <Dialog open={statusOpenDialogEditTR} onClose={handleDialogEditTR}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Treatment

                </DialogTitle>


                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        autoFocus
                        id="type"
                        label="Type"
                        type="text"
                        variant="standard"
                        fullWidth
                        defaultValue={typeTreatmentValue}
                        onChange={(e) => setTypeTreatmentValue(e.target.value)}
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
                        variant="standard"
                        defaultValue={priceTreatment}
                        onChange={(e) => setPriceTreatment(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={descriptionTreatment}
                        onChange={(e) => setDescriptionTreatment(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="commision"
                        label="Commision"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue={commisionTreatment}
                        onChange={(e) => setCommisionTreatment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogEditTR} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateTreatment} autoFocus sx={{
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

export default ActionTreatment