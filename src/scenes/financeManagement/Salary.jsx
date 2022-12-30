import { Box, Grid, useTheme, MenuItem, TextField, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import StatBox from "../../components/StatBox";
import React, { useEffect, useState } from "react"
import * as CurrencyFormat from 'react-currency-format';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SalesCard from "./sales/SalesCard";
import ExpenditureCard from "./expenditure/ExpenditureCard";
import { InputAdornment } from "@mui/material";
import axios from "axios";
import CleanerSalaryCard from "./salary/CleanerSalaryCard";
import ShippingSalaryCard from "./salary/ShippingSalaryCard";
import { type } from "@testing-library/user-event/dist/type";

const Salary = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //state to control input choosen
    let [staffId, setStaffId] = useState(null)
    let [staffName, setStaffName] = useState("")
    let [priceRpKm, setPriceRpKm] = useState(500)
    let [sumShippingId, setSumShippingId] = useState(null)
    let [sumCommisionId, setSumCommisionId] = useState(null)
    let [salary, setSalary] = useState(null)


    //stete to save value at box finance management
    let [netIncome, setNetIncome] = useState()
    let [netIncomeDivided, setNetIncomeDivided] = useState()
    let [sumCommision, setSumCommision] = useState()
    let [sumShipping, setSumShipping] = useState()


    //state to save data from api
    const [staffList, setStaffList] = useState([]);

    //fetch api to get box data
    const fetchBoxData = async () => {
        const response = await fetch("http://localhost:3000/box/sum")
        const data = await response.json()

        const resSumCommision = await fetch("http://localhost:3000/finance/sum/commision")
        const dataSumCommision = await resSumCommision.json()

        const resSumShipping = await fetch("http://localhost:3000/shipping-cost/sum/milleage")
        const dataSumShipping = await resSumShipping.json()

        const resCountStaff = await fetch("http://localhost:3000/staff/count")
        const dataCountStaff = await resCountStaff.json()

        setNetIncome(parseInt(data[2].amount))
        setNetIncomeDivided((parseInt(data[2].amount) / parseInt(dataCountStaff.count_staff)).toFixed(0))
        setSumCommision(dataSumCommision.sum_commision)
        setSumShipping(parseInt(dataSumShipping.sum_milleage) * priceRpKm)
    }

    //fetch data from api
    const fetchApiStaff = async () => {
        const url = "http://localhost:3000/staff/list";
        const response = await axios.get(url);
        setStaffList(response.data);
    }

    const handleStaff = (event) => {
        setStaffId(event.target.value)
        {
            staffList.map((option) => (
                option.id === event.target.value ? setStaffName(option.label) : null
            ))
        }
    };

    const getDataSumById = async () => {
        const response = await fetch(`http://localhost:3000/shipping-cost/sum/milleage/${staffId}`)
        const data = await response.json()
        {data.sum_milleage_id === null ? setSumShippingId(0) : setSumShippingId(parseInt(data.sum_milleage_id) * priceRpKm)}
        

        const resSumCommision = await fetch(`http://localhost:3000/finance/sum/commision/${staffId}`)
        const dataSumCommision = await resSumCommision.json()
        {dataSumCommision.sum_commision_id === null ? setSumCommisionId(0) : setSumCommisionId(parseInt(dataSumCommision.sum_commision_id))}

    }



    useEffect(() => {
        fetchBoxData()
        fetchApiStaff()
        getDataSumById()
        setSalary((parseInt(netIncomeDivided) + sumCommisionId + sumShippingId).toFixed(0))
    }, [staffId, priceRpKm, sumCommisionId, sumShippingId])

    return (
        <Box m="20px">
            <Header title="Salary Management" subtitle="Salary and commision management" />

            <Box
                display="grid"
                gridTemplateColumns="repeat(9, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={<CurrencyFormat value={netIncome} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />}
                        subtitle="Net Income"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <AccountBalanceWalletIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={<CurrencyFormat value={sumCommision} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />}
                        subtitle="Commision"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <AccountBalanceWalletIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >

                    <StatBox
                        title={<CurrencyFormat value={sumShipping} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />}
                        subtitle="Shipping Cost"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <ShoppingBasket
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

            </Box>
            <Box sx={{ backgroundColor: colors.primary[600] }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: "30px", p: "30px" }}>
                    <Box sx={{ width: "100%", mr: "10px", mt: "30px" }}>
                        <Typography variant="h4" sx={{ color: colors.blueAccent[100], mb: "20px" }}>
                            Staff Name : {staffName}
                        </Typography>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Staff"
                            defaultValue=""
                            sx={{
                                width: "100%",
                                color: colors.blueAccent[100],
                            }}
                            onChange={(e) => handleStaff(e)}
                        >
                            {staffList.map((option) => (
                                <MenuItem value={option.id} key={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ width: "100%", mt: "30px", }}>
                        <Typography variant="h4" sx={{ color: colors.blueAccent[100], mb: "20px" }}>
                            Cost Shipping/1 Km : <CurrencyFormat value={priceRpKm} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                        </Typography>
                        <TextField
                            id="outlined-select-currency"
                            label="Rp/km"
                            type="number"
                            defaultValue={priceRpKm}
                            sx={{

                                width: "100%",
                                color: colors.blueAccent[100],
                            }}
                            onChange={(e) => setPriceRpKm(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                            }}
                        >
                        </TextField>
                    </Box>
                </Box>
                <Box sx={{ backgroundColor: colors.blueAccent[800], ml: "30px", mt: "20px", mr: "30px", padding: "20px" }}>
                    <Typography variant="h6" sx={{ color: colors.blueAccent[100] }}>
                        Salary = Net Income/6 + Commision Wash + Shipping Cost
                    </Typography>

                    {staffId === null ?
                        <Typography variant="h4" sx={{ color: colors.blueAccent[100], fontWeight: "bold", fontStyle:"italic" }}>
                            Please Choose Staff
                        </Typography>
                        :
                        <Typography variant="h4" sx={{ color: colors.blueAccent[100], fontWeight: "bold" }}>
                            Salary {staffName} = {(parseInt(netIncomeDivided)).toLocaleString()} + {(sumCommisionId).toLocaleString()} + {(sumShippingId).toLocaleString()} = <CurrencyFormat value={salary} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                        </Typography>
                    }

                </Box>
                <Box sx={{ flexGrow: 1, padding: "20px" }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6} >
                            <CleanerSalaryCard staffId={staffId} />

                        </Grid>
                        <Grid item xs={6} >
                            <ShippingSalaryCard staffId={staffId} />

                        </Grid>
                    </Grid>
                </Box>


            </Box>

        </Box>
    );
};

export default Salary;
