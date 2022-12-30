import { Button, Dialog, useTheme, TextField, MenuItem } from "@mui/material"
import { Box } from "@mui/system";
import { tokens } from "../../../theme";
import React, { useEffect, useState } from "react"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


const TreatmentFormAdd = ({ statusOpenDialogTR, handleDialogTR }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [typeTreatmentValue, setTypeTreatmentValue] = useState("");
    let [priceTreatment, setPriceTreatment] = useState("");
    let [descriptionTreatment, setDescriptionTreatment] = useState("");
    let [commisionTreatment, setCommisionTreatment] = useState("");


    const fetchApiCreateTreatment = async () => {
        const url = "http://localhost:3000/create/treatment";
        const data = {
            type: typeTreatmentValue,
            price: priceTreatment,
            description: descriptionTreatment,
            commision: commisionTreatment,
        }
        await axios.post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        handleDialogTR();
    }

    return (
        <Box>
            <Dialog open={statusOpenDialogTR} onClose={handleDialogTR}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Treatment</DialogTitle>
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
                        defaultValue=""
                        onChange={(e) => setTypeTreatmentValue(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
                        onChange={(e) => setCommisionTreatment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogTR} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiCreateTreatment} autoFocus sx={{
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

export default TreatmentFormAdd