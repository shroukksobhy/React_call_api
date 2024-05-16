import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function StatusCode({ status }) {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body1,
        padding: theme.spacing(1),
        textAlign: 'center',
    }));
    if (status === 200 || status === 201) {
        return (
            <div>
                <Item sx={{ color: 'success.main' }}>{status}</Item>

            </div>
        );
    } else if (status === 404) {
        return (
            <div>
                <Item sx={{ color: 'warning.main' }}>{status}</Item>

            </div>
        );
    } else {
        return (
            <div>
                <Item sx={{ color: 'success.main' }}>{status}</Item>

            </div>
        )
    }

}

export default StatusCode
