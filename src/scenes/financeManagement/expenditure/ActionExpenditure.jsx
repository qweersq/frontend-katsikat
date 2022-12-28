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

const ActionExpenditure = ({ expenditureDataId, fetchExpenditureData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [typeExpenditureValue, setTypeExpenditureValue] = useState("");
    let [priceExpenditure, setPriceExpenditure] = useState("");
    let [descriptionExpenditure, setDescriptionExpenditure] = useState("");

    //state to save data from api by id
    let [dataExpenditureById, setDataExpenditureById] = useState([])

    // state dialog openEditEXP editExpenditure
    let [statusOpenDialogEditEXP, setStatusOpenDialogEditEXP] = useState(false);


    //get data by id from api
    const getExpenditureDataById = async () => {
        const response = await fetch("http://localhost:3000/expenditure/" + expenditureDataId)
        const data = await response.json()
        console.log(data)
        setTypeExpenditureValue(data.type)
        setPriceExpenditure(data.price)
        setDescriptionExpenditure(data.description)
        handleDialogEditEXP();
    }

    //post Data to API
    const fetchApiUpdateExpenditure = async () => {
        const url = "http://localhost:3000/update/expenditure/" + expenditureDataId;
        const data = {
            type: typeExpenditureValue,
            price: priceExpenditure,
            description: descriptionExpenditure
        }
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchExpenditureData()
        handleDialogEditEXP();
    }

    // fetch data API
    const deleteExpenditureData = async () => {
        const url = `http://localhost:3000/expenditure/${expenditureDataId}`
        console.log(url)
        await axios.delete(url)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        fetchExpenditureData()
    }

    //handle dialogEdit Open
    const handleDialogEditEXP = () => {
        setStatusOpenDialogEditEXP(!statusOpenDialogEditEXP)
        fetchExpenditureData()
    };


    useEffect(() => {
    }, [])

    return (
        <Box>
            <Button onClick={getExpenditureDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Button onClick={deleteExpenditureData} sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }}> <DeleteIcon /> </Button>
            <Dialog open={statusOpenDialogEditEXP} onClose={handleDialogEditEXP}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Expenditure

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
                        defaultValue={typeExpenditureValue}
                        onChange={(e) => setTypeExpenditureValue(e.target.value)}
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
                        defaultValue={priceExpenditure}
                        onChange={(e) => setPriceExpenditure(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={descriptionExpenditure}
                        onChange={(e) => setDescriptionExpenditure(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogEditEXP} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateExpenditure} autoFocus sx={{
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

export default ActionExpenditure