// "user manual": You can set your footer here
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Drawer } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./PanelHeader.css";
import BasicModal from '../../components/AlertModal/ModalAddedCart';

// @mui/material
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Stack,
  Badge,
  Dialog,
  DialogContent,
  Alert,
  Snackbar
} from '@mui/material';
import SearchBar from '../SearchBarNav';
import { headerDetail } from '../../pages/Place/_mock';
import { GitAction } from '../../store/action/gitAction';

import LoginComponent from '../../pages/Login/LoginComponent'
import ShoppingCartDrawer from '../../pages/Payments/ShoppingCart/ShoppingCart_drawer';

export default function PanelHeader(props) {

  const dispatch = useDispatch();
  const { productCart, logonUser, productCartAction } = useSelector(state => ({
    productCart: state.counterReducer.productCart,
    logonUser: state.counterReducer.logonUser,
    productList: state.counterReducer.productList,
    productCartAction: state.counterReducer.productCartAction,
  }));


  // const userData = localStorage.getItem("user") !== undefined && localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : []
  const [openDialog, setOpenDialog] = useState(false);
  const [itemCartOpen, setItemCartOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState({  open: false, msg: "", type: ""  });
  // const [verificationError, setVerificationError] = useState(false);
  // const [productItem, setProductItem] = useState([]);

  const vertical = 'top'
  const horizontal = 'right'

  let UserID = localStorage.getItem("UserID")

  const [cartOpen, setCartOpen] = useState(false);
  // const Page = [
  //   { name: "Home", url: "./", submenu: [] },
  //   { name: "Cities", url: "https://www.sarawaktourism.com/CityList.aspx", submenu: [] },
  //   { name: "Attractions", url: "https://www.sarawaktourism.com/MainPlaceOfInterest.aspx", submenu: [] },
  //   { name: "Local Food", url: "/FoodCategory", submenu: [] },
  //   { name: "Bioscape", url: "./", submenu: [{ name: "Biodiversity", url: "https://www.sarawaktourism.com/Biodiversity.aspx?bid=1" }, { name: "Landscape", url: "https://www.sarawaktourism.com/BiodiversityList.aspx?species=Landscape" }] },
  //   { name: "Heritage", url: "./", submenu: [{ name: "Old Kuching Smart Heritage", url: "https://www.sarawaktourism.com/Heritage.aspx?hid=-1" }, { name: "Old Kuching Heritage Buildings and Monuments", url: "https://www.sarawaktourism.com/Heritage.aspx?hid=15" }, { name: "Kampung Heritage", url: "https://www.sarawaktourism.com/Heritage.aspx?hid=16" }] },
  //   { name: "Event & Festivals", url: "https://www.sarawaktourism.com/EventList.aspx", submenu: [] },
  //   { name: "Useful Facts", url: "./", submenu: [{ name: "Custom & Immigration", url: "https://sarawaktourism.com/travelling-to-sarawak/" }, { name: "Regulations", url: "https://www.sarawaktourism.com/TouristInfo.aspx?factid=2" }, { name: "Telecommunications", url: "https://www.sarawaktourism.com/TouristInfo.aspx?factid=3" }, { name: "COVID-19 Guideline", url: "https://www.sarawaktourism.com/PandemicGuideline.aspx" }, { name: "Others", url: "https://www.sarawaktourism.com/TouristInfo.aspx?factid=0" }] }]

  const handleOnSearch = (searchTerm) => {
    console.log(searchTerm);
  }

  useEffect(() => {
    dispatch(GitAction.CallViewProductCart());
    dispatch(GitAction.CallViewProductCartItem());

    dispatch(GitAction.CallViewProductListing({
      type: "Merchant",
      typeValue: 0,
      userId: 0,
      productPage: 999,
      page: 1,
      platformType: "myemporia"
    }))

  }, [dispatch]);

  useEffect(() => {
    if (UserID)
      dispatch(GitAction.CallViewProductCart({ userID: UserID }));
  }, [dispatch, UserID]);

  useEffect(() => {
    if (logonUser.length > 0) {
      if (logonUser[0].ReturnVal === 1) {
        dispatch(GitAction.CallResetLoginAction())
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user", logonUser[0].ReturnData);
        localStorage.setItem("UserID", JSON.parse(logonUser[0].ReturnData)[0].UserID);
        setOpenNotification({
          open: true,
          msg: "Login Successfully",
          type: "success"
        })
        handleCloseDialog()
      }
    }
  }, [dispatch, logonUser]);

  useEffect(() => {
    if (productCartAction.length > 0) {
      if (productCartAction[0].ReturnVal === 1) {
        dispatch(GitAction.CallViewProductCart({ userID: UserID }));
        dispatch(GitAction.CallResetProductCartAction());
        setItemCartOpen(true)
      }else
        setOpenNotification({
          open: true,
          msg: "Added to Cart",
          type: "success"
        })
      } else
        setOpenNotification({
          open: true,
          msg: "Error Add Cart Item",
          type: "error"
        })

    }
  , [dispatch, productCartAction, UserID]);

  useEffect(() => {
    if (itemCartOpen) {
      setTimeout(() => {
        setItemCartOpen(false);
      }, 3000);
    }
  }, [itemCartOpen]);


  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <header>
      <Box sx={{ backgroundColor: "#353736", padding: 1.5 }}>
        <Grid container>
          <Grid item xs={12} justifyContent='flex-end' alignItems='center' display='flex'>
            <Typography style={{ fontWeight: "500", color: "white", paddingRight: "20px" }}>
              <a href="https://www.sarawaktourism.com/ContactUs.aspx"></a>Contact Us
            </Typography>
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
          <Grid item>
            {
              UserID &&
              <IconButton onClick={() => {
                setCartOpen(true)
              }}>
                <Badge color="secondary" badgeContent={productCart.length === 0 ? "0" : productCart.length}>
                  <ShoppingCartIcon style={{ color: "white" }} fontSize="small" />
                </Badge>
              </IconButton>
            }

            <IconButton onClick={() => UserID ? setOpenDialog(true) : setOpenDialog(true)} >
              <PersonIcon style={{ color: "white" }} fontSize="small" />
            </IconButton>
          </Grid>

          <Dialog
            fullWidth
            maxWidth="sm"
            open={openDialog}
            onClose={() => setOpenDialog(false)}>
            <DialogContent sx={{ overflow: 'unset' }}>
              <LoginComponent />
            </DialogContent>
          </Dialog>


          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openNotification.open}
            autoHideDuration={1000}
            key={vertical + horizontal}
          >
            <Alert onClose={() => setOpenNotification({ open: false, msg: "", type: "" })} severity={openNotification.type} sx={{ width: '100%' }}>
              {openNotification.msg}
            </Alert>
          </Snackbar>

          <BasicModal open={itemCartOpen} />

        </Grid>
      </Box>
      <div >
        <Drawer
          PaperProps={{
            sx: { width: "380px" },
          }}
          anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
            <ShoppingCartDrawer history={"cart"} setCartOpen={setCartOpen} />
        </Drawer>
      </div>
    </header>
  )
}