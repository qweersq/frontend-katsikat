import { Box, useTheme, Button, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react"
import dateFormat from 'dateformat';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import CustomerFormAdd from "./CustomerFormAdd";
import axios from 'axios';
import AddShippingCost from "./AddShippingCost";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTransaction from "./EditTransaction";



const ActionTransaction = ({ idTrans, fetchDataShoesTransactionList, fetchDashboardData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //state dialog openEditTR editTransaction
  const [openEditTR, setOpenEditTR] = useState(false);

  const handleOpenEditTR = () => {
    setOpenEditTR(true);
  };

  const handleCloseEditTR = () => {
    setOpenEditTR(false);
  };


  // fetch data API
  const deleteShoesTransaction = async () => {
    const url = `http://localhost:3000/shoes-transaction/${idTrans}`
    console.log(url)
    await axios.delete(url)
     .then((res) => {
        console.log(res)
     })
      .catch((err) => {
        console.log(err)
      })
    fetchDataShoesTransactionList()
    fetchDashboardData()
  }

  return (
    <Box >
      <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }} onClick={handleOpenEditTR}> <EditIcon /> </Button>
      <Button sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }} onClick={deleteShoesTransaction}> <DeleteIcon /> </Button>
      <EditTransaction idTrans={idTrans} openEditTR={openEditTR} handleCloseEditTR={handleCloseEditTR} fetchDataShoesTransactionList={fetchDataShoesTransactionList} fetchDashboardData={fetchDashboardData} />
    </Box>
  )
}

export default ActionTransaction