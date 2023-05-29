import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Rating, Button } from '@mui/material';
import OrangUlu from '../../assets/OrangUlu.jpg'
import BasicModal from '../../components/AlertModal/ModalAddedCart';
import GeneralData from "../../_mock/GeneralData";

function mapStateToProps(state) {
    return {
        productCart: state.counterReducer["productCart"],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
        CallAddProductCart: () => dispatch(GitAction.CallAddProductCart()),
    };
}

const INITIAL_STATE = {
  indexImageHover: "",
  open: false,
}

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      if (this.state.open) {
        this.setState({ open: false });
      }
    }, 2000);
  }

  render() {
    const { open } = this.state;

    
    const handleAddToCart = (data)=>{
        const cartItem = localStorage.getItem("cartItem")
        if(cartItem !== null)
        {
            let itemDetail = JSON.parse(cartItem)
            let newItemArray = [...itemDetail, data]

            localStorage.setItem("cartItemLength", newItemArray.length)
            localStorage.setItem("cartItem", JSON.stringify(newItemArray))
            this.props.CallAddProductCart()
        }
        else{
            localStorage.setItem("cartItemLength", 1)
            localStorage.setItem("cartItem", JSON.stringify([data]))
            this.props.CallAddProductCart()
        }
        
        this.setState({ open: true })
    }

    return (
      <div className="row">
        {
          GeneralData.filter((y) => y.type === this.props.type).map((x, index) => {
            return (
              <div class="CardView" className="col">
                <Card sx={{ minHeight: 350, maxHeight: 450, boxShadow: "0.2vw 0.3vw 0.5vw #888888", }}
                // onClick={() => window.open(x.url, "_blank")}  
                >
                  <CardMedia
                    component="img"
                    height="194"
                    image={x.imgURL}
                    alt={x.productName}
                    style={{ opacity: this.state.indexImageHover === index ? "50%" : "100%", }}
                    onMouseOver={() => this.setState({ indexImageHover: index })}
                    onMouseOut={() => this.setState({ indexImageHover: "" })}
                  />
                  <CardContent>
                    <Typography color="text" style={{ fontWeight: "bold", textAlign: "left", }} >
                      {x.productName}
                    </Typography>
                    <Typography color="text" variant="body2" fontWeight="700" >
                      {x.subtitle}
                    </Typography>
                    <div className="row">
                      <div className="col-4">
                        <Rating
                          style={{ fontSize: "1.0rem" }}
                          value={x.ratingStar}
                        />{" "}
                      </div>
                      <div className="col-8">
                        <Typography variant="body2">{x.rating} ratings</Typography>
                      </div>
                    </div>
                    <div className="col-12" style={{ height: "5.5vw", lineHeight: 1, overflowY: "auto" }}>
                      <Typography variant="caption">{x.description} </Typography>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <Typography style={{ color: "#8fb136", fontWeight: "bold", fontSize: "20px", }} >
                          RM {x.price}
                        </Typography>
                      </div>
                      <div className="col-6" style={{ display: "flex", justifyContent: "end" }}>
                        <Button size="small" style={{ backgroundColor: "#8fb136", color: "white", width: "5.5vw" }} onClick={() => handleAddToCart(x)}>
                          Add To Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })
        }
        <BasicModal open={open} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);