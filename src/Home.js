import React, { useState } from "react";
import { Card, Box, Divider, MenuItem, Select, InputLabel, FormControl, Grid, Button, TextField, Container, Alert, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { blue } from '@mui/material/colors';
import StatusCode from "./components/StatusCode";
import Response from "./components/Response";
import RequestBody from "./components/RequestBody";
// import Authorization from './components/Authorization';

const babyRedcolor = blue[20];

function Home() {
    let [url, setURL] = useState("");
    let [method, setMethod] = useState("get");
    let [response, setResponse] = useState([]);
    // let [tab1, setTab1] = useState("body");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");
    let [rowJson, setRowJson] = useState({});
    let [status, setStatus] = useState("");
    // let [auth, setAuth] = useState(null);
    function axiosBasedOnMethod(method) {
        const config = {
            method: method,
            url: url,
            data: method !== 'get' ? rowJson : null, // Only include data if not a GET request
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                // ...(auth ? { Authorization: auth } : {}) // Include auth headers if available
            }
            //* headers: auth ? { Authorization: auth } : {}, // Include auth headers if available */
        };
        console.log("Request Config:", config); // Log the request config for debugging
        console.log("Row JSON:", rowJson); // Log the JSON body for debugging
        axios(config)
            .then(res => {
                console.log(res);
                if (res.data === "" || typeof res.data !== 'object' || res.data === null) {
                    const noContentMessage = {
                        message: 'No content available from the API.'
                    };
                    setStatus(res.status);
                    setResponse(noContentMessage);
                } else {
                    setStatus(res.status);
                    setResponse(res.data);
                }
            })
            .catch(error => {
                console.error("Error:", error); // Log the error for debugging

                setStatus(error.response ? error.response.status : 500); // Handle cases where response is not available
                setResponse(error.response ? error.response.data : "An error occurred");
            });
    }
    function onSubmit(e) {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null); // Reset error state
        setResponse([])  // Clear  previous response

        try {
            if (url) {
                if (method === "get") {
                    axiosBasedOnMethod(method);
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
        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setLoading(false); // End loading
        }
        // if (auth) {
        //     console.log("this is authorizedAPI");
        //     console.log(auth);
        // } else {
        //     console.log("NOT auth");
        // }
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
    // function handleTab(e, newValue) {
    //     setTab1(newValue)
    // }
    function handleBody(e) {
        console.log(e.target.value);
        if (e.target.value !== "") {
            setRowJson(JSON.stringify(e.target.value));
        }
    }
    // function handleAuth(username, password) {
    //     // console.log(username === "" ? "yes empty" : "not empty");
    //     console.log(username);
    //     console.log(password);
    //     if (username && password) {
    //         const credentials = `${username}:${password}`;
    //         const encodedCreds = Buffer.from(credentials).toString('base64');
    //         let token = `Bearer ${encodedCreds}`;
    //         setAuth(token);
    //         console.log(token);
    //     }
    // }
    return (
        <>
            <div style={{ backgroundColor: babyRedcolor }} className="shadow">
                <Container>
                    <Typography variant="h4" align="center" style={{ padding: '16px' }}>REST API Tester</Typography>
                    <Typography variant="h6" align="center" style={{ padding: '10px' }}>Use this tool to quickly test and validate REST API endpoints of your website with a single click.</Typography>
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
                                    <>
                                    <RequestBody handleBody={handleBody} />
                                    {/* <Authorization parentAuth={handleAuth} /> */}
                                    </>

                                    /*<Box>
                                        <TabContext value={tab1}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleTab} aria-label="lab API tabs example">
                                                    <Tab label="Authotization" value="auth" />
                                                    <Tab label="Body" value="body" />
                                                    <Tab label="headers" value="headers" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="auth">
                                                <Authorization parentAuth={handleAuth} />
                                            </TabPanel>
                                            <TabPanel value="body">
                                                <RequestBody handleBody={handleBody} />
                                            </TabPanel>
                                            <TabPanel value="headers"> headers comming soon...</TabPanel>
                                        </TabContext>
                                    </Box>
                                    */
                                )}
                            </form>
                            {/* Response */}
                            <Box sx={{ flexGrow: 1 }} p={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <StatusCode status={status} />
                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        {loading ? (
                                            <CircularProgress />
                                        )
                                            : error ? (
                                                <Alert severity="error">{error}</Alert>
                                            )
                                                : (
                                                    <Response response={response} />
                                                )}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Box >
                </Container >
                <Divider />
            </div >

        </>
    );
}
export default Home; 
