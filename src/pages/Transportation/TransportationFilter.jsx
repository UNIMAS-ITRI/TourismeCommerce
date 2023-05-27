import React, { Component } from "react";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import { recommend, categoriesType, Division, rating, sortingOption } from './TransportData';
import Divider from "@mui/material/Divider";
import { Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { FilterBar } from '../../components/FilterBar/FilterBar';

import {
    Typography,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from "@mui/material";

import "../Hotel/HotelDetails.css";

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
    indexMediaHower: "",
    selectedMedia: "",
    selectedMediaDetails: [],
    mediaList: [],
    openModal: false,
};

class TransportationFilter extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() { }

    componentDidUpdate(prevProps, prevState) { }

    handleFilterOption = (data) => {
        console.log("handleFilterOption", data);
    };

    itemCard = (x, index) => {
        return <Grid item xs={6} md={4} lg={3} style={{ paddingBottom: "2.0vw" }}>

            {/* <div className="col-3" style={{ paddingBottom: "2.0vw" }}> */}
            <Card
                // onClick={() => window.open(x.url, "_blank")}
                sx={{ minHeight: 300, maxHeight: 450 }}
                style={{ boxShadow: "0.2vw 0.3vw 0.5vw #888888" }}
            >
                <CardMedia
                    component="img"
                    height="194"
                    image={x.image}
                    alt={x.name}
                    style={{
                        opacity:
                            this.state.indexImageHover === index
                                ? "50%"
                                : "100%",
                    }}
                    onMouseOver={() =>
                        this.setState({ indexImageHover: index })
                    }
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
                        {x.name}
                    </Typography>
                    <Typography variant='subtitle2' style={{ textAlign: 'left', fontSize: "0.7rem", color: "dimgrey" }}> {x.shopName}</Typography>
                    <Rating
                        style={{ fontSize: "1.0rem" }}
                        value={x.hotelStar}
                    />{" "}
                    <Divider />
                    <div
                        className="row"
                        style={{ paddingTop: "10px", textAlign: "right" }}
                    >
                        <div
                            className="col-6"
                            style={{ paddingTop: "5px" }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#ee595d",
                                    borderRadius: "5%",
                                    width: "90%",
                                    height: " 45px",
                                    color: "white",
                                    textAlign: "center",
                                    display: "grid",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                }}
                            >
                                {parseInt(
                                    ((x.price - x.discountedPrice) / x.price) *
                                    100
                                )}{" "}
                                %
                                <br />
                                <label
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    OFF TODAY
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <Typography
                                style={{
                                    color: "grey",
                                    fontSize: "15px",
                                    textDecoration: "line-through",
                                }}
                            >
                                RM {x.price}
                            </Typography>
                            <Typography
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                }}
                            >
                                RM {x.discountedPrice}
                            </Typography>
                        </div>
                    </div>
                    <Button
                        variant="container"
                        style={{
                            backgroundColor: "#596a2a",
                            color: "white",
                            marginTop: "10px"
                        }}
                        fullWidth
                        // onClick={() =>
                        //     (window.location.href = "/ProductsDetail")
                        // }
                    >
                        Add to cart
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    }

    render() {
        return (
            <div style={{ backgroundColor: "white" }}>
                <div
                    className="row justify-content-center"
                    style={{ padding: "2.5vw" }}
                >
                    {FilterBar(categoriesType, Division, rating)}

                    <div className="col-lg-9 col-md-9 ">
                        <div className="d-flex sorting-options-panel align-middle px-3 mb-2 ">
                            <div className="flex-grow-1 d-flex my-auto">
                                <Typography variant='title' style={{ fontWeight: 'bold', fontSize: '2rem' }} color='#596a2a'>Best Ride in Sarawak</Typography>
                            </div>

                            <div>
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
                                        onChange={(x) => this.handleSorting(x)}
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
                            </div>
                        </div>

                        <div className="container" style={{ paddingTop: "1vw" }}>
                            <Grid container spacing={2}>
                                {recommend.length > 0 &&
                                    recommend.map((x, index) => {
                                        return (
                                            this.itemCard(x, index)
                                        );
                                    })}
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransportationFilter);
