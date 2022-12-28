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
import AddExpenditureForm from "./AddExpenditureForm";
import ActionExpenditure from "./ActionExpenditure";
import ShowImage from "./ShowImage";
import dateFormat from "dateformat";


const ExpenditureCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //state to save data from fetch api
    let [expenditureData, setExpenditureData] = useState([])

    //state page table
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //state to open dialog
    let [statusOpenDialogEXP, setStatusOpenDialogEXP] = useState(false);

    //handle change page table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //HANDLE DIALOG 
    const handleDialogEXP = () => {
        setStatusOpenDialogEXP(!statusOpenDialogEXP)
        fetchExpenditureData()
    };


    //define colum table
    const columns = [
        { id: 'id', label: 'Id' },
        { id: 'item_name', label: 'Item Name', minWidth: 150,},
        { id: 'staff_name', label: 'Staff' },
        { id: 'price', label: 'Price' },
        { id: 'description', label: 'Description', minWidth: 200, },
        { id: 'date', label: 'Date', minWidth: 100 },
        { id: 'files', label: 'Files' },
        { id: 'action', label: "Action", minWidth: 170 },
    ]


    //fetch data from api
    const fetchExpenditureData = async () => {
        const response = await fetch("http://localhost:3000/expenditure")
        const data = await response.json()
        setExpenditureData(data)
    }


    useEffect(() => {
        fetchExpenditureData()
    }, [])

    return (
        <Box>
            <AddExpenditureForm statusOpenDialogEXP={statusOpenDialogEXP} handleDialogEXP={handleDialogEXP} />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <Typography variant="h4" gutterBottom component="div">
                    Expenditure
                </Typography>
                <Button onClick={handleDialogEXP} variant="contained" sx={{ backgroundColor: colors.blueAccent[700] }}>
                    Add Expenditure
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
                            {expenditureData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={item.code} style={{ backgroundColor: colors.blueAccent[900] }}>
                                            {columns.map((column) => {
                                                const value = item[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id !== 'action' && column.id !== 'files' && column.id !== 'date' ? value : null}
                                                        {column.id === 'date' ? dateFormat(value, "yyyy-mm-dd") : null}
                                                        {column.id === 'files'
                                                            ? <ShowImage linkImage={item.files}/>
                                                            : null}
                                                        {column.id === 'action' ?
                                                            <div>
                                                                <ActionExpenditure expenditureDataId={item.id} fetchExpenditureData={fetchExpenditureData} />
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
                    count={expenditureData.length}
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

export default ExpenditureCard