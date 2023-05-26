// "user manual": You can set your footer here
import React from 'react'
import Box from '@mui/material/Box';

// Icon for setting
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FaxIcon from '@mui/icons-material/Fax';

// Icon for social media
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Icon for download app
import androidApp from '../../assets/androidApp.png';
import appleApp from '../../assets/appleApp.png';
import AppleIcon from '@mui/icons-material/Apple';
import AdbIcon from '@mui/icons-material/Adb';

import "./PanelFooter.css";


export default function PanelFooter(props) {

    const setting = [
        { icon: <RoomIcon style={{ fill: 'white' }} />, value: " Level 4, Plaza Aurora, Jalan McDougall, 93000 Kuching, Sarawak." },
        { icon: <EmailIcon style={{ fill: 'white' }} />, value: " stb@sarawaktourism.com" },
        { icon: <LocalPhoneIcon style={{ fill: 'white' }} />, value: " +6082 423600" },
        { icon: <FaxIcon style={{ fill: 'white' }} />, value: " +6082 416700" }
    ]

    const DiscoverSarawak = [
        { url: "https://www.sarawaktourism.com/About.aspx", value: "About Sarawak" },
        { url: "https://www.sarawaktourism.com/About.aspx?#history", value: "History" },
        { url: "https://www.sarawaktourism.com/NewsList.aspx", value: "News" },
        { url: "https://www.sarawaktourism.com/Download.aspx", value: "Brochure" },
        { url: "https://www.sarawaktourism.com/SiaSitok.aspx", value: "Discover Sia Sitok" }
    ]

    const travelItinerary = [
        { url: "https://www.sarawaktourism.com/TourPackage.aspx", value: "Tour Packages" },
        { url: "./", value: "My Planner" },
    ]

    const socialMedia = [
        { icon: <FacebookIcon style={{ fill: 'white', fontSize: "30px" }} />, url: "https://www.facebook.com/visitsarawak" },
        { icon: <InstagramIcon style={{ fill: 'white', fontSize: "30px" }} />, url: "https://www.instagram.com/sarawaktravel/" },
        { icon: <TwitterIcon style={{ fill: 'white', fontSize: "30px" }} />, url: "https://twitter.com/SarawakTravel" },
        { icon: <YouTubeIcon style={{ fill: 'white', fontSize: "30px" }} />, url: "https://www.youtube.com/user/sarawaktourismbcm" }
    ]

    const app = [
        { icon: <AppleIcon style={{ fill: 'white' }} />, image: appleApp, value: "iOS" },
        { icon: <AdbIcon style={{ fill: 'white' }} />, image: androidApp, value: "Android" },
    ]

    const footerLogo = [
        { image: "https://www.sarawaktourism.com/images/swak.png", url: "https://mtcp.sarawak.gov.my/", alt: "swak" },
        { image: "https://www.sarawaktourism.com/images/sma.png", url: "https://www.sma.gov.my/", alt: "sma" },
        { image: "https://www.sarawaktourism.com/images/stb.png", url: "https://stb.sarawak.gov.my/", alt: "stb" },
        { image: "https://www.sarawaktourism.com/images/unimaslogo.png", url: "https://www.unimas.my/", alt: "unimas" },
    ]

    return (
        <footer>
            <Box sx={{ backgroundColor: "#6e6a61" }} >
                <div className='container-fluid'>
                    <div className="row justify-content-center" style={{ padding: "50px" }}>
                        <div className='col-md-12 col-lg-6 col-xl-6 col-sm-12 mx-auto' >
                            <div style={{ textAlign: "left", padding: '0 20px' }}>
                                <img src='https://www.sarawaktourism.com/images/logo_w.png' height="85px" width="280px" borderWidth="0px" alt="Logo" />
                                <h5 style={{ color: "white", paddingTop: "20px", letterSpacing: "1px" }}>Sarawak Tourism Board</h5>
                            </div>
                            <div style={{ padding: '0 20px' }}>
                                {
                                    setting.length > 0 && setting.map((x) => {
                                        return (
                                            <div className='d-flex justify-content-start'>
                                                {x.icon} &nbsp;
                                                <label class="footerLabel" style={{ paddingLeft: "10px", textAlign: 'left' }}>{x.value}</label>
                                                <br />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                <div className='d-flex justify-content-start'>
                                    {
                                        footerLogo.length > 0 && footerLogo.map((x) => {
                                            return (
                                                <a href={x.url} style={{ paddingRight: "30px" }}>
                                                    <img src={x.image} height="60px" borderWidth="0px" alt={x.alt} />
                                                </a>

                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 col-lg-3 col-xl-3 col-sm-12 mx-auto mb-md-0' style={{ textAlign: "left" }}>
                            <h6 class="footerTitle">Discover Sarawak</h6>
                            <hr class="footerBorder" />
                            <ul class="list-unstyled" style={{ float: "none" }}>
                                {
                                    DiscoverSarawak.length > 0 && DiscoverSarawak.map((x) => {
                                        return (
                                            <li><p class="footerLabel" style={{ margin: "5px" }}><a href={x.url} style={{ color: "white" }}>{x.value}</a></p></li>
                                        )
                                    })
                                }

                            </ul>

                            <h6 class="footerTitle">Travel Itinerary</h6>
                            <hr class="footerBorder" />
                            <ul class="list-unstyled" style={{ float: "none" }}>
                                {
                                    travelItinerary.length > 0 && travelItinerary.map((x) => {
                                        return (
                                            <li><p class="footerLabel" style={{ margin: "5px" }}><a href={x.url} style={{ color: "white" }}>{x.value}</a></p></li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                        <div className='col-md-12 col-lg-3 col-xl-3 col-sm-12 mx-auto mb-md-0' style={{ textAlign: "left" }}>
                            <h6 class="footerTitle">Follow Us</h6>
                            <hr class="footerBorder" />
                            <table>
                                <tr>
                                    {
                                        socialMedia.length > 0 && socialMedia.map((x) => {
                                            return (
                                                <td style={{ paddingRight: "50px" }}><a href={x.url}>{x.icon}</a></td>
                                            )
                                        })
                                    }
                                </tr>
                            </table>

                            <div style={{ paddingTop: "20px" }}>
                                <h6 class="footerTitle">Download Our Apps</h6>
                                <hr class="footerBorder" />
                                <div className="row">
                                    {
                                        app.length > 0 && app.map((x) => {
                                            return (
                                                <>
                                                    <div className='col-md-12 col-lg-6 col-xl-6 col-sm-12 mx-auto mb-md-0'>
                                                        <div style={{ textAlign: "center" }}>
                                                            <img src={x.image} height="130px" borderWidth="0px" alt={x.value} />
                                                        </div>
                                                        <div style={{ textAlign: "center", paddingTop: "5px" }}>
                                                            <label style={{ fontWeight: "500", color: "white" }}><a href={x.url}>{x.icon} {x.value}</a></label>
                                                        </div>

                                                    </div>
                                                </>

                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Box>
            <Box sx={{ backgroundColor: "#343a40", height: '80px' }} >
                <div style={{ textAlign: "center", paddingTop: "15px" }}>
                    <label class="footerText" >Copyright © 2022 Sarawak, More to Discover.</label><br />
                    <label class="footerText" >All rights Reserved. By Ministry of Tourism, Arts and Culture Sarawak (MTAC), Sarawak Multimedia Authority (SMA) & Sarawak Tourism Board (STB).</label>
                </div>
            </Box>

        </footer>
    )
}