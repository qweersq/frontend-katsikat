import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { makeStyles } from '@mui/styles';
import { TextField, useTheme, Button, Grid, Card, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    root: {
        // input label when focused
        "& label.Mui-focused": {
            color: "black"
        },
        // focused color for input with variant='standard'
        "& .MuiInput-underline:after": {
            borderBottomColor: "orange"
        },
        // focused color for input with variant='filled'
        "& .MuiFilledInput-underline:after": {
            borderBottomColor: "orange"
        },
        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
            "& input": {
                color: "black"
            },
            "& fieldset": {
                borderColor: "black"
            },
            "&.Mui-focused fieldset": {
                borderColor: "black"
            }
        }
    }
});

const Register = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const classes = useStyles();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >

            <Card variant="outlined" sx={{ mt: "15vh", borderRadius: "20px", backgroundColor: colors.blueAccent[100], padding: "30px" }}>
                <Box className="login__logo" sx={{ display: "flex", justifyContent: "center" }}>
                    <img src="https://i.ibb.co/PZYkyKm/signup-katsikat.png" alt="logo" style={{ width: "300px" }} />
                </Box>
                <form>
                    <Box>
                        <TextField
                            id="outlined-basic"
                            className={classes.root}
                            fullWidth
                            label="Your Name"
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                            variant="outlined"
                            sx={{
                                mt: "20px",
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: "15px", mb: "15px" }}>
                        <TextField
                            id="outlined-basic"
                            className={classes.root}
                            fullWidth
                            label="Email"
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                            variant="outlined"
                            sx={{
                                mt: "20px",
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: "15px", mb: "15px" }}>
                        <TextField
                            id="outlined-basic"
                            className={classes.root}
                            fullWidth
                            type="number"
                            label="Phone"
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                            variant="outlined"
                            sx={{
                                mt: "20px",
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: "15px", mb: "15px" }}>
                        <TextField
                            id="outlined-basic"
                            className={classes.root}
                            fullWidth
                            label="Password"
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                            variant="outlined"
                            sx={{
                                mt: "20px",
                            }}
                        />
                    </Box>
                    <Box sx={{ mt: "15px", mb: "15px" }}>
                        <TextField
                            id="outlined-basic"
                            className={classes.root}
                            fullWidth
                            label="Confirm Password"
                            InputLabelProps={{
                                style: { color: '#333' },
                            }}
                            variant="outlined"
                            sx={{
                                mt: "20px",
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <Button variant="contained">Register</Button>
                    </Box>
                </form>
                <Box sx={{ display:"flex" }}>
                    <Typography style={{ color: "black" }}>Have an account? 
                    <Link to="/" style={{ textDecoration: "none", color: "black" }}> Login here</Link>
                    </Typography>
                </Box>

            </Card>
        </Grid>
    );
}

export default Register