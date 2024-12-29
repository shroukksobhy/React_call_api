import React, { useState } from 'react'
import { Box, TextField } from '@mui/material';

function Authorization({ parentAuth }) {
    let [newUsername, setUserName] = useState("");
    let [newPassword, setPassword] = useState("");

    function handleAPIUsername(e) {
        setUserName(e.target.value);
    };
    function handleAPIpassword(e) {
        setPassword(e.target.value);
    }
    parentAuth(newUsername, newPassword);
    return (
        <>
            <div>Authorization</div>
            <Box>

                <p>Basice auth</p>
                <TextField label="username" value={newUsername} name="username" variant="outlined" onChange={handleAPIUsername} />
                <TextField label="password" value={newPassword} name="password" variant="outlined" onChange={handleAPIpassword} />

            </Box>
        </>
    )
}

export default Authorization
