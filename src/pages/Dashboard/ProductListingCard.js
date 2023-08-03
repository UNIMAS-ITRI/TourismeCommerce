import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { GitAction } from "../../store/action/gitAction";
import { Card, CardMedia, CardContent, Typography, Rating, Button, TextField, Grid, Stack,
  Dialog,
  DialogContent, } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
// Core modules imports are same as usual
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';

import LoginComponent from '../../pages/Login/LoginComponent'

export default function ProductListingCard(props) {

  const { productList, productCart, logonUser } = useSelector(state => ({
    productCart: state.counterReducer.productCart,
    productList: state.counterReducer.productList,
    logonUser: state.counterReducer.logonUser,
  }));

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [indexImageHover, setindexImageHover] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const UserID = localStorage.getItem("UserID")

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);


  useEffect(() => {
    if (logonUser.length > 0) {
      if (logonUser[0].ReturnVal === 1){
        setOpenDialog(false)
      }
    }
  }, [logonUser]);

  const handleAddToCart = (data) => {
    if (productCart.length > 0) {
      let variationID = ""

      if (data.ProductVariation !== null && data.ProductVariation !== "[]")
        variationID = JSON.parse(data.ProductVariation)[0].ProductVariationDetailID

      const filterData = productCart.filter((x) => x.ProductID === data.ProductID && x.ProductVariationDetailID === Number(variationID))
      if (filterData.length > 0)
        dispatch(GitAction.CallUpdateProductCart({
          userCartID: filterData[0].UserCartID,
          quantity: Number(filterData[0].ProductQuantity) + 1
        }))
      else {
        let variationID = ""
        if (variationID !== "") {
          dispatch(GitAction.CallAddProductCart({
            userID: UserID,
            productID: data.ProductID,
            quantity: 1,
            variationDetailID: variationID,
            promoCode: 0
          }))
        }
      }
    }
  }

  const handleOnClick = (x) => {
    if(UserID)    
    handleAddToCart(x)
    else
      setOpenDialog(true)
  }

  return (
    <>
     <Swiper
      modules={[Navigation]}
      slidesPerView={6}
      // slidesPerColumn={5}
      slidesPerColumnFill="column"
      navigation={true}
    >
      <div className="row">
        <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3" >
          {
            productList.map((x, index) => {
              return (
                <>
                  <SwiperSlide >
                    <div class="CardView" className="col">
                      
                      <Card sx={{ minHeight: 420, margin:0.5,  paddingLeft: 1 , paddingRight: 1, boxShadow: "0.2vw 0.3vw 0.5vw #888888", }} >
                        
                        <CardContent>
                        <CardMedia
                          component="img"
                          style={{ height: "10vw", width: "10vw", opacity: indexImageHover === index ? "50%" : "100%" }}
                          image={x.ProductImage}
                          alt={x.ProductName}    
                          onClick={() => history.push(`/ProductsDetail/${x.ProductID}`)}
                        /> 
                          <Typography color="text" style={{ fontWeight: "bold", textAlign: "left",  minHeight: "2.5vw", }} 
                          onClick={() => history.push(`/ProductsDetail/${x.ProductID}`)}>
                            {x.ProductName}
                          </Typography>

                          <Typography color="text" variant="body2" fontWeight="700" >
                            {x.ProductVariation !== null && x.ProductVariation !== "[]" &&
                              JSON.parse(x.ProductVariation)[0].ProductVariationValue
                            }
                          </Typography>
                        
                          <div className="row">
                            <div className="col-4">
                              <Rating
                                style={{ fontSize: "1.0rem" }}
                                value={x.ratingStar}
                              />{" "}
                            </div>
                            <div className="col-8">
                              <Typography variant="body2">{x.rating} ratings</Typography>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-6">
                              <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
                                RM {
                                  x.ProductVariation !== null && x.ProductVariation !== "[]" ?
                                  (JSON.parse(x.ProductVariation)[0].ProductVariationPrice).toFixed(2) : (0).toFixed(2)
                                }
                              </Typography>
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col-6" />
                            <div className="col-6" >
                              <Button size="large"
                                style={{ backgroundColor: x.ProductVariation === null || x.ProductVariation === "[]"  ? "grey" : "#8fb136", color: "white", width: "6vw", borderRadius: "0.3vw", padding: "0.25vw" , }}
                                disabled={x.ProductVariation === null || x.ProductVariation === "[]" && true}
                                onClick={() => handleOnClick(x)}>
                                Add To Cart
                              </Button>
                              {x.ProductVariation === null || x.ProductVariation === "[]" && <Typography color="red" variant="subtitle2">Not Available</Typography>}
                            </div>
                          </div>

                        </CardContent>
                      </Card>
                    </div>
                  </SwiperSlide>
                </>

              )
            })
          }
        </div>
      </div>
      
      </Swiper>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        onClose={() => setOpenDialog(false)}>
        <DialogContent sx={{ overflow: 'unset' }}>
          <LoginComponent  />
        </DialogContent>
      </Dialog>
    </>
  )
}