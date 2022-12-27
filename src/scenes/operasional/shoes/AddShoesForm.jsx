import { Button, Dialog, useTheme, TextField, MenuItem } from "@mui/material"
import { Box } from "@mui/system";
import { tokens } from "../../../theme";
import React, { useEffect, useState } from "react"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


const ShoesFormAdd = ({ statusOpenDialogSH, handleDialogSH }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [typeShoesValue, setTypeShoesValue] = useState("");

    const fetchApiCreateShoes = async () => {
        const url = "http://localhost:3000/create/shoes";
        const data = {
            type: typeShoesValue,
        }
        await axios.post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        handleDialogSH();
    }

    return (
        <Box>
            <Dialog open={statusOpenDialogSH} onClose={handleDialogSH}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Shoes</DialogTitle>
                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="type"
                        label="Type Shoes"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        onChange={(e) => setTypeShoesValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogSH} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiCreateShoes} autoFocus sx={{
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

export default ShoesFormAdd