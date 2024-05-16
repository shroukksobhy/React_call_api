import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ReactJson from 'react-json-view'

function Response({ response }) {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <div>
            <Item>
                <ReactJson src={response} />
            </Item>


        </div>
    )
}

export default Response
