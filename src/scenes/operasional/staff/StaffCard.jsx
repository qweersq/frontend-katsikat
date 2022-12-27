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
import AddStaffForm from "./AddStaffForm";
import ActionStaff from "./ActionStaff";


const StaffCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //state to save data from fetch api
    let [staffData, setStaffData] = useState([])

    //state page table
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //state to open dialog
    let [statusOpenDialogSF, setStatusOpenDialogSF] = useState(false);

    //handle change page table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //HANDLE DIALOG 
    const handleDialogSF = () => {
        setStatusOpenDialogSF(!statusOpenDialogSF)
        fetchStaffData()
    };


    //define colum table
    const columns = [
        { id: 'id', label: 'Id' },
        { id: 'name', label: 'Name'},
        { id: 'phone', label: 'Phone' },
        { id: 'address', label: 'Address', minWidth: 100, },
        { id: 'gender', label: 'gender' },
        { id: 'action', label: "Action", minWidth: 170, },
    ]


    //fetch data from api
    const fetchStaffData = async () => {
        const response = await fetch("http://localhost:3000/staff")
        const data = await response.json()
        setStaffData(data)
    }


    useEffect(() => {
        fetchStaffData()
    }, [])

    return (
        <Box>
            <AddStaffForm statusOpenDialogSF={statusOpenDialogSF} handleDialogSF={handleDialogSF} />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <Typography variant="h4" gutterBottom component="div">
                    Staff
                </Typography>
                <Button onClick={handleDialogSF} variant="contained" sx={{ backgroundColor: colors.blueAccent[700] }}>
                    Add Staff
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
                            {staffData
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
                                                                <ActionStaff staffDataId={item.id} fetchStaffData={fetchStaffData} />
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
                    count={staffData.length}
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

export default StaffCard