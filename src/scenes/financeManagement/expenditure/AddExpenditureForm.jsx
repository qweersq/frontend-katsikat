import { Button, Dialog, useTheme, TextField, MenuItem } from "@mui/material"
import { Box } from "@mui/system";
import { tokens } from "../../../theme";
import React, { useEffect, useState } from "react"
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';


const ExpenditureFormAdd = ({ statusOpenDialogEXP, handleDialogEXP }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [nameItemEXP, setNameItemEXP] = useState("");
    let [priceItemEXP, setPriceItemEXP] = useState("");
    let [descriptionItemEXP, setDescriptionItemEXP] = useState("");
    let [staffIdEXP, setStaffIdEXP] = useState("");
    let [urlFileEXP, setUrlFileEXP] = useState("");
    let [dateEXP, setDateEXP] = useState(dayjs());


    //state to save data from api
    let [staffList, setStaffList] = useState([])

    const [image, setImage] = useState("https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg");
    const [saveImage, setSaveImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("Click upload button to upload image");

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        setImage(URL.createObjectURL(uploaded));
        setSaveImage(uploaded);
    }

    function handleSave() {
        if (saveImage != null) {
            // save image to backend
            let formData = new FormData();
            formData.append("photo", saveImage);

            fetch("http://localhost:3000/api/upload", {
                method: "POST",
                body: formData,
            })
                .then((res) =>
                    res.json()
                )
                .then((data) => {
                    // window.location.href = data.image;
                    console.log(data)
                    setUrlFileEXP(data.image);
                    alert("Image uploaded successfully" + urlFileEXP);
                });
        }
    }


    //fetch data from api
    const fetchApiCreateExpenditure = async () => {
        const url = "http://localhost:3000/create/expenditure";
        const data = {
            name: nameItemEXP,
            staff_id: staffIdEXP,
            price: priceItemEXP,
            description: descriptionItemEXP,
            date: dateEXP,
            files: urlFileEXP
        }
        await axios.post(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        handleDialogEXP();
    }

    //fetch data from api STAFF
    const fetchApiStaff = async () => {
        const url = "http://localhost:3000/staff/list";
        const response = await axios.get(url);
        setStaffList(response.data);
    }

    useEffect(() => {
        fetchApiStaff();
        handleSave();
    }, [saveImage])

    return (
        <Box>
            <Dialog open={statusOpenDialogEXP} onClose={handleDialogEXP}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Expenditure</DialogTitle>
                <DialogContent sx={{
                    backgroundColor: colors.blueAccent[900],
                }}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Item Name"
                        type="text"
                        variant="standard"
                        fullWidth
                        defaultValue=""
                        onChange={(e) => setNameItemEXP(e.target.value)}
                        sx={{ mt: "20px", }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        onChange={(e) => setPriceItemEXP(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue=""
                        onChange={(e) => setDescriptionItemEXP(e.target.value)}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Staff"
                        defaultValue=""
                        fullWidth
                        onChange={(e) => setStaffIdEXP(e.target.value)}
                        sx={{ mt: "20px", }}
                    >
                        {staffList.map((option) => (
                            <MenuItem value={option.id} key={option.id}> {option.value} </MenuItem>
                        ))}
                    </TextField>
                    <Box sx={{
                        mt: "30px"
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Due Date"
                                inputFormat="DD/MM/YYYY"
                                value={dateEXP}
                                onChange={setDateEXP}
                                renderInput={(params) => <TextField {...params} />}
                                width="100%"
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ display: "inline", alignItems: "right", textAlign: "center", mt: "30px" }}>
                        <Card sx={{ maxWidth: "100%", mt: "20px" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={image}
                                    alt="foto.png"
                                    sx={{ backgroundColor: colors.blueAccent[900], borderColor: colors.blueAccent[800], borderWidth: "2px", borderStyle: "solid" }}
                                />
                                <CardContent
                                    sx={{ backgroundColor: colors.blueAccent[800], }}
                                >
                                    <Typography gutterBottom variant="h6" component="div" sx={{ fontStyle: "italic" }}>
                                        {imageUrl}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ backgroundColor: colors.blueAccent[800], color: colors.primary[100], width: "100%", fontWeight: "bold", mt: "20px" }}
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={(e) => handleUploadChange(e)}
                            />
                        </Button>
                    </Box>

                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>
                    <Button onClick={handleDialogEXP} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiCreateExpenditure} autoFocus sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}

export default ExpenditureFormAdd