import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import { Card, Box, Fab, Stack, CardMedia, CardContent, Typography, Rating, Divider, Button } from '@mui/material';

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

const INITIAL_STATE = {
    indexImageHover: "",
    dummyCardData: [
        { type: 'Accomodation', productName: 'Hilton Kuching', subtitle: '', rating: '4.5', description: "Hilton Kuching Hotel is... ", price: 179, imgURL: "" },
        { type: 'Accomodation', productName: 'Pullman Kuching', subtitle: '', rating: '4.5', description: "Pullman Hotel is... ", price: 219, imgURL: "" },
        { type: 'Accomodation', productName: 'Grand Margherita Hotel', subtitle: '', rating: '4.5', description: "Grand Margherita Hotel is... ", price: 169, imgURL: "" },
        { type: 'Accomodation', productName: 'Imperial Hotel', subtitle: '', rating: '4.5', description: "Imperial Hotel is... ", price: 229, imgURL: "" },
        { type: 'Accomodation', productName: 'Merdeka Palace Hotel', subtitle: '', rating: '4.5', description: "Merdeka Palace Hotel is... ", price: 239, imgURL: "" },
        { type: 'Accomodation', productName: 'Roxy Hotel', subtitle: '', rating: '4.5', description: "Roxy Hotel is... ", price: 164, imgURL: "" },
        { type: 'Restaurants', productName: 'Sarawak Laksa Special', subtitle: 'King Laksa Restaurant', rating: '4.5', description: "", price: 9, imgURL: "" },
        { type: 'Restaurants', productName: 'Kolok Mee', subtitle: 'Haji Salleh', rating: '4.5', description: "", price: 4, imgURL: "" },
        { type: 'Restaurants', productName: 'Mee Jawa Satay', subtitle: 'RJ Restaurant', rating: '4.5', description: "", price: 9, imgURL: "" },
        { type: 'Restaurants', productName: 'Kek Lapis Mira', subtitle: 'Mira Kek Lapis', rating: '4.5', description: "", price: 15, imgURL: "" },
        { type: 'Restaurants', productName: 'Fried Dabai Rice', subtitle: 'King Laksa Restaurant', rating: '4.5', description: "", price: 10, imgURL: "" },
        { type: 'Tourpackage', productName: 'Naan Cheese', subtitle: 'Ceylonese Kuching', rating: '5', description: "", price: 16, imgURL: "" },
        { type: 'Tourpackage', productName: 'Sarawak Sunset River Cruise', subtitle: 'Bestway Tour & Travel SDN BHD', rating: '4.5', description: "Cruise along Sarawak River...", price: 156, imgURL: "" },
        { type: 'Tourpackage', productName: 'Ukom Longhouse', subtitle: 'CPH Travel Agencies', rating: '5', description: "Once infamously known as the Land of the Headhunters... ", price: 560, imgURL: "" },
        { type: 'Tourpackage', productName: 'Bako National Park', subtitle: 'Cat City Hilidays SDN BHD', rating: '5', description: "Bako National Park is claimed to be the...", price: 352, imgURL: "" },
        { type: 'Tourpackage', productName: 'Gunung Gading Raflessia Tour', subtitle: 'Cat City Hilidays SDN BHD', rating: '5', description: "The excursion will take an hour 30 minutes...", price: 133, imgURL: "" },
        { type: 'Tourpackage', productName: '4-Day Borneo Coastal', subtitle: 'Paradesa Borneo', rating: '5', description: "Cycles along Borneo's ...", price: 159, imgURL: "" },
        { type: 'Ticketing', productName: 'Broke Gallery', subtitle: 'Sarawak Museum', rating: '5', description: "Gallery is ....", price: 15, imgURL: "" },
        { type: 'Ticketing', productName: 'Textile Museum', subtitle: 'SarawakTour SDN BHD', rating: '5', description: "Kuching is the capital of the Sarawak...", price: "FOC", imgURL: "" },
        { type: 'Ticketing', productName: 'Adult (3 days Pass)', subtitle: 'Sarawak Cultural Village', rating: '5', description: "Rainforest World Music Festival...", price: 345, imgURL: "" },
        { type: 'Ticketing', productName: 'Adult (1 days Pass)', subtitle: 'Sarawak Cultural Village', rating: '5', description: "Rainforest World Music Festival...", price: 140, imgURL: "" },
        { type: 'Ticketing', productName: 'Family (3 days Pass)', subtitle: 'Sarawak Cultural Village', rating: '5', description: "Rainforest World Music Festival...", price: 1020, imgURL: "" },

        { type: 'Product', productName: 'Orang Ulu Multi Purpose Accessory or Glass Coaster', subtitle: '', rating: '5', description: "Rainforest World Music Festival...", price: 1020, imgURL: "" },
        { type: 'Product', productName: 'Tango Budak', subtitle: '', rating: '5', description: "Rainforest World Music Festival...", price: 1020, imgURL: "" },
        { type: 'Product', productName: 'Ceramic Necklace (Mint)', subtitle: '', rating: '5', description: "Rainforest World Music Festival...", price: 1020, imgURL: "" },
        { type: 'Product', productName: 'Bracelet (Unisex)', subtitle: '', rating: '5', description: "Rainforest World Music Festival...", price: 1020, imgURL: "" },
        { type: 'Product', productName: 'Bidayuh Traditional (Full set of 7)', subtitle: '', rating: '5', description: "Rainforest World Music Festival...", price: 1020, imgURL: "" },
    ]
}

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        console.log(this.props)
        const { id, name, cover, price, colors, available, sizes, priceSale } = this.props;
        const handleAddCart = async () => {
            const newProduct = {
                id,
                name,
                cover,
                available,
                price,
                colors: [colors[0]],
                size: sizes[0],
                quantity: 1,
            };
            try {
                // dispatch(addToCart(newProduct));
            } catch (error) {
                console.error(error);
            }
        };

        return (
            // <Card
            //     sx={{
            //         '&:hover .add-cart-btn': {
            //             opacity: 1,
            //         },
            //     }}
            // >
            //     <Box sx={{ position: 'relative', p: 1 }}>
            //         <Fab
            //             color="warning"
            //             size="medium"
            //             className="add-cart-btn"
            //             onClick={handleAddCart}
            //             sx={{
            //                 right: 16,
            //                 bottom: 16,
            //                 zIndex: 9,
            //                 opacity: 0,
            //                 position: 'absolute',
            //                 transition: (theme) =>
            //                     theme.transitions.create('all', {
            //                         easing: theme.transitions.easing.easeInOut,
            //                         duration: theme.transitions.duration.shorter,
            //                     }),
            //             }}
            //         >
            //             {/* <Iconify icon="ic:round-add-shopping-cart" /> */}
            //         </Fab>

            //         {/* <Image alt={name} src={cover} ratio="1/1" sx={{ borderRadius: 1.5 }} /> */}
            //     </Box>

            //     <Stack spacing={2.5} sx={{ p: 3 }}>
            //         {/* <Link component={RouterLink} to={linkTo} color="inherit" variant="subtitle2" noWrap> */}
            //             {name}
            //         {/* </Link> */}

            //         <Stack direction="row" alignItems="center" justifyContent="space-between">
            //             <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            //                 {priceSale && (
            //                     <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
            //                         {priceSale}
            //                     </Box>
            //                 )}

            //                 <Box component="span">{price}</Box>
            //             </Stack>
            //         </Stack>
            //     </Stack>
            // </Card>
            <div class="CardView" className="col">
                <Card
                    // onClick={() => window.open(x.url, "_blank")}
                    sx={{ minHeight: 300, maxHeight: 450 }}
                    style={{ boxShadow: "0.2vw 0.3vw 0.5vw #888888" }}
                >
                    <CardMedia
                        component="img"
                        height="194"
                        // image={x.img}
                        // alt={x.name}
                        // style={{
                        //     opacity:
                        //         this.state.indexImageHover === index
                        //             ? "50%"
                        //             : "100%",
                        // }}
                        // onMouseOver={() =>
                        //     this.setState({ indexImageHover: index })
                        // }
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
                            {/* {x.name} */}
                            Testing
                        </Typography>
                        <Rating
                            style={{ fontSize: "1.0rem" }}
                            // value={x.hotelStar}
                        />{" "}
                        <Divider />
                        <div className="row" style={{ paddingTop: "10px" }}>
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
                                    {/* {x.rating} */}
                                    4
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div
                            className="row"
                            style={{ paddingTop: "10px", textAlign: "right" }}
                        >
                            <div className="col-6">
                                <Typography
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                >
                                    {/* RM {x.price} */}
                                    RM 300
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
                            >
                                View Hotel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);