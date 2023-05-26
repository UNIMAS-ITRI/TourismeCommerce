import React, { Component } from "react";
import { connect } from "react-redux";

import { Pagination, EffectFade, Autoplay } from "swiper";
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
import PanoramaViewer from "../../tools/PanoramaViewer";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

import Recommend from "../../components/Recomend";
import HotelModal from "../Hotel/HotelModal";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardContent, Stack, Divider } from "@mui/material";

import {
    Grid,
    Typography,
} from "@mui/material";
import { LinearProgress } from "@mui/material";
import "../Hotel/HotelDetails";
import { RatingList, swiperImg, recommend } from './ProductsData';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { VerticalCardListing } from '../../components/verticalCardListing/verticalCardListing';

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
    breadcrumb: [
        { title: "Home", url: "./" },
        { title: "Products", url: "/Products" },
        { title: "Wood color Beads", url: "" },
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
    variation: { "Shipping": "Free Shipping" }
};

class ProductsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() { }

    componentDidUpdate(prevProps, prevState) { }

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
                    // height={250}
                    // width={300}
                    autoplay={{ delay: 5000 }}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                >
                    {swiperImg.map((el) => {
                        return (
                            <SwiperSlide zIndex={0}>
                                <img src={el.image} alt='' />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                {/* <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Swiper
                            style={{ width: "45vw" }}
                            modules={[EffectFade, Pagination, Autoplay]}
                            effect="fade"
                            onSlideChange={() => console.log("slide change")}
                            onSwiper={(swiper) => console.log(swiper)}
                            // height={250}
                            // width={300}
                            autoplay={{ delay: 5000 }}
                            pagination={{
                                clickable: true,
                            }}
                            loop={true}
                        >
                            {swiperImg.map((el) => {
                                return (
                                    <SwiperSlide zIndex={0}>
                                        <img src={el.image} alt='' />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction="column" spacing={1}>
                            <Typography
                                variant='title'
                                style={{ fontWeight: "bold", textAlign: "left", fontSize: "2rem" }} > {recommend[0].name} </Typography>
                            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem style={{ color: '596a2a' }} />}>
                                <Typography variant='subtitle2'>{recommend[0].hotelStar} <Rating
                                    style={{ fontSize: "1.0rem" }}
                                    value={recommend[0].hotelStar}
                                /></Typography>
                                <Typography variant='subtitle2'>{recommend[0].reviewNum} reviews</Typography>
                                <Typography variant='subtitle2'>{recommend[0].soldNum} sold</Typography>
                            </Stack>
                            <Grid item container>
                                <Grid item xs={2}>
                                    <Typography gutterBottom variant="h5" style={{ fontSize: '14px' }}>Shipping</Typography>
                                </Grid>
                                <Grid item xs>
                                    <Stack direction="column" spacing={1}>
                                        <Typography gutterBottom variant="h5" style={{ fontSize: '14px' }}><LocalShippingIcon /> Free Shipping</Typography>
                                        <Typography gutterBottom variant="h5" style={{ fontSize: '14px' }}><LocalShippingIcon /> Shipping To</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid > */}
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
                            <span style={{ fontWeight: "bold" }}>{recommend[0].name}</span>
                        </h1>
                        <span style={{ color: "#A4A2A2", fontSize: "1.2vw" }}>
                            {recommend[0].State}
                        </span>
                        <br />
                        <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                            <Rating
                                style={{ fontSize: "1.8rem" }}
                                value={recommend[0].Rating}
                            />{" "}
                            <label
                                style={{
                                    fontWeight: "bold",
                                    paddingLeft: "0.5vw",
                                    fontSize: "1.0vw",
                                }}
                            >
                                {recommend[0].Rating} ( 7799
                                {/* {recommend[0].Review.length} */} Review(s))
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
                                            {recommend[0].OperateTime}
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
                                            {recommend[0].Email}
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
                                            {recommend[0].Contact}
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
                                            {recommend[0].Website}
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
                            {recommend[0].PlaceDesc}
                        </span>
                    </div>

                    <div style={{ marginTop: '1vw' }}>
                        <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                            <ThumbUpIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.8vw", fontWeight: "500", paddingLeft: "1vw" }}>In this shop</h2>
                        </span>
                        <div className="row" style={{ paddingTop: "1vw" }}>
                            {/* <VerticalCardListing
                    // setSelectedItem={setSelectedItem}
                    // setOpenModal={setOpenModal}
                    cards={recommend.length > 0 ? recommend : recommend}
                /> */}

                        </div>
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
                                    address: recommend[0].name,
                                    lat: recommend[0].latitude,
                                    lng: recommend[0].longitude,
                                }}
                                showMarker={true}
                                height={500}
                            />
                        </div>
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
                                    {recommend[0].Rating}
                                </label>
                            </div>
                            <div>
                                {" "}
                                <Rating
                                    style={{ fontSize: "1.8vw" }}
                                    value={recommend[0].Rating}
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
                                    {/* {recommend[0].Review.length}  */}
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
                                                        (recommend[0].Review.filter(
                                                            (y) => y.Rating === x.value
                                                        ).length /
                                                            recommend[0].Review.length) *
                                                        100
                                                    }
                                                />
                                            </td>
                                            <td style={{ width: "5%", paddingLeft: "0.5vw" }}>
                                                <label
                                                    style={{ fontWeight: "bold", fontSize: "0.9vw" }}
                                                >
                                                    {
                                                        recommend[0].Review.filter(
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
                            {recommend[0].Review.length > 0 &&
                                recommend[0].Review.map((x) => {
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
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);
