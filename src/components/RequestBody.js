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
                        fullWidth id="fullWidth" lg={{
                            innerHeight: '100px',
                        }}
                        onChange={(e) => { handleBody(e) }}
                    />
                </TabPanel>
                <TabPanel value="text">Coming soon..</TabPanel>
                <TabPanel value="xml">Coming soon..</TabPanel>
            </TabContext>
        </div>
    )
}
export default RequestBody
