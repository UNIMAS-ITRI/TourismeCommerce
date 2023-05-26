import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// @mui
import {
    Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, Container, FormControl, InputLabel, Select, MenuItem, Chip, Divider, Stack, makeStyles
} from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import { foodCategories, restaurantsDummy } from './LocalFoodData';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// ----------------------------------------------------------------------

export default function LocalFoodCategories() {
    const [sortingOption] = useState([
        { value: 'latest', label: 'Latest' },
        { value: 'top-sales', label: 'Top Sales' },
        { value: 'low-to-high', label: 'Price Low to High' },
        { value: 'high-to-low', label: 'Price High to Low' }
    ]);
    const [filteredrestaurantData, setrestaurantData] = useState();
    const [foodFilter, setfoodFilter] = useState("rice");
    const [indexImageHover, setindexImageHover] = useState("");
    const history = useHistory();

    useEffect(() => {
        var filteredRestaurants = restaurantsDummy.restaurants.filter(restaurant =>
            restaurant.menu.some(item => item.category === foodFilter)
        );
        setrestaurantData(filteredRestaurants);
    }, [foodFilter, setrestaurantData]);

    return (
        <Container maxWidth={false} style={{ margin: '3vw 0vw 3vw 0vw' }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                        {foodCategories.categories.map((category, index) => {
                            return <Grid item key={index}>
                                <img onClick={() => setfoodFilter(category.name.toLowerCase())} src={category.image} alt={category.name} style={{ width: '100%', height: 'auto' }} />
                            </Grid>
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant='title' style={{ fontWeight: 'bold', fontSize: '2rem' }} color='#596a2a'>Foodie paradise</Typography>
                        </Grid>
                        <Grid item xs={2}>
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
                                    onChange={(x) => { }}
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
                        </Grid>

                        {filteredrestaurantData && filteredrestaurantData.map((restaurant, index) => {
                            const ratings = restaurant.menu.map((item) => item.rating);
                            const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
                            const numRatings = ratings.length;

                            console.log("printprintprintprint", restaurant.id)

                            return <Grid item xs={6} md={4} lg={3} key={index}>
                                <Card sx={{ minHeight: 300, maxHeight: 450 }} style={{ boxShadow: "0.2vw 0.3vw 0.5vw #888888" }} onClick={() => history.push(`/FoodDetail/${restaurant.id}`)}>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: 194 }}
                                        image={restaurant.menu[0].image}
                                        alt={restaurant.name}
                                        style={{
                                            opacity: indexImageHover === index ? "50%" : "100%",
                                        }}
                                        onMouseOver={() => setindexImageHover(index)}
                                        onMouseOut={() => setindexImageHover()}
                                    />
                                    <CardContent>
                                        <Stack direction="column" spacing={1}>
                                            <Typography
                                                variant='title'
                                                style={{ fontWeight: "bold", textAlign: "left" }} > {restaurant.name} </Typography>
                                            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem style={{ color: '596a2a' }} />}>
                                                <Typography variant='subtitle2'><TwoWheelerIcon fontSize="small" style={{ color: '#8fb03d' }} />  {restaurant.distance} km</Typography>
                                                <Typography variant='subtitle2'><AccessTimeIcon fontSize="small" style={{ color: '#8fb03d' }} />  {restaurant.time} mins</Typography>
                                                <Typography variant='subtitle2'><StarRateIcon fontSize="small" style={{ color: '#8fb03d' }} />  {averageRating}</Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="large"
                                            fullWidth
                                            style={{ backgroundColor: '#596a2a', color: 'white' }}
                                        >View Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })}

                    </Grid>

                </Grid>

            </Grid>
        </Container>
    );
}