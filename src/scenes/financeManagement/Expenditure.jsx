import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react"
import ExpenditureCard from "./expenditure/ExpenditureCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Expenditure = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //stete to save value at box finance management
    let [balanceSaldo, setBalanceSaldo] = useState()
    let [salesAmount, setSalesAmount] = useState()
    let [expenditureAmount, setExpenditureAmount] = useState()

    //Authencation
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user) {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);


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
            <Header title="Expenditure" subtitle="Expenditure management" />

            <Box sx={{ flexGrow: 1, mt: "30px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} >
                        <ExpenditureCard />
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
};

export default Expenditure;
