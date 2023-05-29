// "user manual": You can set your footer here
import React, { useEffect } from 'react'

import { useDispatch, useSelector  } from 'react-redux';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import { GitAction } from '../../store/action/gitAction';

export default function PanelHeader(props) {
  
  const dispatch = useDispatch();
  const { productCart, productCartItem} = useSelector(state => ({
    productCart: state.counterReducer.productCart,
    productCartItem: state.counterReducer.productCartItem,
  }));

  const Page = [
    { name: "Home", url: "./", submenu: [] },
    { name: "Cities", url: "https://www.sarawaktourism.com/CityList.aspx", submenu: [] },
    { name: "Attractions", url: "https://www.sarawaktourism.com/MainPlaceOfInterest.aspx", submenu: [] },
    { name: "Local Food", url: "/FoodCategory", submenu: [] },
    { name: "Bioscape", url: "./", submenu: [{ name: "Biodiversity", url: "https://www.sarawaktourism.com/Biodiversity.aspx?bid=1" }, { name: "Landscape", url: "https://www.sarawaktourism.com/BiodiversityList.aspx?species=Landscape" }] },
    { name: "Heritage", url: "./", submenu: [{ name: "Old Kuching Smart Heritage", url: "https://www.sarawaktourism.com/Heritage.aspx?hid=-1" }, { name: "Old Kuching Heritage Buildings and Monuments", url: "https://www.sarawaktourism.com/Heritage.aspx?hid=15" }, { name: "Kampung Heritage", url: "https://www.sarawaktourism.com/Heritage.aspx?hid=16" }] },
    { name: "Event & Festivals", url: "https://www.sarawaktourism.com/EventList.aspx", submenu: [] },
    { name: "Useful Facts", url: "./", submenu: [{ name: "Custom & Immigration", url: "https://sarawaktourism.com/travelling-to-sarawak/" }, { name: "Regulations", url: "https://www.sarawaktourism.com/TouristInfo.aspx?factid=2" }, { name: "Telecommunications", url: "https://www.sarawaktourism.com/TouristInfo.aspx?factid=3" }, { name: "COVID-19 Guideline", url: "https://www.sarawaktourism.com/PandemicGuideline.aspx" }, { name: "Others", url: "https://www.sarawaktourism.com/TouristInfo.aspx?factid=0" }] }]

  const handleOnSearch = (searchTerm) => {
    console.log(searchTerm);
  }

  useEffect(() => {
    dispatch(GitAction.CallViewProductCart());
    dispatch(GitAction.CallViewProductCartItem());
}, [dispatch]);

  return (
    <header>
      <Box sx={{ backgroundColor: "#353736", padding: 1.5 }}>
        <Grid container>
          <Grid item xs={12} justifyContent='flex-end' alignItems='center' display='flex'>
            <Typography style={{ fontWeight: "500", color: "white", paddingRight: "20px" }}><a href="https://www.sarawaktourism.com/ContactUs.aspx"></a>Contact Us</Typography>
            <Typography style={{ paddingRight: "1vw" }}><PersonIcon style={{ fill: 'white' }} /></Typography>
            <Typography style={{ paddingRight: "1vw" }}><SearchIcon style={{ fill: 'white' }} /></Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: "#8fb136" }} py={1} px={4}>
        <Grid container display='flex' direction='row' alignItems='center' justifyContent='space-between'>
          <Grid item>
            <a href='/etourismmarketplace'>
              <img src='https://www.sarawaktourism.com/images/logo_w.png' alt="Sarawak tourism" />
            </a>
          </Grid>
          {/* <Grid item display='flex' direction='column'> */}
          <div>
            <SearchBar onSearch={handleOnSearch} />
            <Stack direction='row' spacing={1}>
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
                to={item.url}
                >
                  <Typography variant='subtitle2' color="white">{item.headerName}</Typography>
                </Button>
              ))}
            </Stack>
          </div>

          {/* </Grid> */}
          <Grid item>
            <IconButton component={Link} to='/ShoppingCart'>
              <Badge color="secondary" badgeContent={productCart!== null ? productCart : "0"}>
                <ShoppingCartIcon style={{ color: "white" }} fontSize="small" />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </header>
  )
}