import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";

import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@material-ui/lab/Rating";
import PageHeader from "../../tools/breadcrumb/breadcrumb";

import OperateHour from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Website from "@mui/icons-material/Language";
import Marker from "@mui/icons-material/Room";
import MapModule from "../../utils/Map/MapModule";
import StarIcon from "@mui/icons-material/Star";
import USER from "../../assets/user.png";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import { Viewer } from "photo-sphere-viewer";
// import { Pano } from 'react-vr';
// import ThreeSixty from 'react-360-view'
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import PanoramaViewer from "../../tools/PanoramaViewer";
import PanoramaPhoto from "../../tools/Panorama/PanoramaPhoto";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ThreeSixty from "react-360-view";

import Divider from "@mui/material/Divider";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Recommend from "../../components/Recomend";
import HotelModal from "./HotelModal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import {
  Grid,
  Typography,
  Stack,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { LinearProgress } from "@mui/material";
import "./HotelDetails.css";

function mapStateToProps(state) {
  return {
    // foods: state.counterReducer["foods"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // CallTesting: () => dispatch(GitAction.CallTesting()),
  };
}

const INITIAL_STATE = {
  swiperImg: [
    
    {
      image: "https://cf.bstatic.com/images/hotel/max1024x768/366/36635705.jpg",
    },
    
    {
      image: "https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg",
    },
    {
      image: "https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg",
    },
    {
      image:
        "https://pix8.agoda.net/hotelImages/615/615521/615521_15052808220027881002.jpg?ca=4&ce=1&s=1024x768",
    },
    {
      image:
        "https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg",
    },
    {
      image:
        "https://www.imperialhotelkuching.com.my/images/picture1/event.jpg",
    },
   
  ],

  breadcrumb: [
    { title: "Home", url: "./" },
    {
      title: "Hotel",
      url: "/Hotelsearch",
    },
    // {
    //   title: "Old Kuching Heritage Building and Monuments",
    //   url: "",
    // },
    { title: "Imperial Hotel Kuching", url: "" },
  ],
  indexImageHover: "",
  indexMediaHower: "",
  selectedMedia: "",
  selectedMediaDetails: [],
  mediaClick: "",
  mediaList: [],
  openModal: false,
  openHotelModal: false,
  selectedRoom: [],


};

class HotelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  showMedia = (name, data) => {
    let modalClick = (list) => {
      if (name === "3D Model")
        this.setState({ selectedMediaDetails: list, openModal: true });
      else this.setState({ selectedMedia: list.url });
    };

    let mediaList = (list, index) => {
      if (name === "Video") {
        return (
          <Card
            onClick={() => ""}
            style={{ boxShadow: "2px 3px 5px #888888", width: "fit-content" }}
          >
            <video key={index} width="500vw" controls>
              <source src={list.url} type="video/mp4" />
            </video>
            <CardContent>
              <Typography
                color="text"
                style={{ fontWeight: "bold", fontSize: "1vw" }}
              >
                {list.name}
              </Typography>
            </CardContent>
          </Card>
        );
      } else {
        return (
          <>
            <Card
              onClick={() => modalClick(list)}
              style={{
                boxShadow:
                  this.state.indexMediaHower === index
                    ? "5px 6px 7px #888888"
                    : "2px 3px 5px #888888",
                width: "15vw",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="250vw"
                width="100%"
                src={list.url}
                alt={list.description}
                onMouseOver={() => this.setState({ indexMediaHower: index })}
                onMouseOut={() => this.setState({ indexMediaHower: "" })}
              />
              <div class="overlay">
                <div class="CardViewLabel">{list.name}</div>
              </div>
            </Card>
          </>
        );
      }
    };

    if (name === "Street View" && this.state.openModal === false)
      this.setState({ selectedMediaDetails: data[0], openModal: true });

    let columns = [];
    data.length > 0 &&
      data.map((x, index) => {
        // push column
        columns.push(
          <>
            <div className="col" key={index}>
              {mediaList(x, index)}
            </div>
          </>
        );

        // force wrap to next row every specific columns
        if (name === "Video" ? (index + 1) % 3 === 0 : (index + 1) % 5 === 0) {
          columns.push(
            <div className="row" style={{ paddingTop: "1.5vw" }}>
              {" "}
            </div>
          );
        }
      });

    return (
      <div
        className="row"
        style={{ paddingTop: "1.5vw", justifyContent: "center" }}
      >
        {name === "Panorama/360° VR" && this.state.selectedMedia !== "" && (
          <div
            className="row  justify-content-center"
            style={{ padding: "1.5vw", width: "65vw" }}
          >
            <PanoramaViewer src={this.state.selectedMedia} />
          </div>
        )}
        <div className="row  justify-content-center">
          {name !== "Street View" && columns}
        </div>
      </div>
    );
  };

  render() {
    const benefit = [
      {
        image: "https://img.icons8.com/ios/50/40C057/airport-transfer.png",
        value: "Free airport transfer",
      },
      {
        image: "https://img.icons8.com/glyph-neue/64/40C057/wifi--v1.png",
        value: "Free Wi-Fi in all room",
      },
      {
        image: "https://img.icons8.com/ios-filled/50/40C057/lap-pool.png",
        value: "Outdoor Pool",
      },
      {
        image:
          "https://img.icons8.com/external-goofy-solid-kerismaker/96/40C057/external-Sauna-fitness-goofy-solid-kerismaker.png",
        value: "Steamroom",
      },
      {
        image:
          "https://img.icons8.com/external-others-bomsymbols-/91/40C057/external-cold-christmas-decoration-outline-others-bomsymbols-.png",
        value: "Air conditioning",
      },
    ];
    const HotelDetails = [
      {
        name: "Imperial Hotel Kuching",
        State: "Kuching",
        Email: "-",
        Website: "Website",
        Contact: "+60 - 82588999",
        OperateTime: "Open 24-hours",
        Rating: 5,
        Review: [
          {
            Name: "Charles",
            Rating: 5,
            Review: "The room really big and comfortable. Really love to stay. the swimming pool has indoor & outdoor, has playground for kids, there are restaurant as well. Really nice & beautiful hotel.",
            Date: "22/04/2022",
          },
          {
            Name: "Stanley",
            Rating: 5,
            Review: "This my 2nd stay while travel to kch. Staff are very friendly, environment very clean and nice! Room are big.",
            Date: "01/05/2022",
          },
          { Name: "Kendy", Rating: 5, Review: "Love this hotel so much! Huge building with nice interior, facilities & service. My room was very spacious & super clean. I highly recommend this hotel for a good stay 👍🏼", Date: "15/05/2022" },
        ],
        latitude: 1.51317,
        longitude: 110.3357,
        PlaceDesc:
          "Imperial Hotel Kuching, the latest addition to the fast expanding Imperial Group Hotels is a 4-star business class hotel, strategicallt located in the heart of Kuching, just 5 minutes drive from the Kuching International Airport and 10 minutes to the city's central business district. It sits on top of the Boulevard Shoppping Mall and is adjacent to the Imperial Suites",
      },
    ];

    const MediaList = [
      {
        image:
          "http://tourism.denoo.my/visitSarawak/images/web/icon_gallery.png",
        value: "Gallery",
        data: [
             {
            url: "https://pix8.agoda.net/hotelImages/615/615521/615521_15052808220027881002.jpg?ca=4&ce=1&s=1024x768",
            description:
            "Imperial Hotel Kuching",
            name: "Imperial Hotel Kuching",
          },
          {
            url: "https://pix8.agoda.net/hotelImages/615/615521/615521_15052808220027881034.jpg?ca=4&ce=1&s=1024x768",
            description:
            "Imperial Hotel Kuching",
            name: "Imperial Hotel Kuching",
          },
          {
            url: "https://pix8.agoda.net/hotelImages/615/615521/615521_15052808220027880988.jpg?ca=4&ce=1&s=1024x768",
            description:
            "Imperial Hotel Kuching",
            name: "Imperial Hotel Kuching",
          },
          {
            url: "https://pix8.agoda.net/hotelImages/615/615521/615521_15052808220027881080.jpg?ca=4&ce=1&s=1024x768",
            description:
            "Imperial Hotel Kuching",
            name: "Imperial Hotel Kuching",
          },
          {
            url: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/144242652.jpg?k=7ca1a4dd62991689d0238a892f821065a69effcb45cd885d4b3ee13ff0fc5d54&o=",
            description:
            "Imperial Hotel Kuching",
            name: "Imperial Hotel Kuching",
          },
        ],
      },
      {
        image: "http://tourism.denoo.my/visitSarawak/images/web/icon_video.png",
        value: "Video",
        data: [
          {
            id: 1,
            url: "http://tourism.denoo.my/TourismApi/images/place/487/media/Brooke_Memorial.mp4",
            name: "Brooke Memorial",
          },
          {
            id: 2,
            url: "http://tourism.denoo.my/TourismApi/images/place/487/media/Brooke_Memorial.mp4",
            name: "Brooke Memorial",
          },
          {
            id: 3,
            url: "http://tourism.denoo.my/TourismApi/images/place/487/media/Brooke_Memorial.mp4",
            name: "Brooke Memorial",
          },
          {
            id: 4,
            url: "http://tourism.denoo.my/TourismApi/images/place/487/media/Brooke_Memorial.mp4",
            name: "Brooke Memorial",
          },
        ],
      },
      {
        image: "https://tourism.denoo.my/visitSarawak/images/web/icon_vr.png",
        value: "Panorama/360° VR",
        data: [
          {
            url: "http://tourism.denoo.my/TourismAPI/images/place/487/360/487_360_photo01.jpg",
            name: "Brooke Memorial",
          },
          {
            url: "http://tourism.denoo.my/TourismAPI/images/place/487/360/487_360_photo02.jpg",
            name: "Brooke Memorial",
          },
          {
            url: "http://tourism.denoo.my/TourismAPI/images/place/487/360/487_360_photo03.jpg",
            name: "Brooke Memorial",
          },
          {
            url: "http://tourism.denoo.my/TourismAPI/images/place/487/360/487_360_photo04.jpg",
            name: "Brooke Memorial",
          },
        ],
      },
      {
        image:
          "https://tourism.denoo.my/visitSarawak/images/web/icon_street.png",
        value: "Street View",
        data: [
          {
            url: "http://tourism.denoo.my/StreetView/bm.htm",
            name: "Street View",
          },
        ],
      },
      {
        image: "http://tourism.denoo.my/visitSarawak/images/web/icon_3d.png",
        value: "3D Model",
        data: [
          {
            url: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider1.jpg",
            name: "Rajah Charles Brooke Memorial 3D Model",
          },
          {
            url: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider1.jpg",
            name: "Rajah Charles Brooke Memorial 3D Model",
          },
        ],
      },
    ];


    const RatingList = [
      { id: 5, value: 5 },
      { id: 4, value: 4 },
      { id: 3, value: 3 },
      { id: 2, value: 2 },
      { id: 1, value: 1 },
    ];

    const dummyHotelRoom_data = [
      {
        RoomID: 0,
        RoomName: "Standard Suite",
        Price: 280.0,
        HotelID: 0,
        Bed: [{ BedCategoryID: 0, BedCat_Name: "Queen Bed" }],
        RoomImages: [
          {
            ImageID: 0,
            ImageURL:
              "https://cf.bstatic.com/images/hotel/max1024x768/374/37434884.jpg",
          },
          {
            ImageID: 1,
            ImageURL: "https://www.timing-design.com/food/ranee1.jpg",
          },
          {
            ImageID: 2,
            ImageURL:
              "https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg",
          },
          {
            ImageID: 3,
            ImageURL:
              "https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg",
          },
        ],
        FreeCancellation_Stat: true,
        Advance_Pay: true,
        Breakfast_Included: false,
        AvailableRoom_Qty: 2,
        Facilities: [
          {
            AmenityID: 0,
            AmenityName: "Bath/ Shower",
          },
          {
            AmenityID: 1,
            AmenityName: "Hairdryer",
          },
          {
            AmenityID: 2,
            AmenityName: "Fan",
          },
          {
            AmenityID: 3,
            AmenityName: "Towel",
          },
          {
            AmenityID: 4,
            AmenityName: "Refrigerator",
          },
        ],
        PriceInclude: ["Free Wi-Fi", "Pay At Hotel", "Free Cancellation"],
        Capacity: 2,
      },

      {
        RoomID: 1,
        RoomName: "Deluxe Queen Suite",
        Price: 380.0,
        HotelID: 3,
        Bed: [{ BedCategoryID: 1, BedCat_Name: "King Bed" }],
        RoomImages: [
          {
            ImageID: 4,
            ImageURL:
              "https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg",
          },
          {
            ImageID: 5,
            ImageURL:
              "https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg",
          },
          {
            ImageID: 6,
            ImageURL:
              "https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg",
          },
          {
            ImageID: 7,
            ImageURL:
              "https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg",
          },
        ],
        FreeCancellation_Stat: true,
        Advance_Pay: true,
        Breakfast_Included: true,
        AvailableRoom_Qty: 2,
        Facilities: [
          {
            AmenityID: 0,
            AmenityName: "Bath/ Shower",
          },
          {
            AmenityID: 1,
            AmenityName: "Hairdryer",
          },
          {
            AmenityID: 2,
            AmenityName: "Fan",
          },
          {
            AmenityID: 3,
            AmenityName: "Towel",
          },
          {
            AmenityID: 4,
            AmenityName: "Refrigerator",
          },
          {
            AmenityID: 5,
            AmenityName: "Wardrobe",
          },
          {
            AmenityID: 6,
            AmenityName: "Bathtub",
          },
          {
            AmenityID: 7,
            AmenityName: "Coffee Maker",
          },
        ],
        PriceInclude: [
          "Free Wi-Fi",
          "Pay At Hotel",
          "Free Cancellation",
          "Breakfast for two",
        ],
        Capacity: 2,
      },
      {
        RoomID: 1,
        RoomName: "Executive King Suite",
        Price: 480.0,
        HotelID: 4,
        Bed: [{ BedCategoryID: 1, BedCat_Name: "King Bed" }],
        RoomImages: [
          {
            ImageID: 4,
            ImageURL:
              "https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg",
          },
          {
            ImageID: 5,
            ImageURL:
              "https://www.greatsmallhotels.com/photos/66157_the-ranee-boutique-suites_.jpg",
          },
          {
            ImageID: 6,
            ImageURL:
              "https://www.greatsmallhotels.com/photos/66158_the-ranee-boutique-suites_.jpg",
          },
          {
            ImageID: 7,
            ImageURL:
              "https://www.greatsmallhotels.com/photos/66159_the-ranee-boutique-suites_.jpg",
          },
        ],
        FreeCancellation_Stat: true,
        Advance_Pay: true,
        Breakfast_Included: true,
        AvailableRoom_Qty: 2,
        Facilities: [
          {
            AmenityID: 0,
            AmenityName: "Bath/ Shower",
          },
          {
            AmenityID: 1,
            AmenityName: "Hairdryer",
          },
          {
            AmenityID: 2,
            AmenityName: "Fan",
          },
          {
            AmenityID: 3,
            AmenityName: "Towel",
          },
          {
            AmenityID: 4,
            AmenityName: "Refrigerator",
          },
          {
            AmenityID: 5,
            AmenityName: "Wardrobe",
          },
          {
            AmenityID: 6,
            AmenityName: "Bathtub",
          },
          {
            AmenityID: 7,
            AmenityName: "Coffee Maker",
          },
        ],
        Capacity: 4,
        PriceInclude: [
          "Free Wi-Fi",
          "Pay At Hotel",
          "Free Cancellation",
          "Breakfast for four",
        ],
      },

    ];


    return (
      <div style={{ backgroundColor: "white" }}>
        <div
          style={{
            float: "left",
            marginTop: "0.75vw",
            marginLeft: "0.75vw",
            position: "relative",
          }}
        >
          <PageHeader breadcrumb={this.state.breadcrumb} />
        </div>
        <Swiper
          modules={[EffectFade, Pagination, Autoplay]}
          effect="fade"
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          height={250}
          width={300}
          autoplay={{ delay: 5000 }}
          pagination={{
            clickable: true,
          }}
          loop={true}
        >
          {this.state.swiperImg.map((el) => {
            return (
              <SwiperSlide zIndex={0}>
                <img src={el.image} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          className="row justify-content-center"
          style={{ padding: "2.5vw" }}
        >
          <div
            style={{
              fontsize: "1.185vw",
              textAlign: "justify",
              fontFamily: "Future Md BT",
            }}
          >
            <h1 style={{ fontSize: "2vw" }}>
              <span style={{ fontWeight: "bold" }}>{HotelDetails[0].name}</span>
            </h1>
            <span style={{ color: "#A4A2A2", fontSize: "1.2vw" }}>
              {HotelDetails[0].State}
            </span>
            <br />
            <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
              <Rating
                style={{ fontSize: "1.8rem" }}
                value={HotelDetails[0].Rating}
              />{" "}
              <label
                style={{
                  fontWeight: "bold",
                  paddingLeft: "0.5vw",
                  fontSize: "1.0vw",
                }}
              >
                {HotelDetails[0].Rating} ( 7799
                {/* {HotelDetails[0].Review.length} */} Review(s))
              </label>
            </span>
          </div>
          <div
            className="row justify-content-center"
            style={{ paddingTop: "1vw" }}
          >
            <div
              className="col-md-6 col-lg-6 col-xl-6 col-sm-12 mx-auto"
              style={{ borderRight: "1px solid #596a2a" }}
            >
              <ul class="list-unstyled" style={{ float: "none" }}>
                <li>
                  <p
                    style={{
                      color: "#596a2a",
                      letterSpacing: "0.1vw",
                      display: "block",
                    }}
                  >
                    <OperateHour
                      style={{ fill: "#596a2a", fontSize: "1.5vw" }}
                    />
                    <label
                      style={{
                        paddingLeft: "1vw",
                        fontWeight: "400",
                        fontFamily: "Futura Md BT",
                        fontSize: "1.12vw",
                        color: "black",
                      }}
                    >
                      {HotelDetails[0].OperateTime}
                    </label>{" "}
                  </p>
                </li>
                <li>
                  <p
                    style={{
                      color: "#596a2a",
                      letterSpacing: "0.1vw",
                      display: "block",
                    }}
                  >
                    <EmailIcon style={{ fill: "#596a2a", fontSize: "1.5vw" }} />
                    <label
                      style={{
                        paddingLeft: "1vw",
                        fontWeight: "400",
                        fontFamily: "Futura Md BT",
                        fontSize: "1.12vw",
                        color: "black",
                      }}
                    >
                      {" "}
                      {HotelDetails[0].Email}
                    </label>
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 mx-auto">
              <ul class="list-unstyled" style={{ float: "none" }}>
                <li>
                  <p
                    style={{
                      color: "#596a2a",
                      letterSpacing: "0.1vw",
                      display: "block",
                    }}
                  >
                    <LocalPhoneIcon
                      style={{ fill: "#596a2a", fontSize: "1.5vw" }}
                    />{" "}
                    <label
                      style={{
                        paddingLeft: "1vw",
                        fontFamily: "Futura Md BT",
                        fontSize: "1.12vw",
                        fontWeight: "400",
                        color: "black",
                      }}
                    >
                      {HotelDetails[0].Contact}
                    </label>
                  </p>
                </li>
                <li>
                  <p
                    style={{
                      color: "#596a2a",
                      letterSpacing: "0.1vw",
                      display: "block",
                    }}
                  >
                    <Website style={{ fill: "#596a2a", fontSize: "1.5vw" }} />{" "}
                    <label
                      style={{
                        paddingLeft: "1vw",
                        fontWeight: "400",
                        fontFamily: "Futura Md BT",
                        fontSize: "1.12vw",
                        color: "black",
                      }}
                    >
                      {HotelDetails[0].Website}
                    </label>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ paddingTop: "2.5vw" }}>
            <span
              style={{
                fontWeight: "500",
                fontSize: "1.185vw",
                fontFamily: "Futura Md BT",
                textAlign: "justify",
                color: "black",
              }}
            >
              {HotelDetails[0].PlaceDesc}
            </span>
          </div>

     

          <div style={{ paddingTop: "50px" }}>
            <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
              <Marker style={{ fill: "#596a2a", fontSize: "2.8vw" }} />{" "}
              <h2
                style={{
                  color: "#596a2a",
                  paddingTop: "0.5vw",
                  paddingLeft: "1vw",
                }}
              >
                Location Map
              </h2>
            </span>
            <div style={{ paddingTop: "20px" }}>
              <MapModule
                coordinate={{
                  address: HotelDetails[0].name,
                  lat: HotelDetails[0].latitude,
                  lng: HotelDetails[0].longitude,
                }}
                showMarker={true}
                height={500}
              />
            </div>
          </div>

          <div style={{ paddingTop: "50px" }}>
            <Card
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
            >
              <CardContent>
                <h3>Property highlight</h3>
                <Divider />
                <div className="row" style={{ paddingTop: "10px" }}>
                  <div
                    className="col"
                    style={{ borderRight: "1px solid #A4A2A2" }}
                  >
                    <div className="row" style={{ paddingTop: "10px" }}>
                      <div className="col-1">
                        <img
                          width="60"
                          height="60"
                          src="https://img.icons8.com/pastel-glyph/64/40C057/plus-shield--v2.png"
                          alt="plus-shield--v2"
                        />
                      </div>
                      <div className="col-11">
                        <h4>Hygience Plus</h4>
                        <span style={{ color: "#A4A2A2", fontSize: "1.2vw" }}>
                          This property has self-selected and self-certified the
                          hygience measures
                        </span>
                        <br />
                        <span style={{ color: "#6699CC", fontSize: "1.2vw" }}>
                          Learn more
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="row" style={{ paddingTop: "10px" }}>
                      <div className="col-1">
                        <img
                          width="60"
                          height="60"
                          src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/40C057/external-Verified-phishing-smashingstocks-detailed-outline-smashing-stocks-2.png"
                          alt="external-Verified-phishing-smashingstocks-detailed-outline-smashing-stocks-2"
                        />
                      </div>
                      <div className="col-11">
                        <h4>Free Cancellation Available</h4>
                        <span style={{ color: "#A4A2A2", fontSize: "1.2vw" }}>
                          Free cancellation 1 week before stay
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div style={{ paddingTop: "50px" }}>
            <Card
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
            >
              <CardContent>
                <h3>Hygience Plus</h3>
                <h5>
                  {" "}
                  This property has self-selected and self-certified the
                  following hygience measures{" "}
                </h5>
                <Divider />
                <div className="row" style={{ paddingTop: "20px" }}>
                  <div className="col-4">
                    <Card>
                      <CardContent>
                        <div className="row">
                          <div className="col-2">
                            <img
                              width="60"
                              height="60"
                              src="https://img.icons8.com/pastel-glyph/64/40C057/security-checked--v1.png"
                              alt="security-checked--v1"
                            />
                          </div>
                          <div className="col-10">
                            <h4>Safety Features</h4>
                            <span
                              style={{ color: "#A4A2A2", fontSize: "1.2vw" }}
                            >
                              <img
                                width="30"
                                height="30"
                                src="https://img.icons8.com/sf-black/64/40C057/checkmark.png"
                                alt="checkmark"
                              />{" "}
                              Staff trained in safety protocol
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col-4">
                    <Card>
                      <CardContent>
                        <div className="row">
                          <div className="col-2">
                            <img
                              width="60"
                              height="60"
                              src="https://img.icons8.com/external-line-lima-studio/64/40C057/external-bottle-pharmacy-line-lima-studio-2.png"
                              alt="external-bottle-pharmacy-line-lima-studio-2"
                            />
                          </div>
                          <div className="col-10">
                            <h4>Preventitative Equipment</h4>
                            <span
                              style={{ color: "#A4A2A2", fontSize: "1.2vw" }}
                            >
                              <img
                                width="30"
                                height="30"
                                src="https://img.icons8.com/sf-black/64/40C057/checkmark.png"
                                alt="checkmark"
                              />{" "}
                              Hard Sanitizer
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="col-4">
                    <Card>
                      <CardContent>
                        <div className="row">
                          <div className="col-2">
                            <img
                              width="50"
                              height="50"
                              src="https://img.icons8.com/ios-filled/50/F25081/heart-with-pulse--v1.png"
                              alt="heart-with-pulse--v1"
                            />
                          </div>
                          <div className="col-10">
                            <h4>Health and Medical</h4>
                            <span
                              style={{ color: "#A4A2A2", fontSize: "1.2vw" }}
                            >
                              <img
                                width="30"
                                height="30"
                                src="https://img.icons8.com/sf-black/64/40C057/checkmark.png"
                                alt="checkmark"
                              />{" "}
                              First aid kit
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div style={{ paddingTop: "50px" }}>
            <Card
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
            >
              <CardContent>
                <div
                  className="row"
                  style={{ paddingTop: "10px", textAlign: "center" }}
                >
                  {benefit.map((x) => {
                    return (
                      <div className="col">
                        <img
                          width="50"
                          height="50"
                          src={x.image}
                          alt={x.value}
                        />
                        <br />
                        <h4 style={{ paddingTop: "10px" }}>{x.value}</h4>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ---------------------------------------------------------------------------------------------- Room Selection ---------------------------------------------------------------------------------------------- */}
        <div
          className="row justify-content-center"
          style={{ padding: "2.5vw" }}
        >
          <div>
            <h3
              style={{
                color: "#596a2a",
              }}
            >
              Select your room
            </h3>
            <Divider />

            {dummyHotelRoom_data.map((room) => (
              <Card
                style={{
                  marginTop: "20px",
                  borderRadius: "20px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                }}
              >
                <CardContent>
                  <Grid item xs={12} sm={12}>
                    <Grid
                      item
                      container
                      spacing={2}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingTop: "10px",
                        // alignItems: "center",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        // style={{ paddingLeft: "2%", paddingRight: "2%" }}
                      >
                        <Grid
                          item
                          container
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Grid item xs={12} sm={12}>
                            <img
                              src={room.RoomImages[0].ImageURL}
                              alt={room.RoomImages[0].ImageID}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={3}
                        sx={{
                          borderRight: "1px solid #808080",
                          paddingTop: "10px",
                        }}
                      >
                        <h4 style={{ color: "#4682B4", fontWeight: "bold" }}>
                          {room.RoomName}
                        </h4>

                        <div style={{ paddingTop: "100px" }}>
                          <Typography
                            style={{ color: "#4682B4", fontWeight: "bold" }}
                          >
                            Capacity :{" "}
                            {_.times(room.Capacity, (i) => (
                              <PersonIcon
                                key={i}
                                style={{ color: "#ffa31a" }}
                                fontSize="small"
                              />
                            ))}
                          </Typography>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#F89880",
                              borderRadius: "10px",
                              marginTop: "20px",
                            }}
                          >
                            <RestaurantIcon
                              fontSize="small"
                              style={{ color: "white" }}
                            />
                            {room.Breakfast_Included === true
                              ? " Breakfast included"
                              : " No breakfast included"}
                          </Button>
                          <div className="row">
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#7fe8ba ",
                                borderRadius: "10px",
                                marginTop: "20px",
                                width: "fit-content",
                                marginLeft: "10px",
                              }}
                            >
                              STREAMING SERVICE
                            </Button>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#7fe8ba ",
                                borderRadius: "10px",
                                marginTop: "20px",
                                width: "fit-content",
                                marginLeft: "10px",
                              }}
                            >
                              SOUNDPROFING
                            </Button>
                          </div>
                        </div>
                      </Grid>

                      <Grid
                        item
                        xs={6}
                        sm={3}
                        sx={{
                          borderRight: "1px solid #808080",
                          paddingTop: "10px",
                        }}
                      >
                        <Stack direction="row" spacing={1}>
                          <h4 style={{ color: "#4682B4", fontWeight: "bold" }}>
                            Your price includes :
                          </h4>

                          {/* <Typography variant="h6" color="#288825">
                            MYR {room.Price}
                          </Typography> */}
                        </Stack>
                        {room.PriceInclude.map((data) => {
                          return (
                            <Stack direction="row" spacing={1}>
                              <span
                                style={{ color: "#A4A2A2", fontSize: "1.2vw" }}
                              >
                                <img
                                  width="30"
                                  height="30"
                                  src="https://img.icons8.com/sf-black/64/40C057/checkmark.png"
                                  alt="checkmark"
                                />{" "}
                                {data}
                              </span>
                            </Stack>
                          );
                        })}
                     
                      </Grid>

                      <Grid item xs={6} sm={3} sx={{ textAlign: "RIGHT" }}>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ display: "inline-flex" }}
                        >
                          <h4
                            style={{
                              color: "#4682B4",
                              fontWeight: "bold",
                              paddingTop: "5px",
                            }}
                          >
                            Excellent
                          </h4>
                          <div
                            style={{
                              backgroundColor: "#95b43c",
                              borderRadius: "50%",
                              width: "45px",
                              height: " 45px",
                              color: "white",
                              textAlign: "center",
                              display: "grid",
                              alignItems: "center",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            8.3
                          </div>
                          {/* <Button variant="contained" style={{backgroundColor: "#4682B4", borderRadius:"50px"}}>8.3</Button> */}
                        </Stack>
                        <br />
                        <div style={{ paddingTop: "130px" }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ display: "inline-flex" }}
                          >
                            <h2 style={{ color: "#4682B4" }}>RM</h2>
                            <h2 style={{ color: "red" }}>{room.Price}</h2>
                          </Stack>
                          <br />
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#95b43c",
                              fontSize: "23px",
                            }}
                            onClick={() =>
                              this.setState({
                                openHotelModal: true,
                                selectedRoom: room,
                              })
                            }
                          >
                            VIEW ROOM{" "}
                            <ArrowForwardIosIcon
                              style={{ marginLeft: "10px" }}
                            />
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* ---------------------------------------------------------------------------------------------- Rating Review ---------------------------------------------------------------------------------------------- */}

        <div
          className="row justify-content-center"
          style={{ padding: "2.5vw" }}
        >
          <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
            <StarIcon style={{ fill: "#596a2a", fontSize: "2.5vw" }} />{" "}
            <h2
              style={{
                color: "#596a2a",
                paddingTop: "0.5vw",
                fontWeight: "500",
                paddingLeft: "1vw",
              }}
            >
              Review (s)
            </h2>
          </span>
          <div
            className="row justify-content-center"
            style={{ paddingTop: "1vw" }}
          >
            <div
              className="col-md-3 col-lg-3 col-xl-3 col-sm-12 mx-auto"
              style={{ textAlign: "center" }}
            >
              <div>
                {" "}
                <label style={{ fontWeight: "bold", fontSize: "2vw" }}>
                  {HotelDetails[0].Rating}
                </label>
              </div>
              <div>
                {" "}
                <Rating
                  style={{ fontSize: "1.8vw" }}
                  value={HotelDetails[0].Rating}
                />
              </div>
              <div>
                {" "}
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "1.4vw",
                    color: "#808080",
                  }}
                >
                  {" "}
                  {/* {HotelDetails[0].Review.length}  */}
                  7799 Review(s)
                </label>
              </div>
            </div>
            <div className="col-md-9 col-lg-9 col-xl-9 col-sm-12 mx-auto">
              <table style={{ width: "-webkit-fill-available" }}>
                {RatingList.map((x) => {
                  return (
                    <tr style={{ paddingTop: "1vw" }}>
                      <td style={{ width: "5%" }}>
                        <label
                          style={{ fontWeight: "bold", fontSize: "0.9vw" }}
                        >
                          {x.value} star
                        </label>
                      </td>
                      <td style={{ width: "90%" }}>
                        {" "}
                        <LinearProgress
                          color="success"
                          style={{ color: "#596a2a", height: "1vw" }}
                          variant="determinate"
                          value={
                            (HotelDetails[0].Review.filter(
                              (y) => y.Rating === x.value
                            ).length /
                              HotelDetails[0].Review.length) *
                            100
                          }
                        />
                      </td>
                      <td style={{ width: "5%", paddingLeft: "0.5vw" }}>
                        <label
                          style={{ fontWeight: "bold", fontSize: "0.9vw" }}
                        >
                          {
                            HotelDetails[0].Review.filter(
                              (y) => y.Rating === x.value
                            ).length
                          }
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>

          <div
            className="row justify-content-center"
            style={{ paddingTop: "1vw" }}
          >
            <table style={{ width: "-webkit-fill-available" }}>
              {HotelDetails[0].Review.length > 0 &&
                HotelDetails[0].Review.map((x) => {
                  return (
                    <tr style={{ paddingTop: "1vw" }}>
                      <td style={{ width: "5%", textAlign: "right" }}>
                        {" "}
                        <img
                          width="50%"
                          src={USER ? USER : USER}
                          alt={123}
                          onError={(e) => (e.target.src = USER)}
                        />
                      </td>
                      <td style={{ width: "90%", padding: "20px" }}>
                        <div className="'col-md-10 col-lg-10 col-xl-10 col-sm-10'">
                          <div
                            id="review_content"
                            className=" review__content"
                            style={{ width: "100%", textAlign: "left" }}
                          >
                            <div
                              id="review_author"
                              className=" review__author"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.0vw",
                              }}
                            >
                              {x.Name}{" "}
                              <label
                                style={{
                                  fontSize: "0.7vw",
                                  color: "#c6c6c6",
                                  fontWeight: "500",
                                }}
                              >
                                ({x.Date})
                              </label>
                            </div>
                            <div id="review_rating" className=" review__rating">
                              <Rating
                                style={{ fontSize: "1.5rem" }}
                                value={x.Rating}
                              />
                            </div>
                            <div id="review_comment">
                              <label style={{ fontSize: "0.9vw" }}>
                                {x.Review}
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </div>
        <Recommend type="Accommodation" />   
        <ModalComponent
          open={this.state.openHotelModal}
          maxWidth={"lg"}
          title={this.state.mediaClick}
          draggable={true}
          className="modalLanding"
          handleOnClose={() =>
            this.setState({ openHotelModal: false, selectedRoom: [] })
          }
        >
          <div>
            <Grid item container style={{ padding: "2%" }}>
              {this.state.selectedRoom.length !== 0 && (
                <HotelModal selectedRoom={this.state.selectedRoom} />
              )}
            </Grid>
          </div>
        </ModalComponent>

        <ModalComponent
          open={this.state.openModal}
          fullScreen={true}
          maxWidth={"xl"}
          title={this.state.mediaClick}
          draggable={true}
          className="modalLanding"
          handleOnClose={() =>
            this.setState({ openModal: false, mediaClick: "" })
          }
        >
          <div>
            <iframe
              src={this.state.selectedMediaDetails.url}
              style={{ width: "100%", height: "45vw" }}
            />
          </div>
        </ModalComponent>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetails);
