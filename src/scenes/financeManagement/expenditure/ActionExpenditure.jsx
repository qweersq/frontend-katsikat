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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dateFormat from "dateformat";


const ActionExpenditure = ({ expenditureDataId, fetchExpenditureData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //data from form
    let [nameItemEXP, setNameItemEXP] = useState("");
    let [priceItemEXP, setPriceItemEXP] = useState("");
    let [descriptionItemEXP, setDescriptionItemEXP] = useState("");
    let [staffIdEXP, setStaffIdEXP] = useState("");
    let [dateEXP, setDateEXP] = useState(dayjs());

    // state dialog openEditEXP editExpenditure
    let [statusOpenDialogEditEXP, setStatusOpenDialogEditEXP] = useState(false);


    const [image, setImage] = useState(null);
    const [saveImage, setSaveImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("Click upload button to upload image");

    //state to save data from api
    const [staffList, setStaffList] = useState([]);

    //fetch data from api
    const fetchApiStaff = async () => {
        const url = "http://localhost:3000/staff/list";
        const response = await axios.get(url);
        setStaffList(response.data);
    }

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
                    alert("Image uploaded successfully");
                });
        }
    }


    //get data by id from api
    const getExpenditureDataById = async () => {
        const response = await fetch("http://localhost:3000/expenditure/" + expenditureDataId)
        const data = await response.json()
        console.log(data)
        setNameItemEXP(data.item_name)
        setPriceItemEXP(data.price)
        setDescriptionItemEXP(data.description)
        setStaffIdEXP(data.staff_id)
        setImage(data.files)
        setDateEXP(dateFormat(data.date, "yyyy-mm-dd"))
        handleDialogEditEXP();
    }

    //post Data to API
    const fetchApiUpdateExpenditure = async () => {
        const url = "http://localhost:3000/update/expenditure/" + expenditureDataId;
        const data = {
            name: nameItemEXP,
            price: priceItemEXP,
            description: descriptionItemEXP,
            staff_id: staffIdEXP,
            date: dateEXP,
            files: image
        }
        await axios.put(url, data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            }
            )
        fetchExpenditureData()
        handleDialogEditEXP();
    }


    // fetch data API
    const deleteExpenditureData = async () => {
        const url = `http://localhost:3000/expenditure/${expenditureDataId}`
        await axios.delete(url)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        fetchExpenditureData()
    }

    //handle dialogEdit Open
    const handleDialogEditEXP = () => {
        setStatusOpenDialogEditEXP(!statusOpenDialogEditEXP)
        fetchExpenditureData()
    };


    useEffect(() => {
        fetchApiStaff()
        handleSave();
    }, [saveImage])

    return (
        <Box>
            <Button onClick={getExpenditureDataById} sx={{ backgroundColor: colors.blueAccent[700], color: colors.primary[100], mr: "5px" }}> <EditIcon /> </Button>
            <Button onClick={deleteExpenditureData} sx={{ backgroundColor: colors.redAccent[700], color: colors.primary[100] }}> <DeleteIcon /> </Button>
            <Dialog open={statusOpenDialogEditEXP} onClose={handleDialogEditEXP}>
                <DialogTitle sx={{
                    backgroundColor: colors.blueAccent[700],
                }}>Add New Expenditure

                </DialogTitle>
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
                        defaultValue={nameItemEXP}
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
                        defaultValue={priceItemEXP}
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
                        defaultValue={descriptionItemEXP}
                        onChange={(e) => setDescriptionItemEXP(e.target.value)}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Staff"
                        defaultValue={staffIdEXP}
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
                        <Card sx={{ maxWidth: "100%", mt: "20px", backgroundColor: colors.primary[900] }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={image === null ? "https://www.pngall.com/wp-content/uploads/2/Upload-PNG-Free-Image.png" : image}
                                    alt="Image"
                                    sx={{ backgroundColor: colors.blueAccent[900], borderColor: colors.blueAccent[800], borderWidth: "2px", borderStyle: "solid" }}
                                >
                                </CardMedia>
                                <CardContent
                                    sx={{ backgroundColor: colors.primary[700], }}
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
                    <Button onClick={handleDialogEditEXP} sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>Cancel</Button>
                    <Button onClick={fetchApiUpdateExpenditure} autoFocus sx={{
                        backgroundColor: colors.blueAccent[800],
                        color: colors.primary[100],
                    }}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}

export default ActionExpenditure