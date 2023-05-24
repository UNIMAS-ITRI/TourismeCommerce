import React, { Component } from 'react';
// third-party
import { connect } from 'react-redux';
import { GitAction } from "../../../store/action/gitAction";

import ShopPageCheckOut from "./ShopPageCheckOut.js";
import CartComponent from './CartComponent';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// data stubs
import { toast } from 'react-toastify';
import {Typography} from '@mui/material';

const steps = ['Check Order', 'Place Order', 'Payment', 'Complete'];

class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantities: [],
            ProductStockAmountlimit: false,
            overProductStockAmountLimitID: [],
            cart: [],
            subtotal: 0,
            checkOutState: false,
            setDetails: false,
            selectedIndex: "",

            activeStep: 0,
            skipped: new Set(),

            MerchantShopName: [],

            selectedProductDetailList: [],
            isDataAccepted: false,
            isCheckOutSubmit: false,
            qty:0,

            data :[{
                MerchantShopName:'Jual Barang Sdn Bhd',
                id:122,
                Image:"https://ik.imgkit.net/3vlqs5axxjf/TW-Asia/ik-seo/uploadedImages/Industry/Travel_Technology/smartalloc-202111111/Hotels-get-smart-solution-to-reduce-energy-usage-a.jpg?tr=w-780%2Ch-440%2Cfo-auto",
                ProductName:"Deluxe Twin @ The Waterfront Hotel Kuching",
                Desc: "Hotel for staycation",
                Price: 227,
                Quantity: 1,
                Total: 227,
            },
           { MerchantShopName:'Jual Barang Sdn Bhd',
           id:133,
            Image:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSn0XebRxMbGh78VwXY6kzx5QHjDECD8sZK3PWnQReOAIw7FjQz",
            ProductName:"2D1N The Amazing Borneo Highland Resort",
            Desc:"null",
            Duration:"2 Day 1 Night",
            Price: 37,
            Quantity: 1,
            Total: 37
        },

            { MerchantShopName:'Jual Barang Sdn Bhd',
            id:144,
            Image:"https://t1.gstatic.com/images?q=tbn:ANd9GcQ4_xsQFN3ITN-B3VbfSfo9jaYuM0-s7LJKgArdkUriKVy96dgq",
            ProductName:"Bead Rangoli",
            Desc:"Exploring the unique features of Sarawak.",
            Price: 19,
            Quantity: 1,
            Total: 19,},

        ],
        };
        this.setDetails = this.setDetails.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleSelectedProduct = this.handleSelectedProduct.bind(this)
        this.handleAllProductSellect = this.handleAllProductSellect.bind(this)
    }
    getItemQuantity(item) {
        var { quantities } = this.state;
        var quantity = quantities.find((x) => x.itemId === item.id);

        return quantity ? quantity.value : item.quantity;
    }

    setDetails(productcart) {
        productcart.map((x) => {
            this.state.cart.push(
                {
                    id: x.UserCartID,
                    product: x,
                    options: [],
                    price: x.ProductPrice,
                    total: x.ProductQuantity * x.ProductPrice,
                    quantity: x.ProductQuantity,
                    MerchantShopName: x.MerchantShopName,
                    MerchantID: x.MerchantID
                }
            )
        })
        this.setState({ isDataSet: true })

        if (this.state.selectedProductDetailList !== [] && this.state.selectedProductDetailList.length > 0) {
            let temp = [...this.state.selectedProductDetailList]
            this.state.selectedProductDetailList.splice(0, this.state.selectedProductDetailList.length)

            temp.map((selectedProduct) => {
                this.state.cart.filter((x) => x.product.UserCartID === selectedProduct.product.UserCartID).map((updatedList, index) => {
                    this.state.selectedProductDetailList.push(updatedList)
                })
            })
            this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
        }
    }

    componentDidMount() {
        if (this.props.productcart !== undefined && this.props.productcart[0] !== undefined && this.props.productcart[0].ReturnVal === undefined) {
            this.setDetails(this.props.productcart)
        }
    }

    handleQuantityChange = (index, newQuantity) => {
        const updatedData = [...this.state.data];
        updatedData[index].Quantity = newQuantity;
        updatedData[index].Total = newQuantity * updatedData[index].Price;
        this.setState({ data: updatedData });
      };

    componentDidUpdate(prevProps) {
        if (prevProps.productcart !== this.props.productcart) {

            if (this.props.productcart.length > 0) {
                this.state.cart.map((x, index) => {
                    this.state.cart.splice(0, this.state.cart.length)
                })
                // this.filterShop(this.props.productcart)
                this.setDetails(this.props.productcart)
            }

        }
    }

    // ---------------------------------------------------- Update Cart Item ------------------------------------

    removeItem(product) {
        this.props.CallDeleteProductCart({ userCartID: product.UserCartID, userID: localStorage.getItem("id"), productName: product.ProductName })
    }

    handleChangeQuantity = (item, quantity) => {
        if (quantity > 0) {
            this.props.CallUpdateProductCart({
                userID: localStorage.getItem("id"),
                userCartID: item.product.UserCartID,
                productQuantity: quantity,
                productName: item.product.ProductName
            })
        }
        this.setState({ selectedIndex: item.id })
    };

    // ---------------------------------------------------- Check Out ------------------------------------

    CheckOutOnClick = () => {
        console.log('selected', this.state.selectedProductDetailList)
        this.setState({checkOutState:true, activeStep:1});
    };

    // ---------------------------------------------------- Check Selected ------------------------------------

    handleSelectedProduct (item, index) {
        console.log('item', item)
        if (this.state.selectedProductDetailList.length > 0) {
            let found = false
            this.state.selectedProductDetailList.map((x, i) => {
                if (x.id === item.id) {
                    this.state.selectedProductDetailList.splice(i, 1)
                    found = true
                }
            })
            if (found === false) {
                this.state.selectedProductDetailList.push(item)
            }
        }
        else {
            this.state.selectedProductDetailList.push(item)
        }
        this.setState({ subtotal: this.state.selectedProductDetailList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }

    handleAllProductSellect(shopName, selectedProductListing) {
        const { cart, selectedProductDetailList } = this.state

        let itemsWithShopname = selectedProductDetailList.filter(x => x.MerchantShopName === shopName)
        let tempList = []

        if (itemsWithShopname.length > 0) {
            tempList = selectedProductDetailList.filter(x => x.MerchantShopName !== shopName)
        }
        else {
            itemsWithShopname = cart.filter(x => x.MerchantShopName === shopName)
            tempList = [...selectedProductDetailList, ...itemsWithShopname]
        }
        this.setState({ selectedProductDetailList: tempList, subtotal: tempList.reduce((subtotal, item) => subtotal + item.total, 0) })
    }
    
      handleNext = () => {
        const { activeStep, skipped } = this.state;
        let newSkipped = skipped;
        if (this.isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        this.setState((prevState) => ({
          activeStep: prevState.activeStep + 1,
          skipped: newSkipped,
        }));
      };
    
      handleBack = () => {
        this.setState((prevState) => ({
          activeStep: prevState.activeStep - 1,
        }));
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };

      renderStepper = () => {
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>
      }


      render() {
        const { activeStep, skipped } = this.state;
        let content;
        let continueshopping = (
          <Box
            sx={{
              flexGrow: 1,
              margin: '20%',
              padding: '20px',
            }}
            className="block block-empty"
            alignItems="center"
            justify="center"
          >
            <Paper style={{ padding: '15px' }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12} sm={12}>
                  <Typography style={{ textAlign: 'center' }}>
                    Your Shopping Cart is empty!
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary">
                      Continue Shopping
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      
        if (this.state.data.length) {
          if (this.state.isDataAccepted === true) {
            return (
              <ShopPageCheckOut
                data={this.state.data}
                merchant={this.state.selectedProductDetailList.filter(
                  (ele, ind) =>
                    ind ===
                    this.state.selectedProductDetailList.findIndex(
                      (elem) => elem.MerchantShopName === ele.MerchantShopName
                    )
                )}
              />
            );
          } else {
            if (
              this.state.data.length > 0 &&
              this.state.data.ReturnVal !== '0'
            ) {
              content = <CartComponent 
              data={this.state.data} 
              handleQuantityChange={this.handleQuantityChange} 
              handleSelectedProduct={this.handleSelectedProduct} 
              handlePlaceOrder={this.CheckOutOnClick}
              selected={this.state.selectedProductDetailList}
              checkOutState = {this.state.checkOutState}
              />;
            } else {
              content = continueshopping;
            }
          }
        } else {
          content = continueshopping;
        }
      
        return (
          <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:'2%'}} >
                    <Grid item xs={12} sm={8}>
                        <Typography variant='h4'>Shopping Cart</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                            })}
                        </Stepper>
                    </Grid>
                </Grid>
            </Box>
            {content}
          </React.Fragment>
        );
      }
      
}

const mapStateToProps = (state) => ({
    // productcart: state.counterReducer.productcart
});

const mapDispatchToProps = (dispatch) => {
    return {
        // CallDeleteProductCart: (prodData) => dispatch(GitAction.CallDeleteProductCart(prodData)),
        // CallUpdateProductCart: (prodData) => dispatch(GitAction.CallUpdateProductCart(prodData)),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);