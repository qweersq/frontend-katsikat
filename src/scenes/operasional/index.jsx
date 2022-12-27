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
import CustomerCard from "./customer/CustomerCard";
import ShippingCostCard from "./shippingcost/ShippingCostCard";
import TreatmentCard from "./treatment/TreatmentCard";
import ShoesCard from "./shoes/ShoesCard";
import StaffCard from "./staff/StaffCard";





const Operasional = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //state to save value at box operasional
    let [totalShipping, setTotalShipping] = useState("")
    let [totalStaff, setStaffOrder] = useState("")
    let [totalTreatment, setTotalTreatment] = useState("")
    let [totalShoesType, setTotalShoesType] = useState("")
    let [totalCustomer, setTotalCustomer] = useState("")

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //fetch api to get box data
    const fetchBoxData = async () => {
        const response = await fetch("http://localhost:3000/data/count/operasional")
        const data = await response.json()
        console.log("DATA BOX COUNT")
        console.log(data[1].countBox)
        setTotalShipping(data[0].countBox)
        setStaffOrder(data[1].countBox)
        setTotalTreatment(data[2].countBox)
        setTotalShoesType(data[3].countBox)
        setTotalCustomer(data[4].countBox)
    }

    useEffect(() => {
        fetchBoxData()
    }, [])

    return (
        <Box m="20px">
            <Header title="Operasional Management" subtitle="Katsikat Shoes Transaction " />

            <Box
                display="grid"
                gridTemplateColumns="repeat(15, 1fr)"
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
                        title={totalShipping}
                        subtitle="Total Shipping"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <DoneAll
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
                        title={totalStaff}
                        subtitle="Staff"
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
                        title={totalTreatment}
                        subtitle="Treatment"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <DirectionsBike
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
                        title={totalShoesType}
                        subtitle="Shoes Type"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <AvTimer
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
                        title={totalCustomer}
                        subtitle="Customers"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <LocalShipping
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

            </Box>
            <Box sx={{ flexGrow: 1, mt: "30px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <CustomerCard />
                    </Grid>
                    <Grid item xs={6} >
                        <ShippingCostCard />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mt: "30px" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={6} >
                        <TreatmentCard />
                    </Grid>
                    <Grid item xs={6} >
                        <StaffCard />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mt: "30px" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} >
                        <ShoesCard />
                    </Grid>
                    <Grid item xs={6} >

                    </Grid>
                </Grid>
            </Box>
        </Box>


    );
};

export default Operasional;
