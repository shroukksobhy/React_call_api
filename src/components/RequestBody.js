import React, { useState } from "react";
import { Tab, Box, TextField } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
function RequestBody({ handleBody }) {
    let [value, setValue] = useState('json');
    function handleChange(e, newValue) {
        setValue(newValue);
    }
    // function handleBody(e) {
    //     setBody(e.target.value);
    // }
    return (
        <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="JSON" value="json" />
                        <Tab label="Text" value="text" />
                        <Tab label="XML" value="xml" />
                    </TabList>
                </Box>
                <TabPanel value="json">
                    <TextField
                        fullWidth
                        label="Request Body"
                        variant="outlined"
                        multiline
                        rows={10}
                        onChange={(e) => { handleBody(e) }}
                        placeholder="Enter JSON data here"
                    />
                </TabPanel>
                <TabPanel value="text">Coming soon..</TabPanel>
                <TabPanel value="xml">Coming soon..</TabPanel>
            </TabContext>
        </div>
    )
}
export default RequestBody
