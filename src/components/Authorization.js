import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

function Authorization({ parentAuth }) {
    const [newUsername, setUserName] = useState("");
    const [newPassword, setPassword] = useState("");

    useEffect(() => {
        // Call parentAuth only when username or password changes
        if (newUsername && newPassword) {
           parentAuth(newUsername, newPassword);
        }
    }, [newUsername, newPassword, parentAuth]);

    function handleAPIUsername(e) {
        setUserName(e.target.value);
    }

    function handleAPIpassword(e) {
        setPassword(e.target.value);
    }
    return (
        <>
            <div>Authorization</div>
            <Box>
                <p>Basic auth</p>
                <TextField label="username"
                value={newUsername}
                name="username"
                variant="outlined"
                onChange={handleAPIUsername} 
                />
                <TextField label="password"
                value={newPassword}
                name="password"
                variant="outlined"
                onChange={handleAPIpassword} 
                />
            </Box>
        </>
    );
}

export default Authorization;