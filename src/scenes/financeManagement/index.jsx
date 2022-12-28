import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import DirectionsBike from "@mui/icons-material/DirectionsBike";
import DoneAll from "@mui/icons-material/DoneAll";
import LocalShipping from "@mui/icons-material/LocalShipping";
import AvTimer from "@mui/icons-material/AvTimer";
import StatBox from "../../components/StatBox";
import React, { useEffect, useState } from "react"
import * as CurrencyFormat from 'react-currency-format';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SalesCard from "./sales/SalesCard";
import ExpenditureCard from "./expenditure/ExpenditureCard";

const FinanceManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //stete to save value at box finance management
  let [balanceSaldo, setBalanceSaldo] = useState()
  let [salesAmount, setSalesAmount] = useState()
  let [expenditureAmount, setExpenditureAmount] = useState()

  //fetch api to get box data
  const fetchBoxData = async () => {
    const response = await fetch("http://localhost:3000/box/sum")
    const data = await response.json()

    setSalesAmount(data[0].amount)
    setExpenditureAmount(data[1].amount)
    setBalanceSaldo(data[2].amount)
  }

  useEffect(() => {
    fetchBoxData()
  }, [])

  return (
    <Box m="20px">
      <Header title="Finance Management" subtitle="Order, Sales, expenditure management" />

      <Box
        display="grid"
        gridTemplateColumns="repeat(9, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={<CurrencyFormat value={balanceSaldo} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />}
            subtitle="Saldo Balance"
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
            title={<CurrencyFormat value={salesAmount} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />}
            subtitle="Sales Amount"
            progress="0.75"
            increase="+14%"
            icon={
              <ShoppingBasket
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
            title={<CurrencyFormat value={expenditureAmount} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />}
            subtitle="Expenditure Amount"
            progress="0.80"
            increase="+43%"
            icon={
              <DirectionsBike
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />


        </Box>

      </Box>
      <Box sx={{ flexGrow: 1, mt: "30px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <SalesCard />
                    </Grid>
                    <Grid item xs={6} >
                        <ExpenditureCard />
                    </Grid>
                </Grid>
            </Box>

    </Box>
  );
};

export default FinanceManagement;
