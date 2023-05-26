import React, { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../pages/Dashboard/swiperstyle.css';
import { Typography, Card, CardMedia, CardContent, Button, CardActions, Grid, Divider } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import Rating from "@material-ui/lab/Rating";

export const VerticalCardListing = ({ cards, setSelectedItem, setOpenModal }) => {
    const [indexImageHover, setindexImageHover] = useState(false);
    return (
        <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={50}
            navigation={true}
        >
            {
                cards.map((card, index) => {
                    const ratings = card.comments.map((item) => item.rating);
                    card["averageRating"] = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
                    card['numRatings'] = ratings.length;
                    return (
                        <SwiperSlide key={card.id}>
                            <Card sx={{ minHeight: 300, maxHeight: 450 }} style={{ boxShadow: "0.2vw 0.3vw 0.5vw #888888", marginBottom:"20px" }} >
                                <CardMedia
                                    sx={{ height: 194 }}
                                    image={card.image}
                                    alt={card.name}
                                    style={{ opacity: indexImageHover === index ? "50%" : "100%", }}
                                    onMouseOver={() => setindexImageHover(index)}
                                    onMouseOut={() => setindexImageHover()}
                                />
                                <CardContent>
                                    <Typography color="text" style={{ fontWeight: "bold", textAlign: "left", }} >
                                        {card.name}
                                    </Typography>
                                    <Typography color="text" variant="body2" fontWeight="700" >
                                        {card.subtitle}
                                    </Typography>
                                    <div className="row mb-2">
                                        <div className="col-4">
                                            <Rating
                                                style={{ fontSize: "1.0rem" }}
                                                value={card.averageRating}
                                            />{" "}
                                        </div>
                                        <div className="col-8">
                                            <Typography variant="body2">{card.averageRating} ratings</Typography>
                                        </div>
                                    </div>
                               
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
                                                RM {card.price}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button size="large" fullWidth style={{ backgroundColor: "#8fb136", color: "white" }} onClick={() => { setSelectedItem(card); setOpenModal(true); }}>
                                                Add To Cart
                                            </Button>
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
