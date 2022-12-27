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

const ActionShoes = ({ shoesDataId, fetchShoesData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [typeShoesValue, setTypeShoesValue] = useState("");
    let [priceShoes, setPriceShoes] = useState("");
    let [descriptionShoes, setDescriptionShoes] = useState("");

    //state to save data from api by id
    let [dataShoesById, setDataShoesById] = useState([])

    // state dialog openEditSH editShoes
    let [statusOpenDialogEditSH, setStatusOpenDialogEditSH] = useState(false);


    //get data by id from api
    const getShoesDataById = async () => {
        const response = await fetch("http://localhost:3000/shoes/" + shoesDataId)
        const data = await response.json()
        console.log(data)
        setTypeShoesValue(data.type)
        handleDialogEditSH();
    }

    //post Data to API
    const fetchApiUpdateShoes = async () => {
        const url = "http://localhost:3000/update/shoes/" + shoesDataId;
        const data = {
            type: typeShoesValue,
        }
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchShoesData()
        handleDialogEditSH();
    }

    // fetch data API
    const deleteShoesData = async () => {
        const url = `http://localhost:3000/shoes/${shoesDataId}`
        console.log(url)
        await axios.delete(url)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        fetchShoesData()
    }

    //handle dialogEdit Open
    const handleDialogEditSH = () => {
        setStatusOpenDialogEditSH(!statusOpenDialogEditSH)
        fetchShoesData()
    };


    useEffect(() => {
    }, [])

    return (
        <Box>
            <Button onClick={getShoesDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Button onClick={deleteShoesData} sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }}> <DeleteIcon /> </Button>
            <Dialog open={statusOpenDialogEditSH} onClose={handleDialogEditSH}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Shoes

                </DialogTitle>


                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                     <TextField
                        autoFocus
                        id="type"
                        label="Type Shoes"
                        type="text"
                        variant="standard"
                        fullWidth
                        defaultValue={typeShoesValue}
                        onChange={(e) => setTypeShoesValue(e.target.value)}
                        sx={{ 
                            mt: "20px",
                         }}
                    />
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogEditSH} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateShoes} autoFocus sx={{
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

export default ActionShoes