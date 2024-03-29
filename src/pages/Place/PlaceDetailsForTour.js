import React, { useEffect, useState } from "react";
import { Pagination, EffectFade, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from "@material-ui/lab/Rating";
import PageHeader from "../../tools/breadcrumb/breadcrumb";
import OperateHour from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Website from '@mui/icons-material/Language';
import Marker from '@mui/icons-material/Room';
import MapModule from '../../utils/Map/MapModule';
import StarIcon from '@mui/icons-material/Star';
import USER from "../../assets/user.png";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PanoramaViewer from "../../tools/PanoramaViewer";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import FullWidthTabs from "../../components/TabsComponent/Tabs";
import {
  LinearProgress,
  CardContent,
  CardMedia,
  Card,
  Typography,
  Button,
  Box,
  Grid,
  Stack,
  Divider, Chip, FormControl, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import "./PlaceDetails.css";
import ProductCard from "../Dashboard/ProductCard";
import TourGuideCard from "./TourGuideCard";
import { tourGuides, headerDetail } from "./_mock";
import { VerticalCardListing } from '../../components/verticalCardListing/verticalCardListing';
import InputNumber from "../../components/InputNumber/InputNumber";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function PlaceDetailsForTour() {

  const PlaceDetails = [
    {
      name: "Mulu National Park",
      State: "Miri",
      Email: "-",
      Website: "Website",
      Contact: "+6016-3101880",
      OperateTime: "9.00 a.m. - 4.45 p.m. (Monday - Friday); 10.00 a.m. - 4.00 p.m. (Saturday, Sunday and Public Holidays)",
      Rating: 5,
      Review: [
        { Name: "UAT Tester", Rating: 5, Review: "Nice Place", Date: "22/03/2022" },
        { Name: "riantysaimon19", Rating: 5, Review: "Beautiful", Date: "01/01/2022" },
        { Name: "Cccddd83", Rating: 5, Review: "wow", Date: "15/02/2022" },
      ],
      latitude: 4.0921,
      longitude: 114.8958,
      PlaceDesc: "The Gunung Mulu National Park is a national park in Miri Division, Sarawak, Malaysia. It is a UNESCO World Heritage Site that encompasses caves and karst formations in a mountainous equatorial rainforest settin."
    }
  ]

  const MediaList = [
    {
      image: "http://tourism.denoo.my/visitsarawak/images/web/icon_gallery.png", value: "Gallery", data:
        [
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery1.jpg", description: "First page of the monument showing the endorsement towards Rajah Charles Brooke.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery2.jpg", description: "Brooke Memorial with the Old Kuching Courthouse.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery3.jpg", description: "Brooke Memorial with the other famous attractions, such as The Square Tower and Darul Hana Bridge.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery4.jpg", description: "Brooke Memorial during daytime.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery5.jpg", description: "Brooke Memorial during nightime.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery6.jpg", description: "Kenyah Tribe’s hero.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery7.jpg", description: "Chinese Tribe’s hero.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery8.jpg", description: "Penan Tribe’s hero", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery9.jpg", description: "Malay Tribe’s hero.", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismApi/images/place/186/media/gallery10.jpg", description: "Portrait sculpture of Charles Brooke – Rajah Sarawak.", name: "Brooke Memorial" }
        ]
    },
    {
      image: "http://tourism.denoo.my/visitsarawak/images/web/icon_video.png", value: "Video", data:
        [
          { id: 1, url: "http://tourism.denoo.my/TourismApi/images/place/186/media/Brooke_Memorial.mp4", name: "Brooke Memorial" },
          { id: 2, url: "http://tourism.denoo.my/TourismApi/images/place/186/media/Brooke_Memorial.mp4", name: "Brooke Memorial" },
          { id: 3, url: "http://tourism.denoo.my/TourismApi/images/place/186/media/Brooke_Memorial.mp4", name: "Brooke Memorial" },
          { id: 4, url: "http://tourism.denoo.my/TourismApi/images/place/186/media/Brooke_Memorial.mp4", name: "Brooke Memorial" }
        ]
    },
    {
      image: "https://tourism.denoo.my/visitsarawak/images/web/icon_vr.png", value: "Panorama/360° VR", data:
        [
          { url: "http://tourism.denoo.my/TourismAPI/images/place/186/360/186_360_photo01.jpg", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismAPI/images/place/186/360/186_360_photo02.jpg", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismAPI/images/place/186/360/186_360_photo03.jpg", name: "Brooke Memorial" },
          { url: "http://tourism.denoo.my/TourismAPI/images/place/186/360/186_360_photo04.jpg", name: "Brooke Memorial" }
        ]
    },
    {
      image: "https://tourism.denoo.my/visitsarawak/images/web/icon_street.png", value: "Street View", data: [
        { url: "http://tourism.denoo.my/StreetView/bm.htm", name: "Street View" }
      ]
    },
    {
      image: "http://tourism.denoo.my/visitsarawak/images/web/icon_3d.png", value: "3D Model", data: [
        { url: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider1.jpg", name: "Rajah Charles Brooke Memorial 3D Model" },
        { url: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider1.jpg", name: "Rajah Charles Brooke Memorial 3D Model" }
      ]
    }
  ]

  const TicketListing = [
    {
      image: "https://sarawaktourism.com/TourismApi/images/place/186/186_slider1.jpg",
      name: "One Day Pass (Adult)",
      place: "Fort Margherita",
      price: "20",
      discountedPrice: "10",
      rating: 8.5,
      Breakfast_Available: true,
      hotelStar: 5,
      locationWise: 8.5,
      Neighborhood: "Kuching",
      reviewNum: 4557,
      review: "Excellent",
    },
    {
      image: "https://sarawaktourism.com/TourismApi/images/place/186/186_slider1.jpg",
      name: "One Day Pass (Kid)",
      place: "Fort Margherita",
      price: "10",
      discountedPrice: "5",
      rating: 8.5,
      Breakfast_Available: true,
      hotelStar: 5,
      locationWise: 8.5,
      Neighborhood: "Kuching",
      reviewNum: 4557,
      review: "Excellent",
    },
  ]
  const recommend = [
    { image: "http://tourism.denoo.my/TourismApi/images/place/493/493_slider1.jpg", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=493&plat=1.560269000000000&plng=110.345553000000000", name: "Square Tower" },
    { image: "http://tourism.denoo.my/TourismApi/images/place/488/488_slider1.jpg", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=488&plat=1.559240000000000&plng=110.344550000000000", name: "The Japanese Building" },
    { image: "http://tourism.denoo.my/TourismApi/images/place/2745/2745_slider1.jpg", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=2745&plat=1.559292000000000&plng=110.346161000000000", name: "Kuching Waterfront Lodge" },
    { image: "http://tourism.denoo.my/TourismApi/images/place/74/74_slider1.jpg", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=74&plat=1.558715000000000&plng=110.344500000000000", name: "The Waterfront Hotel Kuching" },

    { image: "http://tourism.denoo.my/TourismApi/images/place/496/496_slider1.jpg", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=496&plat=1.558591000000000&plng=110.344826000000000", name: "The Pavilion (Textile Museum)" },
    { image: "http://tourism.denoo.my/TourismApi/images/place/10/10_slider1.jpg", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=10&plat=1.558551000000000&plng=110.345679000000000", name: "Mei Xin's Laksa, Lau Ya Keng Foodcourt" },
    { image: "http://tourism.denoo.my/TourismApi/images/place/179/179_slider1.jpg", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=179&plat=1.559484000000000&plng=110.346528000000000", name: "Kuching Waterfront" },
    { image: "http://tourism.denoo.my/visitsarawak/images/main.png", url: "http://tourism.denoo.my/PlaceDetail.aspx?pid=3000&plat=1.559484000000000&plng=110.346528000000000", name: "Sarawak Regatta" }
  ]

  const RatingList = [{ id: 5, value: 5 }, { id: 4, value: 4 }, { id: 3, value: 3 }, { id: 2, value: 2 }, { id: 1, value: 1 }]

  const INITIAL_STATE = {
    swiperImg: [
      { image: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider4.jpg" },
      { image: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider1.jpg" },
      { image: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider2.jpg" },
      { image: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider3.jpg" },
      { image: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider4.jpg" },
      { image: "http://tourism.denoo.my/TourismApi/images/place/186/186_slider1.jpg" },
    ],
    breadcrumb: [
      { title: "Home", url: "./" },
      { title: "Tour Packages", url: "./Tourpackages" },
      { title: "Mulu National Park", url: "" }
    ],
    indexImageHover: "",
    indexMediaHower: "",
    selectedMedia: "",
    selectedMediaDetails: [],
    mediaClick: "",
    mediaList: [],
    openModal: false,
    isHireTourGuide: false,
  }

  const [state, setState] = useState(INITIAL_STATE)
  const [opencartModal, setOpencartModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const initialPriceData = {
    'Subtotal': 20,
    'Delivery fee': 10,
    'Container/Processing fee': 1,
    'including Service Tax': 6,
    'Total (Incl. Service Tax)': 37,
  };
  const [priceData, setPriceData] = useState(initialPriceData);
  const [numberOFItem, setnumberOFItem] = useState(1);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [options] = useState([
    { value: 'option1', label: '8am-10am' },
    { value: 'option2', label: '10am-12pm' },
    { value: 'option3', label: '2pm-4pm' },
    { value: 'option4', label: '4pm-6pm' },
  ]);

  const bodyDetail = [
    { index: 0, children: <ProductCard type="Accommodation" />, value: 0, },
    { index: 1, children: <ProductCard type="Restaurants" />, value: 1, },
    { index: 2, children: <ProductCard type="Tourpackage" />, value: 2, },
    { index: 3, children: <ProductCard type="Ticketing" />, value: 3, },
    { index: 4, children: <ProductCard type="Product" />, value: 4, },
    { index: 5, children: <ProductCard type="Transportation" />, value: 5, },
  ]

  const showMedia = (name, data) => {
    let modalClick = (list) => {
      if (name === "3D Model")
        setState(prevState => ({
          ...prevState,
          selectedMediaDetails: list,
          openModal: true
        }))
      else
        setState(prevState => ({
          ...prevState,
          selectedMedia: list.url
        }))
    }

    let mediaList = (list, index) => {
      if (name === "Video") {
        return (
          <Card onClick={() => ""} style={{ boxShadow: "2px 3px 5px #888888", width: "fit-content" }}>
            <video key={index} width="500vw" controls>
              <source src={list.url} type="video/mp4" />
            </video>
            <CardContent>
              <Typography color="text" style={{ fontWeight: "bold", fontSize: "1vw" }}>
                {list.name}
              </Typography>
            </CardContent>
          </Card>
        )
      } else {
        return (
          <Card onClick={() => modalClick(list)} style={{ boxShadow: state.indexMediaHower === index ? "5px 6px 7px #888888" : "2px 3px 5px #888888", width: "15vw", position: "relative" }} >
            <CardMedia
              component="img"
              height="250vw"
              width="100%"
              src={list.url}
              alt={list.description}
              onMouseOver={() => setState(prevState => ({ ...prevState, indexMediaHower: index }))}
              onMouseOut={() => setState(prevState => ({ ...prevState, indexMediaHower: "" }))}
            />
            <div class="overlay" >
              <div class="CardViewLabel">{list.name}</div>
            </div>
          </Card>
        )
      }
    }

    if (name === "Street View" && state.openModal === false)
      setState(prevState => ({
        ...prevState,
        selectedMediaDetails: data[0],
        openModal: true
      }))

    let columns = []
    data.length > 0 && data.map((x, index) => {
      // push column
      columns.push(
        <div className="col" key={index}>
          {mediaList(x, index)}
        </div>
      )

      // force wrap to next row every specific columns
      if (name === "Video" ? (index + 1) % 3 === 0 : (index + 1) % 5 === 0) {
        columns.push(
          <div className="row" style={{ paddingTop: "1.5vw" }}>  </div>
        )
      }
    })

    return (
      <div className="row" style={{ paddingTop: "1.5vw", justifyContent: "center" }}>
        {
          name === "Panorama/360° VR" && state.selectedMedia !== "" &&
          <div className="row  justify-content-center" style={{ padding: "1.5vw", width: "65vw" }}>
            <PanoramaViewer src={state.selectedMedia} />
          </div>
        }
        <div className="row  justify-content-center">
          {
            name !== "Street View" &&
            columns
          }
        </div>
      </div>
    )
  }

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const renderChoices = options.map((option) => (
    <FormControlLabel
      key={option.value}
      value={option.value}
      control={<Radio />}
      label={<Typography gutterBottom variant="subtitle" style={{ fontSize: '14px' }}>{option.label}</Typography>}
    />
  ));

  return (
    <div style={{ backgroundColor: "white" }}>
      <div style={{ float: "left", marginTop: "0.75vw", marginLeft: "0.75vw", position: "relative" }} >
        <PageHeader breadcrumb={state.breadcrumb} />
      </div>
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        effect="fade"
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        height={250}
        width={300}
        autoplay={{ delay: 5000, }}
        pagination={{
          clickable: true,
        }}
        loop={true}
      >
        {
          state.swiperImg.map((el) => {
            return <SwiperSlide zIndex={0}><img src={el.image} /></SwiperSlide>
          })
        }
      </Swiper>

      {/* ---------------------------------------------------------------------------------------------- Place Details ---------------------------------------------------------------------------------------------- */}

      <Grid container spacing={2} style={{ padding: "2.5vw" }}>
        <Grid item xs={12} display='flex' justifyContent='space-between' direction='row' alignItems='center'>
          <Typography variant="h4" style={{ fontWeight: "bold", fontSize: "2vw" }}>
            {PlaceDetails[0].name}
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#596a2a",
              padding: '0.5vw 1vw',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '0.5vw',
              boxShadow: '2px 3px 5px #888888',
            }}
            onClick={() =>
              setState(prevState => ({
                ...prevState,
                isHireTourGuide: !state.isHireTourGuide,
                openModal: true,
                mediaClick: 'Tour Guide',
              }))
            }
          >
            Hire a tour guide
          </Button>
        </Grid>
        <Grid item xs={12} display='flex' justifyContent='space-between' flexDirection='column' alignItems='flex-start'>
          <Typography variant="h6" style={{ fontWeight: "bold", fontSize: "1.2vw" }}>
            {PlaceDetails[0].State}
          </Typography>
          <Stack direction="row" spacing={1} alignItems='center'>
            <Rating style={{ fontSize: "1.8rem" }} value={PlaceDetails[0].Rating} />
            <Typography style={{ fontWeight: "bold", paddingLeft: "0.5vw", fontSize: "1.0vw" }}>{PlaceDetails[0].Rating} ( {PlaceDetails[0].Review.length} Review(s))</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} display='flex' justifyContent='flex-start' alignItems='c
              '>
              <OperateHour style={{ fill: '#596a2a', fontSize: "1.5vw" }} />
              <Typography style={{ paddingLeft: "1vw", fontWeight: "400", fontSize: "1.12vw", color: "black" }}>{PlaceDetails[0].OperateTime}</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='flex-start' alignItems='c
              '>
              <EmailIcon style={{ fill: '#596a2a', fontSize: "1.5vw" }} />
              <Typography style={{ paddingLeft: "1vw", fontWeight: "400", fontSize: "1.12vw", color: "black" }}> {PlaceDetails[0].Email}</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='flex-start' alignItems='c
              '>
              <LocalPhoneIcon style={{ fill: '#596a2a', fontSize: "1.5vw" }} />
              <Typography style={{ paddingLeft: "1vw", fontSize: "1.12vw", fontWeight: "400", color: "black" }}>{PlaceDetails[0].Contact}</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='flex-start' alignItems='c
              '>
              <Website style={{ fill: '#596a2a', fontSize: "1.5vw" }} />
              <Typography style={{ paddingLeft: "1vw", fontWeight: "400", fontSize: "1.12vw", color: "black" }}>{PlaceDetails[0].Website}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} justifyContent='space-between' flexDirection='row' alignItems='center'>
          <Typography variant="body" fontSize={18}>
            {PlaceDetails[0].PlaceDesc}
          </Typography>
        </Grid>
      </Grid>

      <div className="row justify-content-center" style={{ padding: "2.5vw" }}>
        <div className="row justify-content-center">
          <table>
            <tr>
              {
                MediaList.length > 0 && MediaList.map((x, index) => {
                  return (
                    <td
                      style={{
                        paddingRight: "2.5vw",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={x.image}
                        style={{ width: "70%", maxWidth: 200 }}
                        borderWidth="0px"
                        alt={x.value}
                        onClick={() =>
                          setState(prevState => ({
                            ...prevState,
                            mediaClick: x.value,
                            mediaList: x.data,
                            selectedMedia: ""
                          }))
                        }
                      />
                      <div style={{ paddingTop: "1vw" }}> <Typography style={{ fontWeight: "400", fontSize: "1.5vw", color: "black" }}>{x.value}</Typography></div>
                      {state.mediaClick === x.value && <hr style={{ height: "0.3vw", color: "#596a2a" }} />}
                    </td>
                  )
                })
              }
            </tr>
          </table>
          {state.mediaClick !== "" && showMedia(state.mediaClick, state.mediaList)}
        </div>

        <div style={{ marginTop: '1vw' }}>
          <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
            <ThumbUpIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.8vw", fontWeight: "500", paddingLeft: "1vw" }}>Ticket</h2>
          </span>
          <div className="row" style={{ paddingTop: "1vw" }}>
            <VerticalCardListing
              setSelectedItem={setSelectedItem}
              setOpenModal={setOpencartModal}
              cards={TicketListing.length > 0 ? TicketListing : TicketListing}
            />

          </div>
        </div>
        {/* ---------------------------------------------------------------------------------------------- Category ---------------------------------------------------------------------------------------------- */}
        <Grid container spacing={2} style={{ paddingTop: "2.5vw" }}>
          <Grid item xs={12} display='flex' justifyContent='space-between' direction='row' alignItems='center'>
            <FullWidthTabs settings={{ Headers: headerDetail.map((x) => x.headerName), Body: bodyDetail.map((x) => x.children) }} id="FullWidthTab" />
          </Grid>
        </Grid>

        {/* ---------------------------------------------------------------------------------------------- Location Map ---------------------------------------------------------------------------------------------- */}

        <div style={{ paddingTop: "50px" }}>
          <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
            <Marker style={{ fill: '#596a2a', fontSize: "2.8vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.5vw", paddingLeft: "1vw" }}>Location Map</h2>
          </span>
          <div style={{ paddingTop: "20px" }}>
            <MapModule
              coordinate={{ address: PlaceDetails[0].name, lat: PlaceDetails[0].latitude, lng: PlaceDetails[0].longitude }}
              showMarker={true}
              height={500}
            />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------------------------- Rating Review ---------------------------------------------------------------------------------------------- */}

      <div className="row justify-content-center" style={{ padding: "2.5vw" }}>
        <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
          <StarIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.5vw", fontWeight: "500", paddingLeft: "1vw" }}>Review (s)</h2>
        </span>
        <div className="row justify-content-center" style={{ paddingTop: "1vw" }}>
          <div className='col-md-3 col-lg-3 col-xl-3 col-sm-12 mx-auto' style={{ textAlign: "center" }}>
            <div>      <Typography style={{ fontWeight: "bold", fontSize: "2vw" }}>{PlaceDetails[0].Rating}</Typography></div>
            <div>      <Rating style={{ fontSize: "1.8vw" }} value={PlaceDetails[0].Rating} /></div>
            <div> <Typography style={{ fontWeight: "500", fontSize: "1.4vw", color: "#808080" }}> {PlaceDetails[0].Review.length} Rating(s)</Typography></div>
          </div>
          <div className='col-md-9 col-lg-9 col-xl-9 col-sm-12 mx-auto' >
            <table style={{ width: "-webkit-fill-available" }}>
              {
                RatingList.map((x) => {
                  return (
                    <tr style={{ paddingTop: "1vw" }}>
                      <td style={{ width: "5%" }}><Typography style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{x.value} star</Typography></td>
                      <td style={{ width: "90%" }}> <LinearProgress color="success" style={{ color: "#596a2a", height: "1vw" }} variant="determinate" value={PlaceDetails[0].Review.filter((y) => y.Rating === x.value).length / PlaceDetails[0].Review.length * 100} /></td>
                      <td style={{ width: "5%", paddingLeft: "0.5vw" }}><Typography style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{PlaceDetails[0].Review.filter((y) => y.Rating === x.value).length}</Typography></td>
                    </tr>
                  )
                })
              }
            </table>
          </div>
        </div>

        <div className="row justify-content-center" style={{ paddingTop: "1vw" }}>
          <table style={{ width: "-webkit-fill-available" }}>
            {
              PlaceDetails[0].Review.length > 0 && PlaceDetails[0].Review.map((x) => {
                return (
                  <tr style={{ paddingTop: "1vw" }}>
                    <td style={{ width: "5%", textAlign: "right" }}> <img width="50%" src={USER ? USER : USER} alt={123} onError={(e) => (e.target.src = USER)} /></td>
                    <td style={{ width: "90%", padding: "20px" }}>
                      <div className="'col-md-10 col-lg-10 col-xl-10 col-sm-10'">
                        <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
                          <div id="review_author" className=" review__author" style={{ fontWeight: "bold", fontSize: "1.0vw" }}>{x.Name} <Typography style={{ fontSize: "0.7vw", color: "#c6c6c6", fontWeight: "500" }}>({x.Date})</Typography></div>
                          <div id="review_rating" className=" review__rating">
                            <Rating style={{ fontSize: "1.2rem" }} value={x.Rating} />
                          </div>
                          <div id="review_comment"><Typography style={{ fontSize: "0.9vw" }}>{x.Review}</Typography></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>

      <div className="row justify-content-center" style={{ padding: "3vw" }}>
        <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
          <ThumbUpIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.8vw", fontWeight: "500", paddingLeft: "1vw" }}>You may also like</h2>
        </span>
        <div className="row" style={{ paddingTop: "1vw" }}>
          {
            recommend.length > 0 && recommend.map((x, index) => {
              return (
                <div class="CardView" className="col">
                  <Card onClick={() => window.open(x.url, "_blank")} sx={{ minHeight: 300, maxHeight: 350 }} style={{ boxShadow: "0.2vw 0.3vw 0.5vw #888888" }}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={x.image}
                      alt={x.name}
                      style={{ opacity: state.indexImageHover === index ? "50%" : "100%" }}
                      onMouseOver={() => setState(prevState => ({ ...prevState, indexImageHover: index }))}
                      onMouseOut={() => setState(prevState => ({ ...prevState, indexImageHover: "" }))}
                    />
                    <CardContent>
                      <Typography color="text" style={{ fontWeight: "bold", textAlign: "center" }}>
                        {x.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>

              )
            })
          }
        </div>
      </div>

      <ModalComponent
        open={state.openModal}
        fullScreen={state.isHireTourGuide ? false : true}
        maxWidth={"lg"}
        title={state.mediaClick}
        draggable={true}
        className="modalLanding"
        handleOnClose={() =>
          setState(prevState => ({
            ...prevState,
            openModal: false,
            mediaClick: "",
            isHireTourGuide: false
          }))
        }
      >
        {!state.isHireTourGuide ? (
          <iframe src={state.selectedMediaDetails.url} style={{ width: '100%', height: "45vw" }} />
        ) : (
          <Grid container>
            <Grid item xs={12} display='flex' justifyContent='space-between' direction='row' alignItems='center'>
              <Grid container spacing={2}>
                {tourGuides.map((x) => (
                  <Grid item xs={2}>
                    <TourGuideCard x={x} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </ModalComponent>
      <ModalComponent
        open={opencartModal}
        maxWidth={"sm"}
        title={selectedItem.name}
        draggable={false}
        className="modalLanding"
        handleOnClose={() => setOpencartModal(!opencartModal)}
      >
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6} container direction="column">
              <img src={selectedItem.image} style={{ width: "100%", maxWidth: 400 }} borderWidth="0px" alt={selectedItem.value} />
              <Divider style={{ margin: "1vw 0vw 1vw 0vw" }} variant="middle" >
                <Chip label="Fees" />
              </Divider>
              <Grid item container>
                {Object.entries(priceData).map(([label, value]) => (
                  <React.Fragment key={label}>
                    <Grid item xs={6} key={label}>
                      <Typography gutterBottom variant="h5" style={{ fontSize: '14px' }}>{label}</Typography>
                    </Grid>
                    <Grid item xs={6} key={label}>
                      <Typography gutterBottom variant="h5" style={{ fontSize: '14px', textAlign: 'right' }}>RM {value}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={6} container direction="column" flex={true}>
              <Grid item container>
                <Typography gutterBottom variant="title" style={{ fontSize: '14px' }}>
                  Select your Session
                </Typography>
              </Grid>
              <Grid item container>
                <Typography gutterBottom variant="subtitle" style={{ fontSize: '14px' }}>
                  Select up to 1 (optional)
                </Typography>
              </Grid>
              <Grid item container>
                <FormControl component="fieldset">
                  <RadioGroup name="myRadioGroup" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                    {renderChoices}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item container justifyContent="flex-end" direction="row" style={{ marginTop: 'auto' }} spacing={2}>
                <Grid item xs={4}>
                  <InputNumber
                    onChange={(quantity) => {
                      setnumberOFItem(quantity); setPriceData((prevPriceData) => ({
                        ...prevPriceData,
                        'Subtotal': initialPriceData['Subtotal'] * quantity,
                        'Total (Incl. Service Tax)': (initialPriceData['Subtotal'] * quantity) + 17
                      }));
                    }}
                    value={numberOFItem}
                    min={1}
                    size="sm"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Button
                    size="large"
                    fullWidth
                    style={{ backgroundColor: '#8fb03d', color: 'white' }}
                    onClick={() => { setOpencartModal(false) }}
                  ><ShoppingCartIcon />Add to cart</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ModalComponent>
    </div>
  )
}