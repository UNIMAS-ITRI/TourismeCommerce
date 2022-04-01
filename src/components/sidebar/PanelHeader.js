// "user manual": You can set your footer here
import React from 'react'
import reactLogo from '../../assets/logos/logo.svg';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";



export default function PanelHeader(props) {
    return (
        <header>
            {/* <div style={{height:"100px", width:"100%", backgroundColor:"black"}}></div> */}
            <Box sx={{ backgroundColor: "#353736", height: '90px', padding: "0.5vw 3vw" }} >
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10'>
                        <img src='https://www.sarawak2discover.com/images/logo_w.png' />
                    </div>
                    <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <Link className="nav-link" style={{ fontWeight: 'bold', color: "white", width: "6vw" }} to={{ pathname: "https://www.sarawak2discover.com/ContactUs.aspx" }} target="_blank"> Contact Us</Link>
                        {/* <div className='fa fa-user mr-3'>Login</div> */}
                        {/* <Typography variant="body1" style={{ fontWeight: 'bold', color: "white" }}></Typography> */}
                    </div>
                </div>
            </Box>
            {/* <h1>
                <img width={80} src={reactLogo} alt="react logo" /> Template
            </h1> */}
        </header>
        // <div>

        // </div>
    )
}