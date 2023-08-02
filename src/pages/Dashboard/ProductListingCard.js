import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Rating, Button, TextField, Grid, Stack } from '@mui/material';
import OrangUlu from '../../assets/OrangUlu.jpg'
import BasicModal from '../../components/AlertModal/ModalAddedCart';
import GeneralData from "../../_mock/GeneralData";
import InputNumber from "../../components/InputNumber/InputNumber";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import TourGuideCard from "../Place/TourGuideCard";
import { tourGuides } from "../Place/_mock/tourGuides";
import { useDispatch, useSelector } from "react-redux";
// Core modules imports are same as usual
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ProductListingCard(props) {

  const { productList, productCart } = useSelector(state => ({
    productCart: state.counterReducer.productCart,
    productList: state.counterReducer.productList,
  }));


  const [open, setOpen] = useState(false);

  const [openTour, setOpenTour] = useState(false);

  const [quantity, setQuantity] = useState([0]);

  const dispatch = useDispatch();

  const handleChangeQuantity = (data, index) => {

    console.log("dasdasdas", data)
    console.log("dasdasdas index", index)
    const Arr = [...quantity]
    Arr[index] = data
    setQuantity(Arr)
  };



  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);


  useEffect(() => {
    const quantityArray = []
    productList.map((x) => {
      quantityArray.push(1)
    })
    setQuantity(quantityArray)

  }, [productList]);

  
  console.log("productCart", productCart)
  const handleAddToCart = (data) => {
    console.log("datadata", data)
    let UserID = localStorage.getItem("UserID")
    if (UserID) {
      if (productCart.length > 0) {
        const filterData = []
        productCart.filter((x) => x.ProductID === data.ProductID).map((y) =>
          y.ProductVariation !== null && y.ProductVariation !== "[]" && filterData.push(JSON.parse(y.ProductVariation)[0])
        )
        if (filterData.length > 0)
          dispatch(GitAction.CallUpdateProductCartItem(filterData[0].UserCartID, Number(filterData[0].ProductQuantity)))
        else{
          const variationID = ""
          if(data.ProductVariation !== null && data.ProductVariation !== "[]")    
            variationID = JSON.parse(data.ProductVariation)[0].ProductVariationDetailID
          // dispatch(GitAction.CallAddProductCart(filterData[0].UserCartID, Number(filterData[0].ProductQuantity)))
        }
        
      }
      else {

      }
    }

    // const cartItem = localStorage.getItem("cartItem")
    // if (cartItem !== null) {
    //   let itemDetail = JSON.parse(cartItem)
    //   let newItemArray = [...itemDetail, data]

    //   localStorage.setItem("cartItemLength", newItemArray.length)
    //   localStorage.setItem("cartItem", JSON.stringify(newItemArray))
    // }
    // else {
    //   localStorage.setItem("cartItemLength", 1)
    //   localStorage.setItem("cartItem", JSON.stringify([data]))
    // }

    // dispatch(GitAction.CallAddProductCart())
    // setOpen(true);
  }

  const handleOnClick = (x) => {
    switch (x.type) {
      case "Tourpackage":
        console.log('hello')
        setOpenTour(true);
        break;

      default:
        handleAddToCart(x)
        break;
    }
  }

  const handleAddTourGuide = () => {
    handleAddToCart({ id: 1, productName: "Tour Guide", price: 100, quantity: 1 })
    setOpenTour(false);
  }

  console.log("productList", productList)

  return (
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
                      
                      <Card sx={{ minHeight: 420, margin:0.5,  paddingLeft: 1 , paddingRight: 1, boxShadow: "0.2vw 0.3vw 0.5vw #888888", }}>
                        
                        <CardContent>
                        <CardMedia
                          component="img"
                          style={{ height: "10vw", width: "10vw", opacity: 1 }}
                          image={x.ProductImage}
                          alt={x.ProductName}
                        /> 
                          <Typography color="text" style={{ fontWeight: "bold", textAlign: "left",  minHeight: "2.5vw", }} >
                            {x.ProductName}
                          </Typography>
                          {/* <Typography color="text" variant="body2" fontWeight="700" >
                            {x.Brand}
                          </Typography> */}

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
                          {/* <div className="col-12" style={{ height: "5.5vw", lineHeight: 1, overflowY: "auto" }}>
                            <Typography variant="caption">{x.description} </Typography>
                          </div> */}
                          <div className="row mt-3">
                            <div className="col-6">
                              <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
                                RM {
                                  x.ProductVariation !== null && x.ProductVariation !== "[]" ?
                                  (JSON.parse(x.ProductVariation)[0].ProductVariationPrice).toFixed(2) : (0).toFixed(2)
                                }
                              </Typography>
                            </div>
                            {/* <div className="col-6" >
                              <InputNumber
                                id="product-quantity1"
                                aria-label="Quantity"
                                className="product__quantity"
                                size="sm"
                                min={1}
                                // value={quantity[index]}
                                onChange={(e) => console.log("HIHIHHHI")}
                              />
                            </div> */}
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

    // <div className="row">
    //   {
    //     productList.map((x, index) => {
    //       return (
    //         <div class="CardView" className="col">
    //           <Card sx={{ minHeight: 350, boxShadow: "0.2vw 0.3vw 0.5vw #888888", }}
    //           // onClick={() => window.open(x.url, "_blank")}  
    //           >
    //             <CardMedia
    //               component="img"
    //               height="194"
    //               image={x.ProductImage}
    //               alt={x.ProductName}
    //             />
    //             <CardContent>
    //               <Typography color="text" style={{ fontWeight: "bold", textAlign: "left", }} >
    //                 {x.ProductName}
    //               </Typography>
    //               <Typography color="text" variant="body2" fontWeight="700" >
    //                 {x.Brand}
    //               </Typography>
    //               {
    //                 x.ProductVariation !== null && x.ProductVariation !== "[]" &&
    //                 <Typography color="text" variant="body2" fontWeight="700" >
    //                   {JSON.parse(x.ProductVariation)[0].ProductVariationValue}
    //                 </Typography>
    //               }
    //               <div className="row">
    //                 <div className="col-4">
    //                   <Rating
    //                     style={{ fontSize: "1.0rem" }}
    //                     value={x.ratingStar}
    //                   />{" "}
    //                 </div>
    //                 <div className="col-8">
    //                   <Typography variant="body2">{x.rating} ratings</Typography>
    //                 </div>
    //               </div>
    //               <div className="col-12" style={{ height: "5.5vw", lineHeight: 1, overflowY: "auto" }}>
    //                 <Typography variant="caption">{x.description} </Typography>
    //               </div>
    //               <div className="row mt-2">
    //                 <div className="col-6">
    //                   <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
    //                     RM {
    //                       x.ProductVariation !== null && x.ProductVariation !== "[]" &&
    //                       JSON.parse(x.ProductVariation)[0].ProductVariationPrice
    //                     }
    //                   </Typography>
    //                 </div>
    //                 <div className="col-6">
    //                   <InputNumber
    //                     id="product-quantity"
    //                     aria-label="Quantity"
    //                     className="product__quantity"
    //                     size="md"
    //                     min={1}
    //                     value={quantity[index]}
    //                     onChange={(e) => handleChangeQuantity(e, index)}
    //                   />
    //                 </div>
    //               </div>
    //               <Grid mt={1} container display='flex' justifyContent='flex-end'>
    //                 <Button size="large" style={{ backgroundColor: "#8fb136", color: "white", width: "6vw", borderRadius: "0.3vw", padding: "0.25vw" }} onClick={() => handleOnClick(x)}>
    //                   Add To Cart
    //                 </Button>
    //               </Grid>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       )
    //     })
    //   }


    // </div>
  )
}