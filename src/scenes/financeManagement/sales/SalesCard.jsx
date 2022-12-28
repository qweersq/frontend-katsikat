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
import ActionSales from "./ActionSales";


const SalesCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //state to save data from fetch api
    let [salesData, setSalesData] = useState([])

    //state page table
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //state to open dialog
    let [statusOpenDialogSL, setStatusOpenDialogSL] = useState(false);

    //handle change page table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //HANDLE DIALOG 
    const handleDialogSL = () => {
        setStatusOpenDialogSL(!statusOpenDialogSL)
        fetchSalesData()
    };


    //define colum table
    const columns = [
        { id: 'id', label: 'Id' },
        { id: 'name', label: 'Name', minWidth: 100,},
        { id: 'treatment', label: 'Treatment', minWidth: 150,},
        { id: 'price', label: 'Price' },
        { id: 'payment', label: 'Payment'},
        { id: 'action', label: "Action", minWidth: 80, },
    ]


    //fetch data from api
    const fetchSalesData = async () => {
        const response = await fetch("http://localhost:3000/finance/sales/shoes-transaction")
        const data = await response.json()
        setSalesData(data)
    }


    useEffect(() => {
        fetchSalesData()
    }
        , [])

    return (
        <Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <Typography variant="h4" gutterBottom component="div">
                    Sales
                </Typography>
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
                            {salesData
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
                                                                <ActionSales salesDataId={item.id} fetchSalesData={fetchSalesData} />
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
                    count={salesData.length}
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

export default SalesCard