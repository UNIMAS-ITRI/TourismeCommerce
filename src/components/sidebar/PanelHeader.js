// "user manual": You can set your footer here
import React from 'react'
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import "./PanelHeader.css";
// @mui/material
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Stack,
  Badge
} from '@mui/material';
import SearchBar from '../SearchBarNav';
import { headerDetail } from '../../pages/Place/_mock';

export default function PanelHeader(props) {
  const Page = [
    { name: "Home", url: "./", submenu: [] },
    { name: "Cities", url: "https://www.sarawak2discover.com/CityList.aspx", submenu: [] },
    { name: "Attractions", url: "https://www.sarawak2discover.com/MainPlaceOfInterest.aspx", submenu: [] },
    { name: "Local Food", url: "/FoodCategory", submenu: [] },
    { name: "Bioscape", url: "./", submenu: [{ name: "Biodiversity", url: "https://www.sarawak2discover.com/Biodiversity.aspx?bid=1" }, { name: "Landscape", url: "https://www.sarawak2discover.com/BiodiversityList.aspx?species=Landscape" }] },
    { name: "Heritage", url: "./", submenu: [{ name: "Old Kuching Smart Heritage", url: "https://www.sarawak2discover.com/Heritage.aspx?hid=-1" }, { name: "Old Kuching Heritage Buildings and Monuments", url: "https://www.sarawak2discover.com/Heritage.aspx?hid=15" }, { name: "Kampung Heritage", url: "https://www.sarawak2discover.com/Heritage.aspx?hid=16" }] },
    { name: "Event & Festivals", url: "https://www.sarawak2discover.com/EventList.aspx", submenu: [] },
    { name: "Useful Facts", url: "./", submenu: [{ name: "Custom & Immigration", url: "https://sarawaktourism.com/travelling-to-sarawak/" }, { name: "Regulations", url: "https://www.sarawak2discover.com/TouristInfo.aspx?factid=2" }, { name: "Telecommunications", url: "https://www.sarawak2discover.com/TouristInfo.aspx?factid=3" }, { name: "COVID-19 Guideline", url: "https://www.sarawak2discover.com/PandemicGuideline.aspx" }, { name: "Others", url: "https://www.sarawak2discover.com/TouristInfo.aspx?factid=0" }] }]

  const handleOnSearch = (searchTerm) => {
    console.log(searchTerm);
  }

  return (
    <header>
      <Box sx={{ backgroundColor: "#353736", padding: 2 }}>
        <Grid container>
          <Grid item xs={12} justifyContent='flex-end' alignItems='center' display='flex'>
            <Typography style={{ fontWeight: "500", color: "white", paddingRight: "20px" }}><a href="https://www.sarawak2discover.com/ContactUs.aspx"></a>Contact Us</Typography>
            <Typography style={{ paddingRight: "1vw" }}><PersonIcon style={{ fill: 'white' }} /></Typography>
            <Typography style={{ paddingRight: "1vw" }}><SearchIcon style={{ fill: 'white' }} /></Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "#8fb136" }} py={2} px={4}>
        <Grid container display='flex' direction='row' alignItems='center' justifyContent='space-between'>
          <Grid item>
            <img src='https://www.sarawaktourism.com/images/logo_w.png' alt="Sarawak tourism" />
          </Grid>
          <Grid item display='flex' direction='column'>
            <SearchBar onSearch={handleOnSearch} />
            <Stack direction='row' spacing={1} mt={0.5}>
              {headerDetail.map((item) => (
                <Button
                  key={item.index}
                  variant="text"
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#fff',
                    },
                  }}
                  component={Link}
                // to={item.url}
                >
                  {item.headerName}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid item>
            <Badge
              badgeContent={4}
              color="error"
            >
              <IconButton
                // onClick={() => console.log('cart')}
                component={Link}
                to='/ShoppingCart'
              >
                <ShoppingCartRoundedIcon sx={{ color: 'white' }} />
              </IconButton>
            </Badge>
          </Grid>
        </Grid>
      </Box>
    </header>
  )
}