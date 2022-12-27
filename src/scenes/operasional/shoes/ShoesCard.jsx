import { Box, useTheme, experimentalStyled as styled, Paper, Typography, Button } from "@mui/material";
import { tokens } from "../../../theme";
import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddShoesForm from "./AddShoesForm";
import ActionShoes from "./ActionShoes";


const ShoesCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //state to save data from fetch api
    let [shoesData, setShoesData] = useState([])

    //state page table
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //state to open dialog
    let [statusOpenDialogSH, setStatusOpenDialogSH] = useState(false);

    //handle change page table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //HANDLE DIALOG 
    const handleDialogSH = () => {
        setStatusOpenDialogSH(!statusOpenDialogSH)
        fetchShoesData()
    };


    //define colum table
    const columns = [
        { id: 'id', label: 'Id' },
        { id: 'type', label: 'Type', minWidth: 150,},
        { id: 'action', label: "Action", minWidth: 170, },
    ]


    //fetch data from api
    const fetchShoesData = async () => {
        const response = await fetch("http://localhost:3000/shoes")
        const data = await response.json()
        setShoesData(data)
    }


    useEffect(() => {
        fetchShoesData()
    }
        , [])

    return (
        <Box>
            <AddShoesForm statusOpenDialogSH={statusOpenDialogSH} handleDialogSH={handleDialogSH} />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <Typography variant="h4" gutterBottom component="div">
                    Shoes
                </Typography>
                <Button onClick={handleDialogSH} variant="contained" sx={{ backgroundColor: colors.blueAccent[700] }}>
                    Add Shoes
                </Button>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: colors.primary[600] }}>
                <TableContainer sx={{ maxHeight: 440 }} >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: colors.blueAccent[700] }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shoesData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={item.code} style={{ backgroundColor: colors.blueAccent[900] }}>
                                            {columns.map((column) => {
                                                const value = item[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                        {column.id === 'action' ?
                                                            <div>
                                                                <ActionShoes shoesDataId={item.id} fetchShoesData={fetchShoesData} />
                                                            </div>
                                                            : null}
                                                    </TableCell>
                                                );
                                            })}

                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={shoesData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ backgroundColor: colors.blueAccent[700] }}
                />
            </Paper>

        </Box>
    )

}

export default ShoesCard