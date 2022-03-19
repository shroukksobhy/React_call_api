import React, { useState } from "react";
import { Card, Tab, Box, Divider, MenuItem, Select, InputLabel, FormControl, FormLabel, FormGroup, Button, TextField, Container, Alert } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import ReactJson from 'react-json-view'

const babyRedcolor = red[100];
const babyBluecolor = blue[100];

function Home() {
    let [url, setURL] = useState("");
    let [method, setMethod] = useState("get");
    let [response, setResponse] = useState([]);
    let [value, setValue] = useState('1');
    let [error, setError] = useState("");
    let [rowJson, setRowJson] = useState([]);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    function onSubmit(e) {
        e.preventDefault();
        if (url) {
            method === "get" ?
                axios.get(`${url}`)
                    .then(res => {
                        console.log(res.data)
                        setResponse(res.data);
                    })
                :
                axios.post(`${url}`, rowJson)
                    .then(res => {
                        console.log(res.data);
                        setResponse(res.data);
                    })
                    .catch((error) => {
                        console.log(url);
                        console.log(error);
                        console.log(error.config.data)

                    });
        } else {
            setError("Invalid Request")
        }

    }
    function handleURL(e) {
        setError("")
        setResponse([]);
        setURL(e.target.value);
    }
    function handleMethod(e) {
        setMethod(e.target.value)
    }
    function handleChange(e, newValue) {
        setValue(newValue);
    }
    function handleBody(e) {
        console.log(e.target.value)
        if (e.target.value) {
            setRowJson(JSON.stringify(e.target.value), () => {
                console.log(rowJson)
            });
        }
    }
    let istrue = true;
    return (
        <>
            <div style={{ backgroundColor: babyRedcolor }}>
                <Container>
                    <Box p={2} >
                        <Card>
                            <form onSubmit={onSubmit}>
                                <Box
                                    lg={{
                                        maxWidth: '100%',
                                    }}
                                    p={1}
                                >
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Method</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            onChange={(e) => { handleMethod(e) }}
                                            value={method}
                                        >
                                            <MenuItem value="get">GET</MenuItem>
                                            <MenuItem value="post">POST</MenuItem>
                                            <MenuItem value="put">PUT</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box p={1}>
                                        <TextField fullWidth label="Enter request URL" variant="outlined" onChange={handleURL} />
                                    </Box>
                                    {
                                        method == "get" ? <p> GET Request </p> :
                                            <TabContext value={value}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                        <Tab label="JSON" value="1" />
                                                        <Tab label="Text" value="2" />
                                                        <Tab label="XML" value="3" />
                                                    </TabList>
                                                </Box>
                                                <TabPanel value="1">
                                                    <TextField fullWidth id="fullWidth" lg={{
                                                        innerHeight: '100px',
                                                    }} />
                                                    <TextareaAutosize
                                                        maxRows={10}
                                                        aria-label="maximum height"
                                                        style={{ width: '100%' }}
                                                        onChange={(e) => { handleBody(e) }}
                                                    />
                                                </TabPanel>
                                                <TabPanel value="2">Item Two</TabPanel>
                                                <TabPanel value="3">Item Three</TabPanel>
                                            </TabContext>
                                    }
                                </Box>
                                <Box p={1}>
                                    <Button variant="contained" type="submit">Send</Button>
                                </Box>
                                {error && <Alert severity="error">{error}</Alert>}
                            </form>
                            <Box m={2}>
                                {/* {response} */}
                                <ReactJson src={response} />
                            </Box>
                        </Card>
                    </Box>
                </Container>
                <Divider />

            </div>

        </>
    );
}
export default Home; 