import { Box, Button, Typography, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };


  const renderCard = () => {
    return (
      <Box display="flex" justifyContent="space-between" p={2}>
        <Typography variant="h4" ml={2} color={colors.grey[100]} fontWeight="bold">
          DASHBOARD
        </Typography>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* HEADER */}
      <Typography variant="h4" ml={2} color={colors.grey[100]} fontWeight="bold">
        DASHBOARD
      </Typography>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon/>
        </IconButton>
        <Button onClick={logout} variant="contained" sx={{ ml:"20px", borderRadius:"10px", border:"1px solid white" }}>
              Logout
            </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
