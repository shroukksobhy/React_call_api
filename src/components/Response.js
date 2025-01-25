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
        borderRadius: 3,
        display: 'block',
        fontSize: 15,
        height: 'auto',
        margin: '7%',
        maxHeight: 400,
        maxWidth: '100vw',
        overflow: 'scroll',
        paddingBottom: 30,
        paddingTop: 30,

    }));
    return (
        <div>
            <Item>
                {/* <ReactJson src={response} /> */}
                <ReactJson
                    src={response}
                    collapsed={false}
                    displayDataTypes={false}
                    // theme="monokai"
                />
            </Item>


        </div>
    )
}

export default Response
