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
        case 503:
            color = 'error.main';
            message = 'Service Unavailable';
            break;
        case 400:
            color = 'error.main';
            message = 'Bad Request';
            break;
        case 401:
            color = 'error.main';
            message = 'Unauthorized';
            break;
        case 403:
            color = 'error.main';
            message = 'Forbidden';
            break;
        case 408:
            color = 'warning.main';
            message = 'Request Timeout';
            break;
        case 429:
            color = 'warning.main';
            message = 'Too Many Requests';
            break;
        case 422:
            color = 'error.main';
            message = 'Unprocessable Entity';
            break;
        case 304:
            color = 'info.main';
            message = 'Not Modified';
            break;
        case 100:
            color = 'info.main';
            message = 'Continue';
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