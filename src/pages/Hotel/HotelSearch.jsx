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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GradeIcon from '@mui/icons-material/Grade';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { LinearProgress } from "@mui/material";
import "./HotelDetails.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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
      image:
        "https://www.greatsmallhotels.com/photos/66156_the-ranee-boutique-suites_.jpg",
    },
    {
      image:
        "https://www.imperialhotelkuching.com.my/images/picture1/event.jpg",
    },
    {
      image: "https://cf.bstatic.com/images/hotel/max1024x768/366/36635705.jpg",
    },
    {
      image: "https://cf.bstatic.com/images/hotel/max1024x768/374/37425110.jpg",
    },
    {
      image: "https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg",
    },
    // {
    //   image:
    //     "https://cf.bstatic.com/images/hotel/max1024x768/374/37427954.jpg",
    // },
  ],

  breadcrumb: [
    { title: "Home", url: "./" },
    {
      title: "Hotel",
      url: "",
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

class HotelSearch extends Component {
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
    const categoriesType = [
      "Hotel",
      "Hostel",
      "Motel",
      "Resort",
      "Lodge",
      "Apartments",
      "Villa",
      "Homestay",
    ];
    const Division = [
      "Kuching",
      "Sibu",
      "Sri Aman",
      "Miri",
      "Limbang",
      "Sarikei",
      "Kapit",
      "Bintulu",
      "Samarahan",
      "Mukah",
      "Betong",
      "Serian",
    ];

    const rating = [
      {rate : 5, value : " "},
      {rate : 4, value :" & above"},
      {rate : 3, value :" & above"},
      {rate : 2, value :" & above"},
      {rate : 1, value :" & above"},
      // {rate : 0, value :" - No Ratings"},
    ]

    const sortingOption = [
      { value: 'latest', label: 'Latest' },
      { value: 'top-sales', label: 'Top Sales' },
      { value: 'low-to-high', label: 'Price Low to High' },
      { value: 'high-to-low', label: 'Price High to Low' }
  ]

    const recommend = [
      {
        image:
          "https://pix8.agoda.net/hotelImages/615/615521/615521_15052808220027881002.jpg?ca=4&ce=1&s=1024x768",
        url: "/hoteldetail",
        name: "Imperial Hotel Kuching",
        price: "216",
        discountedPrice: "183",
        rating: 8.5,
        Breakfast_Available: true,
        hotelStar: 5,
        locationWise: 8.5,
        Neighborhood: "Kuching",
        reviewNum: 4557,
        review: "Excellent",
      },
      {
        image:
          "data:image/jpeg;base64,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",
        url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=493&plat=1.560269000000000&plng=110.345553000000000",
        name: "Hilton Kuching Hotel",
        price: "603",
        discountedPrice: "423",
        rating: 8.5,
        Breakfast_Available: true,
        hotelStar: 5,
        locationWise: 8.8,
        Neighborhood: "Kuching",
        reviewNum: 1809,
        review: "Excellent",
      },
      {
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/b0/4c/ee/hotel-exterior.jpg?w=700&h=-1&s=1",
        url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=488&plat=1.559240000000000&plng=110.344550000000000",
        name: "Grand Magherita ",
        price: "529",
        discountedPrice: "291",
        rating: 8.8,
        Breakfast_Available: true,
        hotelStar: 4,
        locationWise: 8.5,
        Neighborhood: "Kuching",
        reviewNum: 3577,
        review: "Excellent",
      },
      {
        image:
          "data:image/jpeg;base64,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",
        url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=2745&plat=1.559292000000000&plng=110.346161000000000",
        name: "Pullman Hotel",
        discountedPrice: "253",
        price: "507",
        rating: 7.8,
        Breakfast_Available: true,
        hotelStar: 4,
        locationWise: 8.5,
        Neighborhood: "Kuching",
        reviewNum: 2209,
        review: "Very Good",
      },
      {
        image:
          "https://www.newpages.com.my/attachments/product/726290/product2563970.jpg",
        url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=74&plat=1.558715000000000&plng=110.344500000000000",
        name: "The Waterfront Hotel ",
        price: "479",
        discountedPrice: "343",
        rating: 8.5,
        Breakfast_Available: true,
        hotelStar: 5,
        locationWise: 8.7,
        Neighborhood: "Kuching",
        reviewNum: 9074,
        review: "Excellent",
      },

      {
        image:
          "data:image/jpeg;base64,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",
        url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=496&plat=1.558591000000000&plng=110.344826000000000",
        name: "Raia Hotel & Convention Centre",
        price: "371",
        discountedPrice: "268",
        rating: 8.2,
        Breakfast_Available: true,
        hotelStar: 4,
        locationWise: 8.5,
        Neighborhood: "Kuching",
        reviewNum: 8872,
        review: "Excellent",
      },
      {
        image:
          "data:image/jpeg;base64,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",
        url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=496&plat=1.558591000000000&plng=110.344826000000000",
        name: "Merdeka Palace Hotel & Suites",
        price: "200",
        discountedPrice: "114",
        rating: 7.7,
        Breakfast_Available: true,
        hotelStar: 4,
        locationWise: 8.8,
        Neighborhood: "Kuching",
        reviewNum: 8644,
        review: "Very Good",
      },
      //   {
      //     image:
      //       "http://tourism.denoo.my/TourismApi/images/place/10/10_slider1.jpg",
      //     url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=10&plat=1.558551000000000&plng=110.345679000000000",
      //     name: "Mei Xin's Laksa, Lau Ya Keng Foodcourt",
      //   },
      //   {
      //     image:
      //       "http://tourism.denoo.my/TourismApi/images/place/179/179_slider1.jpg",
      //     url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=179&plat=1.559484000000000&plng=110.346528000000000",
      //     name: "Kuching Waterfront",
      //   },
      //   {
      //     image: "http://tourism.denoo.my/images/main.png",
      //     url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=3000&plat=1.559484000000000&plng=110.346528000000000",
      //     name: "Sarawak Regatta",
      //   },
    ];


    const handleFilterOption = (data) => {
      console.log("handleFilterOption", data);
    };

    return (
      <div style={{ backgroundColor: "white" }}>
        <div
          className="row justify-content-center"
          style={{ padding: "2.5vw" }}
        >
          <div className="col-lg-3 col-md-3 ">
            <div>
              <h4>
                {" "}
                <FormatListBulletedIcon /> All Categories
              </h4>
              <div className="row">
                {categoriesType.map((x) => {
                  return (
                    <div className="col-6">
                      <FormControlLabel control={<Checkbox />} label={x} />
                    </div>
                  );
                })}
              </div>
            </div>

            <Divider style={{ marginTop: "1.0vw", marginBottom: "1.0vw" }} />
            <div>
              <h4>
                {" "}
                <LocationOnIcon />
                Division
              </h4>
              <div className="row">
                {Division.map((x) => {
                  return (
                    <div className="col-6">
                      <FormControlLabel control={<Checkbox />} label={x} />
                    </div>
                  );
                })}
              </div>
            </div>

            <Divider style={{ marginTop: "1.0vw", marginBottom: "1.0vw" }} />
            <div>
              <h4>
                {" "}
                <AttachMoneyIcon />
                Price Range
              </h4>

              <div className="d-flex">
                <TextField
                  id="min-price"
                  className="mr-auto"
                  label="MIN"
                  variant="outlined"
                  size="small"
                  style={{ width: 180, height: 40, fontSize: "8pt" }}
                  onChange={(e) => this.handleFilterOption(e)}
                ></TextField>
                <span className="mx-2 my-auto"> - </span>
                <TextField
                  id="max-price"
                  className="ml-auto"
                  label="MAX"
                  variant="outlined"
                  size="small"
                  style={{ width: 180, height: 40, fontSize: "8pt" }}
                  onChange={(e) => this.handleFilterOption(e)}
                ></TextField>
              </div>
              <div className="d-flex" style={{ paddingTop: "15px" }}>
                <Button
                  variant="contained"
                  disableElevation
                  style={{
                    backgroundColor: "#596a2a",
                    color: "white",
                    width: "90%",
                  }}
                  onClick={() => this.handleFilterPriceButton()}
                >
                  {" "}
                  Filter Price
                </Button>
              </div>
            </div>

            <Divider style={{ marginTop: "1.0vw", marginBottom: "1.0vw" }} />

            <div>
              <h4>
                {" "}
                <GradeIcon />
                Ratings
              </h4>
              <div className="row">
                {rating.map((x) => {
                  return (
                    <div
                      id={"filter-" + x.rate + "-star"}
                      className="d-flex mb-2 rating-background"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => this.handleFilterOption(e)}
                    >
                      <Rating
                        name="read-only"
                        value={x.rate}
                        readOnly
                        size="medium"
                      />
                      <h5
                        id={"fllter-" + x.rate + "-stars"}
                        style={{ paddingLeft: "1.0vw" }}
                      >
                        {" "}
                        {x.value}
                      </h5>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-9 ">
            <div className="d-flex sorting-options-panel align-middle px-3 mb-2 ">
              <div className="flex-grow-1 d-flex my-auto">
                <h4 style={{ color: "#596a2a" }}> Accomodation</h4>
              </div>
              <div>
                <FormControl
                  variant="outlined"
                  style={{ width: 200, height: 40 }}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={value}
                    onChange={(x) => this.handleSorting(x)}
                    label="Sort By"
                    color="primary"
                  >
                    {sortingOption.map((options, index) => {
                      return (
                        <MenuItem value={options.value} key={index}>
                          {options.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="container">
              <div className="row" style={{ paddingTop: "1vw" }}>
                {recommend.length > 0 &&
                  recommend.map((x, index) => {
                    return (
                      <div
                        class="CardView"
                        className="col-3"
                        style={{ paddingBottom: "2.0vw" }}
                      >
                        <Card
                          onClick={() => window.open(x.url, "_blank")}
                          sx={{ minHeight: 300, maxHeight: 450 }}
                          style={{ boxShadow: "0.2vw 0.3vw 0.5vw #888888" }}
                        >
                          <CardMedia
                            component="img"
                            height="194"
                            image={x.image}
                            alt={x.name}
                            style={{
                              opacity:
                                this.state.indexImageHover === index
                                  ? "50%"
                                  : "100%",
                            }}
                            onMouseOver={() =>
                              this.setState({ indexImageHover: index })
                            }
                            onMouseOut={() =>
                              this.setState({ indexImageHover: "" })
                            }
                          />
                          <CardContent>
                            <Typography
                              color="text"
                              style={{
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                            >
                              {x.name}
                            </Typography>
                            <Rating
                              style={{ fontSize: "1.0rem" }}
                              value={x.hotelStar}
                            />{" "}
                            <Divider />
                            <div className="row" style={{ paddingTop: "10px" }}>
                              <div className="col-9">
                                <Typography
                                  style={{
                                    color: "#4682B4",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  {x.review}
                                </Typography>
                                <Typography
                                  style={{
                                    color: "grey",
                                    fontSize: "14px",
                                  }}
                                >
                                  {x.reviewNum} reviews
                                </Typography>
                              </div>
                              <div className="col-3">
                                <div
                                  style={{
                                    backgroundColor: "#95b43c",
                                    borderRadius: "50%",
                                    width: "38px",
                                    height: " 38px",
                                    color: "white",
                                    textAlign: "center",
                                    display: "grid",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  {x.rating}
                                </div>
                              </div>
                            </div>
                            <Divider />
                            <div
                              className="row"
                              style={{ paddingTop: "10px", textAlign: "right" }}
                            >
                              <div
                                className="col-6"
                                style={{ paddingTop: "5px" }}
                              >
                                <div
                                  style={{
                                    backgroundColor: "#ee595d",
                                    borderRadius: "5%",
                                    width: "90%",
                                    height: " 45px",
                                    color: "white",
                                    textAlign: "center",
                                    display: "grid",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  {parseInt(
                                    ((x.price - x.discountedPrice) / x.price) *
                                      100
                                  )}{" "}
                                  %
                                  <br />
                                  <label
                                    style={{
                                      fontSize: "11px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    OFF TODAY
                                  </label>
                                </div>
                              </div>
                              <div className="col-6">
                                <Typography
                                  style={{
                                    color: "grey",
                                    fontSize: "15px",
                                    textDecoration: "line-through",
                                  }}
                                >
                                  RM {x.price}
                                </Typography>
                                <Typography
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                  }}
                                >
                                  RM {x.discountedPrice}
                                </Typography>
                              </div>
                            </div>
                            <div className="row" style={{ padding: "10px" }}>
                              <Button
                                variant="container"
                                style={{
                                  backgroundColor: "#596a2a",
                                  color: "white",
                                }}
                                onClick={() =>
                                  (window.location.href = "/HotelDetail")
                                }
                              >
                                View Hotel
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearch);
