// "user manual": You can set your footer here
import React from 'react'
import reactLogo from '../../assets/logos/logo.svg';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PanelFooter from './PanelFooter';
import "./PanelHeader.css";


export default function PanelHeader(props) {

    const Page = [
        { name: "Home", url: "./", submenu: [] },
        { name: "Cities", url: "https://www.sarawak2discover.com/CityList.aspx", submenu: [] },
        { name: "Attractions", url: "https://www.sarawak2discover.com/MainPlaceOfInterest.aspx", submenu: [] },
        { name: "Local Food", url: "https://www.sarawak2discover.com/LocalFood.aspx", submenu: [] },
        { name: "Bioscape", url: "./", submenu: [{ name: "Biodiversity", url: "https://www.sarawak2discover.com/Biodiversity.aspx?bid=1" }, { name: "Landscape", url: "https://www.sarawak2discover.com/BiodiversityList.aspx?species=Landscape" }] },
        { name: "Heritage", url: "./", submenu: [{ name: "Old Kuching Smart Heritage", url: "https://www.sarawak2discover.com/Heritage.aspx?hid=-1" }, { name: "Old Kuching Heritage Buildings and Monuments", url: "https://www.sarawak2discover.com/Heritage.aspx?hid=15" }, { name: "Kampung Heritage", url: "https://www.sarawak2discover.com/Heritage.aspx?hid=16" }] },
        { name: "Event & Festivals", url: "https://www.sarawak2discover.com/EventList.aspx", submenu: [] },
        { name: "Useful Facts", url: "./", submenu: [{ name: "Custom & Immigration", url: "https://sarawaktourism.com/travelling-to-sarawak/" }, { name: "Regulations", url: "https://www.sarawak2discover.com/TouristInfo.aspx?factid=2" }, { name: "Telecommunications", url: "https://www.sarawak2discover.com/TouristInfo.aspx?factid=3" }, { name: "COVID-19 Guideline", url: "https://www.sarawak2discover.com/PandemicGuideline.aspx" }, { name: "Others", url: "https://www.sarawak2discover.com/TouristInfo.aspx?factid=0" }] }]

    return (
        <header>
            <Box sx={{ backgroundColor: "#353736", height: '90px', padding: "0.5vw 3.8vw" }} >
                <div className='row'>
                    <div className='col-10'>
                        <div className='col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10'>
                            <img src='https://www.sarawak2discover.com/images/logo_w.png' height="69px" width="222px" borderWidth="0px" alt="Logo" />
                        </div>
                    </div>
                    <div className='col-2' style={{ position: "absolute", top: "30px", right: "0px" }}>
                        <div style={{ display: "flex" }}>
                            <label style={{ fontWeight: "500", color: "white", paddingRight: "20px" }}><a href="https://www.sarawak2discover.com/ContactUs.aspx"></a>Contact Us</label>
                            <label style={{ paddingRight: "20px" }}><PersonIcon style={{ fill: 'white' }} /></label>
                            <label style={{ paddingRight: "20px" }}><SearchIcon style={{ fill: 'white' }} /></label>
                        </div>
                    </div>
                </div>
            </Box>
            <Box sx={{ backgroundColor: "#8fb136", height: '65px' }} >
                <div style={{ paddingLeft: "4%", paddingRight: "5%", paddingTop: "0.5%" }}>
                    <div class="navbar">
                        {
                            Page.map((item) => {

                                return (
                                    item.submenu.length > 0 ?
                                        <div class="navdropdown">
                                            <a class="navItem">{item.name} {item.submenu.length > 0 && <ArrowDropDownIcon />}</a>
                                            <div class="dropdown-content">
                                                {
                                                    item.submenu.length > 0 && item.submenu.map((subitem) => {
                                                        return (
                                                            <a href={subitem.url} class="navItem">{subitem.name}</a>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        :
                                        <div class="navwithoutdropdown">
                                            <a href={item.url} class="navItem">{item.name}</a>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>

            </Box>
        </header>
    )
}