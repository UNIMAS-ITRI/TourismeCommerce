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
import { useDispatch, useSelector } from 'react-redux';

export default function ProductCard(props) {


  const [open, setOpen] = useState(false);

  const [openTour, setOpenTour] = useState(false);

  const [quantity, setQuantity] = useState([0]);

  const dispatch = useDispatch();

  const handleChangeQuantity = (data, index) => {
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
    GeneralData.filter((y) => y.type === props.type).map((x) => {
      quantityArray.push(1)
    })
    setQuantity(quantityArray)

  }, [props.type]);

  const handleAddToCart = (data) => {
    const cartItem = localStorage.getItem("cartItem")
    if (cartItem !== null) {
      let itemDetail = JSON.parse(cartItem)
      let newItemArray = [...itemDetail, data]

      localStorage.setItem("cartItemLength", newItemArray.length)
      localStorage.setItem("cartItem", JSON.stringify(newItemArray))
    }
    else {
      localStorage.setItem("cartItemLength", 1)
      localStorage.setItem("cartItem", JSON.stringify([data]))
    }

    dispatch(GitAction.CallAddProductCart())
    setOpen(true);
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

  return (
    <div className="row">
      {
        GeneralData.filter((y) => y.type === props.type).map((x, index) => {
          return (
            <div class="CardView" className="col">
              <Card sx={{ minHeight: 350, boxShadow: "0.2vw 0.3vw 0.5vw #888888", }}
              // onClick={() => window.open(x.url, "_blank")}  
              >
                <CardMedia
                  component="img"
                  height="194"
                  image={x.imgURL}
                  alt={x.productName}
                />
                <CardContent>
                  <Typography color="text" style={{ fontWeight: "bold", textAlign: "left", }} >
                    {x.productName}
                  </Typography>
                  <Typography color="text" variant="body2" fontWeight="700" >
                    {x.subtitle}
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
                  <div className="col-12" style={{ height: "5.5vw", lineHeight: 1, overflowY: "auto" }}>
                    <Typography variant="caption">{x.description} </Typography>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
                        RM {x.price}
                      </Typography>
                    </div>
                    <div className="col-6">
                      <InputNumber
                        id="product-quantity"
                        aria-label="Quantity"
                        className="product__quantity"
                        size="md"
                        min={1}
                        value={quantity[index]}
                        onChange={(e) => handleChangeQuantity(e, index)}
                      />
                    </div>
                  </div>
                  <Grid mt={1} container display='flex' justifyContent='flex-end'>
                    <Button size="large" style={{ backgroundColor: "#8fb136", color: "white", width: "6vw", borderRadius: "0.3vw", padding: "0.25vw" }} onClick={() => handleOnClick(x)}>
                      Add To Cart
                    </Button>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          )
        })
      }

      <BasicModal open={open} />

      <ModalComponent
        open={openTour}
        maxWidth={"lg"}
        title={"Select Tour Guide"}
        className="modalLanding"
        handleOnClose={() => setOpenTour(false)}
      >
        <Grid container>
          <Grid item xs={12} display='flex' justifyContent='space-between' direction='row' alignItems='center'>
            <Grid container spacing={2}>
              {tourGuides.map((x) => (
                <Grid item xs={2}>
                  <TourGuideCard x={x} addToCart={handleAddTourGuide} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </ModalComponent>
    </div>
  )
}