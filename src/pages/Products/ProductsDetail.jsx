import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { GitAction } from "../../store/action/gitAction";

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
    LinearProgress,
    Chip,
    Snackbar,
    Alert,
    Dialog,
    DialogContent,
} from "@mui/material";
import "../Hotel/HotelDetails";
import { swiperImg, recommend, RatingList } from './ProductsData';
import InputNumber from '../../components/InputNumber/InputNumber';
import './product.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { VerticalProductCardListing } from '../../components/verticalCardListing/verticalProductCardListing';
import StarIcon from '@mui/icons-material/Star';
import USER from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import LoginComponent from '../../pages/Login/LoginComponent'
import ProductSkeleton from './ProductSkeleton'
import LoadingPanel from '../../components/shared/LoadingPanel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductsDetail(props) {

    const { productList, productCart, logonUser, productDetails } = useSelector(state => ({
        productCart: state.counterReducer.productCart,
        productList: state.counterReducer.productList,
        logonUser: state.counterReducer.logonUser,
        productDetails: state.counterReducer.productDetails,
    }));

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const vertical = 'top'
    const horizontal = 'right'
    const baseColor = "#c4c4c4"
    const highlightColor = "#ffffff"
    let UserID = localStorage.getItem("UserID")

    const [breadcrumb, setBreadcrumb] = useState([
        { title: "Home", url: "./" },
        { title: "Products", url: "./Products" },
        { title: "", url: "" },
    ]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isExpand, setIsExpand] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState({ id: "", price: "", stock: "" });
    const [notification, setNotification] = useState({
        open: false,
        msg: "",
        type: "success",
        isCart: false
    });

    useEffect(() => {
        if (id) {
            dispatch(GitAction.CallViewProductDetails({
                productID: id,
                userID: 0,
                platformType: "myemporia"
            }))
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (logonUser.length > 0) {
            if (logonUser[0].ReturnVal === 1) {
                setOpenDialog(false)
            }
        }
    }, [logonUser]);

    useEffect(() => {
        if (productDetails.length > 0) {
            const listing = breadcrumb
            listing[2] = { title: productDetails[0].ProductName, url: "" }
            setBreadcrumb(listing)
            document.getElementById('imageHeader')?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [productDetails, breadcrumb]);

    const handleAddCart = () => {
        if (UserID) {
            if (selectedVariation.stock < selectedAmount)
                setNotification({ open: true, msg: "Insufficient stock for your purchase", type: "error", isCart: true })
            else if (selectedVariation.stock >= selectedAmount) {
                const filterData = productCart.filter((x) => x.ProductVariationDetailID === selectedVariation.id && x.ProductID === id)
                if (filterData.length > 0)
                    dispatch(GitAction.CallUpdateProductCartItem({
                        userCartID: filterData[0].UserCartID,
                        quantity: selectedAmount + Number(filterData[0].ProductQuantity)
                    }))
                else
                    dispatch(GitAction.CallAddProductCart({
                        userID: UserID,
                        productID: id,
                        quantity: selectedAmount,
                        variationDetailID: selectedVariation.id,
                        promoCode: 0
                    }))
            } else
                setNotification({ open: true, msg: "Please select required variation", type: "warning", isCart: true })
        } else
            setOpenDialog(true)
    }

    const handleAddDefaultCart = (data) => {
        if (UserID) {

            if (productCart.length > 0) {
                let variationID = ""

                if (data.ProductVariation !== null && data.ProductVariation !== "[]")
                    variationID = JSON.parse(data.ProductVariation)[0].ProductVariationDetailID

                const filterData = productCart.filter((x) => x.ProductID === data.ProductID && x.ProductVariationDetailID === Number(variationID))
                if (filterData.length > 0)
                    dispatch(GitAction.CallUpdateProductCart({
                        userCartID: filterData[0].UserCartID,
                        quantity: Number(filterData[0].ProductQuantity) + 1
                    }))
                else {
                    let variationID = ""
                    if (variationID !== "") {
                        dispatch(GitAction.CallAddProductCart({
                            userID: UserID,
                            productID: data.ProductID,
                            quantity: 1,
                            variationDetailID: variationID,
                            promoCode: 0
                        }))
                    }
                }
            }
        } else
            setOpenDialog(true)
    }

    const getReviewListing = (data) => {
        let filterListing = []
        if (data !== "[]" && data !== null)
            filterListing = JSON.parse(data)

        return filterListing
    }

    return (


        productDetails.length > 0 ?
            <div style={{ backgroundColor: "white" }} id="imageHeader">
                <div
                    style={{
                        // float: "left",
                        marginTop: "0.75vw",
                        marginLeft: "0.75vw",
                        // position: "relative",
                        width: "100vw"
                    }}
                >
                    <PageHeader breadcrumb={breadcrumb} style={{ marginLeft: 0 }} />
                </div>

                <div className="product__content row " >
                    <div className="col-8 ms-5">
                        {productDetails[0].ProductID === Number(id) ?
                            <Swiper
                                style={{ width: "35vw" }}
                                modules={[EffectFade, Pagination, Autoplay]}
                                effect="fade"
                                autoplay={{ delay: 5000 }}
                                pagination={{
                                    clickable: true,
                                }}
                                loop={true}
                            >
                                {
                                    productDetails[0].ProductImages !== null && productDetails[0].ProductImages !== "[]"
                                    && JSON.parse(productDetails[0].ProductImages).map((el) => {
                                        return (
                                            <SwiperSlide >
                                                <img src={el.ProductMediaUrl} alt={el.ProductMediaTitle} style={{ height: "100%", width: "100%", display: "block", objectFit: "cover", opacity: 1 }} />
                                            </SwiperSlide>
                                        );
                                    })
                                }
                            </Swiper>

                            :
                            <Skeleton height={600} baseColor={baseColor} highlightColor={highlightColor} />
                        }
                    </div>

                    <div className="col-8">                        
                        {
                            productDetails[0].ProductID === Number(id) ?
                                <>

                                    <div className="product__info">
                                        <div className="row" >
                                            <Typography
                                                variant='title'
                                                style={{ fontWeight: "bold", textAlign: "left", fontSize: "2rem" }} > {productDetails[0].ProductName} </Typography>
                                            <Typography className="col-12" >
                                                Merchant Shop: {productDetails[0].ShopName}
                                            </Typography>
                                        </div>
                                        <div className="product__rating">

                                            <div className="product__rating-stars">
                                                <Rating value={productDetails[0].ProductRating !== null ? productDetails[0].ProductRating : 0} />
                                            </div>

                                            <div className="product__rating-legend" style={{ paddingTop: "5px", paddingRight: "10px", paddingLeft: "10px", color: "grey" }}>
                                                <Typography variant='subtitle2'> {(productDetails[0].ProductRating).toFixed(1)} / 5.0 </Typography>
                                            </div>
                                            <div className="product__rating-legend" style={{ paddingTop: "5px", paddingRight: "10px", paddingLeft: "10px", color: "grey" }}>
                                                <Typography variant='subtitle2'>( {productDetails[0].ProductReviewCount} Reviews )</Typography>
                                            </div>
                                            <div className="product__rating-legend" style={{ paddingTop: "5px", color: "grey" }}>
                                                <Typography variant='subtitle2'> Write A Review</Typography>
                                            </div>
                                        </div>
                                        {/* <Divider/> */}
                                    </div>

                                    <ul className="product__meta">
                                        {
                                            selectedVariation.id !== "" ?
                                                selectedVariation.stock > 0 ?
                                                    <Chip size="small" variant="outlined" color="success" label={`In Stock" (  ${selectedVariation.id !== "" ? selectedVariation.stock : productDetails[0].ProductStockAmount > 0 ? productDetails[0].ProductStockAmount : 0} ) `} />
                                                    :
                                                    <Chip size="small" variant="outlined" color="error" label={`Out of Stock ( ${selectedVariation.id !== "" ? selectedVariation.stock : productDetails[0].ProductStockAmount > 0 ? productDetails[0].ProductStockAmount : 0} )`} />
                                                :
                                                productDetails[0].ProductStockAmount !== null && productDetails[0].ProductStockAmount > 0 ?
                                                    <Chip size="small" variant="outlined" color="success" label={`In Stock ( ${selectedVariation.id !== "" ? selectedVariation.stock : productDetails[0].ProductStockAmount > 0 ? productDetails[0].ProductStockAmount : 0} )`} />
                                                    :
                                                    <Chip size="small" variant="outlined" color="error" label={`Out of Stock ( ${selectedVariation.id !== "" ? selectedVariation.stock : productDetails[0].ProductStockAmount > 0 ? productDetails[0].ProductStockAmount : 0} )`} />
                                        }
                                        &nbsp;
                                        <Chip variant="outlined" color="secondary" label={"Brand: " + (productDetails[0].Brand === "-" ? "None" : productDetails[0].Brand)} size="small">

                                        </Chip>&nbsp;

                                        <Chip variant="outlined" color="info" label={"SKU: " + (productDetails[0].SKU === "-" ? "N/A" : productDetails[0].SKU)} size="small" />&nbsp;
                                    </ul>

                                    <div className="product__sidebar">
                                        <Typography variant='title'
                                            style={{ fontWeight: "bold", textAlign: "left", fontSize: "2rem" }}
                                        >
                                            RM {selectedVariation.id !== "" ? selectedVariation.price === null ? "N/A" : (selectedVariation.price).toFixed(2) : productDetails[0].ProductPrice}
                                        </Typography>
                                        <div className="product__option">
                                            <label className="product__option-label" style={{ fontWeight: "bold", paddingTop: "10px", fontSize: "15px" }}>
                                                Variation:
                                            </label>
                                            <div className="product__variation">
                                                {
                                                    productDetails[0].ProductVariation !== null && productDetails[0].ProductVariation !== "[]" &&
                                                    JSON.parse(productDetails[0].ProductVariation).map((variation, index) => {
                                                        return (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                className={
                                                                    variation.ProductVariationDetailID === selectedVariation.id ?
                                                                        'btn product__variation-button--selected'
                                                                        : 'btn product__variation-button'
                                                                }
                                                                onClick={() => {
                                                                    setSelectedVariation({
                                                                        id: variation.ProductVariationDetailID,
                                                                        stock: variation.ProductStockAmount === null ? 0 : variation.ProductStockAmount,
                                                                        price: variation.ProductVariationPrice === null ? 0 : variation.ProductVariationPrice
                                                                    })
                                                                }}
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
                                                        style={{ fontWeight: "bold", fontSize: "15px" }}
                                                    >
                                                        Quantity
                                                    </label>
                                                </div>
                                                <div className="col-12 col-lg-5 col-xl-5 product__actions-item">
                                                    <InputNumber
                                                        aria-label="Quantity"
                                                        size="lg"
                                                        min={1}
                                                        value={selectedAmount}
                                                        onChange={(numberOFItem) => setSelectedAmount(numberOFItem)}
                                                    />
                                                </div>
                                            </div>
                                            {notification.type === "error" && notification.isCart === true
                                                && <Alert severity="error" >{notification.msg}</Alert>}

                                            <div className="form-group product__option product__add-to-cart" >
                                                <div className="product__actions">
                                                    <div className="product__actions-item product__actions-item--addtocart mx-1">
                                                        <Button size="large"
                                                            style={{ backgroundColor: "#8fb136", fontWeight:"bold", color: "white", width: "8vw", borderRadius: "0.3vw", padding: "0.50vw", }}
                                                            onClick={handleAddCart} >
                                                            Add To Cart
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </> :
                                <ProductSkeleton
                                    highlightColor={highlightColor}
                                    baseColor={baseColor} />
                        }

                    </div>
                </div>

                {
                    productDetails[0].ProductID === Number(id) ?

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
                                <div className="typography">
                                    {/* <div className="product__description--title">Product Description</div> */}

                                    {productDetails[0].ProductDescription === "" || productDetails[0].ProductDescription === null ?
                                        <div className="product__description"><label>Temporary there is no description for this product</label></div>
                                        :
                                        <div className={isExpand ? "product__description_expand" : "product__description"}>
                                            <p style={{ fontSize: "20px", }} dangerouslySetInnerHTML={{ __html: productDetails[0].ProductDescription }} />
                                            <p className="read-more" ></p>
                                            <p className="read-more-text" style={{ fontSize: "20px", padding: "5px" }} onClick={() => setIsExpand(!isExpand)}>{isExpand ? "Read Less" : "Read More"} </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="row justify-content-center" style={{ padding: "3vw" }}>
                            <Skeleton height={100} baseColor={baseColor} highlightColor={highlightColor} />
                        </div>
                }

                <div style={{ paddingLeft: "3vw", paddingRight: "3vw" }}>
                    <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                        <h2 style={{ color: "#596a2a", paddingTop: "0.8vw", fontWeight: "500" }}>Products in this shop</h2>
                    </span>
                    <div className="row" style={{ paddingTop: "1vw" }}>
                        <VerticalProductCardListing
                            setSelectedItem={() => { }}
                            setOpenModal={() => { }}
                            cards={productDetails[0].ProductRecommendation !== null && productDetails[0].ProductRecommendation !== "[]" ? JSON.parse(productDetails[0].ProductRecommendation) : []}
                            page="productDetails[0]"
                            handleOnClick={handleAddDefaultCart}
                            isLoding={productDetails[0].ProductID === Number(id) ? false : true}
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />

                    </div>
                </div>

                {
                    productDetails[0].ProductID === Number(id) ?
                        <>

                           

                            <div className="row justify-content-center" style={{ padding: "2.5vw" }}>
                                <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                                    <StarIcon style={{ fill: '#596a2a', fontSize: "2.5vw" }} /> <h2 style={{ color: "#596a2a", paddingTop: "0.5vw", fontWeight: "500", paddingLeft: "1vw" }}>Review (s)</h2>
                                </span>
                                <div className="row justify-content-center" style={{ paddingTop: "1vw" }}>
                                    <div className='col-md-3 col-lg-3 col-xl-3 col-sm-12 mx-auto' style={{ textAlign: "center" }}>
                                        <div>      <Typography style={{ fontWeight: "bold", fontSize: "2vw" }}>{productDetails[0].ProductRating}</Typography></div>
                                        <div>      <Rating style={{ fontSize: "1.8vw" }} value={productDetails[0].ProductRating} /></div>
                                        <div> <Typography style={{ fontWeight: "500", fontSize: "1.4vw", color: "#808080" }}> {productDetails[0].ProductReviewCount} Rating(s)</Typography></div>
                                    </div>
                                    <div className='col-md-9 col-lg-9 col-xl-9 col-sm-12 mx-auto' >
                                        <table style={{ width: "-webkit-fill-available" }}>
                                            {
                                                RatingList.map((x) => {
                                                    return (
                                                        <tr style={{ paddingTop: "1vw" }}>
                                                            <td style={{ width: "5%" }}><Typography style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{x.value} star</Typography></td>
                                                            <td style={{ width: "90%" }}> <LinearProgress color="success" style={{ color: "#596a2a", height: "1vw" }} variant="determinate" value={getReviewListing(productDetails[0].ProductReview).filter((y) => y.Rating === x.value).length / getReviewListing(productDetails[0].ProductReview).length * 100} /></td>
                                                            <td style={{ width: "5%", paddingLeft: "0.5vw" }}><Typography style={{ fontWeight: "bold", fontSize: "0.9vw" }}>{getReviewListing(productDetails[0].ProductReview).filter((y) => y.Rating === x.value).length}</Typography></td>
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
                                            getReviewListing(productDetails[0].ProductReview).map((x) => {
                                                return (
                                                    <tr style={{ paddingTop: "1vw" }}>
                                                        <td style={{ width: "5%", textAlign: "right" }}> <img width="50%" src={USER ? USER : USER} alt={123} onError={(e) => (e.target.src = USER)} /></td>
                                                        <td style={{ width: "90%", padding: "20px" }}>
                                                            <div className="'col-md-10 col-lg-10 col-xl-10 col-sm-10'">
                                                                <div id="review_content" className=" review__content" style={{ width: "100%", textAlign: "left" }}>
                                                                    <div id="review_author" className=" review__author" style={{ fontWeight: "bold", fontSize: "1.0vw" }}>{x.Name} <Typography style={{ fontSize: "0.7vw", color: "#c6c6c6", fontWeight: "500" }}>({x.CreatedDate})</Typography></div>
                                                                    <div id="review_rating" className=" review__rating">
                                                                        <Rating style={{ fontSize: "1.2rem" }} value={x.ProductReviewRating} />
                                                                    </div>
                                                                    <div id="review_comment"><Typography style={{ fontSize: "0.9vw" }}>{x.ProductReviewComment}</Typography></div>
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
                        </>
                        :
                        ""

                }

                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={notification.open}
                    autoHideDuration={1000}
                    key={vertical + horizontal}
                >
                    <Alert onClose={() => setNotification({ open: false, msg: "", type: "", isCart: false })} severity={notification.type} sx={{ width: '100%' }}>
                        {notification.msg}
                    </Alert>
                </Snackbar>

                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}>
                    <DialogContent sx={{ overflow: 'unset' }}>
                        <LoginComponent />
                    </DialogContent>
                </Dialog>

            </div >
            :           
            <LoadingPanel backgroundColor="#f5f5f500" />

    );
}

