// "user manual": You can set your footer here
import React from 'react'
import reactLogo from '../../assets/logos/logo.svg';
import Box from '@mui/material/Box';
export default function PanelHeader(props) {
    return (
        <header>
            {/* <div style={{height:"100px", width:"100%", backgroundColor:"black"}}></div> */}
            <Box sx={{  backgroundColor: "black", height: '50px' }} ></Box>
            {/* <h1>
                <img width={80} src={reactLogo} alt="react logo" /> Template
            </h1> */}
        </header>
        // <div>

        // </div>
    )
}