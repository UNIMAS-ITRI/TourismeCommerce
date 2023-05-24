import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "@mui/material/Button";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import FullWidthTabs from "../../components/TabsComponent/Tabs";

// Core modules imports are same as usual
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiperstyle.css';
import ReactPlayer from "react-player";
import { Fade } from "react-awesome-reveal";
import { Card, CardActionArea, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { style } from "@mui/system";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ProductCard from "./ProductCard";

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

// const param = {
//     swiperOption: {
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         grid: {
//             rows: 2,
//         },
//     }
// }

const INITIAL_STATE = {
    openModal: false,
    openFullScreenModal: false,
    swiperImg: [
        { image: "https://www.sarawak2discover.com/TourismApi/images/slides/web/slideWeb1.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/slides/web/slideWeb4.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/slides/web/slideWeb5.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/slides/web/slideWeb6.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/slides/web/slideWeb7.jpg" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/slides/web/slideWeb2.jpg" },
    ],
    player: "",
    url: null,
    pip: false,
    playing: true,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    CNAFF: [
        { icon: "https://www.sarawak2discover.com/images/culture.png", alt: "Culture", iconName: "Culture" },
        { icon: "https://www.sarawak2discover.com/images/adventure.png", alt: "Adventure", iconName: "Adventure" },
        { icon: "https://www.sarawak2discover.com/images/nature.png", alt: "Nature", iconName: "Nature" },
        { icon: "https://www.sarawak2discover.com/images/food.png", alt: "Food", iconName: "Food" },
        { icon: "https://www.sarawak2discover.com/images/Festival.png", alt: "Festival", iconName: "Festival" },
    ],
    heritageImg: [
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/487/487_slider1.jpg", heritageName: "BROOKE MEMORIAL", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/538/538_slider1.jpg", heritageName: "DARUL KURNIA @ HAJI TAHA ROAD", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/186/186_slider1.jpg", heritageName: "FORT MARGERITA", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/497/497_slider1.jpg", heritageName: "GENERAL POST OFFICE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/542/542_slider1.jpg", heritageName: "HERITAGE HOUSE OF BENTARA/DARUL MAZIAH", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/540/540_slider1.jpg", heritageName: "HERITAGE HOUSE OF DATU BANDAR HAJI MOHD KASSIM", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/541/541_slider1.jpg", heritageName: "HERITAGE HOUSE OF TAN SRI DATO SERI ABANG AHMAD URAI BIN DATU HAKIM ABANG HJ MOHIDEEN", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/532/532_slider1.jpg", heritageName: "HIANG THIAN SIANG TI TEMPLE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/536/536_slider1.jpg", heritageName: "INDIAN MOSQUE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/533/533_slider1.jpg", heritageName: "KUEH SENG ONN TEMPLE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/537/537_slider1.jpg", heritageName: "MASJID BANDARAYA KUCHING", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/490/490_slider1.jpg", heritageName: "OLD CHINESE COURT (CHINESE HISTORY MUSEUM)", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/495/495_slider1.jpg", heritageName: "OLD GOVERNMENT PRINTING OFFICE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/486/486_slider1.jpg", heritageName: "OLD KUCHING COURTHOUSE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/492/492_slider1.jpg", heritageName: "OLD SARAWAK STEAMSHIP BUILDING", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/539/539_slider1.jpg", heritageName: "PERSAUDARAAN KAMPONG MASJID, BINTANGOR AND JALAN HAJI TAHA, KUCHING (MBHT)", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/494/494_slider1.jpg", heritageName: "SARAWAK CULTURAL VILLAGE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/535/535_slider1.jpg", heritageName: "SIKH TEMPLE", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/493/493_slider1.jpg", heritageName: "SQUARE TOWER", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/488/488_slider1.jpg", heritageName: "THE JAPANESE BUILDING", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/496/496_slider1.jpg", heritageName: "THE PAVILION (TEXTILE MUSEUM)", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/489/489_slider1.jpg", heritageName: "THE ROUND TOWER", url: "/" },
        { image: "https://www.sarawak2discover.com/TourismApi/images/place/180/180_slider1.jpg", heritageName: "TUA PEK KONG TEMPLE", url: "/" },
    ],
    isCollapse: true,
    // panel1a-header: true,
    headerDetail: [
        {index: 0, headerName: "Accomodation"},
        {index: 1, headerName: "Restaurants"},
        {index: 2, headerName: "Tour Package"},
        {index: 3, headerName: "Ticketing"},
        {index: 4, headerName: "Product"},
        {index: 5, headerName: "Transportation"},
    ],
    value: 0,
    // bodyDetail: [
    //     {index: 0, children: <ProductCard props="Accomodation"/>, value: 0,},
    //     {index: 1, children: "Restaurants", value: 1,},
    //     {index: 2, children: "Package", value: 2,},
    //     {index: 3, children: "Ticketing", value: 3,},
    //     {index: 4, children: "Product", value: 4,},
    //     {index: 5, children: "Transportation", value: 5,},
    // ],
    bodyDetail: [
        {index: 0, children: <ProductCard props="Accomodation"/>, value: 0,},
        {index: 1, children: <ProductCard props="Restaurants"/>, value: 1,},
        {index: 2, children: <ProductCard props="Tourpackage"/>, value: 2,},
        {index: 3, children: <ProductCard props="Ticketing"/>, value: 3,},
        {index: 4, children: <ProductCard props="Product"/>, value: 4,},
        {index: 5, children: <ProductCard props="Transportation"/>, value: 5,},
    ],
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE

        this.myRef = React.createRef();

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    load = (url) => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false,
        });
    };

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing });
    };

    handleStop = () => {
        this.setState({ url: null, playing: false });
    };

    handleToggleControls = () => {
        const url = this.state.url;
        this.setState(
            {
                controls: !this.state.controls,
                url: null,
            },
            () => this.load(url)
        );
    };

    handleToggleLight = () => {
        this.setState({ light: !this.state.light });
    };

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop });
    };

    handleVolumeChange = (e) => {
        this.setState({ volume: parseFloat(e.target.value) });
    };

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted });
    };

    handleSetPlaybackRate = (e) => {
        this.setState({ playbackRate: parseFloat(e.target.value) });
    };

    handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip });
    };

    handlePlay = () => {
        this.setState({ playing: true });
    };

    handleEnablePIP = () => {
        this.setState({ pip: true });
    };

    handleDisablePIP = () => {
        this.setState({ pip: false });
    };

    handlePause = () => {
        this.setState({ playing: false });
    };

    handleSeekMouseDown = (e) => {
        this.setState({ seeking: true });
    };

    handleSeekChange = (e) => {
        this.setState({ played: parseFloat(e.target.value) });
    };

    handleSeekMouseUp = (e) => {
        this.setState({ seeking: false });
        this.player.seekTo(parseFloat(e.target.value));
    };

    handleProgress = (state) => {
        if (state.playedSeconds > 10) {
            if (this.state.enrolled == false && this.state.userCourseEnroll == false) {
                this.handlePause();
                this.modalenrollOpen();
                this.setState({ controls: false });
            }
            else if (this.state.userCourseEnroll == true) {
                this.setState({ controls: true });
            }
            else {
                this.setState({ controls: true });
            }
        }
    };

    handleEnded = () => {
        this.setState({ playing: this.state.loop });
    };

    handleDuration = (duration) => {
        this.setState({ duration });
    };

    ref = (player) => {
        this.player = player;
    };

    handleChangeAccordion() {
        this.setState({ expanded: false })
        // else (this.setState({ expanded: true }))
        console.log(this.state.expanded)
    }

    render() {
        const { playing, controls, light, volume, muted, loop, playbackRate, pip, } = this.state;
        
        const headerDetails = this.state.headerDetail.map((x) => x.headerName)
        const bodyDetails = this.state.bodyDetail.map((x) => x.children)

        return (
            <div >
                <Swiper
                    modules={[EffectFade, Pagination, Autoplay]}
                    effect="fade"
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    height={300}
                    width={300}
                    autoplay={{ delay: 5000, }}
                    pagination={{
                        clickable: true,
                        // renderBullet: function (index, className) {
                        //     return '<span class="' + className + '">' + (index + 1) + "</span>";
                        // },
                    }}
                    loop={true}
                >
                    {
                        this.state.swiperImg.map((el) => {
                            return <SwiperSlide><img src={el.image} /></SwiperSlide>
                        })
                    }
                </Swiper>
                <div className="row" style={{ margin: "2.5vw 0 3vw 0" }}>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7" style={{ height: "65%" }}>
                        <p style={{ display: "flex", justifyContent: "center" }}>
                            <h1 style={{ color: "#91b362", fontSize: "2.9vw", }}>Sarawak</h1>
                            <h1 style={{ fontSize: "2.9vw" }}>, More to Discover</h1>
                        </p>
                        <p style={{ fontSize: "1.185vw", lineHeight: "1.6", textAlign: "justify", paddingLeft: "2vw", paddingRight: "2vw" }}>
                            Sarawak, the Land of the Hornbills, there is so much more Sarawak can offer than what meets the eye.
                            Home to 27 ethnic groups, Sarawak is a unique plethora of culture, adventure, nature, food, and festivals (CANFF).
                            It is the place where the journey of endless exploration starts.
                            <h3 style={{ fontSize: "1.185vw", color: "#91b362", fontStyle: "italic", cursor: "pointer", fontWeight: "bold" }}
                                onClick={() => this.setState({ openModal: true })}
                            >
                                Discover more...
                            </h3>
                        </p>
                        <div style={{ height: "43%", padding: "0px 0.6vw 0 0.8vw", margin: "0px 0px 0 0.8vw" }}>
                            <div className="row" style={{ textAlign: "center" }}>
                                {/* {
                                    this.state.CNAFF !== null && this.state.CNAFF.map((data) => {
                                        return ( */}
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={1000}>
                                        <img src="https://www.sarawak2discover.com/images/culture.png" width="80%" alt="Culture" />
                                        <p style={{ fontSize: "1.185vw" }}>Culture</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={2000}>
                                        <img src="https://www.sarawak2discover.com/images/adventure.png" width="80%" alt="Adventure" />
                                        <p style={{ fontSize: "1.185vw" }}>Adventure</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={2800}>
                                        <img src="https://www.sarawak2discover.com/images/nature.png" width="80%" alt="Nature" />
                                        <p style={{ fontSize: "1.185vw" }}>Nature</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={3600}>
                                        <img src="https://www.sarawak2discover.com/images/food.png" width="80%" alt="Food" />
                                        <p style={{ fontSize: "1.185vw" }}>Food</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={4200}>
                                        <img src="https://www.sarawak2discover.com/images/Festival.png" width="80%" alt="Festival" />
                                        <p style={{ fontSize: "1.185vw" }}>Festival</p>
                                    </Fade>
                                </div>
                                {/* )
                                    })
                                } */}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        {/* {JSON.parse(this.props.coursedetail[0].CourseMedia)[0]
                            .CourseMediaUrl ? ( */}
                        <ReactPlayer
                            ref={this.ref}
                            className="react-player"
                            width="98%"
                            height="100%"
                            url="https://www.sarawak2discover.com/TourismApi/images/overall_okshe.mp4"
                            // {
                            //     JSON.parse(
                            //         this.props.coursedetail[0].CourseMedia
                            //     )[0].CourseMediaUrl
                            // }
                            pip={pip}
                            // playing={playing}
                            controls={controls}
                            light={light}
                            // loop={loop}
                            playbackRate={playbackRate}
                            volume={volume}
                            muted={muted}
                            onReady={() => console.log("onReady")}
                            onStart={() => console.log("onStart")}
                            onPlay={this.handlePlay}
                            onEnablePIP={this.handleEnablePIP}
                            onDisablePIP={this.handleDisablePIP}
                            onPause={this.handlePause}
                            onBuffer={() => console.log("onBuffer")}
                            onSeek={(e) => console.log("onSeek", e)}
                            onEnded={this.handleEnded}
                            onError={(e) => console.log("onError", e)}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                        />
                        {/* ) : (
                            <a href="">
                                <img alt="" src={BLOG_01} className="img-fluid" />
                            </a>
                        )} */}
                    </div>
                </div >
                <div className="row" style={{ margin: "2.5vw " }}>
                    <FullWidthTabs settings={{ Headers: headerDetails, Body: bodyDetails }} id="FullWidthTab" />
                </div>
                <div className="row" style={{ margin: "2.5vw " }}>
                    <Swiper
                        // {...param}

                        modules={[Navigation]}
                        slidesPerView={3}
                        slidesPerColumn={2}
                        slidesPerColumnFill="column"
                        navigation={true}
                    // style={{
                    //     "--swiper-navigation-color": "#fff",
                    //     "--swiper-navigation-size": "2vw",
                    // }}
                    >
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" >
                                {
                                    this.state.heritageImg.map((el) => {
                                        return (
                                            <>
                                                <SwiperSlide >
                                                    <div className="hrtCard">
                                                        <div className="mainDiv mainContainer">
                                                            <img src={el.image} style={{ height: "20vw", width: "30vw", display: "block", objectFit: "cover", opacity: 1 }} />
                                                        </div>
                                                        <div className="middleDiv">
                                                            <span style={{ textAlign: "center" }}>{el.heritageName}</span>
                                                        </div>
                                                        <div className="middle">
                                                            <div className="text">
                                                                <p className="hovertxt">
                                                                    {el.heritageName}
                                                                </p>
                                                                <hr className="mt-0 d-inline-block mx-auto" style={{ borderColor: "#ffffff", width: "95px" }} />
                                                                <p className="hovertxt">
                                                                    View Details
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Swiper>
                </div >
                <div className="row" style={{ margin: "3vw 0 3vw 0" }}>
                    <p style={{ display: "flex", justifyContent: "center" }}>
                        <h1 style={{ fontSize: "2.9vw" }}>What's New</h1>
                    </p>
                    <div style={{ padding: "0 3.1vw" }}>
                        <Card className="moreCard" elevation={0} sx={{ maxWidth: 280, maxHeight: "20vw" }} >
                            <CardActionArea
                                // onClick={() => this.handleCardClick(x)}
                                className="cardActionArea"
                            >
                                <img
                                    alt="/"
                                    src="https://www.sarawak2discover.com/TourismApi/images/event/event.png"
                                    // onError={e => (e.target.src = defaultImageUrl())}
                                    height="385"
                                />
                                {/* <p className="MoreTxt">More</p> */}
                                <div className="middleDivCard">
                                    <span style={{ textAlign: "center" }}>MORE...</span>
                                </div>
                                <div className="middleCard">
                                    <div className="text">
                                        <p className="hovertxt">
                                            More...
                                        </p>
                                    </div>
                                </div>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>

                <div class="imgbgMap">
                    {/* <div className="imgbgMap1">
                    </div> */}
                    {/* <article class="dooreffects">
                        <div class="ctrl-box">
                            <h2 style="color: #000000;">Travel Highlights</h2>
                            <div class="viewpoint">
                                <div class="bg-box">
                                    <div class="title" style="color: #000000;">Cities/Towns</div>
                                    <div class="btn-open"><a href="javascript: void(0);" title="City/Town"></a></div>
                                    <div class="btn-into"><a href="CityList.aspx" title="City/Town"></a></div>
                                    <ul class="list-box">
                                        <li class="item-n">
                                            <figure>
                                                <div class="graphic"><img src="images/web/btn/Miri.png" alt="Miri" /></div>
                                                <figcaption>Miri</figcaption>
                                                <a href="CityInfo.aspx?did=4" title="Miri">Miri</a>
                                            </figure>
                                        </li>
                                        <li class="item-g">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/Limbang.png" alt="Limbang" /></div>
                                                <figcaption>Limbang</figcaption>
                                                <a href="CityInfo.aspx?did=5" title="Limbang">Limbang</a>
                                            </figure>
                                        </li>

                                        <li class="item-c">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/Samarahan.png" alt="Samarahan" /></div>
                                                <figcaption>Samarahan</figcaption>
                                                <a href="CityInfo.aspx?did=9" title="Samarahan">Samarahan</a>
                                            </figure>
                                        </li>
                                        <li class="item-s">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/Betong.png" alt="Betong" /></div>
                                                <figcaption>Betong</figcaption>
                                                <a href="CityInfo.aspx?did=11" title="Betong">Betong</a>
                                            </figure>
                                        </li>
                                        <li class="item-b">
                                            <figure>
                                                <div class="graphic"><img src="images/web/btn/Sibu.png" alt="Sibu" /></div>
                                                <figcaption>Sibu</figcaption>
                                                <a href="CityInfo.aspx?did=3" title="Sibu">Sibu</a>
                                            </figure>
                                        </li>
                                        <li class="item-d">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/Sarikei.png" alt="Sarikei" /></div>
                                                <figcaption>Sarikei</figcaption>
                                                <a href="CityInfo.aspx?did=6" title="Sarikei">Sarikei</a>
                                            </figure>
                                        </li>
                                        <li class="item-f">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/Kapit.png" alt="Kapit" /></div>
                                                <figcaption>Kapit</figcaption>
                                                <a href="CityInfo.aspx?did=7" title="Kapit">Kapit</a>
                                            </figure>
                                        </li>
                                        <li class="item-e">
                                            <figure>
                                                <div class="graphic"><img src="images/web/btn/Bintulu.png" alt="Bintulu" /></div>
                                                <figcaption>Bintulu</figcaption>
                                                <a href="CityInfo.aspx?did=8" title="Bintulu">Bintulu</a>
                                            </figure>
                                        </li>
                                        <li class="item-a">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/Mukah.png" alt="Mukah" /></div>
                                                <figcaption>Mukah</figcaption>
                                                <a href="CityInfo.aspx?did=10" title="Mukah">Mukah</a>
                                            </figure>
                                        </li>
                                        <li class="item-m">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/SriAman.png" alt="Sri Aman" /></div>
                                                <figcaption>Sri Aman</figcaption>
                                                <a href="CityInfo.aspx?did=2" title="Sri Aman">Sri Aman</a>
                                            </figure>
                                        </li>
                                        <li class="item-p">
                                            <figure>
                                                <div class="graphic2"><img src="images/web/btn/Serian.png" alt="Serian" /></div>
                                                <figcaption>Serian</figcaption>
                                                <a href="CityInfo.aspx?did=12" title="Serian">Serian</a>
                                            </figure>
                                        </li>
                                        <li class="item-k">
                                            <figure>
                                                <div class="graphic"><img src="images/web/btn/Kuching.png" alt="Kuching" /></div>
                                                <figcaption>Kuching</figcaption>
                                                <a href="CityInfo.aspx?did=1" title="Kuching">Kuching</a>
                                            </figure>
                                        </li>
                                    </ul>
                                    <div class="btn-back"><a href="javascript: void(0);" title="Back">Back</a></div>
                                </div>
                            </div>
                            <div class="festival">
                                <div class="bg-box">
                                    <div class="title" style="color: #000000;">Top Attractions</div>
                                    <div class="btn-open"><a href="javascript: void(0);" title="Top Attraction"></a></div>
                                    <div class="btn-into"><a href="MainPlaceOfInterest.aspx"></a></div>
                                    <ul class="list-box">

                                        <li class="item-attraction-c">
                                            <figure>
                                                <div class="graphic_a"><img src="images/web/btn/Bako.png" alt="Bako National Park" height="150" /></div>
                                                <figcaption>Bako National Park</figcaption>
                                                <a href="PlaceDetail.aspx?pid=188&plat=1.716720000000000&plng=110.466688000000000" title="Bako National Park">Bako National Park</a>
                                            </figure>
                                        </li>
                                        <li class="item-attraction-g">
                                            <figure>
                                                <div class="graphic_a"><img src="images/web/btn/Pinnacle.png" alt="The Pinnacles Trail" height="120" /></div>
                                                <figcaption>The Pinnacles Trail</figcaption>
                                                <a href="PlaceDetail.aspx?pid=446&plat=4.092000000000000&plng=114.895773000000000" title="The Pinnacles Trail">The Pinnacles Trail</a>
                                            </figure>
                                        </li>
                                        <li class="item-attraction-e">
                                            <figure>
                                                <div class="graphic_a"><img src="images/web/btn/Mulu.png" alt="Mulu National Park" height="130" /></div>
                                                <figcaption>Mulu National Park</figcaption>
                                                <a href="PlaceDetail.aspx?pid=425&plat=4.041940000000000&plng=114.812922000000000" title="Mulu National Park">Mulu National Park</a>
                                            </figure>
                                        </li>
                                        <li class="item-attraction-b">
                                            <figure>
                                                <div class="graphic_a"><img src="images/web/btn/Semenggoh.png" alt="Semenggoh Wildlife Centre" height="150" /></div>
                                                <figcaption>Semenggoh Wildlife Centre</figcaption>
                                                <a href="PlaceDetail.aspx?pid=423&plat=1.399899000000000&plng=110.324480000000000" title="Semenggoh Wildlife Centre">Semenggoh Wildlife Centre</a>
                                            </figure>
                                        </li>
                                        <li class="item-attraction-n">
                                            <figure>
                                                <div class="graphic_a"><img src="images/web/btn/Niah.png" alt="Niah National Park" height="120" /></div>
                                                <a href="PlaceDetail.aspx?pid=147&plat=3.801544000000000&plng=113.784189000000000" title="Niah National Park">Niah National Park</a>
                                            </figure>
                                        </li>
                                    </ul>
                                    <div class="btn-back"><a href="javascript: void(0);" title="Back">Back</a></div>
                                </div>
                            </div>
                        </div>
                    </article> */}
                </div>

                <div className="row" style={{ margin: "3vw 0 3vw 0" }}>
                    <div style={{ textAlign: "center" }}>
                        <IconButton onClick={() => this.setState({ isCollapse: !this.state.isCollapse })}>
                            {this.state.isCollapse === true ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </div>
                    <Accordion expanded={this.state.isCollapse} style={{ background: "none", boxShadow: "none" }}
                        onClick={() => this.setState({ isCollapse: !this.state.isCollapse })}
                    >
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div style={{ display: "flex", width: "100%" }}>
                                <hr className="mt-5 d-inline-block mx-auto" style={{ borderColor: "black", width: "100%", height: "5px" }} />
                                <Typography style={{ fontSize: "2.853vw", textAlign: "center", justifyContent: "center", width: "100%" }}>
                                    More On Sarawak Travel
                                </Typography>
                                <hr className="mt-5 d-inline-block mx-auto" style={{ borderColor: "black", width: "100%", height: "5px" }} />
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="row" style={{ textAlign: "center", marginTop: "1.5vw" }}>
                                {/* {
                                    this.state.CNAFF !== null && this.state.CNAFF.map((data) => {
                                        return ( */}
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={1000}>
                                        <img src="	https://www.sarawak2discover.com/TourismApi/images/category/ATM.png" width="40%" alt="Culture" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>ATM</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={2000}>
                                        <img src="https://www.sarawak2discover.com/TourismApi/images/category/Emergency.png" width="40%" alt="Adventure" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Emergency Contact</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={2800}>
                                        <img src="https://www.sarawak2discover.com/TourismApi/images/category/Hospital.png" width="40%" alt="Nature" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Hospital</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={3600}>
                                        <img src="https://www.sarawak2discover.com/TourismApi/images/category/Library.png" width="40%" alt="Food" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Library</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={4200}>
                                        <img src="	https://www.sarawak2discover.com/TourismApi/images/category/MoneyChanger.png" width="40%" alt="Festival" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Money Changer</p>
                                    </Fade>
                                </div>
                                {/* )
                                    })
                                } */}
                            </div>
                            <div className="row" style={{ textAlign: "center", marginTop: "1.5vw" }}>
                                {/* {
                                    this.state.CNAFF !== null && this.state.CNAFF.map((data) => {
                                        return ( */}
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={5000}>
                                        <img src="https://www.sarawak2discover.com/TourismApi/images/category/PetroStation.png" width="40%" alt="Culture" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Petrol Station</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={6000}>
                                        <img src="https://www.sarawak2discover.com/TourismApi/images/category/PoliceStation.png" width="40%" alt="Adventure" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Police Station</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={6800}>
                                        <img src="	https://www.sarawak2discover.com/TourismApi/images/category/Telecommunication.png" width="40%" alt="Nature" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Telecommunication</p>
                                    </Fade>
                                </div>
                                <div style={{ width: "20%", cursor: "pointer" }}>
                                    <Fade direction="left" delay={7600}>
                                        <img src="https://www.sarawak2discover.com/TourismApi/images/category/Transportation.png" width="40%" alt="Food" />
                                        <p style={{ fontSize: "1.185vw", color: "#5A6A2F", fontWeight: "600" }}>Transport</p>
                                    </Fade>
                                </div>
                                {/* )
                                    })
                                } */}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    {/* <div className="row" style={{ fontSize: "3vw", textAlign: "center", justifyContent: "center" }}>
                        More On Sarawak Travel
                    </div> */}

                </div>


                {/* <SearchBar
                    label="search"
                    placeholder="Enter Member No, Tracking No or Container No to search"
                    buttonOnClick={() => this.onSearch("", "")}
                    onChange={() => { }}
                    className="searchbar-input"
                    disableButton={this.state.isDataFetching}
                    tooltipText="Search with current data"
                    value={this.state.searchKeywords}
                    variant="standard"
                    hideButton={true}
                /> */}

                {/* <div className="w-100 d-flex" style={{ height: "1vw" } }> */}
                {/* <Button onClick={() => this.setState({ openModal: true })}>Toggle Modal</Button> */}
                {/* <Button onClick={() => this.setState({ openFullScreenModal: true })}>Toggle Full Screen Modal</Button> */}
                {/* </div > */}
                <ModalComponent
                    open={this.state.openModal}
                    fullScreen={false}
                    maxWidth={"xl"}
                    title={"Modal Title"}
                    draggable={true}
                    className="modalLanding"
                    handleOnClose={() => this.setState({ openModal: false })}
                    DialogActionsButton={
                        <div className="d-flex">
                            <Button className="ml-auto">Close</Button>
                        </div>
                    }
                >
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Aliquam vestibulum morbi blandit cursus risus at ultrices. Morbi tristique senectus et netus. Nec dui nunc mattis enim ut tellus elementum sagittis. Donec enim diam vulputate ut pharetra sit amet. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Ut tristique et egestas quis ipsum. Fermentum leo vel orci porta non pulvinar neque laoreet. Ultrices in iaculis nunc sed. Purus non enim praesent elementum facilisis. Orci a scelerisque purus semper eget. Dignissim sodales ut eu sem. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Tempus egestas sed sed risus pretium quam vulputate. Tristique senectus et netus et malesuada fames ac. Libero nunc consequat interdum varius. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.

                        Urna condimentum mattis pellentesque id nibh tortor id. Facilisis sed odio morbi quis commodo odio aenean sed. Dapibus ultrices in iaculis nunc sed augue. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Dolor sit amet consectetur adipiscing elit pellentesque. Lectus proin nibh nisl condimentum id venenatis a. Convallis a cras semper auctor neque vitae. Libero nunc consequat interdum varius sit amet mattis. Feugiat pretium nibh ipsum consequat nisl. Non consectetur a erat nam at lectus urna. Vel turpis nunc eget lorem dolor. Hac habitasse platea dictumst quisque sagittis purus. Porta non pulvinar neque laoreet suspendisse. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis. Pellentesque massa placerat duis ultricies lacus sed. Enim ut sem viverra aliquet eget sit amet tellus. Ultricies leo integer malesuada nunc.

                        Sit amet venenatis urna cursus eget nunc scelerisque viverra. Amet consectetur adipiscing elit duis tristique. Ut consequat semper viverra nam libero justo laoreet. Nunc vel risus commodo viverra maecenas accumsan. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Sem nulla pharetra diam sit amet. Integer enim neque volutpat ac tincidunt vitae semper quis. A erat nam at lectus urna duis convallis convallis tellus. Libero nunc consequat interdum varius sit amet mattis. Faucibus interdum posuere lorem ipsum dolor sit. Sed risus ultricies tristique nulla. Purus in mollis nunc sed id semper risus in hendrerit. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Elementum eu facilisis sed odio morbi quis commodo. Nam aliquam sem et tortor consequat id porta nibh venenatis. Eu mi bibendum neque egestas congue quisque egestas diam.

                        Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Nibh tellus molestie nunc non blandit. In iaculis nunc sed augue lacus viverra. Vel orci porta non pulvinar. Est sit amet facilisis magna etiam tempor orci eu. Mattis aliquam faucibus purus in. Dignissim cras tincidunt lobortis feugiat vivamus. Morbi tincidunt ornare massa eget egestas purus viverra. Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Sed euismod nisi porta lorem mollis aliquam.

                        Tellus orci ac auctor augue. Feugiat sed lectus vestibulum mattis ullamcorper. Urna neque viverra justo nec ultrices dui sapien. Semper auctor neque vitae tempus quam. Mattis aliquam faucibus purus in. Posuere lorem ipsum dolor sit amet consectetur. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Neque sodales ut etiam sit amet nisl purus in. Volutpat ac tincidunt vitae semper quis lectus nulla at. Lacus sed viverra tellus in. Id consectetur purus ut faucibus pulvinar elementum integer enim. Dui ut ornare lectus sit amet. Euismod lacinia at quis risus sed vulputate odio ut enim. Molestie a iaculis at erat pellentesque adipiscing commodo. Sed sed risus pretium quam.

                        Neque viverra justo nec ultrices dui sapien eget mi proin. Non tellus orci ac auctor augue. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Et tortor at risus viverra adipiscing at. Dictum non consectetur a erat nam. Mattis pellentesque id nibh tortor. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Sagittis vitae et leo duis ut diam quam. Augue neque gravida in fermentum et. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Donec ultrices tincidunt arcu non sodales.

                        Fames ac turpis egestas integer eget. Euismod nisi porta lorem mollis. Velit ut tortor pretium viverra suspendisse potenti. Tempus egestas sed sed risus pretium quam vulputate dignissim. Pretium fusce id velit ut. Ultricies mi eget mauris pharetra et ultrices neque ornare. At consectetur lorem donec massa sapien faucibus et. At erat pellentesque adipiscing commodo. Nisl vel pretium lectus quam id leo in vitae turpis. Vivamus arcu felis bibendum ut tristique et egestas. Fames ac turpis egestas maecenas. Euismod nisi porta lorem mollis. Sed libero enim sed faucibus turpis in eu mi bibendum. Quisque non tellus orci ac auctor augue. Dui ut ornare lectus sit amet. In nisl nisi scelerisque eu ultrices vitae auctor eu.

                        Tempor commodo ullamcorper a lacus. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Nam at lectus urna duis. Blandit turpis cursus in hac habitasse platea. Suspendisse ultrices gravida dictum fusce ut. Phasellus vestibulum lorem sed risus. Morbi tempus iaculis urna id. Velit laoreet id donec ultrices tincidunt. Consequat ac felis donec et odio pellentesque. Mattis aliquam faucibus purus in massa tempor nec feugiat. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere.

                        Maecenas sed enim ut sem viverra aliquet eget sit amet. Penatibus et magnis dis parturient. Malesuada nunc vel risus commodo viverra maecenas. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Ut eu sem integer vitae justo eget magna fermentum iaculis. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Bibendum est ultricies integer quis auctor elit. Urna duis convallis convallis tellus id interdum velit laoreet. Sed elementum tempus egestas sed sed risus pretium. Gravida neque convallis a cras semper auctor. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Nunc faucibus a pellentesque sit. Donec et odio pellentesque diam. Consectetur adipiscing elit duis tristique sollicitudin nibh. Et malesuada fames ac turpis egestas maecenas. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et.

                        Consequat interdum varius sit amet. Turpis massa tincidunt dui ut ornare. Cras fermentum odio eu feugiat. Lacinia quis vel eros donec. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Vel facilisis volutpat est velit egestas dui id ornare. Elementum nisi quis eleifend quam adipiscing vitae proin. Nisi porta lorem mollis aliquam ut. Sagittis vitae et leo duis ut diam quam. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Fringilla est ullamcorper eget nulla. Volutpat diam ut venenatis tellus in metus vulputate. Consectetur a erat nam at lectus urna. Leo duis ut diam quam nulla porttitor massa id neque. Donec adipiscing tristique risus nec feugiat. Egestas maecenas pharetra convallis posuere morbi leo. Morbi tristique senectus et netus et malesuada. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Erat velit scelerisque in dictum non consectetur a.
                    </div>
                </ModalComponent>

                {/* <ModalComponent
                    open={this.state.openFullScreenModal}
                    fullScreen={true}
                    maxWidth={"sm"}
                    title={"Modal Title"}
                    draggable={true}
                    handleOnClose={() => this.setState({ openFullScreenModal: false })}
                    DialogActionsButton={
                        <div className="d-flex">
                            <Button onClick={() => this.setState({ openFullScreenModal: false })} className="ml-auto">Something</Button>
                        </div>
                    }
                >
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Aliquam vestibulum morbi blandit cursus risus at ultrices. Morbi tristique senectus et netus. Nec dui nunc mattis enim ut tellus elementum sagittis. Donec enim diam vulputate ut pharetra sit amet. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Ut tristique et egestas quis ipsum. Fermentum leo vel orci porta non pulvinar neque laoreet. Ultrices in iaculis nunc sed. Purus non enim praesent elementum facilisis. Orci a scelerisque purus semper eget. Dignissim sodales ut eu sem. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Tempus egestas sed sed risus pretium quam vulputate. Tristique senectus et netus et malesuada fames ac. Libero nunc consequat interdum varius. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.

                        Urna condimentum mattis pellentesque id nibh tortor id. Facilisis sed odio morbi quis commodo odio aenean sed. Dapibus ultrices in iaculis nunc sed augue. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Dolor sit amet consectetur adipiscing elit pellentesque. Lectus proin nibh nisl condimentum id venenatis a. Convallis a cras semper auctor neque vitae. Libero nunc consequat interdum varius sit amet mattis. Feugiat pretium nibh ipsum consequat nisl. Non consectetur a erat nam at lectus urna. Vel turpis nunc eget lorem dolor. Hac habitasse platea dictumst quisque sagittis purus. Porta non pulvinar neque laoreet suspendisse. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis. Pellentesque massa placerat duis ultricies lacus sed. Enim ut sem viverra aliquet eget sit amet tellus. Ultricies leo integer malesuada nunc.

                        Sit amet venenatis urna cursus eget nunc scelerisque viverra. Amet consectetur adipiscing elit duis tristique. Ut consequat semper viverra nam libero justo laoreet. Nunc vel risus commodo viverra maecenas accumsan. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Sem nulla pharetra diam sit amet. Integer enim neque volutpat ac tincidunt vitae semper quis. A erat nam at lectus urna duis convallis convallis tellus. Libero nunc consequat interdum varius sit amet mattis. Faucibus interdum posuere lorem ipsum dolor sit. Sed risus ultricies tristique nulla. Purus in mollis nunc sed id semper risus in hendrerit. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Elementum eu facilisis sed odio morbi quis commodo. Nam aliquam sem et tortor consequat id porta nibh venenatis. Eu mi bibendum neque egestas congue quisque egestas diam.

                        Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Nibh tellus molestie nunc non blandit. In iaculis nunc sed augue lacus viverra. Vel orci porta non pulvinar. Est sit amet facilisis magna etiam tempor orci eu. Mattis aliquam faucibus purus in. Dignissim cras tincidunt lobortis feugiat vivamus. Morbi tincidunt ornare massa eget egestas purus viverra. Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Sed euismod nisi porta lorem mollis aliquam.

                        Tellus orci ac auctor augue. Feugiat sed lectus vestibulum mattis ullamcorper. Urna neque viverra justo nec ultrices dui sapien. Semper auctor neque vitae tempus quam. Mattis aliquam faucibus purus in. Posuere lorem ipsum dolor sit amet consectetur. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Neque sodales ut etiam sit amet nisl purus in. Volutpat ac tincidunt vitae semper quis lectus nulla at. Lacus sed viverra tellus in. Id consectetur purus ut faucibus pulvinar elementum integer enim. Dui ut ornare lectus sit amet. Euismod lacinia at quis risus sed vulputate odio ut enim. Molestie a iaculis at erat pellentesque adipiscing commodo. Sed sed risus pretium quam.

                        Neque viverra justo nec ultrices dui sapien eget mi proin. Non tellus orci ac auctor augue. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Et tortor at risus viverra adipiscing at. Dictum non consectetur a erat nam. Mattis pellentesque id nibh tortor. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Sagittis vitae et leo duis ut diam quam. Augue neque gravida in fermentum et. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Donec ultrices tincidunt arcu non sodales.

                        Fames ac turpis egestas integer eget. Euismod nisi porta lorem mollis. Velit ut tortor pretium viverra suspendisse potenti. Tempus egestas sed sed risus pretium quam vulputate dignissim. Pretium fusce id velit ut. Ultricies mi eget mauris pharetra et ultrices neque ornare. At consectetur lorem donec massa sapien faucibus et. At erat pellentesque adipiscing commodo. Nisl vel pretium lectus quam id leo in vitae turpis. Vivamus arcu felis bibendum ut tristique et egestas. Fames ac turpis egestas maecenas. Euismod nisi porta lorem mollis. Sed libero enim sed faucibus turpis in eu mi bibendum. Quisque non tellus orci ac auctor augue. Dui ut ornare lectus sit amet. In nisl nisi scelerisque eu ultrices vitae auctor eu.

                        Tempor commodo ullamcorper a lacus. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Nam at lectus urna duis. Blandit turpis cursus in hac habitasse platea. Suspendisse ultrices gravida dictum fusce ut. Phasellus vestibulum lorem sed risus. Morbi tempus iaculis urna id. Velit laoreet id donec ultrices tincidunt. Consequat ac felis donec et odio pellentesque. Mattis aliquam faucibus purus in massa tempor nec feugiat. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere.

                        Maecenas sed enim ut sem viverra aliquet eget sit amet. Penatibus et magnis dis parturient. Malesuada nunc vel risus commodo viverra maecenas. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Ut eu sem integer vitae justo eget magna fermentum iaculis. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Bibendum est ultricies integer quis auctor elit. Urna duis convallis convallis tellus id interdum velit laoreet. Sed elementum tempus egestas sed sed risus pretium. Gravida neque convallis a cras semper auctor. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Nunc faucibus a pellentesque sit. Donec et odio pellentesque diam. Consectetur adipiscing elit duis tristique sollicitudin nibh. Et malesuada fames ac turpis egestas maecenas. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et.

                        Consequat interdum varius sit amet. Turpis massa tincidunt dui ut ornare. Cras fermentum odio eu feugiat. Lacinia quis vel eros donec. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Vel facilisis volutpat est velit egestas dui id ornare. Elementum nisi quis eleifend quam adipiscing vitae proin. Nisi porta lorem mollis aliquam ut. Sagittis vitae et leo duis ut diam quam. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Fringilla est ullamcorper eget nulla. Volutpat diam ut venenatis tellus in metus vulputate. Consectetur a erat nam at lectus urna. Leo duis ut diam quam nulla porttitor massa id neque. Donec adipiscing tristique risus nec feugiat. Egestas maecenas pharetra convallis posuere morbi leo. Morbi tristique senectus et netus et malesuada. Dui faucibus in ornare quam viverra orci sagittis eu volutpat. Erat velit scelerisque in dictum non consectetur a.
                    </div>
                </ModalComponent> */}
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);