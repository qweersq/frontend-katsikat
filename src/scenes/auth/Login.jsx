import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";


import { TextField, useTheme, Button, Grid, Card, Box, Typography } from "@mui/material";

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

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());  
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >

      <Card variant="outlined" sx={{ mt: "25vh", borderRadius: "20px", backgroundColor: colors.blueAccent[100], padding: "30px" }}>
        <Box className="login__logo" sx={{ display: "flex", justifyContent: "center" }}>
          <img src="https://i.ibb.co/xfqJkf2/login-katsikat.png" alt="logo" style={{ width: "300px" }} />
        </Box>
        <Box className="login__logo" sx={{ display: "flex", justifyContent: "center" }}>
           {isError && <Typography style={{ color: "red" }}>{message}</Typography>}
        </Box>

        <form onSubmit={Auth}>
          <Box>
         
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: "15px", mb: "15px" }}>
            <TextField
              id="outlined-basic"
              type="password"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button type="submit" variant="contained">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Box>
        </form>
        <Box sx={{ display: "flex" }}>
          <Typography style={{ color: "black" }}>Have an account?
            <Link to="/register" style={{ textDecoration: "none", color: "black" }}> Register here</Link>
          </Typography>
        </Box>

      </Card>
    </Grid>
  );
};

export default Login;


