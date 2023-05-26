import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantsDummy } from './LocalFoodData';
import PageHeader from "../../tools/breadcrumb/breadcrumb";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';
import Rating from "@material-ui/lab/Rating";
import OperateHour from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Website from '@mui/icons-material/Language';
import Marker from '@mui/icons-material/Room';
import MapModule from '../../utils/Map/MapModule';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Container, Typography, Card, CardMedia, CardContent, Button, CardActions, Grid, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Chip
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarRateIcon from '@mui/icons-material/StarRate';
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputNumber from "../../components/InputNumber/InputNumber";
import { VerticalCardListing } from "../../components/verticalCardListing/verticalCardListing";
import StarIcon from '@mui/icons-material/Star';
import { LinearProgress } from '@mui/material';
import USER from "../../assets/user.png";
import Recommend from "../../components/Recomend";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const LocalFoodDetail = () => {
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [numberOFItem, setnumberOFItem] = useState(1);
    const [expandReview, setexpandReview] = useState(false);
    const [numToShow, setnumToShow] = useState(3);
    const [options] = useState([
        { value: 'option1', label: 'None' },
        { value: 'option2', label: 'Light Spicy' },
        { value: 'option3', label: 'Medium Spicy' },
        { value: 'option4', label: 'Heavy Spicy' },
    ]);
    const [selectedOption, setSelectedOption] = useState('option1');
    const [priceData, setPriceData] = useState([
        { label: 'Subtotal', value: 'RM 20' },
        { label: 'Delivery fee', value: 'RM 20' },
        { label: '+ Container/Processing fee', value: 'RM 20' },
        { label: 'including Service Tax', value: 'RM 20' },
        { label: 'Total (Incl. Service Tax)', value: 'RM 20', fontWeight: 'bold' },
    ]);
    const [swiperImg] = useState([
        { image: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider4.jpg" },
        { image: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider1.jpg" },
        { image: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider2.jpg" },
        { image: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider3.jpg" },
        { image: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider4.jpg" },
        { image: "http://tourism.denoo.my/TourismApi/images/place/487/487_slider1.jpg" },
    ]);
    const [breadcrumb, setBreadcrumb] = useState([
        { title: "Home", url: "/" },
        { title: "LocalFood", url: "/FoodCategory" },
    ]);
    const RatingList = [{ id: 5, value: 5 }, { id: 4, value: 4 }, { id: 3, value: 3 }, { id: 2, value: 2 }, { id: 1, value: 1 }]

    useEffect(() => {

        var selectrestaurant = restaurantsDummy.restaurants.find(restaurant => restaurant.id === parseInt(id))
        const Allratings = selectrestaurant.menu.map((item) => item.rating);
        const allCommentsInRestaurant = selectrestaurant.menu.map((item) => item.comments);
        const averageRating = Allratings.reduce((total, rating) => total + rating, 0) / Allratings.length;
        const numRatings = Allratings.length;
        const drinks = selectrestaurant.menu.filter((item) => item.category === 'drink');
        const foods = selectrestaurant.menu.filter((item) => item.category !== 'drink');
        selectrestaurant['averageRating'] = averageRating;
        selectrestaurant['numRatings'] = numRatings;
        selectrestaurant['Allratings'] = Allratings;
        selectrestaurant['allCommentsInRestaurant'] = allCommentsInRestaurant;
        selectrestaurant['drink'] = drinks;
        selectrestaurant['food'] = foods;

        setRestaurant(selectrestaurant)
        setBreadcrumb([{ title: "Home", url: "/" },
        { title: "LocalFood", url: "/FoodCategory" },
        { title: selectrestaurant.name, url: "" }])

    }, [id]);

    // const menuLayout = (typeData, title) => {
    //     return <div style={{ marginTop: '1vw' }}>
    //         <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
    //             <ThumbUpIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.8vw", fontWeight: "500", paddingLeft: "1vw" }}>{title}</h2>
    //         </span>
    //         <div className="row" style={{ paddingTop: "1vw" }}>
    //             {
    //                 typeData.length > 0 && typeData.map((x, index) => {
    //                     const ratings = x.comments.map((item) => item.rating);
    //                     x["averageRating"] = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
    //                     x['numRatings'] = ratings.length;

    //                     return (
    //                         <div className="col CardView" key={index}>
    //                             <Card sx={{ maxWidth: 345 }}>
    //                                 <CardMedia
    //                                     sx={{ height: 140 }}
    //                                     image={x.image}
    //                                     title={x.name}
    //                                 />
    //                                 <CardContent style={{ display: 'flex', justifyContent: "space-between" }}>
    //                                     <Typography gutterBottom variant="title" noWrap color="text" style={{ fontSize: '14px', fontWeight: "bold" }}>
    //                                         {x.name}
    //                                     </Typography>
    //                                     <Typography gutterBottom variant="h5" noWrap style={{ fontSize: '14px' }}>
    //                                         <StarRateIcon style={{ color: '#8fb03d' }} />
    //                                         <strong style={{ fontWeight: 'bold' }}>{x.averageRating}</strong>
    //                                         <span style={{ color: 'grey' }}>/5 ({x.numRatings})</span>
    //                                     </Typography>
    //                                 </CardContent>
    //                                 <CardActions>
    //                                     <Button
    //                                         size="large"
    //                                         fullWidth
    //                                         style={{ backgroundColor: '#8fb03d', color: 'white' }}
    //                                         onClick={() => { setSelectedItem(x); setOpenModal(true) }}
    //                                     ><ShoppingCartIcon />Add to cart</Button>
    //                                 </CardActions>
    //                             </Card>
    //                         </div>

    //                     )
    //                 })
    //             }
    //         </div>
    //     </div>
    // }

    const layout = (typeData, title) => {
        return <div style={{ marginTop: '1vw' }}>
            <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                <ThumbUpIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.8vw", fontWeight: "500", paddingLeft: "1vw" }}>{title}</h2>
            </span>
            <div className="row" style={{ paddingTop: "1vw" }}>
                <VerticalCardListing
                    {...typeData}
                    setSelectedItem={setSelectedItem}
                    setOpenModal={setOpenModal}
                    cards={typeData.length > 0 ? typeData : typeData}
                />

            </div>
        </div>
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
        <>
            {restaurant ?
                <Container maxWidth={false} disableGutters>
                    <div style={{ float: "left", marginTop: "0.75vw", marginLeft: "0.75vw", position: "relative" }} >
                        <PageHeader breadcrumb={breadcrumb} />
                    </div>
                    <Swiper
                        modules={[EffectFade, Pagination, Autoplay]}
                        effect="fade"
                        height={250}
                        width={300}
                        autoplay={{ delay: 5000 }}
                        pagination={{
                            clickable: true,
                        }}
                        loop={true}
                    >
                        {
                            swiperImg.map((el, ind) => {
                                return <SwiperSlide zIndex={0} key={ind}><img src={el.image} alt='' /></SwiperSlide>
                            })
                        }
                    </Swiper>
                    <div className="row justify-content-center" style={{ padding: "2.5vw" }}>
                        <div style={{ fontsize: "1.185vw", textAlign: "justify", fontFamily: "Future Md BT" }}>
                            <h1 style={{ fontSize: "2vw" }}>
                                <span style={{ fontWeight: "bold" }}>{restaurant.name}</span>
                            </h1>
                            <span style={{ color: "#A4A2A2", fontSize: "1.2vw" }}>{restaurant.State}</span>
                            <br />
                            <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                                <Rating style={{ fontSize: "1.8rem" }} value={restaurant.averageRating} /> <label style={{ fontWeight: "bold", paddingLeft: "0.5vw", fontSize: "1.0vw" }}>{restaurant.averageRating} ( {restaurant.numRatings}Review(s))</label>
                            </span>
                        </div>
                        <div className="row justify-content-center" style={{ paddingTop: "1vw" }}>
                            <div className='col-md-6 col-lg-6 col-xl-6 col-sm-12 mx-auto' style={{ borderRight: "1px solid #596a2a" }} >
                                <ul class="list-unstyled" style={{ float: "none" }}>
                                    <li><p style={{ color: "#596a2a", letterSpacing: "0.1vw", display: "block" }}><OperateHour style={{ fill: '#596a2a', fontSize: "1.5vw" }} /><label style={{ paddingLeft: "1vw", fontWeight: "400", fontFamily: "Futura Md BT", fontSize: "1.12vw", color: "black" }}>{restaurant.OperateTime}</label> </p></li>
                                    <li><p style={{ color: "#596a2a", letterSpacing: "0.1vw", display: "block" }}><EmailIcon style={{ fill: '#596a2a', fontSize: "1.5vw" }} /><label style={{ paddingLeft: "1vw", fontWeight: "400", fontFamily: "Futura Md BT", fontSize: "1.12vw", color: "black" }}> {restaurant.Email}</label></p></li>
                                </ul>
                            </div>
                            <div className='col-md-6 col-lg-6 col-xl-6 col-sm-12 mx-auto' >
                                <ul class="list-unstyled" style={{ float: "none" }}>
                                    <li><p style={{ color: "#596a2a", letterSpacing: "0.1vw", display: "block" }}><LocalPhoneIcon style={{ fill: '#596a2a', fontSize: "1.5vw" }} /> <label style={{ paddingLeft: "1vw", fontFamily: "Futura Md BT", fontSize: "1.12vw", fontWeight: "400", color: "black" }}>{restaurant.Contact}</label></p></li>
                                    <li><p style={{ color: "#596a2a", letterSpacing: "0.1vw", display: "block" }}><Website style={{ fill: '#596a2a', fontSize: "1.5vw" }} /> <label style={{ paddingLeft: "1vw", fontWeight: "400", fontFamily: "Futura Md BT", fontSize: "1.12vw", color: "black" }}>{restaurant.Website}</label></p></li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ paddingTop: "2.5vw" }}>
                            <span style={{ fontWeight: "500", fontSize: "1.185vw", fontFamily: 'Futura Md BT', textAlign: "justify", color: "black" }}>
                                {restaurant.PlaceDesc}
                            </span>
                        </div>
                        {/* FOODS */}
                        {layout(restaurant.food, "Popular")}
                        {/* Drinks */}
                        {layout(restaurant.drink, "Drinks")}


                        <div style={{ paddingTop: "50px" }}>
                            <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                                <Marker style={{ fill: '#596a2a', fontSize: "2.8vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.5vw", paddingLeft: "1vw" }}>Location Map</h2>
                            </span>
                            <div style={{ paddingTop: "20px" }}>
                                <MapModule
                                    coordinate={{ address: restaurant.name, lat: restaurant.latitude, lng: restaurant.longitude }}
                                    showMarker={true}
                                    height={500}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Review */}
                    <div className="row justify-content-center" style={{ padding: "2.5vw" }}>
                        <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                            <StarIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.5vw", fontWeight: "500", paddingLeft: "1vw" }}>Review (s)</h2>
                        </span>
                        <div className="row justify-content-center" style={{ paddingTop: "1vw" }}>
                            <div className='col-md-3 col-lg-3 col-xl-3 col-sm-12 mx-auto' style={{ textAlign: "center" }}>
                                <div style={{ fontWeight: "bold", fontSize: "2vw" }}>
                                    {restaurant.averageRating}
                                </div>
                                <Rating style={{ fontSize: "1.8vw" }} value={restaurant.averageRating} />
                                <div style={{ fontWeight: "500", fontSize: "1.4vw", color: "#808080" }}> {restaurant.numRatings} Rating(s)</div>
                            </div>
                            <div className='col-md-9 col-lg-9 col-xl-9 col-sm-12 mx-auto' >
                                <table style={{ width: "-webkit-fill-available" }}>
                                    {
                                        RatingList.map((x, ind) => {
                                            return (
                                                <tr style={{ paddingTop: "1vw" }} key={ind}>
                                                    <td style={{ width: "5%" }}><label style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{x.value} star</label></td>
                                                    <td style={{ width: "90%" }}> <LinearProgress color="success" style={{ color: "#596a2a", height: "1vw" }} variant="determinate" value={restaurant.Allratings.filter((y) => y === x.value).length / restaurant.Allratings.length * 100} /></td>
                                                    <td style={{ width: "5%", paddingLeft: "0.5vw" }}><label style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{restaurant.Allratings.filter((y) => y === x.value).length}</label></td>
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
                                    restaurant.allCommentsInRestaurant.length > 0 && restaurant.allCommentsInRestaurant.flat().slice(0, numToShow).map((x, ind) => {
                                        return (
                                            <tr style={{ paddingTop: "1vw" }} key={ind}>
                                                <td style={{ width: "5%", textAlign: "right" }}> <img width="50%" src={USER ? USER : USER} alt={123} onError={(e) => (e.target.src = USER)} /></td>
                                                <td style={{ width: "90%", padding: "20px" }}>
                                                    <div className="'col-md-10 col-lg-10 col-xl-10 col-sm-10'">
                                                        <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
                                                            <div id="review_author" className=" review__author" style={{ fontWeight: "bold", fontSize: "1.0vw" }}>{x.name} <label style={{ fontSize: "0.7vw", color: "#c6c6c6", fontWeight: "500" }}>({x.Date})</label></div>
                                                            <div id="review_rating" className=" review__rating">
                                                                <Rating style={{ fontSize: "1.2rem" }} value={x.rating} />
                                                            </div>
                                                            <div id="review_comment"><label style={{ fontSize: "0.9vw" }}>{x.text}</label></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            <Button fullwidth className='text-center p-2' style={{ backgroundColor: "lightgrey" }} onClick={() => { setexpandReview(!expandReview); !expandReview ? setnumToShow(restaurant.allCommentsInRestaurant.flat().length) : setnumToShow(3) }}>{expandReview ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
                            </Button>
                        </div>
                    </div>

                    <Recommend type="Restaurants" />

                    <ModalComponent
                        open={openModal}
                        maxWidth={"sm"}
                        title={selectedItem.name}
                        draggable={false}
                        className="modalLanding"
                        handleOnClose={() => setOpenModal(!openModal)}
                    >
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={6} container direction="column">
                                    <img src={selectedItem.image} style={{ width: "100%", maxWidth: 400 }} borderWidth="0px" alt={selectedItem.value} />
                                    <Divider style={{ margin: "1vw 0vw 1vw 0vw" }} variant="middle" >
                                        <Chip label="Fees" />
                                    </Divider>
                                    <Grid item container>
                                        {priceData.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <Grid item xs={6}>
                                                    <Typography gutterBottom variant="h5" style={{ fontSize: '14px', fontWeight: item.fontWeight }}>
                                                        {item.label}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography gutterBottom variant="h5" style={{ fontSize: '14px', fontWeight: item.fontWeight, textAlign: 'right' }}>
                                                        {item.value}
                                                    </Typography>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} container direction="column" flex={true}>
                                    <Grid item container>
                                        <Typography gutterBottom variant="title" style={{ fontSize: '14px' }}>
                                            Choice of Spicy
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
                                                onChange={(quantity) => { setnumberOFItem(quantity) }}
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
                                                onClick={() => { setOpenModal(false) }}
                                            ><ShoppingCartIcon />Add to cart</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </ModalComponent>
                </Container> : <Container></Container>
            }
        </>
    );
};

export default LocalFoodDetail;
