import React, { Component } from "react";
import { connect } from "react-redux";

import { Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@material-ui/lab/Rating";
import PageHeader from "../../tools/breadcrumb/breadcrumb";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

import Recommend from "../../components/Recomend";
import HotelModal from "../Hotel/HotelModal";
import {
    Grid,
    Typography,
    Stack,
    Divider,
    Button,
    Container,
    LinearProgress
} from "@mui/material";
import "../Hotel/HotelDetails";
import { swiperImg, recommend ,RatingList} from './ProductsData';
import InputNumber from '../../components/InputNumber/InputNumber';
import './product.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { VerticalCardListing } from '../../components/verticalCardListing/verticalCardListing';
import StarIcon from '@mui/icons-material/Star';
import USER from "../../assets/user.png";

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
    variation: { "Shipping": "Free Shipping" },
    numberOFItem: 1,
    isExpand: false
};

class ProductsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() { }

    componentDidUpdate(prevProps, prevState) { }

    render() {
        return (
            <div style={{ backgroundColor: "white" }}>

                <div
                    style={{
                        // float: "left",
                        marginTop: "0.75vw",
                        marginLeft: "0.75vw",
                        // position: "relative",
                        width: "100vw"
                    }}
                >
                    <PageHeader breadcrumb={this.state.breadcrumb} style={{ marginLeft: 0 }} />
                </div>

                <div className="product__content row ">
                    <div className="col-8 ms-5">
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
                    </div>
                    <div className="col-7">
                        <div className="product__info">
                            <div className="row" >
                                <Typography
                                    variant='title'
                                    style={{ fontWeight: "bold", textAlign: "left", fontSize: "2rem" }} > {recommend[0].name} </Typography>
                                <Typography className="col-12" >
                                    Merchant Shop: {recommend[0].shopName}
                                </Typography>
                            </div>
                            <Grid item style={{ marginTop: "10px" }} >
                                <Stack direction="column" spacing={1}>

                                    <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem style={{ color: '596a2a' }} />}>
                                        <Typography variant='subtitle2'>{recommend[0].hotelStar} <Rating
                                            style={{ fontSize: "1.0rem" }}
                                            value={recommend[0].hotelStar}
                                        /></Typography>
                                        <Typography variant='subtitle2'>{recommend[0].reviewNum} reviews</Typography>
                                        <Typography variant='subtitle2'>{recommend[0].soldNum} sold</Typography>
                                    </Stack>
                                    {/* <Grid item container> */}
                                    {/* <Grid item xs={2}>
                                            <Typography gutterBottom variant="h5" style={{ fontSize: '14px' }}>Shipping</Typography>
                                        </Grid> */}
                                    {/* <Grid item xs> */}
                                    {/* <Stack direction="column" spacing={1}>
                                                <Typography gutterBottom variant="h5" style={{ fontSize: '14px' }}><LocalShippingIcon /> Free Shipping</Typography>
                                                <Typography gutterBottom variant="h5" style={{ fontSize: '14px' }}><LocalShippingIcon /> Shipping To</Typography>
                                            </Stack> */}
                                    {/* </Grid> */}
                                    {/* </Grid> */}
                                </Stack>
                            </Grid>
                        </div>
                        <div className="product__sidebar">
                            <Typography variant='title'
                                style={{ fontWeight: "bold", textAlign: "left", fontSize: "2rem" }}
                            >
                                RM {this.state.numberOFItem === 0 ? recommend[0].price : recommend[0].price * this.state.numberOFItem}
                            </Typography>
                            <div className="product__option">
                                <label className="product__option-label">
                                    Variation:
                                </label>
                                <div className="product__variation">
                                    {
                                        recommend[0].variation.map((variation, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className={
                                                        variation.ProductVariationDetailID === this.state.productVariationDetailID ?
                                                            'btn product__variation-button--selected'
                                                            : 'btn product__variation-button'
                                                    }
                                                    onClick={() => this.setState({
                                                        productVariation: variation.ProductVariationValue,
                                                        productQuantity: variation.ProductStockAmount,
                                                        productPrice: variation.ProductVariationPrice,
                                                        productVariationDetailID: variation.ProductVariationDetailID,
                                                        selectedVariation: variation,
                                                        isVariationSet: true
                                                    })}
                                                >
                                                    {variation.ProductVariationValue}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="product__option">
                                <div className="row form-group product__option d-flex align-items-center">
                                    <div className="col-12 col-lg-3 col-xl-3">
                                        <label
                                            htmlFor="recommend-quantity"
                                            className="product__option-label"
                                        >
                                            Quantity
                                        </label>
                                    </div>
                                    <div className="col-12 col-lg-5 col-xl-5 product__actions-item">
                                        <InputNumber
                                            aria-label="Quantity"
                                            size="lg"
                                            min={1}
                                            value={this.state.numberOFItem}
                                            onChange={(numberOFItem) => this.setState({ numberOFItem })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group product__option product__add-to-cart" >
                                    <div className="product__actions">
                                        <div className="product__actions-item product__actions-item--addtocart mx-1">
                                            <button
                                                type="button"
                                                onClick={() => { }}
                                                className="btn  product__variation-button--selected "
                                                style={{ borderRadius: "5px" }}
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center" style={{ padding: "3vw" }}>
                    <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                        <h2
                            style={{
                                color: "#596a2a",
                                paddingTop: "0.8vw",
                                fontWeight: "500",
                            }}
                        >
                            Product Description:
                        </h2>
                    </span>
                    <div style={{ paddingTop: "10px" }}>
                        <p>
                            The Sarawak bead necklace is a traditional jewelry piece originating from Sarawak, a state in Malaysia. It is known for its intricate beadwork and cultural significance.</p>
                        <p>
                            The necklace is typically handcrafted using small, colorful beads made from various materials such as glass, seed, or gemstones. Skilled artisans meticulously string these beads together, creating beautiful patterns and designs that reflect the rich cultural heritage of Sarawak.

                            Each Sarawak bead necklace is unique, featuring a combination of vibrant colors and patterns that hold symbolic meaning. These necklaces often incorporate traditional motifs inspired by nature, folklore, or tribal influences. They serve as adornments for both everyday wear and special occasions, representing cultural identity and personal style.
                        </p><p>
                            Beyond their aesthetic appeal, Sarawak bead necklaces hold cultural and historical significance. They are cherished heirlooms passed down through generations, reflecting the traditions and customs of the indigenous communities in Sarawak. These necklaces are worn with pride, as they symbolize cultural heritage, craftsmanship, and the beauty of diversity.

                            Whether worn as a fashion statement or as a cultural artifact, the Sarawak bead necklace showcases the artistry and craftsmanship of the Sarawakian people. It serves as a tangible connection to the region's history, traditions, and vibrant cultural tapestry.
                        </p>
                    </div>
                </div>

                <div style={{ paddingLeft: "3vw", paddingRight: "3vw" }}>
                    <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                        <h2 style={{ color: "#596a2a", paddingTop: "0.8vw", fontWeight: "500" }}>Products in this shop</h2>
                    </span>
                    <div className="row" style={{ paddingTop: "1vw" }}>
                        <VerticalCardListing
                            setSelectedItem={() => { }}
                            setOpenModal={() => { }}
                            cards={recommend.length > 0 ? recommend : recommend}
                            page="product"
                        />

                    </div>
                </div>

                <div className="row justify-content-center" style={{ padding: "2.5vw" }}>
                    <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                        <StarIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.5vw", fontWeight: "500", paddingLeft: "1vw" }}>Review (s)</h2>
                    </span>
                    <div className="row justify-content-center" style={{ paddingTop: "1vw" }}>
                        <div className='col-md-3 col-lg-3 col-xl-3 col-sm-12 mx-auto' style={{ textAlign: "center" }}>
                            <div>      <Typography style={{ fontWeight: "bold", fontSize: "2vw" }}>{recommend[0].Rating}</Typography></div>
                            <div>      <Rating style={{ fontSize: "1.8vw" }} value={recommend[0].Rating} /></div>
                            <div> <Typography style={{ fontWeight: "500", fontSize: "1.4vw", color: "#808080" }}> {recommend[0].Review.length} Rating(s)</Typography></div>
                        </div>
                        <div className='col-md-9 col-lg-9 col-xl-9 col-sm-12 mx-auto' >
                            <table style={{ width: "-webkit-fill-available" }}>
                                {
                                    RatingList.map((x) => {
                                        return (
                                            <tr style={{ paddingTop: "1vw" }}>
                                                <td style={{ width: "5%" }}><Typography style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{x.value} star</Typography></td>
                                                <td style={{ width: "90%" }}> <LinearProgress color="success" style={{ color: "#596a2a", height: "1vw" }} variant="determinate" value={recommend[0].Review.filter((y) => y.Rating === x.value).length / recommend[0].Review.length * 100} /></td>
                                                <td style={{ width: "5%", paddingLeft: "0.5vw" }}><Typography style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{recommend[0].Review.filter((y) => y.Rating === x.value).length}</Typography></td>
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
                                recommend[0].Review.length > 0 && recommend[0].Review.map((x) => {
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

                <Recommend type="Product" />

            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);
