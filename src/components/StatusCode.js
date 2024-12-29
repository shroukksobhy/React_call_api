import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

function StatusCode({ status }) {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body1,
        padding: theme.spacing(1),
        textAlign: 'center',
    }));

    let color;
    let message;

    switch (status) {
        case 200:
            color = 'success.main';
            message = 'Success';
            break;
        case 201:
            color = 'success.main';
            message = 'Created';
            break;
        case 404:
            color = 'warning.main';
            message = 'Not Found';
            break;
        case 500:
            color = 'error.main';
            message = 'Server Error';
            break;
        default:
            color = 'info.main';
            message = 'Unknown Status';
    }

    return (
        <div>
            <Item sx={{ color }}>{status} - {message}</Item>
        </div>
    );
}

// PropTypes for type checking
StatusCode.propTypes = {
    status: PropTypes.number.isRequired,
};

export default StatusCode;