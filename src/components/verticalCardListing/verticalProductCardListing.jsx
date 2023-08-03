import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../pages/Dashboard/swiperstyle.css';
import { Typography, Card, CardMedia, CardContent, Button, CardActions, Grid, Divider } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import Rating from "@material-ui/lab/Rating";

export const VerticalProductCardListing = ({ cards, setSelectedItem, setOpenModal, page, handleOnClick }) => {
    const [indexImageHover, setindexImageHover] = useState(false);
    const history = useHistory();
    console.log("cardscardscards", cards)
    return (
        <Swiper
            modules={[Navigation]}
            slidesPerView={6}
            slidesPerColumnFill="column"
            navigation={true}
        >
            {
                cards.map((card, index) => {
                    console.log("cardcard", card)
                    if (page === "restaurant") {
                        const ratings = card.comments.map((item) => item.rating);
                        card["averageRating"] = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
                        card['numRatings'] = ratings.length;
                    } else {
                        card["averageRating"] = card.ProductRating;
                        card['numRatings'] = card.ProductReviewCount;
                    }
                    return (
                        <SwiperSlide key={card.id}>
                            <Card sx={{ minHeight: 450, maxHeight: 450, margin:0.5,  paddingLeft: 1 , paddingRight: 1, boxShadow: "0.2vw 0.3vw 0.5vw #888888",  }}  >
                                
                                <CardContent>
                                    <CardMedia
                                        sx={{ height: 270 }}
                                        image={card.ProductImage}
                                        alt={card.ProductName}
                                        style={{ opacity: indexImageHover === index ? "50%" : "100%", }}
                                        onMouseOver={() => setindexImageHover(index)}
                                        onMouseOut={() => setindexImageHover()}
                                        onClick={() => history.push(`/ProductsDetail/${card.ProductID}`)}

                                    />
                                    <Typography color="text" style={{ fontWeight: "bold", textAlign: "left", minHeight: "2.5vw" }} >
                                        {card.ProductName}
                                    </Typography>
                                    <Typography color="text" variant="body2" fontWeight="700" >
                                        {card.ProductVariation !== null && card.ProductVariation !== "[]" ?
                                            JSON.parse(card.ProductVariation)[0].ProductVariationValue : "-"
                                        }
                                    </Typography>
                                    <div className="row mb-2">
                                        <div className="col-4">
                                            <Rating
                                                style={{ fontSize: "1.0rem" }}
                                                value={card.ProductRating}
                                            />{" "}
                                        </div>
                                        <div className="col-8">
                                            <Typography variant="body2">{card.ProductRating} ratings</Typography>
                                        </div>
                                    </div>

                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
                                                RM {
                                                    card.ProductVariation !== null && card.ProductVariation !== "[]" ?
                                                        (JSON.parse(card.ProductVariation)[0].ProductVariationPrice).toFixed(2) : (0).toFixed(2)
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button size="large"
                                                disabled={card.ProductVariation === null || card.ProductVariation === "[]" && true}
                                                // onClick={() => handleOnClick(card)}>
                                               fullWidth style={{ backgroundColor: card.ProductVariation === null || card.ProductVariation === "[]" ? "grey" : "#8fb136", color: "white" }} 
                                               onClick={() => { handleOnClick(card) }}>
                                                Add To Cart
                                            </Button>
                                            {card.ProductVariation === null || card.ProductVariation === "[]" && <Typography color="red" variant="subtitle2">Not Available</Typography>}

                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>


                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
};
