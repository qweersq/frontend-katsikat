import * as React from 'react';
import { Box, useTheme, experimentalStyled as styled, Paper, Typography, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { tokens } from "../../../theme";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowImage({ linkImage }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100] }}>
                Show
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Image Uploaded</DialogTitle>
                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <img src={linkImage} />
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}  onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}