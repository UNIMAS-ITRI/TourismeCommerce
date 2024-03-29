// react
import React, {useEffect, useState } from "react";
import { connect } from "react-redux";

// third-party
import PropTypes from "prop-types";
// application
import {Grid, Typography, Stack, Checkbox, Button, IconButton} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import _ from "lodash";
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function HotelModal(props) {
    // const {
    //   product,
    //   layout
    // } = props;

    const RoomImages = [
        {ImageID:0, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37434884.jpg'},
        {ImageID:1, ImageURL:'https://www.timing-design.com/food/ranee1.jpg'},
        {ImageID:2, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg'},
        {ImageID:3, ImageURL:'https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg'},
      ];

    const Facilities =[
        {
          AmenityID:0,
          AmenityName:'Bath/ Shower',
        },
        {
          AmenityID:1,
          AmenityName: 'Hairdryer',
        },
        {
          AmenityID:2,
          AmenityName:'Fan',
        },
        {
          AmenityID:3,
          AmenityName:'Towel',
        },
        {
          AmenityID:4,
          AmenityName:'Refrigerator',
        },
      ];

    const [showImage, setShowImage] = useState(RoomImages[0].ImageURL)
    const [index, setIndex] = useState(0)

    const change_ShowImage = (action) => {
        
       const idx = index + 1

        switch(action){
          case 'prev':
            setIndex(index - 1 )
            setShowImage(RoomImages[index - 1].ImageURL)
            break;
          case 'next':
           
            setIndex(index + 1 )
            if(idx < RoomImages.length){
              setShowImage(RoomImages[index + 1].ImageURL)
            }
            
            break;
          default:
            break;
        }
    }

    return (
      <Grid item container style={{ margin: "auto" }} elevation={2} spacing={2}>
        <Grid item xs={12} sm={8}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Grid
                item
                container
                spacing={0}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundImage: `url(${showImage})`,
                  height: "400px",
                  width: "100%",
                  backgroundSize: "cover",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sm={6}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  {index !== 0 && (
                    <IconButton
                      sx={{
                        position: "relative",
                        zIndex: 99,
                        marginTop: "auto",
                        marginBottom: "auto",
                        backgroundColor: "rgb(242, 242, 242,0.7)",
                        marginLeft: "2%",
                      }}
                      onClick={() => change_ShowImage("prev")}
                    >
                      <ChevronLeftIcon fontSize="small" />
                    </IconButton>
                  )}
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  {index !== RoomImages.length - 1 && (
                    <IconButton
                      sx={{
                        position: "relative",
                        zIndex: 99,
                        marginTop: "auto",
                        marginBottom: "auto",
                        backgroundColor: "rgb(242, 242, 242,0.7)",
                        marginRight: "2%",
                      }}
                      onClick={() => change_ShowImage("next")}
                    >
                      <ChevronRightIcon fontSize="small" />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid item container spacing={1}>
                {props.selectedRoom.RoomImages.map((fac, i) => (
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    onClick={() => [setShowImage(fac.ImageURL), setIndex(i)]}
                  >
                    <img
                      src={fac.ImageURL}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        border: index === i ? "4px solid green" : "none",
                        opacity: index === i ? "50%" : "100%",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* <Typography variant="h5">{props.selectedRoom.RoomName}</Typography> */}
          <h4 style={{ color: "#4682B4", fontWeight: "bold" }}>
            {props.selectedRoom.RoomName}
          </h4>
          <Grid item container spacing={2} style={{ marginTop: "2%" }}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Facilities</Typography>
              <Grid item container>
                {props.selectedRoom.Facilities.map((fac) => (
                  <Grid item xs={4} sm={4}>
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{
                        marginTop: "2%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CheckIcon fontSize="small" style={{ color: "green" }} />
                      <Typography variant="body2">{fac.AmenityName}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Capacity</Typography>

              <Stack
                direction="row"
                spacing={2}
                style={{ alignItems: "center" }}
              >
                <Typography>{props.selectedRoom.Bed[0].BedCat_Name}</Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  style={{ alignItems: "center" }}
                >
                  {_.times(props.selectedRoom.Capacity, (i) => (
                    <PersonIcon
                      key={i}
                      style={{ color: "#ffa31a" }}
                      fontSize="small"
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Meals</Typography>
              <Stack direction="row" spacing={1}>
                {props.selectedRoom.Breakfast_Included === true ? (
                  <CheckIcon fontSize="small" style={{ color: "green" }} />
                ) : (
                  <CloseIcon fontSize="small" style={{ color: "red" }} />
                )}
                <Typography variant="body2" style={{ marginTop: "1px" }}>
                  {props.selectedRoom.Breakfast_Included === true
                    ? " Breakfast included"
                    : " No breakfast included"}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                style={{ alignItems: "center", marginTop: "2%" }}
              >
                <Button variant="contained" color="primary" size="small" style={{ padding: "5px", borderRadius: "10px" }}>
                  Add breakfast
                </Button>
                <Typography
                  variant="subtitle1"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                >
                  RM 15.90
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Rates</Typography>
              <Typography variant="caption">Starts from</Typography>
              <Stack
                direction="row"
                spacing={1}
                style={{
                  padding: "3%",
                  borderRadius: "2%",
                  backgroundColor: "rgb(255, 153, 0, 0.5)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">RM</Typography>
                <Typography variant="h4">{props.selectedRoom.Price}</Typography>
                <Typography variant="caption">per night</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} style={{ marginTop: "4%" }}>
              <Button variant="contained" color="success" fullWidth  style={{ padding: "5px", borderRadius: "10px" }}>
                Book Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  
  
  }
  
  HotelModal.propTypes = {
    /**
     * product object
     */
    product: PropTypes.object.isRequired,
    /**
     * product card layout
     * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
     */
    layout: PropTypes.oneOf([
      "grid-sm",
      "grid-nl",
      "grid-lg",
      "list",
      "horizontal",
    ]),
  };
  
  
  const mapStateToProps = (state) => ({
 
   
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
     
    }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(HotelModal);