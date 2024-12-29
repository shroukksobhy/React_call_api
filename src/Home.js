import React, { useState } from "react";
import { Card, Tab, Box, Divider, MenuItem, Select, InputLabel, FormControl, Grid, Button, TextField, Container, Alert, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { blue } from '@mui/material/colors';
import StatusCode from "./components/StatusCode";
import Response from "./components/Response";
import RequestBody from "./components/RequestBody";
import Authorization from './components/Authorization';

const babyRedcolor = blue[20];

function Home() {
    let [url, setURL] = useState("");
    let [method, setMethod] = useState("get");
    let [response, setResponse] = useState([]);
    let [tab1, setTab1] = useState("body");
    let [error, setError] = useState("");
    let [rowJson, setRowJson] = useState([]);
    let [status, setStatus] = useState("");
    let [auth, setAuth] = useState(null);
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
        // console.log(e.target.username.value);
        console.log(rowJson);
        if (auth) {
            console.log("this is authorizedAPI");
            console.log(auth);
        } else {

            console.log("NOT auth");
        }
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
    function handleTab(e, newValue) {
        setTab1(newValue)
    }
    function handleBody(e) {
        if (e.target.value) {
            setRowJson(JSON.stringify(e.target.value), () => {
                console.log(rowJson)
            });
        }
    }
    function handleAuth(username, password) {
        // console.log(username === "" ? "yes empty" : "not empty");
        if (username && password) {
            const credentials = `${username}:${password}`;
            const encodedCreds = Buffer.from(credentials).toString('base64');
            let token = `Bearer ${encodedCreds}`;
            setAuth(token);
        }
    }
    return (
        <>
            <div style={{ backgroundColor: babyRedcolor }} className="shadow">
                <Container>
                    <Box p={2}>
                        <Card elevation={3} style={{ borderRadius: '8px' }}>
                            <form onSubmit={onSubmit}>
                                <Box display="flex" alignItems="center" m={2} >
                                    <FormControl style={{ marginRight: '8px' }}>
                                        <InputLabel id="method-select-label">Method</InputLabel>
                                        <Select
                                            labelId="method-select-label"
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
                                     {/* Endpoint */}
                                     <Box style={{ marginRight: '8px', flexGrow: 1 }}>
                                     <TextField fullWidth label="Enter request URL" variant="outlined" onChange={handleURL} />
                                    </Box>                            
                                     {/* Headers */}
                            
                                     <Button variant="contained" type="submit">Send</Button>
                                </Box>
                               
                                {error && <Alert severity="error">{error}</Alert>}

                                {method !== 'get' && (
                                    <Box>
                                        <TabContext value={tab1}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleTab} aria-label="lab API tabs example">
                                                    <Tab label="Authotization" value="auth" />
                                                    <Tab label="Body" value="body" />
                                                    <Tab label="headers" value="headers" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="body">
                                                <RequestBody handleBody={handleBody} />
                                            </TabPanel>
                                            <TabPanel value="auth">
                                                <Authorization parentAuth={handleAuth} />
                                            </TabPanel>
                                            <TabPanel value="headers"> headers Comming soon..</TabPanel>
                                        </TabContext>
                                    </Box>
                                    )}
                            </form>
                            <Box sx={{ flexGrow: 1 }} p={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <StatusCode status={status} />
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Response response={response} />
                                    </Grid>
                                 
                                </Grid>
                            </Box>

                            {/* <Box sx={{ flexGrow: 1 }} p={2}>
    <Paper elevation={2} sx={{ padding: 2 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <StatusCode status={status} />
            </Grid>
            <Grid item xs={12} md={9}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <Response response={response} />
                )}
            </Grid>
        </Grid>
    </Paper>
</Box> */}

                        </Card>
                    </Box >
                </Container >
                <Divider />
            </div >

        </>
    );
}
export default Home; 
