import React, { useState } from "react";
import { Card, Tab, Box, Divider, MenuItem, Select, InputLabel, FormControl, Grid, Button, TextField, Container, Alert } from '@mui/material';
import axios from 'axios';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import ReactJson from 'react-json-view'

const babyRedcolor = blue[20];

function Home() {
    let [url, setURL] = useState("");
    let [method, setMethod] = useState("get");
    let [response, setResponse] = useState([]);
    let [value, setValue] = useState('1');
    let [error, setError] = useState("");
    let [rowJson, setRowJson] = useState([]);
    let [status, setStatus] = useState("");
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    function axiosBasedOnMethod(method) {
        if (method === "post") {
            axios.post(`${url} `, rowJson)
                .then(res => {
                    setStatus(res.status);
                    setResponse(res.data);
                })
                .catch((error) => {
                    setStatus(error.response.status);
                    setResponse(error.response.data)
                });
        } else if (method === "put") {
            axios.put(`${url} `, rowJson)
                .then(res => {
                    setStatus(res.status);
                    setResponse(res.data);
                })
                .catch((error) => {
                    setStatus(error.response.status);
                    setResponse(error.response.data)
                });
        } else if (method === "delete") {
            axios.delete(`${url} `, rowJson)
                .then(res => {
                    setStatus(res.status);
                    setResponse(res.data);
                })
                .catch((error) => {
                    setStatus(error.response.status);
                    setResponse(error.response.data)
                });
        }
    }
    function onSubmit(e) {
        e.preventDefault();
        setResponse([])
        if (url) {
            if (method === "get") {
                axios.get(`${url} `)
                    .then(res => {
                        setStatus(res.status);
                        setResponse(res.data);
                    }).catch((error) => {
                        setStatus(error.response.status);
                        setResponse(error.response.data);
                    });
            }
            else if (method === "post") {
                axiosBasedOnMethod(method);
            }
            else if (method === "put") {
                axiosBasedOnMethod(method);
            }
            else if (method === "delete") {
                axiosBasedOnMethod(method)
            }

        } else {
            setError("Endpoint is required")
        }

    }
    function handleURL(e) {
        setError("")
        setResponse([]);
        setStatus("000")
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
    return (
        <>
            <div style={{ backgroundColor: babyRedcolor }} className="shadow">
                <Container>
                    <Box p={2}>
                        <Card boxShadow={1} borderRadius={2} >
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
                                            <MenuItem value="patch">PATCH</MenuItem>
                                            <MenuItem value="delete">DELETE</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Box p={1}>
                                        <TextField fullWidth label="Enter request URL" variant="outlined" onChange={handleURL} />
                                    </Box>
                                    {/* Authentication */}
                                    <Box>
                                        <TabContext >
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList aria-label="lab API tabs example">
                                                    <Tab label="Authotization" value="1" />
                                                    <Tab label="Body" value="2" />
                                                    <Tab label="headers" value="3" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1">
                                                <TextField
                                                    fullWidth id="fullWidth" lg={{
                                                        innerHeight: '100px',
                                                    }}

                                                    onChange={(e) => { handleBody(e) }}
                                                />
                                            </TabPanel>
                                            <TabPanel value="2">Comming soon..</TabPanel>
                                            <TabPanel value="3">Comming soon..</TabPanel>
                                        </TabContext>
                                    </Box>
                                    {/* Body */}
                                    {
                                        method === "get" || method === "delete" ? <p> {method} Request </p> :
                                            <TabContext value={value}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                        <Tab label="JSON" value="1" />
                                                        <Tab label="Text" value="2" />
                                                        <Tab label="XML" value="3" />
                                                    </TabList>
                                                </Box>
                                                <TabPanel value="1">
                                                    <TextField
                                                        fullWidth id="fullWidth" lg={{
                                                            innerHeight: '100px',
                                                        }}

                                                        onChange={(e) => { handleBody(e) }}
                                                    />
                                                </TabPanel>
                                                <TabPanel value="2">Comming soon..</TabPanel>
                                                <TabPanel value="3">Comming soon..</TabPanel>
                                            </TabContext>
                                    }
                                </Box>
                                <Box p={1}>
                                    <Button variant="contained" type="submit">Send</Button>
                                </Box>
                                {error && <Alert severity="error">{error}</Alert>}
                            </form>
                            <Box sx={{ flexGrow: 1 }} p={2}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={4}>
                                        <Item>{status}</Item>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Item>
                                            <ReactJson src={response} />
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Card>
                    </Box>
                </Container >
                <Divider />

            </div >

        </>
    );
}
export default Home; 
